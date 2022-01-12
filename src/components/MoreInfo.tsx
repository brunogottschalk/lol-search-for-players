import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import addSummoner from '../actions/addSummoner';
import { SummonerApiInterface } from '../reducers'

interface Props {
    props: any,
    summonerApi: (value:any) => any;
}

interface State {
    loaded: boolean,
    matchInfo: any,
    fetchComplete: undefined | boolean,
}

class MoreInfo extends Component <Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            loaded: false,
            fetchComplete: undefined,
            matchInfo: []
        }

        this.fetchMatch = this.fetchMatch.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    fetchMatch() {
        const key = process.env.REACT_APP_API_KEY
        const { props: { match: { params: { id } }} } = this.props;
        const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${key}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => this.setState({ matchInfo: data}, () => this.setState({ loaded: true })));
    }

    componentDidMount() {
        this.fetchMatch();
    }

    redirectToHome(summonerName: string) {
        const key = process.env.REACT_APP_API_KEY
        const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${key}`;
        this.setState({ fetchComplete: false }, () => {
            fetch(url)
            .then((response) => response.json())
            .then((data: SummonerApiInterface) => {
                this.props.summonerApi(data);
                this.setState({ fetchComplete: true })
            })
            .catch((error) => console.log(error));
        })
    }

    render() {
        const { loaded, matchInfo, fetchComplete } = this.state;
        return (
            <section className='section-container'>
                <Link to='/home'><button className='more-info-back-button'>Voltar</button></Link>
                <div className='more-info-container'>
                   { !loaded ? <h1>Carregando...</h1> : 
                    matchInfo.info.participants.map((participant: any, index: number) => {
                        const AMA = ( parseInt(participant.kills) + parseInt(participant.assists) ) / parseInt(participant.deaths);
                        const winOrDefeatColor = participant.win ? '#9dfbfa' : '#F3485f';
                        return (
                            <div key={ index } className="more-info-card" onClick={ () => this.redirectToHome(participant.summonerName) } style={{ backgroundColor: winOrDefeatColor } }>
                                { fetchComplete === undefined && <>
                                    <div className="champion-details">
                                    <img
                                            className='champion-image'
                                            src={`https://opgg-static.akamaized.net/images/lol/champion/${ participant.championName }.png?image=c_scale,q_auto,w_140&v=1637122822`}
                                            alt={`${participant.championName}`} 
                                    />
                                    <div className="champion-info">
                                        <span className='champion-name'>{participant.summonerName}</span>
                                        <span className='champion-lane'>Posição: {participant.individualPosition}</span>
                                        <span className='champion-level'>lvl: {participant.champLevel}</span>
                                    </div>
                                    <div className="kda">
                                        <span>{participant.kills}/{participant.deaths}/{participant.assists}</span>
                                        <span>AMA: {AMA.toFixed(2)}</span>
                                    </div>
                                    </div>
                                    <div className="more-info-champion-items">
                                        { participant.item0 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${participant.item0}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                                        { participant.item1 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${participant.item1}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                                        { participant.item2 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${participant.item2}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                                        { participant.item3 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${participant.item3}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                                        { participant.item4 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${participant.item4}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                                        { participant.item5 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${participant.item5}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                                        { participant.item6 !== 0 && <img src={`https://opgg-static.akamaized.net/images/lol/item/${participant.item6}.png?image=q_auto:best&v=1637122822`} alt='champion-item' />}
                                    </div>
                                </>}
                            </div>
                        )
                    })
                    }
                </div>
                    { fetchComplete === false && <h1 className='loading-title'>Carregando...</h1>}
                    { fetchComplete === true && <Redirect to='/home' /> }
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    summonerApi: (value:any) => dispatch(addSummoner(value))
})

export default connect(null, mapDispatchToProps)(MoreInfo);
