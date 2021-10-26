import React, { useState } from 'react'
import { useHistory } from 'react-router'


export const SignUp = () => {

    const host = "http://localhost:5000";
    const [myState, setState] = useState({
        name: "",
        email: "",
        password: ""
    });


    let history = useHistory();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // API call
        let url = `${host}/api/auth/signup`;

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

            // Redirect to '/login'
            alert("User Added Successfully!")
            localStorage.setItem('token', logDetails.authtoken);
            history.push("/login");
        }

        else {
            alert("Email already exists!");
        }
    }


    const handleOnChange = (e) => {
        setState({
            ...myState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            
            <div className="container my-4" style={{ width: 500, fontWeight: "bold" }}>
                <img src="data:image/png;base64,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" alt="" width="100" height="100" className="mb-3" />
                <form onSubmit={handleOnSubmit}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="For eg : John Cena" aria-label="Username" aria-describedby="basic-addon1" name="name" onChange={handleOnChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleOnChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleOnChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}
