import React from 'react';
import {Link} from "react-router-dom";
import config from '../config'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            error: ''
        }
        this.handleChange=this.handleChange.bind(this)
        this.login=this.login.bind(this)
    }

    logout = () =>{
        localStorage.clear("token");
        this.props.history.push('/')

    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  
    login(e){
        e.preventDefault();
        if(this.state.email==='' || this.state.password===''){
            this.setState({error: "Please add password and email"})
            return
        }
        const headers = new Headers ();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify({
                email:this.state.email,
                password: this.state.password,
            }),
        };
        const request = new Request (`${config.API_ENDPOINT}/auth/login`, options)
        fetch(request)
        .then(res=>{
            if(!res.ok){
                throw res
            }
            return res.json()
        })
        .then(data => { 

            localStorage.setItem("authToken", data.authToken)
            this.props.history.push('/saved')
         })
         .catch(err => {
            if(err.status===400){
                this.setState({error: "Incorrect username or password"})
            }
            })

    }

   render(){
    
    
    return(
        <div>
            <section id="login">
               { !localStorage.authToken?
                <><h2> Login, Your Tastebuds Will Thank You</h2>
                <form> 
                    <label for="#text-area"> Email: </label>
                    <input id="text-area" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                    <label for="#text-area"> Password: </label>
                    <input id="text-area" type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
                    <button class="regular-button" type="submit" onClick={this.login}> Submit
                    </button> 
                </form> </>:
                <>
                <h2> Logout</h2>
                <button style={{backgroundColor: "white"}} onClick={this.logout}> Log me out!</button> 
                </>   
            }
            <h4> Not a member yet? <Link to="/signup">Sign Up</Link></h4>
            </section>
        </div> 
    );}
}
                
export default Login