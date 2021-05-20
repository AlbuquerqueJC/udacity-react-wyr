import React, { Component } from "react";
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import {handleAddQuestionAnswer} from "../actions/questions";

class Question extends Component {
    state = {
        selectedOption: '',
        toResults: false
    }

    onValueChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { selectedOption } = this.state
        const { dispatch, qid } = this.props

        dispatch(handleAddQuestionAnswer(qid, selectedOption))

        console.log('Question Answer: ', qid, selectedOption)

        this.setState(()=> ({
            selectedOption: '',
            toResults: qid ? false : true,
        }))

        console.log(this.state)
    }

    render() {
        const { question, qid, results, userIds, totalOne,
            totalTwo, answered, toAnswer, users } = this.props

        if (question === null) {
            return <p>This question doesn't exist!</p>
        }
        const totalOnePct = totalOne + '%';
        const totalTwoPct = totalTwo + '%';

        return (
            <div>
                {toAnswer === true && answered === false && (
                    <div className='question panel panel-default'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='panel-heading'>
                                <h4><img src={users[question.author].avatarURL} className="img-thumbnail rounded-circle end-0"
                                         width="75px" alt="Avatar" /> {question.author} asks:
                                </h4>
                            </div>
                            <div className='panel-body'>
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-info">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="optionOne"
                                                   value="optionOne"
                                                   onChange={this.onValueChange}
                                                   checked={this.state.selectedOption === "optionOne"} />
                                                <label className="form-check-label" htmlFor="optionOne">
                                                    {question.optionOne.text}
                                                </label>
                                        </div>
                                    </li>
                                    <li className="list-group-item list-group-item-warning">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="optionTwo"
                                                   value="optionTwo"
                                                   onChange={this.onValueChange}
                                                   checked={this.state.selectedOption === "optionTwo"} />
                                            <label className="form-check-label" htmlFor="optionTwo">
                                                {question.optionTwo.text}
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                                <button className="btn btn-primary mb-3" type="submit"
                                        disabled={!this.state.selectedOption}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {results === true && toAnswer === true && (
                    <div className='question panel panel-default'>
                        <div className='panel-heading'>
                            <h4><img src={users[question.author].avatarURL} className="img-thumbnail rounded-circle end-0"
                                     width="75px" alt="Avatar" /> Asked by {question.author}:
                            </h4>
                        </div>
                        <div className='panel-body'>
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-info">
                                    <h4 className="card-subtitle">
                                        Would you rather {question.optionOne.text}?
                                    </h4>
                                    <h5 className="card-text">
                                        Votes: {question.optionOne.votes.length} / {userIds.length}<br />
                                    </h5>
                                    Total:
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar"
                                             style={{width: totalOnePct}}
                                             aria-valuenow={totalOne} aria-valuemin="0"
                                             aria-valuemax="100">{totalOnePct}
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item list-group-item-warning">
                                    <h4 className="card-subtitle">
                                        Would you rather {question.optionTwo.text}?
                                    </h4>
                                    <h5 className="card-text">
                                        Votes: {question.optionTwo.votes.length} / {userIds.length}<br />
                                    </h5>
                                    Total:
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar"
                                             style={{width: totalTwoPct}}
                                             aria-valuenow={totalTwo} aria-valuemin="0"
                                             aria-valuemax="100">{totalTwoPct}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {toAnswer === false && (
                    <div className="card">
                        <Link to={`/question/${qid}`} className='question'>
                            <div className="card-body" style={{textTransform: "capitalize"}}>
                                <h6 className="card-title">
                                    <img src={users[question.author].avatarURL} className="img-thumbnail rounded-circle end-0"
                                         width="75px" alt="Avatar" /> {question.author} asks:
                                </h6>
                                <h5 className="card-subtitle text-muted">Would you rather</h5>
                                <h4 className="card-text">
                                    {question.optionOne.text} <strong>or</strong><br />
                                    {question.optionTwo.text}
                                </h4>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, props) {
    let { qid } = props.match.params
    const toAnswer = !(props.match.params.qid === undefined)
    if (qid === undefined) { qid = props.qid }
    let {view, results, answered} = props
    const question = questions[qid]
    const userIds = Object.keys(users)

    // Find out if question is already answered by user; if user came directly here.
    if (answered === undefined) {
        answered = Object.keys(users[authedUser[0]].answers).find((id) => {
            return (id === qid ? true : false)
        })
        answered = (answered === qid ? true : false)
    }

    // If already answered; show with results instead
    if (results === undefined) {results = answered}
    let totalOne, totalTwo = 0;

    if (results) {
        totalOne = Math.floor((question.optionOne.votes.length / userIds.length) * 100)
        totalTwo = Math.floor((question.optionTwo.votes.length / userIds.length) * 100)
    }

    // Default to view only if not defined and not answered
    if (view === undefined) {
        if (answered === true) {
            view = null
        }
        else { view = true }
    }

    return {
        authedUser: authedUser[0],
        qid,
        userIds: userIds.sort((a, b) => users[a].name.localeCompare(users[b].name)),
        view: view,
        results: results,
        totalOne: totalOne,
        totalTwo: totalTwo,
        answered,
        question,
        toAnswer,
        users,
    }
}

export default withRouter(connect(mapStateToProps)(Question))