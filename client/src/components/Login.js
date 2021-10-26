import React, { useState } from 'react'
import { useHistory } from 'react-router'

export const Login = () => {

    const host = "http://localhost:5000";

    const [myState, setState] = useState({
        email: "",
        password: ""
    });

    let history = useHistory();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // API call
        let url = `${host}/api/auth/login`;

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myState)
        });
        const logDetails = await response.json();

        if (logDetails.success) {

            // Redirect to '/'
            localStorage.setItem('token', logDetails.authtoken);
            history.push("/");
        }

        else{
            alert("Please Enter Valid Credentials!");
        }
    }

    const handleOnChange = (e) => {
        setState({
            ...myState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container my-4" style={{ width: 500, fontWeight: "bold" }}>
            <img src="https://toppng.com/uploads/preview/app-icon-set-login-icon-comments-avatar-icon-11553436380yill0nchdm.png" alt="" width="100" height="100" className="mb-3" />
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleOnChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleOnChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
