import {RECEIVE_QUESTIONS, ADD_QUESTION, ADD_QUESTION_ANSWER} from "../actions/questions";

export default function questions (state = {}, action)  {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            }
        case ADD_QUESTION_ANSWER:
            return {
                ...state,
                [action.questionAnswer.qid]: {
                    ...state[action.questionAnswer.qid],
                    [action.questionAnswer.answer]: {
                        ...state[action.questionAnswer.qid][action.questionAnswer.answer],
                        votes: [...state[action.questionAnswer.qid][action.questionAnswer.answer].votes,
                            action.questionAnswer.authedUser]
                    }
                }
            }
        default:
            return state
    }
}