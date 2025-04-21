import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    try {
        // let cookieStore = cookies();
        // let repoLink = (await cookieStore).get("selectedRepo")
        // const Repodata = await fetch(`${repoLink}`)
        // const data = await Repodata.json()
        // console.log(data,"Raghav")
        return NextResponse.json({Message:"data sent successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({Message:"An error occured"})
    }
}