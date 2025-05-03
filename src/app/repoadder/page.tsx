export const dynamic = "force-dynamic";

import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import SelectRepo from "@/app/UI/githubPagesHelpers/SelectRepo/page"
import { NextResponse } from "next/server"

async function Getrepos() {
    try {
        let cookieStore = await cookies()
        let UI = cookieStore.get("UI") || { value: '' }
        const myObj = {
            access_token: "",
            token_type: "",
            scope: "",
        }
        const tokenValue = cookieStore.get("UI")?.value;
        const decoded = tokenValue ? jwt.decode(tokenValue) as { access_token?: string } | null : null;

        if (!decoded || !decoded.access_token) {
            throw new Error("Access token is missing or invalid.");
        }

        const access_token = decoded.access_token;
        // let decoded = jwt.decode(UI?.value) || myObj
        const resp = await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        })
        if (resp.ok) {
            let result = await resp.json()
            let reposResp = await fetch(result.repos_url)
            if (reposResp.ok) {
                let repos = await reposResp.json()
                return repos
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({Message : "An error occured kindly contact the Developer"})
    }

}

export default async function PAGE() {

    const repos = await Getrepos()
    return (
        <>
            <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-slate-100 via-slate-400 to-slate-600 flex justify-center items-center">
                <SelectRepo repos={repos}></SelectRepo>
            </div>
        </>
    )
}