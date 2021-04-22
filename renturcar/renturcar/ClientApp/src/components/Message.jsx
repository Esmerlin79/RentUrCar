import React from 'react'

export const Message = ({message, alertType}) => {
    return (
        <div>
            <div className={`alert alert-${alertType}`} role="alert">
                {message}
            </div>
        </div>
    )
}