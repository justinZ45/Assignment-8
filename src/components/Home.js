import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    return (
        <div>
        <div id = "img-info">
        <img id = 'bank-img'src="https://freesvg.org/img/Bank.png"  alt="bank"/>
        </div>
        
        <div id = "home-info">
      
          <br/>
          <Link to="/userProfile" className='links'>User Profile</Link>
          <br/>
          <Link to="/login" className='links'>Login</Link>
          <br/>
          <Link to="/debits" className='links'>Debits</Link>
          <br/>
          <Link to="/credits" className='links'>Credits</Link>

          <h1>Bank of React</h1>

          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
        </div>
    );
  }
}

export default Home;
