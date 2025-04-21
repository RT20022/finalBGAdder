import UserNav from "../UI/UserNav/Usernav"


export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <UserNav />
                <div className="h-screen w-[75vw] bg-gradient-to-b from-slate-100 via-slate-400 to-slate-600 flex justify-center items-center">
                    {children}
                </div>
            </div>
        </>
    )
}