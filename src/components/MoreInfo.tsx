import React, { Component } from 'react';
import key from '../key/key';

interface Props {
    props: any,
}

interface State {
    loaded: boolean,
    matchInfo: any,
}

class MoreInfo extends Component <Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            loaded: false,
            matchInfo: []
        }

        this.fetchMatch = this.fetchMatch.bind(this);
    }

    fetchMatch() {
        const { props: { match: { params: { id } }} } = this.props;
        console.log(id)
        const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${key}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => this.setState({ matchInfo: data}, () => this.setState({ loaded: true })));
    }

    componentDidMount() {
        this.fetchMatch();
    }

    render() {
        const { loaded, matchInfo } = this.state;
        return (
            <div className='more-info-container'>
                   { !loaded ? <h1>Carregando...</h1> : 
                    matchInfo.info.participants.map((participant: any, index: number) => {
                        const AMA = ( parseInt(participant.kills) + parseInt(participant.assists) ) / parseInt(participant.deaths);
                        const winOrDefeatColor = participant.win ? '#9dfbfa' : '#F3485f';
                        return (
                            <div key={ index } className="more-info-card" style={{ backgroundColor: winOrDefeatColor }}>
                                <div className="champion-details">
                                    <img
                                        className='champion-image'
                                        src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${ participant.championName }.png`}
                                        alt={`${participant.championName}`} 
                                    />
                                    <div className="champion-info">
                                        <span className='champion-lane'>Posição: {participant.individualPosition}</span>
                                        <span className='champion-name'>{participant.summonerName}</span>
                                        <span className='champion-level'>lvl: {participant.champLevel}</span>
                                    </div>
                                    <div className="kda">
                                        <span>{participant.kills}/{participant.deaths}/{participant.assists}</span>
                                        <span>AMA: {AMA.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="champion-items">
                                    { participant.item0 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${participant.item0}.png`} alt='champion-item' />}
                                    { participant.item1 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${participant.item1}.png`} alt='champion-item' />}
                                    { participant.item2 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${participant.item2}.png`} alt='champion-item' />}
                                    { participant.item3 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${participant.item3}.png`} alt='champion-item' />}
                                    { participant.item4 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${participant.item4}.png`} alt='champion-item' />}
                                    { participant.item5 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${participant.item5}.png`} alt='champion-item' />}
                                    { participant.item6 !== 0 && <img src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${participant.item6}.png`} alt='champion-item' />}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default MoreInfo;
