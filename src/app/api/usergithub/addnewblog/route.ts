import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import * as cheerio from 'cheerio';

export async function PUT(req: Request) {
    try {
        const { slug, getContent, meta_title } = await req.json()
        const cookieStore = await cookies()
        const access_token = jwt.decode(cookieStore.get("UI")?.value)?.access_token
        const giturl = cookieStore.get("selectedRepo")?.value

        const perviousData = await fetch(`${giturl}/Blogs/${slug}/${slug}.html`)
        const result = await perviousData.json()
        const prevHtml = atob(result.content)
        const $ = cheerio.load(prevHtml)
        $('title').after(`<style> body{
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        width: 100%;
                                    }

                                    .container{
                                        width: 85%;
                                        margin-top: 30px;
                                    }  </style>`)
        $('body').after(`<div class="container">${getContent}</div>`)
        $('title').before(`<meta name="keywords" content=${meta_title.blogtags}>`)
        $('title').before(`<meta name="description" content=${meta_title.blogdesc}>`)
        $('title').text(`${meta_title.blogtitle}`)
        const url = new URL(result.url)
        url.searchParams.delete('ref')

        const senddata = await fetch(`${url.toString()}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify({
                message: `New Blog (${slug}) Added`,
                content: Buffer.from($.html()).toString("base64"),
                sha: result.sha
            })
        })

        // To Add Data inside the blog Route

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
                    message: "Updates into Blog.html by RK",
                    content: Buffer.from($blog.html()).toString("base64"),
                    sha: blogRouteData.sha
                })
            }
        )
        console.log(await blogrouteresp.json(),"blog", blogRouteData.sha)


        return NextResponse.json({ message: "Blog Added Successfully" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "An error occured while adding new blog" })
    }
}