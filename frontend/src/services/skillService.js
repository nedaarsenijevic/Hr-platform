import axios from 'axios';

const API_URL = 'http://localhost:8080/api/skills';

export const getAllSkills = () => axios.get(API_URL);
export const getSkillById = (id) => axios.get(`${API_URL}/${id}`);
export const addSkill = (skill) => axios.post(API_URL, skill);
export const updateSkill = (id, skill) => axios.put(`${API_URL}/${id}`, skill);
export const deleteSkill = (id) => axios.delete(`${API_URL}/${id}`);
export const searchByName = (name) => axios.get(`${API_URL}/search?name=${name}`);
export const searchByCategory = (categoryName) => axios.get(`${API_URL}/category?categoryName=${categoryName}`);
export const addSkillToCandidate = (candidateId, skillId) =>
  axios.post(`http://localhost:8080/api/candidates/${candidateId}/skills/${skillId}`);

export const removeSkillFromCandidate = (candidateId, skillId) =>
  axios.delete(`http://localhost:8080/api/candidates/${candidateId}/skills/${skillId}`);