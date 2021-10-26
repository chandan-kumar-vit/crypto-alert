import React,{useContext} from 'react'
import alertContext from '../context/alertContext'

export const AlertItem = (props) => {

    const context = useContext(alertContext);
    const {deleteAlert, updateAlert}=context;

    const handleOnClick=()=>{
        deleteAlert(props._id);
    }

    const handleOnClickUpdate=()=>{
        updateAlert(props._id);
    }

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <div className="container">
                    <img src="https://icons-for-free.com/iconfiles/png/512/alert+bell+notification+ring+icon-1320196701949755668.png" width="35" height="35" className="d-inline-block my-2" alt="..." />
                </div>

                <div className="card-body">
                    <h5 className="card-title">Currency : {props.currency}</h5>
                    <label className="card-text">Min Target: ₹ {props.min_price}</label><br />
                    <label className="card-text">Max Target: ₹ {props.max_price}</label><br />
                    <label className="card-text">Current Rate: ₹ {props.curr_price}</label><br />
                </div>
                <div className="container">
                    <i className="fas fa-edit" onClick={handleOnClickUpdate}></i>
                    <i className="fas fa-trash mx-3" onClick={handleOnClick}></i>
                </div>

            </div>
        </div>
    )
}
