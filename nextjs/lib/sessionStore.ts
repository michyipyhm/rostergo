
import { sealData, unsealData } from 'iron-session'
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server'

type Session = {
    id?: number
    nickname?: string
    admin?: boolean
    branch_id?: number
}

 class SessionStore{

    async get():Promise<Session>{
        const session_id = (await cookies()).get('session_id')
        if(!session_id){
            console.log('No session found')
            return {}
        }
        try {
            const data = await unsealData<Session>(session_id.value, { password: process.env.COOKIE_SECRET + "" })
            // console.log('SessionStore: Session retrieved:', data)
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
        console.log('SessionStore: Session saved:', session)
    } catch (error) {
        console.error('SessionStore: Error saving session:', error)
        }
    }

    async clear(){
        await this.save({})
        console.log('Session cleared')
    }  

    async deleteAllUserSessions(userId: number): Promise<void> {
        // This is a placeholder. In a real-world scenario, you might want to
        // implement this differently, possibly involving a database to track sessions.
        console.log(`Deleting all sessions for user ${userId}`)
        // For now, we'll just clear the current session
        await this.clear()
    }
}

export const sessionStore = new SessionStore()

