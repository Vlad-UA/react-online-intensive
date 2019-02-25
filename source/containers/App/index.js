// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

// Container
import PrivateRoute from 'containers/PrivateRoute';

// Constants
import * as localStorageConstants from 'constants/localStorageConstants';

// Components
import Feed from 'components/Feed/';
import Profile from 'components/Profile/';
import Catcher from 'components/Catcher/';
import { Provider } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';

// Instruments
import avatar from 'theme/assets/lisa.png';

const options = {
    avatar,
    currentUserFirstName: 'Владислав',
    currentUserLastName:  'Кулик',
    isAuthenticated:      false,
};

@hot(module)
class App extends Component {
    userLogin = () => {
        const {history} = this.props;

        options.isAuthenticated = true;
        localStorage.setItem(localStorageConstants.IS_AUTHENTICATED, options.isAuthenticated);

        history.push('/feed');
    };

    render() {
        options.isAuthenticated = !!localStorage.getItem(localStorageConstants.IS_AUTHENTICATED);

        return (
            <Catcher>
                <Provider value = { options } >
                    <StatusBar />
                    <Switch>
                        <Route
                            exact
                            path = '/login'
                            render = { (props) => (
                                <Login
                                    { ...props }
                                    handleLogin = { this.userLogin }
                                />
                            ) }
                        />
                        <PrivateRoute
                            exact
                            component = { Feed }
                            path = '/feed'
                        />
                        <PrivateRoute
                            exact
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/feed'/>
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}

export default withRouter(App);
