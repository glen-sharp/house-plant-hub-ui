import React from "react";
import { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from 'react-router-dom';

import './Register.css'
import { RegisterUser } from "../utils/serverRequests";

export default function UserInfoInput() {
    // Sets current values for input data
    const [forenameValue, setForenameValue] = useState("");
    const [surnameValue, setSurnameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    // Sets whether current input value is valid
    const [isForenameValid, setIsForenameValid] = useState("");
    const [isSurnameValid, setIsSurnameValid] = useState("");
    const [isEmailValid, setIsEmailValid] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState("");

    const [errorState, setErrorState] = useState("");
    const [registerState, setRegisterState] = useState("");

    const validForenameRegEx = "^[a-zA-Z-]*$";
    const validEmailRegEx = "^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-.]+$";
    const validSurnameRegEx = "^[a-zA-Z- ]*$";
    const validPasswordRegEx = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

    const navigate = useNavigate();

    function redirect() {
        navigate("/login")
    }

    async function register_user() {
        var contact = {
            first_name: forenameValue,
            last_name: surnameValue,
            email: emailValue,
            password: passwordValue
        };
        try {
            if (errorState) {
                setErrorState("")
            };

            setRegisterState(true)
            await RegisterUser(contact);

            setForenameValue("");
            setSurnameValue("");
            setEmailValue("");
            setPasswordValue("");

            redirect()
        } catch (error) {
            setRegisterState("")
            const parsed_error = JSON.parse(error.message);
            setErrorState(parsed_error);
        }
    }

    return (
        <div className="register-wrapper">
            <div className="register-input-wrapper" style={{ backgroundColor: 'white' }}>
                <div className="title-wrapper">
                    <h1>
                        Registration
                    </h1>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { width: '100%' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="name-wrapper">
                            <div className="text-field">
                                <TextField
                                    id="forename-input"
                                    label="Forename"
                                    variant="filled"
                                    value={forenameValue}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    sx={{ width: "240px" }}
                                    onChange={(e) => {
                                        setForenameValue(e.target.value);
                                        setIsForenameValid(e.target.value.match(validForenameRegEx));
                                    }}
                                    error={!isForenameValid && forenameValue ? true : false}
                                    helperText={
                                        !isForenameValid && forenameValue ? "Input must be string" : ""
                                    }
                                    onKeyDown={(e) => {
                                        if (forenameValue && surnameValue && emailValue && passwordValue && e.key === "Enter" && isForenameValid && isSurnameValid && isEmailValid && isPasswordValid)
                                            register_user()
                                    }}
                                />
                            </div>
                            <div className="text-field">
                                <TextField
                                    id="surname-input"
                                    label="Surname"
                                    variant="filled"
                                    value={surnameValue}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    sx={{ width: "240px" }}
                                    onChange={(e) => {
                                        setSurnameValue(e.target.value);
                                        setIsSurnameValid(e.target.value.match(validSurnameRegEx));
                                    }}
                                    error={!isSurnameValid && surnameValue ? true : false}
                                    helperText={
                                        !isSurnameValid && surnameValue ? "Input must be string" : ""
                                    }
                                    onKeyDown={(e) => {
                                        if (forenameValue && surnameValue && emailValue && passwordValue && e.key === "Enter" && isForenameValid && isSurnameValid && isEmailValid && isPasswordValid)
                                            register_user()
                                    }}
                                />
                            </div>
                        </div>
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
                                        setIsEmailValid(e.target.value.match(validEmailRegEx));
                                    }}
                                    error={!isEmailValid && emailValue ? true : false}
                                    helperText={
                                        !isEmailValid && emailValue ? "Email must be in correct format" : ""
                                    }
                                    onKeyDown={(e) => {
                                        if (forenameValue && surnameValue && emailValue && passwordValue && e.key === "Enter" && isForenameValid && isSurnameValid && isEmailValid && isPasswordValid)
                                            register_user()
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
                                        setIsPasswordValid(e.target.value.match(validPasswordRegEx));
                                    }}
                                    error={!isPasswordValid && passwordValue ? true : false}
                                    helperText={
                                        !isPasswordValid && passwordValue ? "Password must be in correct format" : ""
                                    }
                                    onKeyDown={(e) => {
                                        if (forenameValue && surnameValue && emailValue && passwordValue && e.key === "Enter" && isForenameValid && isSurnameValid && isEmailValid && isPasswordValid)
                                            register_user()
                                    }}
                                />
                            </div>
                        </div>
                    </Box>
                </div>
                <div className="button-error-wrapper">
                    {!registerState ? (
                        <Button
                            variant="contained"
                            onClick={() => register_user()}
                            disabled={forenameValue && surnameValue && emailValue && passwordValue && isForenameValid && isSurnameValid && isEmailValid && isPasswordValid ? false : true}
                            style={{ minHeight: '49.014px' }}
                        >Register</Button>
                    ) : <div className="register-progress-wheel"><CircularProgress /></div>}
                    {errorState && (
                        <Alert
                            severity="error"
                            style={{ marginTop: '1px', marginLeft: '20px', maxWidth: '17em' }}
                        >{errorState.message === "Email already exists" ? errorState.message : "Oops! Something went wrong."}</Alert>
                    )}
                </div>
                <div className="login-link-wrapper">
                    <p>Already registered? Login <a href="/login" rel="noreferrer">here</a></p>
                </div>
            </div>
        </div>
    )
};