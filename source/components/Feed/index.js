// Core
import React, { Component } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { fromTo } from 'gsap';

// Components
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Catcher from 'components/Catcher/';
import Postman from 'components/Postman';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from 'config/api';
import {socket} from 'socket/init';

@withProfile
export default class Feed extends Component {
    state = {
        posts:           [],
        isPostsFetching: false,
    };

    componentDidMount() {
        const {currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPost();

        socket.emit('join', GROUP_ID);

        socket.on(this.SOCKET_POST_CREATE, (postJSON) => {
            const {data: createdPost, meta: {authorFirstName, authorLastName} } = JSON.parse(postJSON);

            if (currentUserFirstName !== authorFirstName || currentUserLastName !== authorLastName) {
                this.setState(({posts}) => ({
                    posts: [ createdPost, ... posts ],
                }));
            }
        });

        socket.on(this.SOCKET_POST_REMOVE, (postJSON) => {
            const {data: removedPost, meta: {authorFirstName, authorLastName} } = JSON.parse(postJSON);

            if (currentUserFirstName !== authorFirstName || currentUserLastName !== authorLastName) {
                this.setState(({posts}) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on(this.SOCKET_POST_LIKE, (postJSON) => {
            const {data: likedPost, meta: {authorFirstName, authorLastName} } = JSON.parse(postJSON);

            if (currentUserFirstName !== authorFirstName || currentUserLastName !== authorLastName) {
                this.setState(({posts}) => ({
                    posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener(this.SOCKET_POST_CREATE);
        socket.removeListener(this.SOCKET_POST_REMOVE);
        socket.removeListener(this.SOCKET_POST_LIKE);
    }


    SOCKET_POST_CREATE = 'create';
    SOCKET_POST_REMOVE = 'remove';
    SOCKET_POST_LIKE = 'like';

    _setPostsFetchingState = (state) => {
        this.setState({isPostsFetching: state});
    };

    _fetchPost = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const {data: posts} = await response.json();

        this.setState({
            posts,
            isPostsFetching: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api,
            {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  TOKEN,
                },
                body: JSON.stringify({comment}),
            });

        const {data: post} = await response.json();

        this.setState(({posts}) => ({
            posts:           [ post, ...posts ],
            isPostsFetching: false,
        }));
    };

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`,
            {
                method:  'PUT',
                headers: {
                    Authorization: TOKEN,
                },
            });

        const {data: likedPost} = await response.json();

        this.setState(({posts}) => ({
            posts:           posts.map((post) => post.id === likedPost.id ? likedPost : post),
            isPostsFetching: false,
        }));
    };

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`,
            {
                method:  'DELETE',
                headers: {
                    Authorization: TOKEN,
                },
            });

        this.setState(({posts}) => ({
            posts:           posts.filter((post) => post.id !== id),
            isPostsFetching: false,
        }));
    };

    _animateComposerEnter = (composer) => {
        fromTo(composer, 1, {opacity: 0, rotationX: 50}, {opacity: 1, rotationX: 0});
    };

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => (
            <CSSTransition
                classNames = {{
                    enter:       Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit:        Styles.postOutStart,
                    exitActive:  Styles.postOutEnd,
                }}
                key = { post.id }
                timeout = {{
                    enter: 400,
                    exit:  500,
                }}>
                <Catcher>
                    <Post
                        key = { post.id }
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>
            </CSSTransition>
        ));

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 4000 }
                    onEnter = { this._animateComposerEnter }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Postman/>
                <TransitionGroup>{postsJSX}</TransitionGroup>
            </section>
        );
    }
}
