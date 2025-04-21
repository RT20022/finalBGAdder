import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
    try {
        const data = await req.json()
        let isVerified
        jwt.verify(data.UI,process.env.JWT_SECRET || " " ,(error:any,result:any)=>{
            if(error){
                console.log(error)
                isVerified = false
            }
            else{
                console.log(result)
                isVerified  = true
            }
        })
        return NextResponse.json({ message: isVerified });
    } catch (error) {
        return NextResponse.json({ message: false });
    }
}
