import React, { Component } from 'react';
import { connect } from 'react-redux';
import MatchCard from './MatchCard';

interface Props {
    historyMatches: string[],
}

class MatchHistoryCard extends Component <Props> {
    render() {
        const { historyMatches } = this.props;
        return (
            <div className='matcher-container'>
                { historyMatches.map((historyMatch, index) => <MatchCard key={ index } matchId={ historyMatch } />) }
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    historyMatches: state.reducer.historyMatches,
})

export default connect(mapStateToProps)(MatchHistoryCard);