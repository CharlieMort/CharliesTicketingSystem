import React, { useState } from "react"

interface ICustomInputProps {
    placeholder?: string
    font_size?: number
    text_color?: string
    iden: string
    val?: string
    submitHandler: (key: string, newVal: string) => void
}

const TextInput = ({ placeholder, font_size = 1, text_color, submitHandler, iden, val }: ICustomInputProps) => {
    const [value, setValue] = useState(val?val:"")
    const [preValue, setPreValue] = useState(val?val:"")

    return(
        <input 
            className="custom_text_input" 
            type="text" value={value} 
            onChange={(e) => setValue(e.target.value)} 
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    if (preValue === value) return;
                    submitHandler(iden, value)
                    setPreValue(value)
                }
            }}
            placeholder={placeholder} 
            style={{
                fontSize: `${font_size}rem`,
                color: `${text_color}`
            }} 
            autoFocus />
    )
}

export default TextInput