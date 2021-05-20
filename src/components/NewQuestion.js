import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import {connect} from "react-redux";
import {handleAddQuestion} from "../actions/questions";

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
    }

    handleChangeOne = (e) => {
        e.preventDefault()
        const optionOneText = e.target.value
        this.setState(()=> ({
            optionOneText
        }))
    }

    handleChangeTwo = (e) => {
        e.preventDefault()
        const optionTwoText = e.target.value
        this.setState(()=> ({
            optionTwoText
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOneText, optionTwoText } = this.state
        const { dispatch, id } = this.props

        dispatch(handleAddQuestion(optionOneText, optionTwoText))

        console.log('New Question: ', optionOneText, optionTwoText)

        this.setState(()=> ({
            optionOneText: '',
            optionTwoText: '',
            toHome: id ? false : true,
        }))

        console.log(this.state)
    }

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className="row mb-3">
                <h2 className="center">Add Question</h2>
                <h4 className="center">Would you rather...</h4>
                <form className="new-question" onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control"
                               name="optionOneText"
                               value={optionOneText}
                               onChange={this.handleChangeOne}
                               placeholder="Eat chocolate cake"
                               aria-label="QuestionOne"
                        />
                        <span className="input-group-text"> OR </span>
                        <input type="text" className="form-control"
                               name="optionTwoText"
                               value={optionTwoText}
                               onChange={this.handleChangeTwo}
                               placeholder="Drink chocolate milk"
                               aria-label="QuestionTwo" />
                        <button className="btn btn-primary" type="submit"
                                disabled={optionOneText === "" || optionTwoText === ""}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


export default connect()(NewQuestion)