import React, { useState } from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './JoinGroupPage.css'
import axios from "axios";

function JoinGroupPage(props: {
    goToMainPage: () => void;
}) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    const [failedAlert, setFailedAlert] = useState(false);

    // Sends request to join a group to the backend
    async function onClickedJoin(id: string, password: string) {
        try {
            const response = await axios.post("http://localhost:8080/group/join", { id: id, password: password });

            // Shows a success-alert if user successfully joins a group
            if (response.status === 201) {
                setFailedAlert(false);
                setSuccessAlert(true);
            }
        } catch (error) {
            // Shows a warning alert if user fails to join a group
            setSuccessAlert(false);
            setFailedAlert(true);
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {successAlert && (
                        <div className="alert alert-success" role="alert">
                            Successfully joined the group!
                        </div>
                    )}
                    {failedAlert && (
                        <div className="alert alert-warning" role="alert">
                            Failed to join the group!
                        </div>
                    )}
                    <div className="card mt-5">
                        <div className="card-header">
                            <img src={logo} className="Web-Logo" alt="Logo" />
                        </div>
                        <div className="card-body">
                            <form id="login-form">
                                <div className="username-group">
                                    <input
                                        type="text"
                                        id="group-name"
                                        name="group-name"
                                        placeholder="Group name"
                                        className="group-name-control"
                                        required
                                        value={id}
                                        onChange={(event) => setId(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        className="password-control"
                                        required
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <button onClick={e => { e.preventDefault(); onClickedJoin(id, password) }} type="submit" id="login" className="btn btn-primary btn-block">
                                    Join
                                </button>
                            </form>
                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                    <button onClick={e => { e.preventDefault(); props.goToMainPage(); }} className="btn btn-secondary btn-block">
                        Main page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinGroupPage;
