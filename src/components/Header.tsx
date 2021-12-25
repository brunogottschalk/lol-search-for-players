import React, { Component } from "react";
import { SummonerApiInterface } from "../reducers";
import changeLoginStatus from "../actions/changeLoginStatus";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
    state: SummonerApiInterface,
    logged: (value: boolean) => any,
}

class Header extends Component <Props>{
    constructor(props: Props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus() {
        const { logged } = this.props;
        logged(false);
    }

    render() {
        const { state } = this.props;
        return (
            <header className='header-container'>
                <div className="header-title">
                    <h1>Seja Bem vindo: { state.name }</h1>
                </div>
                <Link to='/login'><button className='header-button' onClick={ this.changeStatus } type='submit'>Buscar por outra conta</button></Link>
            </header>
        )
    }
}

const mapStateToProps = (state: any) => ({
    state: state.reducer.summonerApi,
});

const mapDispatchToProps = (dispatch: any) => ({
    logged: (action: boolean) => dispatch(changeLoginStatus(action))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);