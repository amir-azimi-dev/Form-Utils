"use client";

import { useState, forwardRef } from "react";
import TextareaPropType from "./textarea.props.types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaPropType>(({
    name,
    label,
    rows = 4,
    value,
    onChange,
    isValid,
    error,
    disabled,
    readOnly
}: TextareaPropType,
    ref) => {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <div>
            <div
                className={`relative z-0 w-full ${error ?
                    "border-red-300 focus-within:border-red-500" :
                    isValid ? "border-green-300 focus-within:border-green-500" :
                        "border-gray-300 focus-within:border-gray-500"} border rounded`}
            >
                <label
                    htmlFor={name}
                    className={`block absolute ${(isFocused || value) ? "top-0 px-2 text-xs" : "top-4"}
                        ${error ? "text-red-500" : isValid ? "text-green-500" : ""} right-3 z-10 text-sm
                        ${disabled ? "bg-gray-200 text-gray-400" : "bg-white text-gray-700"} 
                        -translate-y-1/2 transition-all`}
                >
                    {label}
                </label>
                <textarea
                    ref={ref}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-1.5 focus:outline-none disabled:bg-gray-200 rounded"
                    rows={rows}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    readOnly={readOnly}
                />
            </div>
            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
        </div>
    )
})

export default Textarea;