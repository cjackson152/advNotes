export const APIURL = "http://localhost:3000";
const axios = require("axios");
export const getDocuments = () => axios.get(`${APIURL}/document`);
export const addDocument = data => axios.post(`${APIURL}/document`, data);
export const editDocument = data => axios.put (`${APIURL}/document/${data.id}`, data);
export const deleteDocument = id => axios.put(`${APIURL}/document/${id}`);
export const generateDocument = id => axios.get(`${APIURL}/document/generate/${id}`);
