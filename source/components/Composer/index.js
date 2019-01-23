// Core
import React, { Component } from 'react';

// Components
import { Consumer } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

export default class Composer extends Component {
    render() {
        return (
            <Consumer>
                {({currentUserFirstName, avatar}) => (
                    <section className = { Styles.composer }>
                        <img src = { avatar } />
                        <form>
                            <textarea placeholder = { `What\'s on your mind, ${currentUserFirstName}?` } />
                            <input
                                type = 'submit'
                                value = 'Post'
                            />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
