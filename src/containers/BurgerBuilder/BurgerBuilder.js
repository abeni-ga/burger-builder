import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading:false
    }

    componentDidMount(){
       axios.get('https://react-my-burger-68d5e.firebaseio.com/ingredients.json')
       .then(response=>{this.setState({ingredients:response.data})})
    }

    orderSummaryHandler = ()=>{
        this.setState({purchasing:true});
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler =(props)=>{
        this.setState({
            purchasing:false
        });
    }

    purchaseContinueHandler = (props)=>{
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'abenzer',
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
        .then(response=>this.setState({loading:false,purchasing:false}))
        .catch(error=>this.setState({loading:false,purchasing:false}));
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = <Spinner />;
        if(this.state.ingredients){
            burger = <Aux>
             <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} 
                    ordered={this.orderSummaryHandler}
                    />
            </Aux>
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice.toFixed(2)} 
            purchaseContinue={this.purchaseContinueHandler} 
            purchaseCancelled={this.purchaseCancelHandler} />
        }
        

        if(this.state.loading){
            orderSummary = <Spinner />
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler} >
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default BurgerBuilder;