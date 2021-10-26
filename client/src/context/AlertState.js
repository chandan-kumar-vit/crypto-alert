import AlertContext from "./alertContext";
import { useState } from "react";

const AlertState = (props) => {

  const host = "http://localhost:5000";

  const initAlerts = []

  const [alerts, setAlerts] = useState(initAlerts);


  // Get all alerts

  const getAllAlerts = async () => {
    // API call
    let url = `${host}/api/alerts/fetchallalerts`;

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const temp = await response.json();
    setAlerts(temp);
  }

  // Add an alert
  const addAlert = async (crypto, minAmt, maxAmt) => {

    // API call
    let url = `${host}/api/alerts/addalert`;

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ crypto, minAmt, maxAmt })
    });
    
    const alert= response.json();
    setAlerts(alerts.concat(alert));
  }
  // Delete an alert

  const deleteAlert = async(id) => {

    // API call
    let url = `${host}/api/alerts/deletealert/${id}`;

    await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const newAlerts = alerts.filter((alert) => { return alert._id !== id })
    setAlerts(newAlerts);
  }


  // Update an alert

  const updateAlert = async (id, crypto, minAmt, maxAmt) => {

    // API call
    let url = `${host}/api/alerts/updatealert/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ crypto, minAmt, maxAmt })
    });
    //console.log(response.json());
    const json=await(response.json());
    console.log(json)

    for (let index = 0; index < alerts.length; index++) {
      const element = alerts[index];
      if (id === element._id) {
        element.crypto = crypto;
        element.minAmt = minAmt;
        element.maxAmt = maxAmt;
      }
    }
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, deleteAlert, updateAlert, getAllAlerts }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;