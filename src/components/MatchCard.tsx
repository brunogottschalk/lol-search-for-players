import React, { Component } from 'react';
import { connect } from 'react-redux';
import key from '../key/key';

interface Name {
    name: string,
}

interface Props {
    matchId: string,
    summonerName: Name,
}

interface Participants {
    participants: any[],
}

interface MatchInfo {
    info: Participants,
}

interface State {
    matchInfo: MatchInfo | undefined,
    loaded: boolean,
}

class MatchCard extends Component <Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            loaded: false,
            matchInfo: undefined,
        }

        this.fetchMatch = this.fetchMatch.bind(this);
    }

    fetchMatch() {
        const { matchId } = this.props;
        const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${key}`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => this.setState({ matchInfo: data }, () => this.setState({ loaded: true })));
    }

    componentDidMount() {
        this.fetchMatch();
    }

    render() {
        const { loaded, matchInfo } = this.state;
        const { summonerName } = this.props;
        let myUser: any = undefined;
        let AMA: number = 0;
        if(matchInfo) {
            myUser = matchInfo.info.participants.find((participant) => participant.summonerName === summonerName.name);
            AMA = ( parseInt(myUser.kills) + parseInt(myUser.assists) ) / parseInt(myUser.deaths)
        }
        return (
            <div className='card-item'>
                { loaded ?
                    <>
                    <div className="lane-position">
                        <span>lane: {myUser.individualPosition}</span>
                    </div>
                    <div className="champion-details">
                        <span>{myUser.championName}</span>
                        <span>lvl: {myUser.champLevel}</span>
                    </div>
                    <div className="kda">
                        <span>kills: {myUser.kills}</span>
                        <span>assistances: {myUser.assists}</span>
                        <span>deaths: {myUser.deaths}</span>
                        <span>AMA: {AMA.toFixed(2)}</span>
                    </div>
                    </>
                    : <span className='loading-card-item'>Carregando...</span> }
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    summonerName: state.reducer.summonerApi,
})

export default connect(mapStateToProps)(MatchCard);