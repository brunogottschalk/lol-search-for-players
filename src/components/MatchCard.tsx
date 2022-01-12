import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        const key = process.env.REACT_APP_API_KEY;
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
            myUser = matchInfo.info.participants.find((participant: any) => participant.summonerName === summonerName);
            AMA = ( parseInt(myUser.kills ? myUser.kills : 0 ) + parseInt(myUser.assists) ) / parseInt(myUser.deaths);
            if (!myUser.win) winOrDefeatBackgroundColor = '#F3485f';
            
        }
        return (
            <div className='card-item' style={ { backgroundColor: winOrDefeatBackgroundColor} } >
                { loaded ?
                    <Link className='link' to={`/home/${matchInfo.metadata.matchId}`}><>
                    <div className="champion-details">
                        <img
                            className='champion-image'
                            src={`https://opgg-static.akamaized.net/images/lol/champion/${ myUser.championName }.png?image=c_scale,q_auto,w_140&v=1637122822`}
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
                        { myUser.item0 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${myUser.item0}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                        { myUser.item1 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${myUser.item1}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                        { myUser.item2 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${myUser.item2}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                        { myUser.item3 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${myUser.item3}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                        { myUser.item4 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${myUser.item4}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                        { myUser.item5 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${myUser.item5}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                        { myUser.item6 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${myUser.item6}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                    </div>
                    </></Link>
                    : <div className="champion-details"><span className='loading-card-item'>Carregando...</span></div> }
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    summonerName: state.reducer.summonerApi.name,
})

export default connect(mapStateToProps)(MatchCard);