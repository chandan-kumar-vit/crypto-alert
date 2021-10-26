import React from 'react'

export const Modal = (props) => {
    return (
        <div>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel"><img src={props.image} alt="" width="30" height="30" className="d-inline-block align-text-top" />{props.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {props.body}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
