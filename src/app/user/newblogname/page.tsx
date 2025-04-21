"use client"

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function PAGE() {


    const [loader, setloader] = useState(true)
    const [inputval, setinputval] = useState("")

    function handleinputchange(event: any) {
        setinputval(event.target.value)
    }

    async function createNewBlogFileandFolder(newBlogName:string) {
        try {
           let resp =  await fetch("/api/usergithub/createNewBlog",{
                method:"PUT",
                body: JSON.stringify({newBlogName})
            })
            const result = await resp.json()
            if(!resp.ok){
            toast.error(result.message)
            setloader(true)
            }
            else{
                toast.success(result.message)
                setloader(true)
                window.location.href = `/addblog/${newBlogName}`
                
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function addNewBlog(event: any) {
        if (inputval != "") {
            setloader(false)
            event.preventDefault()
            const blogres = await fetch("/api/usergithub/createblogsfolder", {
                method: "GET"
            })
            if (blogres.ok) {
                const isBlogFoldExist = await blogres.json()
                if (isBlogFoldExist.isBlogExist == false) {
                    await fetch("/api/usergithub/createblogsfolder", {
                        method: "PUT",
                    }).then(resp => {
                        if (resp.ok) {
                            toast.success("Blogs File Added")
                            createNewBlogFileandFolder(inputval)
                        }
                    })
                }
                else {
                    toast.success("Blogs File Already There")
                    createNewBlogFileandFolder(inputval)
                    // window.location.href = `/addblog/${inputval}`
                }
            }
        }
        else {
            toast("Kindly add blog name")
        }
    }

    return (
        <>
            <div className="h-screen bg-gradient-to-b from-slate-100 via-slate-400 to-slate-600 flex justify-center items-center">
                {loader ? <form className=" bg-gray-300 shadow-lg rounded-full flex flex-col p-4">
                    <label htmlFor="blogname" className="mt-4 ml-5 text-xl"> New Blog Name :</label>
                    <input type="text" id="blogname" className="px-1 py-2 text-lg px-2 m-4 border rounded-full" value={inputval} name="blogname" onChange={(val) => { handleinputchange(val) }} />
                    <button className="bg-gray-400 w-[20%] rounded-full text-xl self-end mr-10 py-1 px-2 shadow-lg duration-200 hover:bg-violet-300 duration-300" onClick={addNewBlog}>Add</button>
                </form> :
                    <div>
                        <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 100 100" height={100} width={100} enableBackground="new 0 0 0 0" xmlSpace="preserve">
                            <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                                <animate
                                    attributeName="opacity"
                                    dur="1s"
                                    values="0;1;0"
                                    repeatCount="indefinite"
                                    begin="0.1" />
                            </circle>
                            <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                                <animate
                                    attributeName="opacity"
                                    dur="1s"
                                    values="0;1;0"
                                    repeatCount="indefinite"
                                    begin="0.2" />
                            </circle>
                            <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                                <animate
                                    attributeName="opacity"
                                    dur="1s"
                                    values="0;1;0"
                                    repeatCount="indefinite"
                                    begin="0.3" />
                            </circle>
                        </svg>
                    </div>
                }
            </div>
            <Toaster></Toaster>
        </>
    )
}