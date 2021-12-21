import { SummonerApiInterface } from '../reducers'


const addSummoners = (action: SummonerApiInterface) => ({
    type: 'ADD_SUMMONER_TO_STATE',
    summonerApi: action,
    logged: true,
}) 

export default addSummoners;