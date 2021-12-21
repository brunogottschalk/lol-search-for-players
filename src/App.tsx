import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles/main-page-style.css';
import './styles/login-style.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import NotFound from './components/NotFound';

interface Props {
    logged: boolean,
}

class App extends Component<Props> {
    render() {
        const { logged } = this.props;
        console.log(logged);
        return (
                <Switch>
                    <Route exact path='/home' component={ MainPage } />
                    { logged === true && <Redirect to='/home' />}
                    <Route exact path='/login' component={Login}/>
                    <Redirect to='/login' />
                    <Route path='*' component={NotFound} />
                </Switch>
        )
    }
}

const mapStateToProps = (state: any) => ({
    logged: state.reducer.logged
})


export default connect(mapStateToProps)(App);