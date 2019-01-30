// Core
import React, { Component } from 'react';
import {string, func, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

export default class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape(
                {
                    id:        string.isRequired,
                    lastName:  string.isRequired,
                    firstName: string.isRequired,
                },
            ),
        ).isRequired,
    };

    constructor (props) {
        super(props);

        this._isLikedByMe = this._isLikedByMe.bind(this);
        this._getLikeStyle = this._getLikeStyle.bind(this);
        this._likePost = this._likePost.bind(this);
        this._showLikers = this._showLikers.bind(this);
        this._hideLikers = this._hideLikers.bind(this);
        this._getLikersList = this._getLikersList.bind(this);
        this._getLikesDescription = this._getLikesDescription.bind(this);
    }

    state = {
        showLikers: false,
    };

    _showLikers () {
        this.setState({
            showLikers: true,
        });
    }

    _hideLikers () {
        this.setState({
            showLikers: false,
        });
    }


    _likePost() {
        const {_likePost, id} = this.props;
        _likePost(id);
    }

    _isLikedByMe () {
        const {likes, currentUserLastName, currentUserFirstName} = this.props;

        return likes.some(({firstName, lastName}) => {
            return firstName === currentUserFirstName && lastName === currentUserLastName;
        });
    }

    _getLikeStyle () {
        return cx(Styles.icon, {
            [ Styles.liked ]: this._isLikedByMe(),
        });
    }

    _getLikersList () {
        const {showLikers} = this.state;
        const {likes} = this.props;

        const likersJSX = likes.map(({firstName, lastName, id}) => (<li key = { id }>{`${firstName} ${lastName}`}</li>));

        return showLikers && likersJSX.length ? <ul>{likersJSX}</ul> : null;
    }

    _getLikesDescription () {
        const {likes, currentUserLastName, currentUserFirstName} = this.props;

        const isLikedByMe = this._isLikedByMe();

        if (likes.length === 1 && isLikedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (isLikedByMe) {
            return `You and ${likes.length - 1} other`;
        }

        return likes.length;
    }

    render() {
        return (
            <section className = { Styles.like }>
                <span
                    className = { this._getLikeStyle() }
                    onClick = { this._likePost }>Like
                </span>
                <div>
                    {this._getLikersList()}
                    <span
                        onMouseLeave = { this._hideLikers }
                        onMouseOver = { this._showLikers }>
                        {this._getLikesDescription()}
                    </span>
                </div>
            </section>
        );
    }
}
