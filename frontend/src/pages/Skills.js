import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { getAllSkills, deleteSkill, addSkill, updateSkill } from '../services/skillService';
import { getAllCategories } from '../services/categoryService';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', category: { id: '' } });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingSkill, setDeletingSkill] = useState(null);

  useEffect(() => {
    loadSkills();
    getAllCategories().then(res => setCategories(res.data));
  }, []);

  const loadSkills = () => {
    getAllSkills().then(res => setSkills(res.data));
  };

  const filteredSkills = skills.filter(skill => {
    const matchesName = skill.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || skill.category?.name === selectedCategory;
    return matchesName && matchesCategory;
  });

  const handleAddSkill = () => {
    setEditingSkill(null);
    setFormData({ name: '', description: '', category: { id: '' } });
    setIsAddEditOpen(true);
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      description: skill.description,
      category: { id: skill.category?.id }
    });
    setIsAddEditOpen(true);
  };

const handleSaveSkill = () => {
  if (!formData.name) {
    alert('Please enter skill name');
    return;
  }
  if (!formData.category.id) {
    alert('Please select a category');
    return;
  }
  if (editingSkill) {
    updateSkill(editingSkill.id, formData).then(() => {
      loadSkills();
      setIsAddEditOpen(false);
    });
  } else {
    addSkill(formData).then(() => {
      loadSkills();
      setIsAddEditOpen(false);
    });
  }
};

  const handleDeleteClick = (skill) => {
    setDeletingSkill(skill);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteSkill(deletingSkill.id).then(() => {
      loadSkills();
      setIsDeleteOpen(false);
      setDeletingSkill(null);
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Skills</h1>
          <p className="text-gray-600">Manage all skills and their categories</p>
        </div>
        <button onClick={handleAddSkill} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search by skill name..." value={searchName} onChange={e => setSearchName(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="md:w-64">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Description</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Category</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSkills.map(skill => (
              <tr key={skill.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{skill.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{skill.description}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">{skill.category?.name}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEditSkill(skill)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteClick(skill)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-gray-500">No skills found.</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-1">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
            <p className="text-gray-600 text-sm mb-4">{editingSkill ? 'Update the skill information below.' : 'Enter the details for the new skill.'}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter skill name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Enter skill description" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={formData.category.id} onChange={e => setFormData({ ...formData, category: { id: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsAddEditOpen(false)} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveSkill} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingSkill ? 'Update' : 'Add'} Skill</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && deletingSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Delete Skill</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this skill? This action cannot be undone.</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-900">{deletingSkill.name}</p>
              <p className="text-sm text-gray-600">{deletingSkill.description}</p>
              <span className="mt-2 inline-block px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">{deletingSkill.category?.name}</span>
            </div>
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

export default Skills;