"use client";

import { useState } from "react";
import InputPropType from "./input.props.types";

function Input<T extends "text" | "number" | "file" | "password">({
    id,
    type,
    label,
    value,
    onChange,
    onClick,
    disabled,
    readOnly
}: InputPropType<T>) {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <div
            onClick={onClick}
            className="relative z-0 w-full border-gray-300 focus-within:border-gray-500 border rounded">
            <label
                htmlFor={id}
                className={`block absolute ${(isFocused || value || type === "file") ? "top-0 px-2 text-xs" : "top-1/2"} right-3 z-10 text-sm ${disabled ? "bg-gray-200 text-gray-400" : "bg-white text-gray-700"} -translate-y-1/2 transition-all`}
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-1.5 focus:outline-none disabled:bg-gray-200 rounded ${type === "file" ?
                    "ltr file:text-xs file:px-1.5 file:py-1 file:transition-colors file:hover:bg-purple-600 file:bg-purple-500 file:text-stone-50 file:border-none file:rounded" : ""}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    )
}

export default Input;