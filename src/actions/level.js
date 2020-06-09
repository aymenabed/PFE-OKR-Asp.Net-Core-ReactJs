import api from "./api";

export const ACTION_TYPES = {
	CREATEL: "CREATEL",
	UPDATEL: "UPDATEL",
	DELETEL: "DELETEL",
	FETCHL: "FETCHL",
};

export const fetchL = () => (dispatch) => {
	api
		.level()
		.fetchL()
		.then((response) => {
			dispatch({
				type: ACTION_TYPES.FETCHL,
				payload: response.data,
			});
		})
		.catch((err) => console.log(err));
};
export const createL = (data, onSuccess) => (dispatch) => {
	api
		.level()
		.createL(data)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.CREATEL,
				payload: res.data,
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};

export const updateL = (id, data, onSuccess) => (dispatch) => {
	api
		.level()
		.updateL(id, data)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.UPDATEL,
				payload: { id, ...data },
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};

export const DeleteL = (id, onSuccess) => (dispatch) => {
	api
		.level()
		.deleteL(id)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.DELETEL,
				payload: id,
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};
