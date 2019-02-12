// Core
import React, { Component } from 'react';
import {object} from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return (
                <section className = { Styles.catcher }>
                    <span>A mysterious error occurred. </span>
                    <p>Our engineers fixing that already.</p>
                </section>
            );
        }

        return this.props.children;
    }
}