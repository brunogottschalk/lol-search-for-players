import React, { Component } from 'react';
import { connect } from 'react-redux';
import key from '../key/key';


interface Props {
    matchId: string,
    summonerName: any,
}


interface State {
    matchInfo: any,
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
        let winOrDefeatBackgroundColor = '#9dfbfa';
        if(loaded) {
            myUser = matchInfo.info.participants.find((participant: any) => participant.summonerName === summonerName.name);
            AMA = ( parseInt(myUser.kills) + parseInt(myUser.assists) ) / parseInt(myUser.deaths);
            if (myUser.win) winOrDefeatBackgroundColor = '#F3485f';
        }
        return (
            <div className='card-item' style={ { backgroundColor: winOrDefeatBackgroundColor} } >
                { loaded ?
                    <>
                    <div className="champion-details">
                        <img
                            className='champion-image'
                            src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${ myUser.championName }.png`}
                            alt={`${myUser.championName}`} 
                        />
                        <div className="champion-info">
                            <span className='champion-lane'>Posição: {myUser.individualPosition}</span>
                            <span className='champion-name'>{myUser.championName}</span>
                            <span className='champion-level'>lvl: {myUser.champLevel}</span>
                        </div>
                        <div className="kda">
                            <span>{myUser.kills}/{myUser.deaths}/{myUser.assists}</span>
                            <span>AMA: {AMA.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="champion-items">
                        { myUser.item0 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${myUser.item0}.png`} alt='champion-item' />}
                        { myUser.item1 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${myUser.item1}.png`} alt='champion-item' />}
                        { myUser.item2 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${myUser.item2}.png`} alt='champion-item' />}
                        { myUser.item3 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${myUser.item3}.png`} alt='champion-item' />}
                        { myUser.item4 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${myUser.item4}.png`} alt='champion-item' />}
                        { myUser.item5 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${myUser.item5}.png`} alt='champion-item' />}
                        { myUser.item6 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${myUser.item6}.png`} alt='champion-item' />}

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