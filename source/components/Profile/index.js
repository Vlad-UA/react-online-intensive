// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Profile extends Component {
    render() {
        const { currentUserFirstName, currentUserLastName, avatar } = this.props;

        return (
            <section className = { Styles.feed }>
                <h1>Welcome, {currentUserFirstName} {currentUserLastName} </h1>
                <img
                    alt = 'avatar'
                    src = { avatar }
                />
            </section>
        );
    }
}
