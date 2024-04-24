import {useState} from "react";
import {Alert} from "react-bootstrap";
import {DAO} from "../data/dataManagementLayer";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [passwordCorrect, setPasswordCorrect] = useState(false);

    const dao = new DAO("", "");

    function loginHandler(e) {
        setLogin(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function submitRoutines() {
        if (login.length === 0 || password.length === 0) {
            setError("Login and Password are mandatory fields");
            return;
        }
        setError("");
        const data = {login: login, password: password};
        dao.login(data)
            .then((res) => res.json())
            .then((parsedJson) => {
                    setUserName(parsedJson.userName);
                    setPasswordCorrect(parsedJson.match);
                }
            );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                </div>
                <div className="col-sm">
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" className="form-control" id="login" name="login" required
                               onChange={loginHandler}/>
                    </div>
                    <div className="form-group rowMargin">
                        <label htmlFor="login">Password</label>
                        <input type="password" className="form-control" required id="password" name="password"
                               onChange={passwordHandler}/>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm rowMargin" onClick={submitRoutines}>Submit
                    </button>
                    {error.length > 0 &&
                        <Alert className="alert alert-danger rowMargin">{error}</Alert>
                    }
                    {userName.length > 0 &&
                        <Alert className="alert alert-success rowMargin">
                            Hello, {userName}! {passwordCorrect ? "You are logged in" : "Password is not correct"}
                        </Alert>
                    }
                </div>
                <div className="col-sm">
                </div>
            </div>
        </div>
    );
}