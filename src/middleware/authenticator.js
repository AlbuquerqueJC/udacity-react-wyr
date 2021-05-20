import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from "../actions/authedUser";

const authenticator = (store) => (next) => (action) => {
    if (
        action.type === SET_AUTHED_USER &&
        action.id
    ) {
        console.log('Authenticating: ', action.id)
    }

    if (
        action.type === LOGOUT_AUTHED_USER
    ) {
        console.log('Logout')
    }
    return next(action)
}

export default authenticator