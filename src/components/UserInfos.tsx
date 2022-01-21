import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SummonerApiInterface } from '../reducers';
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

class UserInfos extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            loaded: false,
            accountStats: [],
        }
    }

    componentDidMount() {
        const { userInfo } = this.props;
        const key = process.env.REACT_APP_API_KEY;
        const url = `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userInfo.id}?api_key=${key}`
        fetch(url)
            .then((data) => data.json())
            .then((response) => {
                const rankedData = response.find(({ queueType }: any) => queueType === "RANKED_SOLO_5x5");
                // console.log(rankedData);
                if (rankedData) {
                    this.setState({ accountStats: rankedData }, () => {
                        this.setState({ loaded: true });
                    });
                } else {
                    this.setState({
                        accountStats: undefined
                    })
                }
            })
    }

    imageSelector() {
        const { accountStats } = this.state;
        let imageSrc;
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
        return imageSrc;
    }

    render() {
        const { loaded, accountStats } = this.state;
        const { userInfo: { summonerLevel } } = this.props;
        let imageSrc;
        if (accountStats) {
            imageSrc = this.imageSelector();
        }

        return (
            <>
                {
                    loaded ?
                        <div className="user-infos">
                            < div className="emblem-container" >
                                <img className='emblem-image' src={imageSrc} alt='emblem' />
                                <h4 className='emblem-title'>{`${accountStats.tier} ${accountStats.rank}`}</h4>
                                <h4 className='user-points'>{accountStats.leaguePoints}LP</h4>
                            </div >
                            <div className="user-winrate">
                                <h4>Vitórias: {accountStats.wins}</h4>
                                <h4>Derrotas: {accountStats.losses}</h4>
                                <h4>Winrate: {(accountStats.wins / (accountStats.wins + accountStats.losses) * 100).toFixed(2)}%</h4>
                            </div>
                        </div >
                        :
                        <div className="user-infos">
                            <div className="emblem-container">
                                <h2>Level: { summonerLevel }</h2>
                                <img className="emblem-image" src="https://opgg-static.akamaized.net/images/medals/default.png?image=q_auto:best&v=1" alt="unranked" />
                                <h4>Não Ranqueado</h4>
                            </div>
                        </div>
                }
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    userInfo: state.reducer.summonerApi,
})

export default connect(mapStateToProps)(UserInfos);
