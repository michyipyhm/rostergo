import { pgClient } from "./pgClient";

export async function getAllUsers(): Promise<any> {

    const result = await pgClient.query("SELECT * FROM users");

    return result.rows;

}