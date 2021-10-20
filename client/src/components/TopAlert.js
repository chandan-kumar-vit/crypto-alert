import React from 'react'

export const TopAlert = (props) => {
    return (
        <div>
            <div className="alert alert-info" role="alert">
                {props.message}
            </div>
        </div>
    )
}
