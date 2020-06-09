import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";
const BASE_URL = "http://localhost:3001";

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user,
	};
}

export function logout() {
	return (dispatch) => {
		localStorage.removeItem("jwtToken");
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
}

export function login(data) {
	return (dispatch) => {
		return axios.post(`${BASE_URL}/auth/login`, data).then((res) => {
			console.log(res);
			const token = res.data.access_token;
			localStorage.setItem("jwtToken", token);
			setAuthorizationToken(token);
			dispatch(setCurrentUser(jwtDecode(token)));
		});
	};
}
