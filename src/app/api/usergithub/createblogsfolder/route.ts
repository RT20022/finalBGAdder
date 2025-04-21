import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"


export async function PUT() {
    try {
        let cookieStore = await cookies()
        let RepoUrl = cookieStore.get("selectedRepo")?.value
        let access_token = jwt.decode(`${cookieStore.get('UI')?.value}`).access_token

        const makefolderesult = await fetch(`${RepoUrl}/Blogs/blogs.html`,
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "accept": "application/vnd.github+json"
                },
                body: JSON.stringify({
                    message: "Created a new Folder Blogs and created a file Blogs.html where all the blogs will be Displayed",
                    content: Buffer.from(`<!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Blogs</title>
                                        </head>
                                        <body>
    
                                        </body>
                                        </html>`).toString("base64")
                })
            }
        )
        console.log(makefolderesult.status,await makefolderesult.text())

        if (makefolderesult.ok) {
         console.log("done !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")   
        }

        return NextResponse.json({ message: "Folder Created and file added successfully" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error while creating blogs folder" })
    }
}



export async function GET(){
    try {
        let cookieStore = await cookies()
        let RepoUrl = cookieStore.get("selectedRepo")?.value
        let reposResp = await fetch(`${RepoUrl}`)
        if(reposResp.ok){
            let allrepos  = await reposResp.json()
           const isBlogsDirectory = allrepos.filter((val:any)=>{
                return val.name == "Blogs" 
            })
            if(isBlogsDirectory.length == 1){
                return NextResponse.json({isBlogExist:true})
            }
            else{
                return NextResponse.json({isBlogExist:false})
            }
        }

        return NextResponse.json({Message:"API fetched"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({Message:"An error occured while looking if Blogs Directory Already Exist"})
    }
}