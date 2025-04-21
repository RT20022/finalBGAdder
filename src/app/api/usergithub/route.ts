import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as cheerio from 'cheerio';
import jwt from "jsonwebtoken"


let $: any
export async function POST(req: Request) {
    try {
        let { indexfileAPIData, blogsFoldExist } = await req.json()
        const indexresp = await fetch(`${indexfileAPIData[0].git_url}`)
        if (indexresp.ok && blogsFoldExist.length == 0) {
            const indexfiledecoded = await indexresp.json()
            indexfileAPIData = atob(indexfiledecoded.content)
            $ = cheerio.load(indexfileAPIData)
            if ($('nav ul li').length) {
                return NextResponse.json({ message: "Happy Blogging" }, { status: 200 })
            }
            else {
                return NextResponse.json({ message: "Navbar has bad SEO" }, { status: 404 })
            }
        }
        else {
            return NextResponse.json({ message: "Blogs Folder Already Exist" }, { status: 200 })
        }
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: `An Error Occured in POST ${error}` })
    }
}


export async function PUT(req: Request) {
    try {
        let { indexfileAPIData, blogsFoldExist } = await req.json()
        const cookieStore = await cookies()
        let access_code = cookieStore.get('UI')?.value || ""
        const blog_li = $('nav ul li').first().clone()
        let scripttag = $('script')
        let GAT = ''
        scripttag.each((i: any, el: any) => {
            if ($.html(el).includes('googletagmanager.com/gtag/js') || $.html(el).includes('gtag(')) {
                GAT += $.html(el)
            }
        })
        if (GAT != "") {
            cookieStore.set("GAT", GAT)
        }
        console.log($.html(), "Raghav")
        const blogItem = $('nav ul li').filter((i, el) => {
            return $(el).text().trim().toLowerCase() === 'blogs';
        });
        blog_li.find('a').text('Blogs')
        blog_li.find('a').attr("href", "/Blogs/blogs.html")
        $("nav ul").append(blog_li)
        const url = new URL(indexfileAPIData[0].url)
        url.searchParams.delete('ref')
        jwt.decode(access_code)
        
        cookieStore.set("selectedRepo", indexfileAPIData[0].url.split("/index.html")[0])

        if (blogItem.html() == null && blogsFoldExist.length == 0) {
            const sendHtmlResp = await fetch(`${url.toString()}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${jwt.decode(access_code)?.access_token}`,
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        message: "Updates into Index.html by RK",
                        content: Buffer.from($.html()).toString("base64"),
                        sha: indexfileAPIData[0].sha
                    })
                }
            )
            // these messages will not be shown to the user | only the Message inside POST will be shown
            return NextResponse.json({ Message: "Blog Route Added Successfully" }, { status: 200 })
        }
        else {
            return NextResponse.json({ Message: "Blogs Folder Already Exist" })
        }
    } catch (error) {
        console.error("An error occured", error)
        return NextResponse.json({ Message: "Error Occured while Updating Index.html File" })
    }
}


// export async function GET(erq: Request) {
//     try {
//         return NextResponse.json({ indexfileAPIData })
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ message: "An error Occured" })
//     }
// }