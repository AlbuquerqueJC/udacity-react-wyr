import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Logout from "./Logout";
import Questions from "./Questions";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        {this.props.loading === true
                            ? <div>
                                <Nav authedUser={this.props.authUser} />
                                <Route path='/' component={Login} />
                              </div>
                            : <div>
                                <Nav authedUser={this.props.authUser} />
                                <Route path='/' exact component={Dashboard} />
                                <Route path='/home' component={Dashboard} />
                                <Route path='/questions/:qid' component={Questions} />
                                <Route path='/add' component={NewQuestion} />
                                <Route path='/leaderboard' component={Leaderboard} />
                                <Route path='/logout' component={Logout} />
                              </div>
                        }
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    let loading = true
    let authUser = ''
    if (authedUser !== null) {
        loading = authedUser[0] === null
        authUser = authedUser[0]
    }
    return {
        loading,
        authUser,
    }
}

export default connect(mapStateToProps)(App)