import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, Settings } from 'lucide-react';
import { getAllCandidates, deleteCandidate, addCandidate, updateCandidate, searchByName, searchBySkill, searchByEmail } from '../services/candidateService';
import { getAllSkills, addSkillToCandidate, removeSkillFromCandidate } from '../services/skillService';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [searchSkillValue, setSearchSkillValue] = useState('');

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', contactNumber: '', dateOfBirth: '' });

  const [isManageSkillsOpen, setIsManageSkillsOpen] = useState(false);
  const [managingCandidate, setManagingCandidate] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadCandidates();
    getAllSkills().then(res => setSkills(res.data));
  }, []);

  const loadCandidates = () => {
    getAllCandidates().then(res => setCandidates(res.data));
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value) {
      if (searchType === 'name') {
        searchByName(value).then(res => setCandidates(res.data));
      } else {
        searchByEmail(value).then(res => setCandidates(res.data));
      }
    } else {
      loadCandidates();
    }
  };

  const handleSkillSearch = (value) => {
    setSearchSkillValue(value);
    if (value) {
      searchBySkill(value).then(res => setCandidates(res.data));
    } else {
      loadCandidates();
    }
  };

  const handleAddCandidate = () => {
    setEditingCandidate(null);
    setFormData({ firstName: '', lastName: '', email: '', contactNumber: '', dateOfBirth: '' });
    setIsAddEditOpen(true);
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate);
    setFormData({
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      contactNumber: candidate.contactNumber,
      dateOfBirth: candidate.dateOfBirth
    });
    setIsAddEditOpen(true);
  };

const handleSaveCandidate = () => {
  if (!formData.firstName || !formData.lastName || !formData.email) {
    alert('Please fill in all required fields');
    return;
  }
  if (editingCandidate) {
    updateCandidate(editingCandidate.id, formData)
      .then(() => {
        loadCandidates();
        setIsAddEditOpen(false);
      })
      .catch(err => {
        if (err.response?.status === 400) {
          alert('Email already exists or contact number format is not valid!');
        }
      });
  } else {
    addCandidate(formData)
      .then(() => {
        loadCandidates();
        setIsAddEditOpen(false);
      })
      .catch(err => {
        if (err.response?.status === 400) {
          alert('Email already exists or contact number format is not valid!');
        }
      });
  }
};
  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteCandidate(deletingId).then(() => {
      loadCandidates();
      setIsDeleteOpen(false);
    });
  };

  const handleManageSkills = (candidate) => {
    setManagingCandidate(candidate);
    setIsManageSkillsOpen(true);
  };

  // const handleAddSkill = (skillId) => {
  //   addSkillToCandidate(managingCandidate.id, skillId).then(() => loadCandidates());
  // };

  // const handleRemoveSkill = (skillId) => {
  //   removeSkillFromCandidate(managingCandidate.id, skillId).then(() => loadCandidates());
  // };
    const handleAddSkill = (skillId) => {
    addSkillToCandidate(managingCandidate.id, skillId).then(() => {
      loadCandidates();
      // Azuriraj i managingCandidate
      setManagingCandidate(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skills.find(s => s.id === skillId)]
      }));
    });
  };

  const handleRemoveSkill = (skillId) => {
    removeSkillFromCandidate(managingCandidate.id, skillId).then(() => {
      loadCandidates();
      // Azuriraj i managingCandidate
      setManagingCandidate(prev => ({
        ...prev,
        skills: (prev.skills || []).filter(s => s.id !== skillId)
      }));
    });
  };

  const candidateSkillIds = managingCandidate?.skills?.map(s => s.id) || [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Candidates</h1>
          <p className="text-gray-600">Manage all candidate profiles and their information</p>
        </div>
        <button onClick={handleAddCandidate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Add Candidate
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Search by:</span>
          <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-1">
            <button onClick={() => setSearchType('name')} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${searchType === 'name' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>Name</button>
            <button onClick={() => setSearchType('email')} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${searchType === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>Email</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder={`Search by ${searchType}...`} value={searchValue} onChange={e => handleSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Filter by skill..." value={searchSkillValue} onChange={e => handleSkillSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Full Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Email</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Contact Number</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Skills</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {candidates.map(candidate => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{candidate.fullName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{candidate.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{candidate.contactNumber}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills && candidate.skills.map(skill => (
                      <span key={skill.id} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">{skill.name}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEditCandidate(candidate)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteClick(candidate.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleManageSkills(candidate)} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Manage Skills">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {candidates.length === 0 && (
          <div className="text-center py-12 text-gray-500">No candidates found.</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">{editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="First name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Last name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input type="tel" value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contact number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" value={formData.dateOfBirth} onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsAddEditOpen(false)} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveCandidate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingCandidate ? 'Update' : 'Add'} Candidate</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Skills Modal */}
      {isManageSkillsOpen && managingCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-2">Manage Skills</h2>
            <p className="text-gray-600 text-sm mb-4">Select or deselect skills for {managingCandidate.fullName}</p>
            <div className="border border-gray-300 rounded-lg p-4 max-h-80 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {skills.map(skill => (
                  <label key={skill.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={candidateSkillIds.includes(skill.id)}
                      onChange={() => {
                        if (candidateSkillIds.includes(skill.id)) {
                          handleRemoveSkill(skill.id);
                        } else {
                          handleAddSkill(skill.id);
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{skill.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsManageSkillsOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Delete Candidate</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this candidate? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;