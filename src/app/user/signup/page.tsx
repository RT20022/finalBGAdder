'use client'

import FormFields from "@/app/UI/smallComponents/form/page"
import { useState } from "react"
import Link from "next/link"

export default function SignUp() {


    interface Field {
        fullname: string,
        Email: string,
        userID: string,
        password: string,
        confirmPassword: string,
    }

    const [formdata, setformdata] = useState<Field>({
        fullname: "",
        Email: "",
        userID: "",
        password: "",
        confirmPassword: "",
    })

    function handleFormfields(event: any) {
        console.log(event.target.value)
        setformdata((data) => ({ ...data, [event.target.name]: event.target.value }))
    }

    const formset = [
        { fieldLabelFor: "Name", fieldLabel: "Full Name", fieldtype: "text", fieldPlaceholder: "Enter Your Full Name", fieldName: "fullname", fieldValue: formdata.fullname, fieldFunction: handleFormfields },
        { fieldLabelFor: "email", fieldLabel: "Email", fieldtype: "email", fieldPlaceholder: "Enter Your Email", fieldName: "Email", fieldValue: formdata.Email, fieldFunction: handleFormfields },
        { fieldLabelFor: "UserID", fieldLabel: "UserID", fieldtype: "text", fieldPlaceholder: "Choose a username", fieldName: "userID", fieldValue: formdata.userID, fieldFunction: handleFormfields },
        { fieldLabelFor: "password", fieldLabel: "Password", fieldtype: "password", fieldPlaceholder: "Choose a Password", fieldName: "password", fieldValue: formdata.password, fieldFunction: handleFormfields },
        { fieldLabelFor: "confirmPassword", fieldLabel: "Confirm Password", fieldtype: "password", fieldPlaceholder: "Re-enter Your Password", fieldName: "confirmPassword", fieldValue: formdata.confirmPassword, fieldFunction: handleFormfields }
    ]

    function handleSubmit(event: any) {
        event.preventDefault()
        console.log(formdata)
    }
    return (
        <>
            <div className=" my-10 flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex justify-center content-center flex-col w-1/3  shadow-lg p-5">
                    <div className="my-5">
                        <h1 className="font-bold text-center text-3xl my-2">RT</h1>
                        <p className="text-center">Branding Goes Here</p>
                    </div>

                    <FormFields NoOfFields={formset} />

                    <div><button className="rounded-3xl bg-blue-400 px-3 py-2 mt-8">Sign Up</button> | <Link href="/user/login">Login</Link></div>
                </form>
            </div>
        </>
    )
}