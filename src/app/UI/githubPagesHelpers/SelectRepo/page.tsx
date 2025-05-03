'use client'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function SelectRepo(Props: any) {

    const [loader, handleLoader] = useState<boolean>(true)



    async function HandleClick(gitUrl: any) {
        const resp = await fetch(`${gitUrl}/contents`)
        if (resp.ok) {
            const files = await resp.json()
            const indexFile = files.filter((val: any) => {
                if (val.name == "index.html") {
                    return val
                }
            })

            if (indexFile.length < 1) {
                toast.error('Root File(Index.js) Not Found');
            } else {
                handleLoader(false)
                toast.success('Repo can be used')
                try {
                    const blogFolder = files.filter((val: any) => {
                        if (val.name == "Blogs") {
                            return val
                        }
                    })
                        const indexFIleResp = await fetch('/api/usergithub', {
                            method: "POST",
                            body: JSON.stringify({ indexfileAPIData: indexFile , blogsFoldExist : blogFolder })
                        })
                        if (indexFIleResp.ok && indexFIleResp.status == 200) {
                            let indexFIleFoundresult = await indexFIleResp.json()
                            toast.success(indexFIleFoundresult.message)
                            await fetch('/api/usergithub', {
                                method: "PUT",
                                body: JSON.stringify({ indexfileAPIData: indexFile , blogsFoldExist : blogFolder })
                            })
                            handleLoader(true)
                            window.location.href = "/user/dashboard"
                        }
                        else {
                            let indexFIleFoundresult = await indexFIleResp.json()
                            toast.error(indexFIleFoundresult.message)
                            handleLoader(true)
                        }
                    
                } catch (error) {
                    console.error('An error occured', error)
                }

            }
        }
    }



    return (
        <>
            {
                true ?
                    <div className="shadow-2xl rounded-xl pb-5">
                        <h1 className="text-2xl m-5 text-white">Choose a repository to start: </h1>
                        {Array.isArray(Props.repos) && Props.repos.map((val: any) => {
                            return (
                                <h1 key={val.id} className="border-t text-lg pl-5 border-gray-300 duration-300 hover:bg-gray-300 hover:text-xl hover:cursor-pointer" onClick={() => { HandleClick(val.url) }}> {val.name}</h1>
                            )
                        })}
                    </div>
                    :
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
            }
            <Toaster />
        </>

    )
}