import { ACTION_TYPES } from "../actions/commentsO";
const initialState = {
	listCO: [],
};

export const commentsO = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.FETCH_ALLCO:
			return {
				...state,
				listCO: [...action.payload],
			};

		case ACTION_TYPES.CREATECO:
			return {
				...state,
				listCO: [...state.listCO, action.payload],
			};

		case ACTION_TYPES.UPDATECO:
			return {
				...state,
				listCO: state.listCO.map((x) =>
					x.id == action.payload.id ? action.payload : x
				),
			};

		case ACTION_TYPES.DELETECO:
			return {
				...state,
				listCO: state.listCO.filter((x) => x.id != action.payload),
			};

		default:
			return state;
	}
};
