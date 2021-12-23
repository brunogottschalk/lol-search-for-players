import React, { Component } from 'react';
import { connect } from 'react-redux';
import addSummoners from '../actions/addSummoner';
import { SummonerApiInterface } from '../reducers'
import key from '../key/key';

interface Props {
    summonerApi: (value: SummonerApiInterface) => any,
}

interface State {
    inputValue: string,
    loading: boolean,
}

class Login extends Component <Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            inputValue: '',
            loading: false,
        }

        this.handler = this.handler.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
    }

    fetchUser(event: any) {
        event.preventDefault();
        this.setState({ loading: true }, () => {
            const { inputValue } = this.state;
            const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${inputValue}?api_key=${key}`;
            fetch(url)
            .then((response) => response.json())
            .then((data: SummonerApiInterface) => {
                this.props.summonerApi(data);
            })
            .catch((error) => console.log(error));
        })
    }

    handler({ target }: any) {
        const { value } = target;
        this.setState({
            inputValue: value
        });
    }

    render() {
        const { inputValue, loading } = this.state;
        return (
            <div className="login-container">
                {
                !loading ?
                    <form onSubmit={ this.fetchUser } className='login-form-container'>
                        <h1 className='login-title'>League of Legends - consulta de histórico</h1>
                        <input id='login-input'type="text" name='inputValue' placeholder='Insira seu Username:' onChange={ this.handler }/>
                        <button
                            className='login-button'
                            disabled={ inputValue.length === 0 ? true: false }
                            type='submit'
                        >
                            Buscar
                        </button>
                    </form> :
                    <h1 className='login-title'>Carregando...</h1>
                }
            </div>
        )
    }
}

const MapDispatchToProps = (dispatch: any) => ({
    summonerApi: (value: any) => dispatch(addSummoners(value)),
})

export default connect(null, MapDispatchToProps)(Login);