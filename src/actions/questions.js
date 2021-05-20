import {saveQuestion, saveQuestionAnswer} from "../utils/api";
import {addQuestionAnswerToUser, addQuestionToUser} from "./users";
import {showLoading, hideLoading} from "react-redux-loading";

export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        console.log('handleAddQuestion: ', optionOneText, optionTwoText)
        // Display loading bar
        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser[0]
        }).then( (question) =>
            dispatch(addQuestion(question))
        ).then( (question) =>
            dispatch(addQuestionToUser(question.question))
        ).then( () =>
            dispatch(hideLoading())
        )
    }
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestionAnswer (questionAnswer) {
    return {
        type: ADD_QUESTION_ANSWER,
        questionAnswer,
    }
}

export function handleAddQuestionAnswer (qid, answer) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        console.log('handleQuestionAnswer: ', qid, answer)
        // Display loading bar
        dispatch(showLoading())

        return saveQuestionAnswer({
            authedUser: authedUser[0],
            qid,
            answer
        }).then( () =>
            dispatch(addQuestionAnswer({qid, answer, authedUser: authedUser[0]}))
        ).then( () =>
            dispatch(addQuestionAnswerToUser({qid, answer, authedUser: authedUser[0]}))
        ).then( () =>
            dispatch(hideLoading())
        )
    }
}