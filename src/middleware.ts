import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    let { pathname } = request.nextUrl
    // if (cookieStore.get("UI")?.value && pathname === 'user/login') {
    if (cookieStore.get("UI")?.value) {
        let UI = cookieStore.get("UI")?.value

        //  We cannot use JWT module here as it does'nt support Edge Runtime (error)=>[The edge runtime does not support Node.js 'crypto' module.] 
        const resp = await fetch("http://localhost:3000/api/auth", {
            method: "POST",
            body: JSON.stringify({ "UI": UI })
        })
        if (resp.ok) {
            let result = await resp.json()
            if (result.message == false) {
                return NextResponse.redirect(new URL("/login", request.url))
            }
            else if (result.message == true && request.nextUrl.pathname == '/login') {
                return NextResponse.redirect(new URL("/user/dashboard", request.url))
            }
        }
    }
    else {
        return NextResponse.redirect(new URL("/", request.url))
    }
}

export const config = {
    matcher: [ '/user/signup', '/user/userhome'],
}