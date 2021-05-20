import React, { Component } from 'react';
import { connect } from "react-redux";
import Question from "./Questions";

class Dashboard extends Component {
    render() {
        console.log("Dashboard: ", this.props)
        const {questionIds, unansweredQuestionsIds, answeredQuestionsIds} = this.props
        return (
            <div>
                <h2 className="center">Questions</h2>
                <h4 className="center">Total: {questionIds.length}</h4>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true"
                                    aria-controls="collapseOne">
                                <h4>Unanswered Questions:</h4>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show"
                             aria-labelledby="headingOne"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                            {unansweredQuestionsIds.map((id) => (
                                <Question key={id} qid={id} answered={false} toAnswer={false} />
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                    aria-expanded="false" aria-controls="collapseTwo">
                                <h4>Answered Questions:</h4>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse"
                             aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                            {answeredQuestionsIds.map((id) => (
                                <Question key={id} qid={id} answered={true} toAnswer={false} />
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({questions, users, authedUser}) {
    const authUser = authedUser[0]

    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        answeredQuestionsIds: Object.keys(users[authUser].answers)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp), //users[authUser].answers,
        unansweredQuestionsIds: Object.keys(questions)
            .filter((id) => !Object.keys(users[authUser].answers).includes(id))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        authedUser: authUser,
    }
}

export default connect(mapStateToProps)(Dashboard)