import React from 'react';
import './SignUp.css'
import {Link} from "react-router-dom";
import config from '../config'


class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            error: ''
        }
        this.addUser=this.addUser.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  
    addUser= (e) =>{
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
                email: this.state.email,
                password: this.state.password,
            }),
        };
        const request = new Request (`${config.API_ENDPOINT}/users`, options)
        fetch(request)
        .then(res=>{
            if(!res.ok){
                throw res
            }
            return res.json()
        })
        .then(data=>
            this.props.history.push("/login")
        )
        .catch(err => {
            if(err.status===400){
                this.setState({error: "email already taken"})
            }
            })
    }
      
   render(){
    
    return(

        <div>

            <section id="intro">
                <h2> New To Gumbo?</h2>
                <p> Take the quiz below to learn your flavor profile and sign up</p>
            </section>
            {
                this.state.error !== "" && 
                <section id='error'>
                    {this.state.error}
                </section>
            }
            <section id="signup">
                <h2> Sign Up, Your Tastebuds Will Thank You</h2>
                <form> 
                    <label for="#text-area"> Email: </label>
                    <input id="text-area" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                    <label for="#text-area"> Password: </label>
                    <input id="text-area" type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
                    <button class="regular-button" type="submit" onClick={this.addUser}> Submit
                    </button>
                </form>
                    

            <h4> Already a Member? <Link to="/login"> Login</Link></h4>
            </section>
        </div> 
    );}
}
                
export default SignUp