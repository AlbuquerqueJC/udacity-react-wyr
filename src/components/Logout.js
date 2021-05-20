import React, { Component } from "react";
import {connect} from "react-redux";
import {logoutAuthedUser} from "../actions/authedUser";
import {Redirect} from "react-router-dom";

class Logout extends Component {
    componentDidMount() {
        this.props.logoutAuthedUser()
    }

    render() {
        return <Redirect to={'/'} authenticated={false} />
    }
}

function mapStateToProps ({authedUser}) {
    console.log("authedUser:", authedUser)
    return {
        authedUser,
    }
}

export default connect(mapStateToProps, {logoutAuthedUser})(Logout)