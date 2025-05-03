import { NextResponse } from "next/server"
import * as cheerio from 'cheerio';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req: Request) {
    try {
        const { slug, getContent, meta_title } = await req.json()
        const cookieStore = await cookies()
        // const access_token = jwt.decode(cookieStore.get("UI")?.value)?.access_token
        const tokenValue = cookieStore.get("UI")?.value;
        const decoded = tokenValue ? jwt.decode(tokenValue) as { access_token?: string } | null : null;

        if (!decoded || !decoded.access_token) {
            throw new Error("Access token is missing or invalid.");
        }

        const access_token = decoded.access_token;
        const giturl = cookieStore.get("selectedRepo")?.value
        const blogRoute = await fetch(`${giturl}/Blogs/blogs.html`)
        console.log(giturl, "blogRoute")
        const blogRouteData = await blogRoute.json()
        console.log(blogRouteData, "blogRouteData")
        const blogRouteHtml = atob(blogRouteData.content)
        const $blog = cheerio.load(blogRouteHtml)
        $blog('.allblogs .row').append(`<div class="col-sm-6 mb-3">
                <div class="card shadow">
                    <div class="card-body">
                        <h5 class="card-title">${meta_title.blogtitle}</h5>
                        <hr>
                        <p class="card-text">${meta_title.blogdesc} ...</p>
                        <a href="/Blogs/${slug}/${slug}.html" class="btn rounded-pill shadow">Read More</a>
                    </div>
                </div>
            </div>`);

        const url2 = new URL(blogRouteData.url)
        url2.searchParams.delete('ref')

        const blogrouteresp = await fetch(`${url2.toString()}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    message: "Updates into Blogs.html by RK",
                    content: Buffer.from($blog.html()).toString("base64"),
                    sha: blogRouteData.sha
                })
            }
        )
        console.log(await blogrouteresp.json(), "blog", blogRouteData.sha)


        return NextResponse.json({ message: "Blog Added Successfully" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "An error occured while adding new blog" })
    }
}