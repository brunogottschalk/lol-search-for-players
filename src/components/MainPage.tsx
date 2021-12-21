import React, { Component } from 'react';
import Header from './Header';
import MainPageBody from './MainPageBody';

class MainPage extends Component {

    componentDidMount() {
        // console.log('montou');
    }

    render() {
        return (
            <div className="main-page-container">
                <Header />
                <MainPageBody />
            </div>
        )
    }
}

export default MainPage;
