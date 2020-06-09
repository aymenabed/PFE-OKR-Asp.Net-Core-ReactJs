import api from "./api";

export const ACTION_TYPES = {
	CREATECKR: "CREATECKR",
	UPDATECKR: "UPDATECKR",
	DELETECKR: "DELETECKR",
	FETCH_ALLCKR: "FETCH_ALLCKR",
};

export const fetchAllCKR = () => (dispatch) => {
	api
		.commentsKR()
		.fetchAllCKR()
		.then((response) => {
			dispatch({
				type: ACTION_TYPES.FETCH_ALLCKR,
				payload: response.data,
			});
		})
		.catch((err) => console.log(err));
};
export const createCKR = (data, onSuccess) => (dispatch) => {
	api
		.commentsKR()
		.createCKR(data)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.CREATECKR,
				payload: res.data,
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};

export const updateCKR = (id, data, onSuccess) => (dispatch) => {
	api
		.commentsKR()
		.updateCKR(id, data)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.UPDATECKR,
				payload: { id, ...data },
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};

export const DeleteCKR = (id, onSuccess) => (dispatch) => {
	api
		.commentsKR()
		.deleteCKR(id)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.DELETECKR,
				payload: id,
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};
