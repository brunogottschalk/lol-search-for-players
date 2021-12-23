import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles/main-page-style.css';
import './styles/login-style.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import NotFound from './components/NotFound';
import MoreInfo from './components/MoreInfo';

interface Props {
    logged: boolean,
}

class App extends Component<Props> {
    render() {
        const { logged } = this.props;
        return (
            <>
                <Switch>
                    <Route exact path='/home' component={ MainPage } />
                    <Route exact path='/login' component={Login}/>
                    <Route path='/home/:id' render={ props => <MoreInfo props={ props } />} />
                    <Route path='*' component={NotFound} />
                </Switch>
                { logged ? <Redirect to='/home' /> : <Redirect to='/login' />}
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    logged: state.reducer.logged
})


export default connect(mapStateToProps)(App);