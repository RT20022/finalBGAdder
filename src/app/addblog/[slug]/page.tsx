"use client"

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import "./blog.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import Metatagsadder from "@/app/UI/MetaTagsAdder/metatagsadder";

export default function PAGE() {
    const params = useParams()
    const { slug } = params
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillInstance = useRef<any>(null);
    const [Quill, setQuill] = useState<any>(null);
    const [getContent, setContent] = useState<string>("");
    const [buttonenable, setbuttonenable] = useState<boolean>(false)
    const [modalViewable, setmodalviewable] = useState<boolean>(false)
    interface formd {
        blogtitle: string,
        blogtags: string,
        blogdesc: string
    }

    let [data, setdata] = useState<formd>({
        blogtitle: '',
        blogtags: "",
        blogdesc: ""
    })

    function handlechange(event: any) {
        setdata((d: any) => ({
            ...d, [event.target.name]: event.target.value
        }))
    }

   async function handleSubmit(e: any) {
        e.preventDefault()
        console.log(data)
        console.log(data,"Raghav")
        const resp = await fetch("/api/usergithub/addnewblog", {
            method: "PUT",
            body: JSON.stringify({ slug: slug, getContent: getContent, meta_title: data})
        })
        toast.success(`Blog Added ${slug}`)
    }


    useEffect(() => {
        import("quill").then((QuillModule) => {
            setQuill(() => QuillModule.default);
        });
    }, []);

    useEffect(() => {
        if (!Quill || !editorRef.current || quillInstance.current) return;
        console.log(Quill)
        quillInstance.current = new Quill(editorRef.current, {
            theme: "snow", // or 'bubble' or 'snow
            modules: {
                toolbar: [
                    [{ header: [] }],
                    ["bold", "italic", "underline"],
                    ['blockquote', 'code-block'],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ align: [] }, { color: [] }, { background: [] }],
                    ["link", "image", "video"],
                    ["clean"],
                ],
            },
        });

        quillInstance.current.on("text-change", () => {
            let htmlContent = quillInstance.current.root.innerHTML
            htmlContent = htmlContent
                .replace(/class="ql-align-center"/g, 'style="text-align: center;"')
                .replace(/class="ql-align-right"/g, 'style="text-align: right;"')
                .replace(/class="ql-align-justify"/g, 'style="text-align: justify;"')
                .replace(/class="ql-video"/g, 'style="height: 40vh; width: 100%;"')
            htmlContent = htmlContent
                .replace(/<ol[^>]*>\s*<li data-list="bullet"/g, "<ul><li")
                .replace(/<\/ol>/g, "</ul>")
                .replace(/<li data-list="bullet">/g, "<li>");
            setbuttonenable(true)
            setContent(htmlContent)
        });
    }, [Quill]);

    async function handleClick() {
        if (getContent == "" || getContent.trim() == "<p><br></p>" || getContent.trim() == "<br>" || getContent.trim() == '<p style="text-align: center;"><br></p>') {
            toast.error("Kindly type Something")
        }
        else {
            setmodalviewable(true)
        }
    }
    return (
        <>
            <div className="flex justify-center flex-row w-[100%] ">
                <div className=" w-[50%]">
                    <div className="" ref={editorRef}></div>
                </div>
                <div className="w-[50%]">
                    <h2 className="border border-gray-200 pb-1 text-3xl text-center">Blog viewer</h2>
                    <div dangerouslySetInnerHTML={{ __html: getContent }} className="HtmlViewer px-3"></div>
                </div>
            </div>

            {buttonenable && <button className="bg-blue-600 p-2 text-xl rounded-3xl fixed text-purple-50 bottom-20 right-20 shadow-xl" onClick={handleClick}>Add Blog</button>}



            {modalViewable && <div className="h-[100vh] w-[100%] bg-[rgba(107,107,107,0.6727065826330532)] absolute top-0 flex justify-center items-center">
                <div className="bg-blue-500  w-[30vw] rounded-3xl shadow-lg p-10">
                    <div className="flex justify-end"><button className="bg-amber-50 text-xl px-3 py-1  rounded-full shadow" onClick={() => setmodalviewable(false)}>X</button></div>
                    <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col justify-center items-center mt-10">
                        <input type="text" className="border text-xl w-[100%] rounded-3xl px-5 py-1" placeholder="Enter Blog title" required name="blogtitle" value={data.blogtitle} onChange={(event) => { handlechange(event) }} />
                        <input type="text" className="border text-xl w-[100%] rounded-3xl px-5 py-1 mt-7" placeholder="Enter tags" required name="blogtags" value={data.blogtags} onChange={(event) => { handlechange(event) }} />
                        <p><b>Note :</b>Use , (coma) to seperate the tags.</p>
                        <input type="text" className="border text-xl w-[100%] rounded-3xl px-5 py-1 mt-5" placeholder="Enter Description" name="blogdesc" value={data.blogdesc} onChange={(event) => { handlechange(event) }} required />
                        <p><b>Note :</b> Description should be 120-158 characters</p>
                        <button className="bg-amber-50 text-xl mt-5 rounded-full px-3 py-2 shadow" type="submit">Submit</button>
                    </form>
                </div>
            </div>}

            {/* { data.isViewable && <Metatagsadder data={data} setdata = {setdata} />} */}
            <Toaster></Toaster>
        </>
    )
};