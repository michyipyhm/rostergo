import { getAllUsers } from "@/services/testService";

export async function GET() {


    let users = await getAllUsers();


    return Response.json({ users })

}