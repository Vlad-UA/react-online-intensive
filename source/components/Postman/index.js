// Core
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Transition} from 'react-transition-group';
import { TimelineLite } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

class Postman extends PureComponent {
    _animateComposerEnter = (composer) => {
        let timeLine = new TimelineLite();
        timeLine.to(composer, 0, {
            x: 250,
        }).to(composer, 1, {
            x: 0,
        }).to(composer, 1, {
            x: 300,
        }, '+=4');
    };

    render() {
        const {avatar, currentUserFirstName} = this.props;

        return (
            <Transition
                appear
                in
                timeout = { 0 }
                onEnter = { this._animateComposerEnter }>
                <section className = { Styles.postman }>
                    <img
                        alt = 'avatar'
                        src = { avatar }
                    />
                    <span>Welcome, online {currentUserFirstName}</span>
                </section>
            </Transition>
        );
    }
}

export default withProfile(Postman);

Postman.propTypes = {
    avatar:               PropTypes.string.isRequired,
    currentUserFirstName: PropTypes.string.isRequired,
};
