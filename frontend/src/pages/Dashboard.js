import React, { useState, useEffect } from 'react';
import { getAllCandidates } from '../services/candidateService';
import { getAllSkills } from '../services/skillService';
import { getAllCategories } from '../services/categoryService';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCandidates().then(res => setCandidates(res.data));
    getAllSkills().then(res => setSkills(res.data));
    getAllCategories().then(res => setCategories(res.data));
  }, []);

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '500', marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Welcome back! Here's your HR overview.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Total Candidates</p>
          <p style={{ fontSize: '36px', fontWeight: '600', color: '#1d4ed8' }}>{candidates.length}</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Total Skills</p>
          <p style={{ fontSize: '36px', fontWeight: '600', color: '#1d4ed8' }}>{skills.length}</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Categories</p>
          <p style={{ fontSize: '36px', fontWeight: '600', color: '#1d4ed8' }}>{categories.length}</p>
        </div>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px' }}>Recently Added Candidates</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#6b7280' }}>Full Name</th>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#6b7280' }}>Email</th>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#6b7280' }}>Contact</th>
          </tr>
        </thead>
        <tbody>
          {candidates.slice(0, 5).map(candidate => (
            <tr key={candidate.id} style={{ borderTop: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px 16px', fontSize: '14px' }}>{candidate.fullName}</td>
              <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6b7280' }}>{candidate.email}</td>
              <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6b7280' }}>{candidate.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;