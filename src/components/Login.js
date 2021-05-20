import React, { Component } from "react";
import {connect} from "react-redux";
import {logoutAuthedUser, setAuthedUser} from "../actions/authedUser";
import {Redirect} from "react-router-dom";

class Login extends Component {

    handleClick = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const user = e.target[0].options[e.target[0].options.selectedIndex].id
        console.log(user)
        dispatch(setAuthedUser([user]))
    }

    handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        console.log('handleLogout')
        dispatch(dispatch(logoutAuthedUser()))
    }

    render() {
        const {users, userIds, authedUser, authenticated} = this.props
        console.log(this.props)

        if (authedUser !== null) {
            if (authedUser[0] !== null) {
                return <Redirect to='/home'/>
            }
        }

        if (authenticated === true || undefined) {
            return <Redirect to='/home' />
        }

        return (
            <div>
                { (authedUser === null || authedUser[0] === null) && (
                    <div>
                        <h2 className='center'>Login</h2>
                        <form onSubmit={this.handleClick}>
                            <div className="row mb-3 justify-content-md-center">
                                <label className="row col-form-label">Select your player:
                                    <select className="form-select form-select-md mb-3">
                                        {// <option id="johndoe" selected>Select your player:</option>
                                        }
                                        {userIds.map((id) => (
                                            <option key={id} id={id} value={id}>{users[id].name}</option>
                                        ))}
                                    </select>
                                </label>
                                <div className="row">
                                    <input className="btn btn-primary" type="submit" value="Submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users}, props) {
    console.log("authedUser:", authedUser)
    const {authenticated} = props
    return {
        userIds: Object.keys(users)
            .sort((a, b) => users[a].name.localeCompare(users[b].name)),
        users,
        authedUser,
        authenticated,
    }
}

export default connect(mapStateToProps)(Login)