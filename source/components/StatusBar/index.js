// Core
import React, { Component } from 'react';
import cx from 'classnames';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';
import {socket} from 'socket/init';

const SOCKET_CONNECT = 'connect';
const SOCKET_DISCONNECT = 'disconnect';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount() {
        socket.on(SOCKET_CONNECT, () => {
            this.setState({
                online: true,
            });
        });

        socket.on(SOCKET_DISCONNECT, () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount() {
        socket.removeListener(SOCKET_CONNECT);
        socket.removeListener(SOCKET_DISCONNECT);
    }

    render() {
        const {currentUserFirstName, currentUserLastName, avatar} = this.props;
        const {online} = this.state;

        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <section className = { Styles.statusBar }>
                <div className = { statusStyle }>
                    <div>{statusMessage}</div>
                    <span />
                </div>
                <button>
                    <img
                        alt = 'avatar'
                        src = { avatar }
                    />
                    <span>{currentUserFirstName}</span>
                            &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>
        );
    }
}
