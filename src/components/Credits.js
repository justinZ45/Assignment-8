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
               amount: null,
               date: ""
           
           }
 
      
   }
 
   componentDidMount() //when component mounts, collect api data
   {
      
      let credURL = `https://moj-api.herokuapp.com/credits`
  
      axios.get(credURL)   
       .then(response => {
           this.setState({credits: response.data,});
           console.log(response);
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
       this.setState({amount: event.target.value});  //handle amount change
   }
 
 
   addToCredits = event => //add credits to account balance, and update credit data
   {
 
        const updatedBal = (this.props.accountBalance + parseFloat(this.state.amount)).toFixed(2);
        this.props.changeBalance(updatedBal);
        let  newCred = this.state.description;
        let newAmt = this.state.amount;

         this.state.debits.push({'id':1, 'description': newCred, 'amount': newAmt, 'date' : " "});
    
 
   }
 
   render() //render, display credits and search fields
   {
       return(
           <div id = "credit-info">
               <Link to= '/'> Home</Link>
           <h1 id = "credits-head"> Credits</h1>
           <AccountBalance accountBalance={this.props.accountBalance}/>
           <br/>
      
           <form onSubmit={this.addToCredits}>
           <div className='credit-fields'>
             <label>Please Enter an Amount: </label>
             <input type="text" name="Amount" onChange={this.amntHandle} value={this.state.amount} />
           </div>
           <br/>
           <div className='debit-fields'>
           <label>Please Enter a Description: </label>
             <input type="text" name="Description" onChange={this.DescHandle} value={this.state.description} />
           </div>
           <br/>
           <button id = "credit-submit">Add Credit</button>
         </form>
 
         {this.state.credits.map(data=>
                 {
                    let shortDate = data.date.slice(0,10);
                    return(
                      <div id = "credit-parts">
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

