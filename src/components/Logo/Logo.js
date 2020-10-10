import React from 'react';

import imageLogo from '../../assets/images/logo.png';

import classes from './Logo.css';

const logo = (props)=>(
    <div className={classes.Logo}>
        <img src={imageLogo} alt="MyBurger"/>
    </div>
);

export default logo;