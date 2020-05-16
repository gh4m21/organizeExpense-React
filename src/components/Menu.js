import React from 'react';
import Dashboard from './Dashboard';
import Expense from './Expense';
import Income from './Income';
import Account from './Account';


const Menu = (props) => {
    if (props.componentClick === '') {
        return <Dashboard />;
    } else if (props.componentClick === 'Dashboard') {
        return <Dashboard />;
    } else if (props.componentClick === 'Expense') {
        return <Expense />;
    } else if (props.componentClick === 'Income') {
        return <Income />;
    } else if (props.componentClick === 'Account') {
        return <Account />;
    } else {
        return <Dashboard />;
    }
}

export default Menu;