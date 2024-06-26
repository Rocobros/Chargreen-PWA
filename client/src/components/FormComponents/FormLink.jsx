import React from 'react'
import { Link } from 'react-router-dom'

const FormLink = ({ children, linkTo, linkText }) => {
    return (
        <div className="text-base text-center mt-5 mb-4">
            <p>
                {children}
                <Link
                    to={linkTo}
                    className="no-underline font-bold hover:underline">
                    {linkText}
                </Link>
            </p>
        </div>
    )
}

export default FormLink
