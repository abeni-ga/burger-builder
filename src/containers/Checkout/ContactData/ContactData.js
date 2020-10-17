import React , { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

class ContactData extends Component{

    state={
       orderForm:{ name:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Name',
            },
            value:'',
            validation:{
                required:true,
                minLength:6,
                maxLength:20
            },
            touched:false,
            valid:false
        },
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Your E-mail',
            },
            value:'',
            validation:{
                required:true,
                minLength:6,
                maxLength:20
            },
            touched:false,
            valid:false
        },
        street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Street',
            },
            value:'',
            validation:{
                required:true,
                minLength:6,
                maxLength:20

            },
            touched:false,
            valid:false
        },
        zipcode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'ZIP Code',
            },
            value:'',
            validation:{
                required:true,
                minLength:6,
                maxLength:20
            },
            touched:false,
            valid:false
        },
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
                options: [
                    {value:'fastest',displayValue:'Fastest'},
                    {value:'chepest',displayValue:'Cheapest'}
                ]
            },
            value:'',
            validation:{},
            valid:true
        }},
        formIsValid:false,
        loading:false,
    }
   
    orderHandler = (event)=>{
        event.preventDefault();
        const formData = {};
        for(let formDataIdentifier in this.state.orderForm){
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            
        }
        this.setState({loading:true});
        axios.post('/orders.json',order)
        .then(response=>{
        this.setState({loading:false});
        this.props.history.push('/')}
        )
        .catch(error=>this.setState({loading:false}));
    }
    checkValidity = (value,rule)=>{
        let isValid  = true;
        if(rule.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rule.minLength){
            isValid = value.length >= rule.minLength && isValid;
        }
        if(rule.maxLength){
            isValid = value.length <= rule.maxLength && isValid;
        }

        return isValid;
    }
    inputChangedHandler = (event,inputIdentifier)=>{
        const updateOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updateOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updateOrderForm,formIsValid:formIsValid})
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement=>
                        <Input key={formElement.id}
                         elementType={formElement.config.elementType}
                         elementConfig={formElement.config.elementConfig}
                         value={formElement.config.value} 
                         changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                         inValid={!formElement.config.valid}
                         shouldValidate={formElement.config.validation}
                         touched={formElement.config.touched}
                         />
                    )}
                    
                    <Button btnType='Success'
                    disabled={!this.state.formIsValid} >ORDER</Button>
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

const mapStateToProps = state=>{
    return{
        ings:state.ingredients,
        price:state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);