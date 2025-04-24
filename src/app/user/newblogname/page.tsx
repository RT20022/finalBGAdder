"use client"

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function PAGE() {


    const [loader, setloader] = useState(true)
    const [inputval, setinputval] = useState("")

    function handleinputchange(event: any) {
        setinputval(event.target.value)
    }

    async function createNewBlogFileandFolder(newBlogName: string) {
        try {
            let resp = await fetch("/api/usergithub/createNewBlog", {
                method: "PUT",
                body: JSON.stringify({ newBlogName })
            })
            const result = await resp.json()
            if (!resp.ok) {
                toast.error(result.message)
                setloader(true)
            }
            else {
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
                {loader ? <form className=" bg-gray-300 shadow-lg rounded-xl border flex flex-col p-4">
                    <label htmlFor="blogname" className="mt-4 ml-5 text-xl"> Enter Blog Name :</label>
                    <input type="text" id="blogname" className="px-1 py-2 text-lg px-2 m-4 border rounded-full shadow-xl  bg-amber-50" value={inputval} name="blogname" onChange={(val) => { handleinputchange(val) }}  required/>

                    <button className="self-end mr-5" onClick={addNewBlog}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-patch-plus-fill text-gray-1500 duration-300 hover:text-violet-600 hover:duration-300 hover:cursor-pointer" viewBox="0 0 16 16">
                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0" />
                        </svg>
                    </button>
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