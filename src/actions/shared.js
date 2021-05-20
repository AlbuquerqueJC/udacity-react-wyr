import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
// import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

// const AUTHED_ID = ['tylermcginnis']

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                // dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}
