import React from 'react'

const FormButton = ({ children, onClick, disabledCondition}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabledCondition}
            type="submit"
            className="w-full h-10 mb-2 bg-background outline-none rounded-3xl shadow-lg cursor-pointer text-lg font-bold hover:bg-secondary active:ring active:ring-accent active:translate-y-1">
            {children}
        </button>
    )
}

export default FormButton
