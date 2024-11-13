import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
    const hash: string = await bcrypt.hash(password, SALT_ROUNDS)
    return hash
}

export async function checkPassword(password: string, hash: string) {
    const isMatched: boolean = await bcrypt.compare(
        password,
        hash,
    )
    return isMatched
}