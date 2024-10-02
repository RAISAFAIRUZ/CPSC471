import { ButtonHTMLAttributes, DOMAttributes, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

export default function Button({children, type, onClick, className}) {
    return (
        <>
            <button
                className={`
                bg-zinc-800 p-2 rounded-md
                outline outline-offset-2 outline-zinc-800
                hover:outline-blue-400
                ${className}
                `}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </>
    );
}