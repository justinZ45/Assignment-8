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
                amount: null,
                date: '',
            }

        
    }
    componentDidMount()  //obtains debit data from api
    {
        
       let debURL = `https://moj-api.herokuapp.com/debits`
    
       axios.get(debURL)    
        .then(response => {
            this.setState({debits: response.data,});
            console.log(response);
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
    }

    addToDebits = event =>  //add debits, and update debit data
    {
       
         const updatedBal = (this.props.accountBalance - parseFloat(this.state.amount)).toFixed(2);
         this.props.changeBalance(updatedBal);

        let  newDes = this.state.description;
        let newAmt = this.state.amount;

         this.state.debits.push({'id':1, 'description': newDes, 'amount': newAmt, 'date' : " "});

      
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
            <button id = "credit-submit" onClick = {this.addToDebits}> Submit</button>
     

          {this.state.debits.map(data=>
                  {
                    let shortDate = data.date.slice(0,10);
                      return(
                        <div id = "debit-parts">
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