import React, { Component } from 'react';
import { connect } from 'react-redux';
import MatchHistoryContainer from './MatchHistoryContainer';
import addHistoryMatches from '../actions/addHistoryMatches'
import key from '../key/key';

interface Props {
    userPuuid: string,
    historyMatches: (value: string[]) => void,
}

interface State {
    loaded: boolean,
}

class MainPageBody extends Component <Props, State>{
    constructor(props: any) {
        super(props);

        this.state = {
            loaded: false,
        }

        this.fetchMatchs = this.fetchMatchs.bind(this);
    }

    fetchMatchs() {
        const { userPuuid, historyMatches } = this.props;
        const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${userPuuid}/ids?start=0&count=20&api_key=${key}`;
        fetch(url)
        .then((data) => data.json())
        .then((response) => {
            this.setState({ loaded: true })
            return historyMatches(response);
        });
    }

    componentDidMount() {
        this.fetchMatchs()
    }

    render() {
        const { loaded } = this.state;
        return (
            <div>
                {!loaded ? <h1 className='loading-title'>Loading...</h1> : <MatchHistoryContainer />}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    userPuuid: state.reducer.summonerApi.puuid,
})

const mapDispatchToProps = (dispatch: any) => ({
    historyMatches: (value: string[]) => dispatch( addHistoryMatches(value) )
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPageBody);
