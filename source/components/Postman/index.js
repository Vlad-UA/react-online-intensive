// Core
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

class Postman extends PureComponent {
    render() {
        const {avatar, currentUserFirstName} = this.props;

        return (
            <section className = { Styles.postman }>
                <img
                    alt = 'avatar'
                    src = { avatar }
                />
                <span>Welcome, online {currentUserFirstName}</span>
            </section>

        );
    }
}

export default withProfile(Postman);

Postman.propTypes = {
    avatar:               PropTypes.string.isRequired,
    currentUserFirstName: PropTypes.string.isRequired,
};
