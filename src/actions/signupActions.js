import axios from "axios";
const BASE_URL = "http://localhost:3001";

export function userSignupRequest(userData) {
	return (dispatch) => {
		return axios.post(`${BASE_URL}/auth/register`, userData);
	};
}

export function isUserExists(identifier) {
	return (dispatch) => {
		return axios.get(`${BASE_URL}/users/${identifier}`);
	};
}
