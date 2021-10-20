import React, { useContext, useEffect } from 'react'
import { AlertItem } from './AlertItem'
import alertContext from '../context/alertContext'
import { AddAlert } from './AddAlert';


export const Alerts = () => {

    const context = useContext(alertContext);
    const { alerts, getAllAlerts} = context;

    useEffect(() => {
        getAllAlerts();
    })

    return (
        <>
            <h2 className="my-3">My Alerts</h2>
            <div className="d-flex  justify-content-between my-5">
                <div className="mx-3 px-4">
                    <AddAlert />
                </div>


                <div className="container mx-3">
                    <div className="row my-4">
                        {alerts.map((note) => {
                            return (
                                <div className="col-md-3 my-2" key={note._id}>
                                    <AlertItem currency={note.crypto} min_price={note.minAmt} max_price={note.maxAmt} curr_price={10000} _id={note._id}/>
                                </div>
                            )
                        })}
                    </div>
                </div>


            </div>


        </>
    )
}
