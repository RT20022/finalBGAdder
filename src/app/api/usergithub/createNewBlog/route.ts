import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"


export async function PUT(req: Request) {
    try {
        const { newBlogName } = await req.json()
        const cookieStore = await cookies()
        const repoUrl = cookieStore.get("selectedRepo")?.value
        // const access_token = jwt.decode(`${cookieStore.get("UI")?.value}`)?.access_token
        const tokenValue = cookieStore.get("UI")?.value;
        const decoded = tokenValue ? jwt.decode(tokenValue) as { access_token?: string } | null : null;

        if (!decoded || !decoded.access_token) {
            throw new Error("Access token is missing or invalid.");
        }

        const access_token = decoded.access_token;

        console.log(repoUrl, "Ra..................")
        let data = await fetch(`${repoUrl}/Blogs`)
        if (data.ok) {
            const allBlogs = await data.json()
            const isSameBlog = allBlogs.filter((val: any) => {
                return val.name == newBlogName
            })
            if (isSameBlog.length == 1) {
                return NextResponse.json({ message: "Blog already exist" }, { status: 302 })
            }
            else if (isSameBlog.length == 0) {
                const isCreated = await fetch(`${repoUrl}/Blogs/${newBlogName}/${newBlogName}.html`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "accept": "application/vnd.github+json"
                    },
                    body: JSON.stringify({
                        message: `New Blog Created with Name : ${newBlogName}`,
                        content: Buffer.from(`<!DOCTYPE html>
                                                <html lang="en">
                                                <head>
                                                    <meta charset="UTF-8">
                                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                    <title>Blogs</title>
                                                </head>
                                                <body>
        
                                                </body>
                                                </html>`).toString("base64"),
                    })
                })
                if (isCreated.ok) {
                    return NextResponse.json({ message: "Blog Added Successfully" })
                }
                else {
                    return NextResponse.json({ message: "Try again after sometime" })
                }
            }
        }


        return NextResponse.json({ message: "Done" })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occured while craeting new blog" })

    }
}
