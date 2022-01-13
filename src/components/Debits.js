import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import axios from "axios";
import './Debits.css';


class Debits extends Component //constructs, initializes data
{
    constructor()
    {
        super();
        
            this.state=
            {
                debits: [],
                description: '',
                amount: 0,
                date: '',
            }

        
    }

    componentDidMount() //obtains debit data from api
    {
        
       let debURL = `https://moj-api.herokuapp.com/debits`
    
       axios.get(debURL)    
        .then(response => {
            this.setState({debits: response.data,});
        })

       .catch((error) =>//occur if error is caught
        {
            this.setState({
                debits: []
            });
         })   
    }

    DescHandle = event =>
    {
        this.setState({description: event.target.value}) //handles change in description
        console.log(this.state.description);
    }

    amntHandle = event =>
    {
        if(isNaN(event.target.value))
        {
            alert("Enter a number.")
        }
        else
        {
        this.setState({amount: event.target.value})  //handles change in amount
         }
         console.log(this.state.amount);
    }

    addDeb = (event) =>
    {

        event.preventDefault();


        let  description = this.state.description;
        let amount = this.state.amount;
        let cur = new Date();
        let date = `${cur.getFullYear()}-${cur.getMonth()+1}-${cur.getDate()}`;


      this.setState({debits: [{description, amount, date},...this.state.debits]}); //add new debit entry to list


    }


    decFromBal = event =>
    {

        const updatedBal = (this.props.accountBalance - parseFloat(this.state.amount)).toFixed(2);

        this.props.changeBalance(updatedBal); //dynamically change overall balance

    }




    render() //render, display credits and search fields
    {
        return(
            <div id = "debit-info">
   
                <Link to= '/'> Home</Link>
            <h1 id = "Debits-head"> Debits</h1>
            <AccountBalance accountBalance={this.props.accountBalance}/>
            <br/>
        
            <div className='debit-fields'>
            <label>Please Enter an Amount: </label>
            <input type = "text" name="Amount"  onChange={this.amntHandle} value = {this.state.amount} />
            </div>
            <br/>
            <div className='debit-fields'>
            <label>Please Enter a Description: </label>
            <input  type = "text" name="Description" onChange={this.DescHandle} value = {this.state.description} />
            </div>
            <br/>
            <button id = "credit-submit" onClick = {this.addDeb}>  Add Debit Info to List</button>
            <br/>
            <button id = "credit-submit" onClick = {this.decFromBal}>  Decrease Debit Amount from Balance</button>
    

          {this.state.debits.map((data,key)=>
                  {
                    let shortDate = data.date.slice(0,10);
                      return(
                        <div id = "debit-parts" key = {key}>
                       <p>  {"Description: " + data.description} </p>
                       <p>  {"Amount: $" + data.amount} </p>
                       <p>  {"Date: " + shortDate} </p>
                      
                       <br/>
                        </div>
                      );
                  })}
          </div>

        );
    }

}

export default Debits