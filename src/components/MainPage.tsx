import React, { Component } from 'react';
import Header from './Header';
import MainPageBody from './MainPageBody';
import UserInfos from './UserInfos';
import Footer from './Footer';

class MainPage extends Component {
    render() {
        return (
            <div className="main-page-container">
                <Header />
                <UserInfos />
                <MainPageBody />
                <Footer />
            </div>
        )
    }
}

export default MainPage;
