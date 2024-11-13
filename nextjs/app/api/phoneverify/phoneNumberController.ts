import {
  saveOtpToDB,
  verifyOtp,
  verifyPhoneNumber,
} from "@/services/otpService";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: "@/.env" });

const whatsappApiUrl = process.env.WHATSAPP_API_URL;
const whatsappAccessToken = process.env.WHATSAPP_ACCESS_TOKEN;

console.log("whatsappApi is", whatsappApiUrl);
console.log("whatsappAccessToken is", whatsappAccessToken);

export async function handleVerifyPhoneNumber(
  req: NextRequest
): Promise<NextResponse> {
  try {
    const { phone } = await req.json();
    console.log(phone)
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number required" },
        { status: 400 }
      );
    }

    const result = await verifyPhoneNumber(phone);

    if (!result.user) {
      return NextResponse.json(
        { error: "Failed to update or create user" },
        { status: 500 }
      );
    }

    if (result.redirectToLogin) {
      return NextResponse.json({
        message: result.message,
        redirectToLogin: true,
        redirectToVerifyOtp: false,
        user: result.user,
      });
    }

    // if (result.redirectToVerifyOtp) {
    //   const generateOtp = () => {
    //     return Math.floor(100000 + Math.random() * 900000).toString();
    //   };
    //   const generatedOtp = generateOtp();

    //   //call whatsappppp
    //   try {
    //     await axios.post(
    //       whatsappApiUrl,
    //       {
    //         messaging_product: "whatsapp",
    //         to: phone,
    //         type: "template",
    //         template: {
    //           name: "your_otp_template",
    //           language: { code: "en_US" },
    //           components: [
    //             {
    //               type: "body",
    //               parameters: [
    //                 {
    //                   type: "text",
    //                   text: generatedOtp,
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${whatsappAccessToken}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     console.log(`OTP sent to ${phone} via WhatsApp`);

    //     const otpSaved = await saveOtpToDB(phone, generatedOtp);

    //     return NextResponse.json({
    //       message: result.message,
    //       redirectToLogin: false,
    //       redirectToVerifyOtp: true,
    //       user: result.user,
    //     });
      // } catch (error) {
    //     console.error("Error sending WhatsApp message:", error);
    //     return NextResponse.json(
    //       { error: "Failed to send OTP via WhatsApp" },
    //       { status: 500 }
    //     );
    //   }
    // }

    return NextResponse.json({
      message: "Unexpected result",
      redirectToLogin: false,
      redirectToVerifyOtp: false,
      user: result.user,
    });
  } catch (error) {
    console.error("Error in handleVerifyNumber:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function handleVerifyOtp(req: NextRequest): Promise<NextResponse> {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    const verifiedUser = await verifyOtp(phone, otp);

    if (!verifiedUser) {
      return NextResponse.json(
        {
          error: "Invalid OTP",
          message: "OTP verification failed",
          redirectToVerifyOtp: true,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "OTP verified successfully",
      redirectToLogin: true,
      user: verifiedUser,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
