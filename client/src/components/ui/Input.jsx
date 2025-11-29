import React from 'react'

const Input = ({ label, type = "text", register, name, className = "" }) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">{label}</label>
            <input
                type={type}
                {...register(name)}
                className={`border p-2 rounded ${className}`}
            />
        </div>
    )
}

export default Input