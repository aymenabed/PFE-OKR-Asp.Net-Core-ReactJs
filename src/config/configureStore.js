import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import jwtDecode from "jwt-decode";
import rootReducer from "../rootReducer";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { setCurrentUser } from "../actions/authActions";

const store = createStore(
	combineReducers({
		...reducers,
	}),
	{},
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	// prevent someone from manually setting a key of 'jwtToken' in localStorage
	try {
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
	} catch (e) {
		store.dispatch(setCurrentUser({}));
	}
}

export default function configureStore() {
	return store;
}
