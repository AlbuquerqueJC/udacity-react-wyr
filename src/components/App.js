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
import Question from "./Question";

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
                        <Nav />
                        {this.props.loading === true
                            ? <Route path='/' component={Login} />
                            : <div>
                                <Route path='/' exact component={Dashboard} />
                                <Route path='/home' component={Dashboard} />
                                <Route path='/question/:qid' component={Question} />
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
    if (authedUser !== null) {
        loading = authedUser[0] === null
    }
    return {
        loading,
    }
}

export default connect(mapStateToProps)(App)