// Login.js
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import './Login.css'

class LogIn extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect:false
    }
  }

  handleChange = (e) => {
    const updatedUser = {...this.state.user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({user: updatedUser})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.LogIn(this.state.user)
    this.setState({redirect: true})
  }

  render () {
    if (this.state.redirect) {
      return (<Navigate to="/userProfile"/>)
    }

    return (
        <div id ='login-info'>
        <Link to="/" className='links'>Home</Link>
        <br/>
        <br/>
        <form onSubmit={this.handleSubmit}>
        <div className='log-field'>
          <label htmlFor="userName">User Name: </label>
          <input type="text" className = 'login-box' name="userName" onChange={this.handleChange} value={this.state.user.userName} />
        </div>
        <br/>
        <br/>
        <div className='log-field'>
          <label htmlFor="password">  Password: </label>
          <input type="password" name="password" className='login-box'/>
        </div>
        <br/>
        <button id = 'log-btn'>Log In</button>
        </form>
        
        </div>
        
    )

  }

}

export default LogIn


