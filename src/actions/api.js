import axios from "axios";
const baseUrl = "http://localhost:3001/";
const token = localStorage.getItem("jwtToken");
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export default {
	Objectifs(url = baseUrl + "objectifs/") {
		return {
			fetchAll: () => axios.get(url),
			fetchById: (id) => axios.get(url + id),
			create: (newRecord) => axios.post(url, newRecord),
			update: (id, updateRecord) => axios.put(url + id, updateRecord),
			delete: (id) => axios.delete(url + id),
		};
	},

	keyResults(url1 = baseUrl + "results/") {
		return {
			fetchKR: () => axios.get(url1),
			fetchByIdKR: (id) => axios.get(url1 + id),
			createKR: (newRecord) => axios.post(url1, newRecord),
			updateKR: (id, updateRecord) => axios.put(url1 + id, updateRecord),
			deleteKR: (id) => axios.delete(url1 + id),
		};
	},

	commentsO(url2 = baseUrl + "commentsO/") {
		return {
			fetchAllCO: () => axios.get(url2),
			fetchByIdCO: (id) => axios.get(url2 + id),
			createCO: (newRecord) => axios.post(url2, newRecord),
			updateCO: (id, updateRecord) => axios.put(url2 + id, updateRecord),
			deleteCO: (id) => axios.delete(url2 + id),
		};
	},

	commentsKR(url4 = baseUrl + "commentsKR/") {
		return {
			fetchAllCKR: () => axios.get(url4),
			fetchByIdCKR: (id) => axios.get(url4 + id),
			createCKR: (newRecord) => axios.post(url4, newRecord),
			updateCKR: (id, updateRecord) => axios.put(url4 + id, updateRecord),
			deleteCKR: (id) => axios.delete(url4 + id),
		};
	},

	level(url3 = baseUrl + "level/") {
		return {
			fetchL: () => axios.get(url3),
			fetchByIdL: (id) => axios.get(url3 + id),
			createL: (newRecord) => axios.post(url3, newRecord),
			updateL: (id, updateRecord) => axios.put(url3 + id, updateRecord),
			deleteL: (id) => axios.delete(url3 + id),
		};
	},
};
