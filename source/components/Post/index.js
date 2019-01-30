// Core
import React, { Component } from 'react';
import moment from 'moment';
import {string, number, func, array } from 'prop-types';

// Components
import Like from 'components/Like';
import { Consumer } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        id:          string.isRequired,
        comment:     string.isRequired,
        created:     number.isRequired,
        _likePost:   func.isRequired,
        _removePost: func.isRequired,
        likes:       array.isRequired,
    };

    _removePost = () => {
        const {_removePost, id } = this.props;
        _removePost(id);
    };

    render() {
        const { comment, created, _likePost, id, likes } = this.props;

        return (
            <Consumer>
                {({currentUserFirstName, currentUserLastName, avatar}) => (
                    <section className = { Styles.post }>
                        <span
                            className = { Styles.cross }
                            onClick = { this._removePost }
                        />
                        <img src = { avatar } />
                        <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                        <time>{moment(created)
                            .format('MMMM D h:mm:ss a')}
                        </time>
                        <p>{ comment }</p>
                        <Like
                            _likePost = { _likePost }
                            currentUserFirstName = { currentUserFirstName }
                            currentUserLastName = { currentUserLastName }
                            id = { id }
                            likes = { likes }
                        />
                    </section>
                )}
            </Consumer>
        );
    }
}
