import React, { useContext, useEffect} from 'react'
import { AlertItem } from './AlertItem'
import alertContext from '../context/alertContext'
import { AddAlert } from './AddAlert';
import { Modal } from './Modal';
import { useHistory } from 'react-router';


export const Alerts = () => {

    const context = useContext(alertContext);
    const { alerts, getAllAlerts } = context;

    let history=useHistory();

    useEffect(() => {

        if(localStorage.getItem('token')){
            getAllAlerts();
        }
        else{
            history.push('/login');
        }
    })

    return (
        <>
            <h2 className="my-3">My Alerts</h2>
            <div className="d-flex  justify-content-between my-5">
                <div className="mx-3 px-4">
                    <AddAlert title="Add New Alert Here" buttonText="Add New Alert" buttonClass="dark"/>
                </div>

                <Modal image="http://www.mcicon.com/wp-content/uploads/2020/12/Education_Edit_pencil_1.jpg" title="Edit" body={<AddAlert title="Edit Alert" buttonText="Edit Alert" buttonClass="warning"/>}/>

                <div className="container mx-3">

                    {alerts.length===0 && "No Alerts to Display"}

                    <div className="row my-4">
                        {alerts.map((note) => {
                            return (
                                <div className="col-md-3 my-2" key={note._id}>
                                    <AlertItem currency={note.crypto} min_price={note.minAmt} max_price={note.maxAmt} curr_price={10000} _id={note._id} />
                                </div>
                            )
                        })}
                    </div>
                </div>


            </div>


        </>
    )
}
