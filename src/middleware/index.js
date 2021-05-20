import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";
import authenticator from "./authenticator";

export default applyMiddleware(
    thunk,
    authenticator,
    logger,
)