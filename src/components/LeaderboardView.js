import React, { Component } from "react";
import {connect} from "react-redux";

class LeaderboardView extends Component {

    render() {
        const {users, userId, authedUser, score, asked, answered, rank} = this.props
        return (
            <tr className={authedUser === userId ? "table-primary mb-3" : 'mb-3'}>
                <th scope="row">{rank}</th>
                <td>
                    <img width="100px" src={users[userId].avatarURL} className="img-thumbnail rounded-circle"
                         alt="User Avatar" />
                </td>
                <td>{users[userId].name}</td>
                <td>{answered}</td>
                <td>{asked}</td>
                <td>{score}</td>
            </tr>
        )
    }
}

function mapStateToProps ({authedUser, users}, {id, rank, score, asked, answered}) {
    return {
        authedUser: authedUser[0],
        userId: id,
        rank,
        score,
        asked,
        answered,
        users,
    }
}

export default connect(mapStateToProps)(LeaderboardView)