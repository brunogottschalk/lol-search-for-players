import React, { Component } from "react";
import { SummonerApiInterface } from "../reducers";
import changeLoginStatus from "../actions/changeLoginStatus";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
    state: SummonerApiInterface,
    logged: (value: boolean) => any,
    profileIcon: string,
}

class Header extends Component<Props>{
    constructor(props: Props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus() {
        const { logged } = this.props;
        logged(false);
    }

    render() {
        const { state, profileIcon } = this.props;
        return (
            <header className='header-container'>
                <img className="profile-image" src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIcon}.jpg?image=q_auto:best&v=1518361200`} alt="profile" />

                    <h1 className="header-title">{state.name}</h1>

                <Link to='/login'><button className='header-button' onClick={this.changeStatus} type='submit'>Buscar por outra conta</button></Link>
            </header>
        )
    }
}

const mapStateToProps = (state: any) => ({
    state: state.reducer.summonerApi,
    profileIcon: state.reducer.summonerApi.profileIconId,
});

const mapDispatchToProps = (dispatch: any) => ({
    logged: (action: boolean) => dispatch(changeLoginStatus(action))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);