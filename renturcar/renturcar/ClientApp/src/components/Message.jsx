import React from 'react'

export const Message = ({message, alertType}) => {
    return (
        <div>
            <div data-cy="alert" className={`alert alert-${alertType}`} role="alert">
                {message}
            </div>
        </div>
    )
}