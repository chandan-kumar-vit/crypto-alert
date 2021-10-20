import React,{useContext, useState} from 'react'
import cryptoDetails from './allCoinsDetails.json'
import alertContext from '../context/alertContext'

export const AddAlert = () => {

    const context = useContext(alertContext)
    const {addAlert}=context;

    const [myState, setState]=useState({
        "crypto":"",
        "minAmt":0,
        "maxAmt":0
    })
    const handleOnClick=(e)=>{
        e.preventDefault();
        addAlert(myState.crypto, myState.minAmt, myState.maxAmt);
    }

    const handleOnChange=(e)=>{
        setState({
            ...myState,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <h4>Add New Alert</h4>
                    <label htmlFor="exampleInputEmail1" className="form-label">Cryptocurrency</label>
                    <select className="form-select" aria-label="Default select example" name="crypto" onChange={handleOnChange}>

                        {cryptoDetails.map((element) => {
                            return (
                                <option value={element.name} key={element.id}>{element.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Minimum target</label>
                    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="INR" name="minAmt" onChange={handleOnChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Maximum target</label>
                    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="INR" name="maxAmt" onChange={handleOnChange}/>
                </div>

                <button type="submit" className="btn btn-dark" onClick={handleOnClick}>Add Alert</button>
            </form>
        </div>
    )
}
