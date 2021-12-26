import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import MainPageBody from './MainPageBody';
import UserInfos from './UserInfos';
import Footer from './Footer';

interface Props {
    logged: boolean,
}

class MainPage extends Component <Props>{
    render() {
        const { logged } = this.props;
        return (
            <div className="main-page-container">
                { !logged ? <Redirect to='/login' /> :
                <>
                    <Header />
                    <UserInfos />
                    <MainPageBody />
                    <Footer />
                </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    logged: state.reducer.logged,
})

export default connect(mapStateToProps)(MainPage);
