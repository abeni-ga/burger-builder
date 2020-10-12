import React , { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';

class ContactData extends Component{

    state={
        name:'',
        email:'',
        address:{
            street:'',
            postal:''
        },
        loading:false,
    }
    orderHandler = (event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'abenzer',
                email: 'test@test.com',
                address:{
                    street: 'teststreet',
                    zipcode: '68987',
                    phone: '68798799887'
                }
            },
            deliveryWay:'fastway'
        }
        this.setState({loading:true});
        axios.post('/orders.json',order)
        .then(response=>{
        this.setState({loading:false});
        this.props.history.push('/')}
        )
        .catch(error=>this.setState({loading:false}));
    }
    render(){
        let form = (
            <form>
                    <input className={classes.Input} type="text" name='name' placeholder='Name' />
                    <input className={classes.Input} type="email" name='email' placeholder='Email' />
                    <input className={classes.Input} type="text" name='street' placeholder='Street' />
                    <input className={classes.Input} type="text" name='postal' placeholder='Postal Code' />
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form= <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;