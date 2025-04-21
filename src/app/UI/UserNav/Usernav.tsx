import Link from "next/link"
import "./style.css"

export default function UserNav() {
    return (
        <>
            <div className="w-[25vw]  bg-gradient-to-b from-slate-800 to-gray-500">
                <div>
                    <h1 className="text-amber-50 text-4xl my-10 pl-5">Welcome</h1>
                </div>
                <ul className="list-none mx-1">
                    <li className="text-lime-50 pl-5 py-4 text-xl mb-1"><Link href={"/user/dashboard"}>Dashboard</Link></li>
                    <li className="text-lime-50 pl-5 py-4 text-xl mb-1"><Link href={"/user/userhome"}>Add new folder</Link></li>
                    <li className="text-lime-50 pl-5 py-4 text-xl mb-1"><Link href={"/user/newblogname"}>Add new blog</Link></li>
                    <li className="text-lime-50 pl-5 py-4 text-xl mb-1">Added blogs</li>
                    <li className="text-lime-50 pl-5 py-4 text-xl mb-1">Logout</li>
                    {/* <li className="text-lime-50 pl-5 py-4 w-95 text-xl mb-1">ADD NEW FOLDER</li> */}
                </ul>
            </div>
        </>
    )
}