import React, {useState} from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CreateGroup.css'
import axios from "axios";

function CreateGroup(props : {
    goToMainPage : () => void;
}) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    async function onClickedCreate(id : string, password : string, location : string){
        const response = await axios.post("http://localhost:8080/group/create", {id : id, password : password, location : location});
        console.log(response.data);
        if (response.status === 201) {
            setShowAlert(true);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className={`alert alert-success ${showAlert ? "d-block" : "d-none"}`} role="alert">
                        Group created successfully!
                    </div>
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
                                        value = {id}
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
                                        value = {password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="Location"
                                        placeholder="Location"
                                        className="location-control"
                                        required
                                        value = {location}
                                        onChange={(event) => setLocation(event.target.value)}
                                    />

                                </div>
                                <button onClick={e => {e.preventDefault(); onClickedCreate(id, password, location)}} type="submit" id="login" className="btn btn-primary btn-block">
                                    Create
                                </button>
                            </form>
                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                    <p className="text-center mt-3">Click on the button below to navigate back to the main page.</p>
                    <button onClick={e => {e.preventDefault(); props.goToMainPage();}} className="btn btn-secondary btn-block">
                        Main page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;
