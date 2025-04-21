import { useState } from "react"

export default function Metatagsadder({data,setdata}:any) {

    function handlechange(event:any) {
        setdata((d:any)=>({
            ...d,[event.target.name] : event.target.value
        }))
    }

    function handleSubmit(e:any) {
        e.preventDefault()
        console.log(data)
    }

    function handleClick(){
        data.isViewable = false
        console.log(data.isViewable)
    }


    return (<>
        <div className="h-[100vh] w-[100%] bg-[rgba(107,107,107,0.6727065826330532)] absolute top-0 flex justify-center items-center">
                <div className="bg-blue-500  w-[30vw] rounded-3xl shadow-lg p-10">
                    <div className="flex justify-end"><button className="bg-amber-50 text-xl px-3 py-1  rounded-full shadow" onClick={handleClick}>X</button></div>
                    <form onSubmit={(e)=>{handleSubmit(e)}} className="flex flex-col justify-center items-center mt-10">
                        <input type="text" className="border text-xl w-[100%] rounded-3xl px-5 py-1" placeholder="Enter Blog title" required name="blogtitle" value={data.blogtitle} onChange={(event)=>{handlechange(event)}}/>
                        <input type="text" className="border text-xl w-[100%] rounded-3xl px-5 py-1 mt-7" placeholder="Enter tags" required name="blogtags" value={data.blogtags} onChange={(event)=>{handlechange(event)}} />
                        <p><b>Note :</b>Use , (coma) to seperate the tags.</p>
                        <input type="text" className="border text-xl w-[100%] rounded-3xl px-5 py-1 mt-5" placeholder="Enter Description" name="blogdesc" value={data.blogdesc} onChange={(event)=>{handlechange(event)}} required />
                        <p><b>Note :</b> Description should be 120-158 characters</p>
                        <button className="bg-amber-50 text-xl mt-5 rounded-full px-3 py-2 shadow" type="submit">Submit</button>
                    </form>
                    </div>
        </div>
    </>)
}