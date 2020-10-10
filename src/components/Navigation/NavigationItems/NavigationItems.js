import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const navigationItems = ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem active link="/" >Burger Builder</NavigationItem>
        <NavigationItem link="/" >checkout</NavigationItem>
    </ul>
);

export default navigationItems;