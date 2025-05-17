import React from "react";
import { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';

import './Login.css'
import { UserLogin } from "../utils/serverRequests";

export default function UserLoginInput() {
    // Sets current values for input data
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [errorState, setErrorState] = useState("");
    const [loginState, setLoginState] = useState("");

    const navigate = useNavigate();

    function redirect() {
        navigate("/")
    }

    async function LoginUser() {
        var contact = {
            email: emailValue,
            password: passwordValue
        };
        try {
            if (errorState) {
                setErrorState("")
            };

            setLoginState(true)
            await UserLogin(contact);

            setEmailValue("");
            setPasswordValue("");
            redirect()
        } catch (error) {
            setLoginState("")
            const parsed_error = JSON.parse(error.message);
            setErrorState(parsed_error);
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-input-wrapper" style={{ backgroundColor: 'white' }}>
                <div className="title-wrapper">
                    <h1>
                        Login
                    </h1>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { width: '100%' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="email-password-wrapper">
                            <div className="text-field">
                                <TextField
                                    id="email-input"
                                    label="Email"
                                    variant="filled"
                                    value={emailValue}
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                    sx={{ width: "240px" }}
                                    onChange={(e) => {
                                        setEmailValue(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (emailValue && passwordValue && e.key === "Enter")
                                            LoginUser()
                                    }}
                                />
                            </div>
                            <div className="text-field">
                                <TextField
                                    id="password-input"
                                    label="Password"
                                    type="password"
                                    variant="filled"
                                    value={passwordValue}
                                    inputProps={{
                                        maxLength: 50,
                                    }}
                                    sx={{ width: "240px" }}
                                    onChange={(e) => {
                                        setPasswordValue(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (emailValue && passwordValue && e.key === "Enter")
                                            LoginUser()
                                    }}
                                />
                            </div>
                        </div>
                    </Box>
                </div>
                <div className="button-error-wrapper">
                    {!loginState ? (
                        <Button
                            variant="contained"
                            onClick={() => LoginUser()}
                            disabled={emailValue && passwordValue ? false : true}
                            style={{ minHeight: '49.014px' }}
                        >Login
                        </Button>
                    ) : <div className="progress-wheel"><CircularProgress /></div>}
                    {errorState && (
                        <Alert
                            severity="error"
                            style={{ marginTop: '1px', marginLeft: '20px', maxWidth: '25em' }}
                        >
                            {errorState.status === 403 ? errorState.message : "Oops! Something went wrong."}
                        </Alert>
                    )}
                </div>
                <div className="register-link-wrapper">
                    <p>Not registered? Create user <a href="/register" rel="noreferrer">here</a></p>
                </div>
            </div>
        </div>
    )
};