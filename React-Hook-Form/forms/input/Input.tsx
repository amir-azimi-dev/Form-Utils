"use client";

import { useState, forwardRef, ChangeEventHandler } from "react";
import InputPropType, { InputTypes } from "./input.props.types";

const Input = forwardRef<HTMLInputElement, InputPropType<InputTypes>>(function Input({
    name,
    type,
    label,
    value,
    isValid,
    error,
    onChange,
    onClick,
    disabled,
    readOnly
}, ref) {

    const [fileInputValue, setFileInputValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
        if (type !== "file") {
            return onChange(event.target.value);
        }

        setFileInputValue(event.target.value);
        event.target.files && onChange(event.target.files[0])
    };

    return (
        <div>
            <div
                onClick={onClick}
                className={`relative z-0 w-full ${error ?
                    "border-red-300 focus-within:border-red-500" :
                    isValid ? "border-green-300 focus-within:border-green-500" :
                        "border-gray-300 focus-within:border-gray-500"} border rounded`}>
                <label
                    htmlFor={name}
                    className={`block absolute ${!disabled && (isFocused || value || type === "file") ?
                        `top-0 px-2 text-xs ${error ? "text-red-500" : isValid ? "text-green-500" : ""}` :
                        "top-1/2"} right-3 z-10 text-sm ${disabled ?
                            "bg-gray-200 text-gray-400"
                            : "bg-white text-gray-700"} -translate-y-1/2 transition-all`}
                >
                    {label}
                </label>
                <input
                    ref={ref}
                    id={name}
                    type={type}
                    value={disabled ? "" : type === "file" ? fileInputValue : value}
                    onChange={onChangeHandler}
                    className={`w-full px-3 py-1.5 focus:outline-none disabled:bg-gray-200 rounded ${type === "file" ?
                        "ltr file:text-xs file:px-1.5 file:py-1 file:transition-colors file:hover:bg-purple-600 file:bg-purple-500 file:text-stone-50 file:border-none file:rounded" : ""}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    readOnly={readOnly}
                />
            </div>
            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
        </div>
    )
});

export default Input;