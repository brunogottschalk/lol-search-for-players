import React, { Component } from "react";
import { SummonerApiInterface } from "../reducers";
import { connect } from 'react-redux';

interface Props {
    state: SummonerApiInterface 
}

class Header extends Component <Props>{
    render() {
        const { state } = this.props;
        return (
            <div className='header-container'>
                <h1>Seja Bem vindo: { state.name }</h1>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    state: state.reducer.summonerApi,
})

export default connect(mapStateToProps)(Header);