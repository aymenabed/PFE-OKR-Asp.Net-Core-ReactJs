import { ACTION_TYPES } from "../actions/level";
const initialState = {
	listL: [],
};

export const level = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.FETCHL:
			return {
				...state,
				listL: [...action.payload],
			};

		case ACTION_TYPES.CREATEL:
			return {
				...state,
				listL: [...state.listL, action.payload],
			};

		case ACTION_TYPES.UPDATEL:
			return {
				...state,
				listL: state.listL.map((x) =>
					x.id == action.payload.id ? action.payload : x
				),
			};

		case ACTION_TYPES.DELETEL:
			return {
				...state,
				listL: state.listL.filter((x) => x.id != action.payload),
			};

		default:
			return state;
	}
};
