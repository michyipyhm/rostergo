import { sealData, unsealData } from 'iron-session'
import { cookies } from 'next/headers';

type Session = {
    id?: number
    nickname?: string
    admin?: boolean
}

export class SessionStore{

    async get():Promise<Session>{
        const session_id = (await cookies()).get('session_id')
        if(!session_id){
            console.log('No session found')
            return {}
        }
        try {
            const data = await unsealData<Session>(session_id.value, { password: process.env.COOKIE_SECRET + "" })
            console.log('SessionStore: Session retrieved:', JSON.stringify(data, null, 2))
            return data
        } catch (error) {
            console.error('SessionStore: Error unsealing session data:', error)
            return {}
        }
    }

    async save(session: Session){
        try {
        const session_id = await sealData(session, {password: process.env.COOKIE_SECRET + ""})
        ;(await cookies()).set("session_id", session_id, {
            maxAge: 86400 *14,
            secure:true,
            httpOnly:true
        })
        console.log('SessionStore: Session saved:', JSON.stringify(session, null, 2))
    } catch (error) {
        console.error('SessionStore: Error saving session:', error)
        }
    }

    async clear(){
        await this.save({})
        console.log('Session cleared')
    }  
}

export const sessionStore = new SessionStore()