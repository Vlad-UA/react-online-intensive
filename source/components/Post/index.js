// Core
import React, { Component } from 'react';
import moment from 'moment';
import {string, number, func, array } from 'prop-types';

// Components
import Like from 'components/Like';
import {withProfile} from '../HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
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
        const {
            comment,
            created,
            _likePost,
            id,
            likes,
            avatar,
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        const isRemovable = currentUserFirstName === firstName && currentUserLastName === lastName;

        return (
            <section className = { Styles.post }>
                {isRemovable
                    && <span
                        className = { Styles.cross }
                        onClick = { this._removePost }
                    />}

                <img
                    alt = 'avatar'
                    src = { avatar }
                />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment(created)
                    .format('MMMM D h:mm:ss a')}
                </time>
                <p>{ comment }</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>

        );
    }
}
