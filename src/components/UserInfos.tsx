import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SummonerApiInterface } from '../reducers';
import key from '../key/key';
import bronzeEmblem from '../images/Emblem_BRONZE.png';
import challengerEmblem from '../images/Emblem_CHALLENGER.png';
import diamondEmblem from '../images/Emblem_DIAMOND.png';
import goldEmblem from '../images/Emblem_GOLD.png';
import grandmasterEmblem from '../images/Emblem_GRANDMASTER.png';
import ironEmblem from '../images/Emblem_IRON.png';
import masterEmblem from '../images/Emblem_MASTER.png';
import platinumEmblem from '../images/Emblem_PLATINUM.png';
import silverEmblem from '../images/Emblem_SILVER.png';

interface Props {
    userInfo: SummonerApiInterface,
}

interface State {
    loaded: boolean,
    accountStats: any,
}

class UserInfos extends Component <Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            loaded: false,
            accountStats: [],
        }
    }

    componentDidMount() {
        const { userInfo } = this.props;
        const url = `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${ userInfo.id }?api_key=${key}`
        fetch(url)
        .then((data) => data.json())
        .then((response) => this.setState({ accountStats: response.find((item: any) => item.queueType === "RANKED_SOLO_5x5") }, () => this.setState({ loaded: true })))
    }

    render() {
        const { loaded, accountStats } = this.state;
        let imageSrc = '';
        switch (accountStats.tier) {
            case 'BRONZE': imageSrc = bronzeEmblem;
            break;
            case 'CHALLENGER': imageSrc = challengerEmblem;
            break;
            case 'DIAMOND': imageSrc = diamondEmblem;
            break;
            case 'GOLD': imageSrc = goldEmblem;
            break;
            case 'GRANDMASTER': imageSrc = grandmasterEmblem;
            break;
            case 'IRON': imageSrc = ironEmblem;
            break;
            case 'MASTER': imageSrc = masterEmblem;
            break;
            case 'PLATINUM': imageSrc = platinumEmblem;
            break;
            case 'SILVER': imageSrc = silverEmblem;
            break;
            default: imageSrc = ironEmblem;
        }

        return (
            <div className="user-infos">
                { !loaded ? <div className="emblem-container"><h1>Carregando...</h1></div> :
                    <>
                        <div className="emblem-container">
                            <img className='emblem-image' src={ imageSrc } alt='emblem' />
                            <h4 className='emblem-title'>{`${accountStats.tier} ${accountStats.rank}`}</h4>
                            <h4 className='user-points'>{accountStats.leaguePoints}LP</h4>
                        </div>
                        <div className="user-winrate">
                            <h4>Vitórias: { accountStats.wins }</h4>
                            <h4>Derrotas: { accountStats.losses }</h4>
                            <h4>Winrate: { (accountStats.wins / (accountStats.wins + accountStats.losses) * 100).toFixed(2) }%</h4>
                        </div>
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    userInfo: state.reducer.summonerApi,
})

export default connect(mapStateToProps)(UserInfos);
