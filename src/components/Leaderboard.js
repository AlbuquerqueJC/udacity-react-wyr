import React, { Component } from "react";
import {connect} from "react-redux";
import LeaderboardView from "./LeaderboardView";

class Leaderboard extends Component {
    render() {
        const {userTotalsRanked} = this.props
        return (
            <div className='leaderboard'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Name</th>
                            <th scope="col">Answered Q's</th>
                            <th scope="col">Created Q's</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                    {userTotalsRanked.map((userTotal) =>
                        <LeaderboardView key={userTotal.id}
                                         id={userTotal.id}
                                         score={userTotal.score}
                                         asked={userTotal.asked}
                                         answered={userTotal.answered}
                                         rank={userTotal.rank}
                        />
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    const userIds = Object.keys(users)
    let userTotals = []
    let userTotalsRanked = []
    userTotals = userIds.map((id) => {
        let asked = users[id].questions.length
        let answered = Object.keys(users[id].answers).reduce(
            (prevValue) => prevValue + 1,
            0
        );
        let score = asked + answered
        return {id, score, asked, answered,}
    })
    userTotals.sort((a, b)=> b.score - a.score)
    let i = 0
    userTotalsRanked = userTotals.map((u) => {
        i++
        return {...u, rank: i}
    })
    return {
        userIds: userIds,
        userTotalsRanked,
        users,
    }
}

export default connect(mapStateToProps)(Leaderboard)