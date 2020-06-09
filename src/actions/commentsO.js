import api from "./api";

export const ACTION_TYPES = {
	CREATECO: "CREATECO",
	UPDATECO: "UPDATECO",
	DELETECO: "DELETECO",
	FETCH_ALLCO: "FETCH_ALLCO",
};

export const fetchAllCO = () => (dispatch) => {
	api
		.commentsO()
		.fetchAllCO()
		.then((response) => {
			dispatch({
				type: ACTION_TYPES.FETCH_ALLCO,
				payload: response.data,
			});
		})
		.catch((err) => console.log(err));
};
export const createCO = (data, onSuccess) => (dispatch) => {
	api
		.commentsO()
		.createCO(data)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.CREATECO,
				payload: res.data,
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};

export const updateCO = (id, data, onSuccess) => (dispatch) => {
	api
		.commentsO()
		.updateCO(id, data)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.UPDATECO,
				payload: { id, ...data },
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};

export const DeleteCO = (id, onSuccess) => (dispatch) => {
	api
		.commentsO()
		.deleteCO(id)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.DELETECO,
				payload: id,
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};
