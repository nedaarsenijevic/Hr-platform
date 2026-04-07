import axios from 'axios';

const API_URL = 'http://localhost:8080/api/candidates';

export const getAllCandidates = () => axios.get(API_URL);
export const getCandidateById = (id) => axios.get(`${API_URL}/${id}`);
export const addCandidate = (candidate) => axios.post(API_URL, candidate);
export const updateCandidate = (id, candidate) => axios.put(`${API_URL}/${id}`, candidate);
export const deleteCandidate = (id) => axios.delete(`${API_URL}/${id}`);
export const addSkillToCandidate = (candidateId, skillId) => axios.post(`${API_URL}/${candidateId}/skills/${skillId}`);
export const removeSkillFromCandidate = (candidateId, skillId) => axios.delete(`${API_URL}/${candidateId}/skills/${skillId}`);
export const searchByName = (name) => axios.get(`${API_URL}/search/name?name=${name}`);
export const searchBySkill = (skillName) => axios.get(`${API_URL}/search/skill?skillName=${skillName}`);
export const searchByEmail = (email) => axios.get(`${API_URL}/search/email?email=${email}`);