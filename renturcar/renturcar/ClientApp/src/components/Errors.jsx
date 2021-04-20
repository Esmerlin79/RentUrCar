import React from 'react'

export const Errors = ({error}) => {
    return (
        <div>
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        </div>
    )
}