import { cookies } from "next/headers"


let repoName = ""

async function GetData() {
  let cookieStore = cookies();
  let repoUrl = (await cookieStore).get("selectedRepo")
  try {
    const result = await fetch(`${repoUrl?.value}/Blogs`)
    interface Group {
      noOfBlogs: number,
      allBlogArray: string[]
    }
    const dataObj: Group = {
      noOfBlogs: 0,
      allBlogArray: [],
    };
    let noOfBlogs = 0
    let allBlogArray: string[] = [];

    const resp = await result.json()
    resp.forEach((element: any) => {
      if (element.name != "blogs.html" && element.name != "blog.css") {
        noOfBlogs += 1
        allBlogArray.push(element.name)
      }
    });

    dataObj.noOfBlogs = noOfBlogs
    dataObj.allBlogArray = allBlogArray

    console.log(noOfBlogs, dataObj, allBlogArray)

    return dataObj

  } catch (error) {
    console.log(error, "Error Occured in Dashboard Page")
  }
}

export default async function PAGE() {
  let allData = await GetData();
  if (allData) {
    return (
      <>
        <div className="block">
          <div className="flex">
            <div className=" text-2xl   p-5 border-violet-700 border-4 border text-center">
              <h2>Connected Repo : 1</h2>
            </div>
            <div className=" text-2xl p-5 border-4 border text-center ml-5">
              <h2>No of Blogs Added : {allData.noOfBlogs}</h2>
              <h3></h3>
            </div>
          </div>
          <div className=" text-2xl p-5 border-4 border text-center ml-5">
            <h2>Blogs Name :- </h2>
            {allData.allBlogArray.map((val, key) => {
              return (
                <h3 key={key}>{val}</h3>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <>An error Occured while loading the page. Kindly Contact Admin.</>
    )
  }
}

