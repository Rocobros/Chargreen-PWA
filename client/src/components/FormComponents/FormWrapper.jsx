import React from 'react'

const FormWrapper = ({ children, title, handleSubmit }) => {
    return (
        <div className="w-fit bg-primary text-text font-secondary font-semibold px-10 py-8 rounded-xl shadow-custom">
            <h1 className="font-primary font-bold text-4xl text-center">
                {title}
            </h1>

            <form onSubmit={handleSubmit}>{children}</form>
        </div>
    )
}

export default FormWrapper
