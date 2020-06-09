import { ACTION_TYPES } from "../actions/keyResults";
const initialState = {
	listKR: [],
};

export const keyResults = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.FETCHKR:
			return {
				...state,
				listKR: [...action.payload],
			};

		case ACTION_TYPES.CREATEKR:
			return {
				...state,
				listKR: [...state.listKR, action.payload],
			};

		case ACTION_TYPES.UPDATEKR:
			return {
				...state,
				listKR: state.listKR.map((x) =>
					x.id == action.payload.id ? action.payload : x
				),
			};

		case ACTION_TYPES.DELETEKR:
			return {
				...state,
				listKR: state.listKR.filter((x) => x.id != action.payload),
			};

		default:
			return state;
	}
};
