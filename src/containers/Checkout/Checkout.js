import React , { Component } from 'react' ;
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {


    checkoutContinueHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = ()=>{
        this.props.history.goBack();
    }

    render(){
          return(
              <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinueHandler}
                />
                <Route path={ this.props.match.path + '/contact-data'} 
                   component={ContactData} />

              </div>
          );
      
    }
}
const mapStateToProps = state=>{
    return{
        ings:state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);