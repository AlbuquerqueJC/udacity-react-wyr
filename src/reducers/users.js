import {RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_QUESTION_ANSWER} from "../actions/users";

export default function questions (state = {}, action)  {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            }
        case ADD_USER_QUESTION:
            return {
                ...state,
                [action.userQuestion.author]: {
                    ...state[action.userQuestion.author],
                    questions: state[action.userQuestion.author].questions.concat([action.userQuestion.id])
                }
            }
        case ADD_USER_QUESTION_ANSWER:
            console.log({...state})
            return {
                ...state,
                [action.userQuestion.authedUser]: {
                    ...state[action.userQuestion.authedUser],
                    answers: {
                        ...state[action.userQuestion.authedUser].answers,
                        [action.userQuestion.qid]: action.userQuestion.answer
                    }
                }
            }
        default:
            return state
    }
}

