export interface SummonerApiInterface {
    id: string,
    accountId: string,
    puuid: string,
    name: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number,
}

interface actionInterface {
    type: string,
    summonerApi?: SummonerApiInterface,
    logged?: boolean,
    value?: string[],
}

interface INITIAL_STATE_INTERFACE {
    summonerApi: SummonerApiInterface[] | undefined,
    logged: false | true,
    historyMatches: string[]
}

const INITIAL_STATE: INITIAL_STATE_INTERFACE = {
    summonerApi: undefined,
    historyMatches: [],
    logged: false,
}

function reducer(state: INITIAL_STATE_INTERFACE = INITIAL_STATE, action: actionInterface) {
    switch (action.type) {
        case 'ADD_SUMMONER_TO_STATE': {
            const { summonerApi, logged } = action;
            return ({ ...state, summonerApi, logged })
        }
        case 'ADD_HISTORY_MATCHES': {
            state.historyMatches = [];
            return ({ ...state, historyMatches: action.value })
        }
        case 'CHANGE_LOGIN_STATUS': {
            const { logged } = action;
            return ({ ...INITIAL_STATE, logged })
        }
        case 'REDICECT_SUMMONER': {
            const { summonerApi } = action;
            return ({ ...INITIAL_STATE, summonerApi })
        }
        default: return state;
    }
}

export default reducer;