import Link from "next/link"

export default function Page() {
    return (
        <>
        <h1>Hello Raghav</h1>
        <Link href={"/login"}>Login Here</Link>
        </>
    )
}