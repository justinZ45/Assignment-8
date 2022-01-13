import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import axios from "axios";
import './Credits.css';
 
 
class Credits extends Component  //constructs, initializes data
{
   constructor()
   {
       super();
      
           this.state=
           {

               credits: [],
               description: "",
               amount: 0,
               date: ""
           
           }
 
      
   }
 
   componentDidMount() //when component mounts, collect api data
   {
      
      let credURL = `https://moj-api.herokuapp.com/credits`
  
      axios.get(credURL)   
       .then(response => {
           this.setState({credits: response.data,});
       })
 
      .catch((error) =>//occur if error is caught
       {
           this.setState({
               credits: []
           });
        })  
   }
 
   DescHandle = event =>
   {
       this.setState({description: event.target.value}); //handle description change
   }
 
   amntHandle = event =>
   {
       if(isNaN(event.target.value))
       {
           alert("Enter a number.")
       }
       else
       {
       this.setState({amount: event.target.value});  //handle amount change
       }
   }
 
 

   addCred = (event) =>
    {

        event.preventDefault();


        let description = this.state.description;
        let amount = this.state.amount;
        let cur = new Date();
        let date = `${cur.getFullYear()}-${cur.getMonth()+1}-${cur.getDate()}`;


      this.setState({credits: [{description, amount, date},...this.state.credits]}); //add new credit entry to list


    }

    addToBal = event =>
    {

        const updatedBal = this.props.accountBalance +  parseFloat(this.state.amount)

        this.props.changeBalance(updatedBal); //dynamically change overall balance

    }

 
   render() //render, display credits and search fields
   {
       return(
           <div id = "credit-info">
               <Link to= '/'> Home</Link>
           <h1 id = "credits-head"> Credits</h1>
           <AccountBalance accountBalance={this.props.accountBalance}/>
           <br/>
      
           <div className='credit-fields'>
             <label>Please Enter an Amount: </label>
             <input type="text" name="Amount" onChange={this.amntHandle} value={this.state.amount} />
           </div>
           <br/>
           <div className='credit-fields'>
           <label>Please Enter a Description: </label>
             <input type="text" name="Description" onChange={this.DescHandle} value={this.state.description} />
           </div>
           <br/>
           <button id = "credit-submit" onClick = {this.addCred}>  Add Credit Info to List</button>
           <br/>
            <button id = "credit-submit" onClick = {this.addToBal}>  Add Credit Amount to Balance</button>
       
 
         {this.state.credits.map((data,key)=>
                 {
                    let shortDate = data.date.slice(0,10);
                    return(
                      <div id = "credit-parts" key = {key}>
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
export default Credits

