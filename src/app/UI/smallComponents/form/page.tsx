import { ChangeEvent } from "react"

interface Field {
    fieldLabelFor : string,
    fieldLabel : string,
    fieldtype : string,
    fieldPlaceholder : string,
    fieldValue : string,
    fieldName : string
    fieldFunction : (event: ChangeEvent<HTMLInputElement>) => void,
}

export default function FormFields({ NoOfFields }: { NoOfFields: Field[] }) {
    return (
        <>
            {NoOfFields.map((v,k) => {
                return (
                    <div key={k} className="flex justify-center align-center flex-col">
                        <label htmlFor={`${v.fieldLabelFor}`} className="font-bold my-2">{v.fieldLabel}</label>
                        <input type={`${v.fieldtype}`} required placeholder={`${v.fieldPlaceholder}`} value={v.fieldValue} name={`${v.fieldName}`} onChange={v.fieldFunction} className="border mb-5 outline-none p-1 rounded-3xl" />
                    </div>
                )
            })}
        </>
    )
}