import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from './lib/sessionStore';


const isRouteWithoutMiddleware = (path:string)=>{
    const excludedPrefix = [
        "/login",
        "/api/login",
        "/_next/static",
        "/favicon.ico"
    ]
    return excludedPrefix.some(prefix=> path.startsWith(prefix)) 
} 

export async function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname
    if(isRouteWithoutMiddleware(pathname)){
        return NextResponse.next();
    }
    const session = await sessionStore.get()
    if(!session.id){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}