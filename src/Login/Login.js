import React from 'react';
import { Link } from "react-router-dom";
import config from '../config'
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
    }

    logout = () => {
        localStorage.clear("token");
        this.props.history.push('/');
        window.location.reload();


    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login(e) {
        e.preventDefault();
        if (this.state.email === '' || this.state.password === '') {
            this.setState({ error: "Please add password and email" })
            return
        }
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        };
        const request = new Request(`${config.API_ENDPOINT}/auth/login`, options)
        fetch(request)
            .then(res => {
                if (!res.ok) {
                    throw res
                }
                return res.json()
            })
            .then(data => {

                localStorage.setItem("authToken", data.authToken)
                this.props.history.push('/saved')
                window.location.reload();

            })
            .catch(err => {
                if (err.status === 400) {
                    this.setState({ error: "Incorrect username or password" })
                }
            })

    }

    render() {


        return (
            <div>
                <section id="login">
                    {!localStorage.authToken ?
                        <>
                            <header> Login, Your Tastebuds Will Thank You</header>

                            <section id="intro">
                                <header style={{color: 'rgba(85, 0, 170,.8)'}}> New To Gumbo?</header>
                                <p style={{marginTop: -80}}> Try out the Gumbo App by using demo credentials: <br></br><br></br>username: <b>admin</b><br></br>password: <b>pass</b></p>
                            </section>
                            <form>
                                <label htmlFor="#text-area"> Email: </label>
                                <input id="text-area" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                                <label htmlFor="#text-area"> Password: </label>
                                <input id="text-area" type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                                <button className="regular-button" type="submit" onClick={this.login}> Submit
                                </button>
                            </form> 
                        </> :
                        <>
                            <header> Logout</header>
                            <button style={{ backgroundColor: "white" }} onClick={this.logout}> Log me out!</button>
                        </>
                    }
                    <h4 id="member"> Not a member yet? <Link to="/signup">Sign Up</Link></h4>
                </section>
            </div>
        );
    }
}

export default Login
