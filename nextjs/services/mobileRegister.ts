import { pgClient } from "./pgClient";

export async function mobileRegister(phone: string, otp: string): Promise<mobileRegister> {

try {
    const registerResult = await pgClient.query(
}
}