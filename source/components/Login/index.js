// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
    onSubmit = (event) => {
        const {handleLogin} = this.props;
        event.preventDefault();
        handleLogin();
    };

    render() {
        return (
            <form onSubmit = { this.onSubmit }>
                <input
                    type = 'submit'
                    value = 'Login'
                />
            </form>
        );
    }
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
};
