import api from "./api";

export const ACTION_TYPES = {
	CREATEKR: "CREATEKR",
	UPDATEKR: "UPDATEKR",
	DELETEKR: "DELETEKR",
	FETCHKR: "FETCHKR",
};

export const fetchKR = () => (dispatch) => {
	api
		.keyResults()
		.fetchKR()
		.then((response) => {
			dispatch({
				type: ACTION_TYPES.FETCHKR,
				payload: response.data,
			});
		})
		.catch((err) => console.log(err));
};
export const createKR = (data, onSuccess) => (dispatch) => {
	api
		.keyResults()
		.createKR(data)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.CREATEKR,
				payload: res.data,
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};

export const updateKR = (id, data, onSuccess) => (dispatch) => {
	api
		.keyResults()
		.updateKR(id, data)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.UPDATEKR,
				payload: { id, ...data },
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};

export const DeleteKR = (id, onSuccess) => (dispatch) => {
	api
		.keyResults()
		.deleteKR(id)
		.then((res) => {
			dispatch({
				type: ACTION_TYPES.DELETEKR,
				payload: id,
			});
			onSuccess();
		})
		.catch((err) => console.log(err));
};
