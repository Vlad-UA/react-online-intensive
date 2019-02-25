// Core
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';

class PrivateRoute extends React.Component {
    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props;

        return (
            <Route
                { ...rest }
                render = { (props) => isAuthenticated
                    ? <Component { ...props } />
                    : <Redirect to = '/login' />
                }
            />
        );
    }
}

PrivateRoute.propTypes = {
    component:       PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

PrivateRoute.defaultProps = {
    isAuthenticated: false,
};

export default withRouter(withProfile(PrivateRoute));
