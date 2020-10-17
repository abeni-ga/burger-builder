import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../Store/actions';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading:false
    }

    componentDidMount(){
    //    axios.get('https://react-my-burger-68d5e.firebaseio.com/ingredients.json')
    //    .then(response=>{this.setState({ingredients:response.data})})
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
        return sum > 0 ;
    }

    purchaseCancelHandler =(props)=>{
        this.setState({
            purchasing:false
        });
    }

    purchaseContinueHandler = (props)=>{
        this.props.history.push('/checkout');
    }


    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = <Spinner />;
        if(this.props.ings){
            burger = <Aux>
             <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.price} 
                    ordered={this.orderSummaryHandler}
                    />
            </Aux>
            orderSummary = <OrderSummary ingredients={this.props.ings}
            price={this.props.price.toFixed(2)} 
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

const mapStateToProps = state=>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);