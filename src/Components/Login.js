import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({email : "", password : ""});
    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault(); 
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email : credentials.email, password : credentials.password})
        });
        const json = await response.json();
        console.log(json);

        if(json.success)
        {
            // saved the auth-token to the local storage
            // it is json.authToken and not json.authtoken
            if (json.authToken) {
                localStorage.setItem("token", json.authToken);
                console.log("Token stored successfully:", localStorage.getItem("token"));
            } else {
                console.error("Auth token not received from backend.");
                /////////////
                throw new Error(`Failed to login`);
                
            }
            // localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully", "success");
        }
        else{
            props.showAlert("Invalid credentials", "danger");
        }
        // setCredentials({email:"", description:""})
    }

    const onChange = (e) => {
        // 
        setCredentials({...credentials, [e.target.name] : e.target.value});

    }

    return (
        <div className='container my-4'>
            <h2>Login to continue...</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login

