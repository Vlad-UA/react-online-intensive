// Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

@withProfile
export default class Feed extends Component {
    state = {
        posts:           [{id: '123', comment: 'Hi There!', created: 1526825076849, likes: []}, {id: '456', comment: 'Hello :)', created: 1526825076855, likes: [] }],
        isPostsFetching: false,
    };

    _setPostsFetchingState = (state) => {
        this.setState({isPostsFetching: state});
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.utc().unix(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts:           [ post, ...posts ],
            isPostsFetching: false,
        }));
    };

    _likePost = async (id) => {
        const {currentUserFirstName, currentUserLastName } = this.props;
        const {posts} = this.state;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    };

    _removePost = async (id) => {
        const {posts} = this.state;

        this._setPostsFetchingState(true);

        await delay(1200);

        this.setState({
            posts:           posts.filter((post) => post.id !== id),
            isPostsFetching: false,
        });
    };

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => (
            <Post
                key = { post.id }
                { ...post }
                _likePost = { this._likePost }
                _removePost = { this._removePost }
            />
        ));

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
