import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component{
    state={
        order:[],
        loading:true
    }
    
    componentDidMount(){
        const fetchedOrder = [];
        axios.get('/orders.json')
            .then(response=>{
                for(let key in response.data){
                    fetchedOrder.push({
                        ...response.data[key],
                        id:key
                    })
                }
                this.setState({loading:false,order:fetchedOrder})
            })
            .catch(error=>{
                this.setState({loading:false,order:fetchedOrder})
            })
    }

    render(){
        
        return(
            <div>
            {this.state.order.map(order=>(
                <Order ingredients={order.ingredients} price={+order.price} key={order.id}/>
            ))}
            </div>
        );
    }
}

export default Orders;