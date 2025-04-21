import { cookies } from "next/headers"


let repoName = ""

async function GetData() {
    let cookieStore = cookies();
    let repoUrl = (await cookieStore).get("selectedRepo")
    try {
        const result = await fetch(`${repoUrl?.value}/Blogs`)
        let noOfBlogs = 0
        let resultArray = []

        const resp = await result.json()
        resp.forEach(element => {
            if (element.name != "blogs.html") {
                noOfBlogs += 1
            }
        });
        
    } catch (error) {
        console.log(error, "raghav error")
    }
}

export default function PAGE() {
    GetData()
    return (
        <>
            <div>
                <div className="w-40 bg-red-400 text-3xl ">
                    <h2>Connected Repo : 1</h2>
                    <h3>Repo name</h3>
                </div>
                <div className="w-40 bg-gray-400 text-3xl ">
                    {/* <h2>No of Blogs Added : {noOfBlogs}</h2>  */}
                    <h3></h3>
                </div>
            </div>
        </>
    )
}