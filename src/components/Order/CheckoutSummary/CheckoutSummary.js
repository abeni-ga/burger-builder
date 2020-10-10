import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props)=>{
    return(
        <div>
            <h1>We hope it test good!</h1>
            <Burger ingredients={ props.ingredients } />
            <div>
                <Button btnType='Danger'>Cancel</Button>
                <Button btnType='Success'>Continue</Button>
            </div>
        </div>
    );
}