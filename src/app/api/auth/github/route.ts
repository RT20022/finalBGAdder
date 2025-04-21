import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        // Reading the code and random String (state) from the URL
        const searchparam = new URL(req.url)
        // Recieving the Access token on the basis of code we got
        if (searchparam.searchParams.get("state") == process.env.CODE_SECRET) {
            const data = await fetch("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: "Ov23lik3YSNDborzdlPW",
                    client_secret: "58a83bb0f3f0843d2964802fce3c467ad0acd8f1",
                    code: searchparam.searchParams.get("code"),
                    redirect_uri: "http://localhost:3000/api/auth/github"
                })
            })

            // After Recieving the code getting the data of the USER from Authenticator
            if (data.ok) {
                const result = await data.json()
                console.log(result)
                const token = jwt.sign({
                    user_name:result.name,
                    access_token: result.access_token,
                    token_type : result.token_type,
                    scope:result.scope
                }, process.env.JWT_SECRET as string)
                const cookieStore = await cookies()
                cookieStore.set("UI", token)
                return NextResponse.redirect(new URL("/repoadder", req.url))
            }
            else {
                return NextResponse.redirect(new URL("/error", req.url))
            }
        }
        else {
            return NextResponse.redirect(new URL("/error", req.url))
        }

    } catch (error) {
        return NextResponse.redirect(new URL("/error", req.url))
    }
}