import { ACTION_TYPES } from "../actions/commentsKR";
const initialState = {
	listCKR: [],
};

export const commentsKR = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.FETCH_ALLCKR:
			return {
				...state,
				listCKR: [...action.payload],
			};

		case ACTION_TYPES.CREATECKR:
			return {
				...state,
				listCKR: [...state.listCKR, action.payload],
			};

		case ACTION_TYPES.UPDATECKR:
			return {
				...state,
				listCKR: state.listCKR.map((x) =>
					x.id == action.payload.id ? action.payload : x
				),
			};

		case ACTION_TYPES.DELETECKR:
			return {
				...state,
				listCKR: state.listCKR.filter((x) => x.id != action.payload),
			};

		default:
			return state;
	}
};
