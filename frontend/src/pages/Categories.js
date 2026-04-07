import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getAllCategories, deleteCategory, addCategory } from '../services/categoryService';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getAllCategories().then(res => setCategories(res.data));
  };

  // const handleSaveCategory = () => {
  //   addCategory({ name: categoryName }).then(() => {
  //     loadCategories();
  //     setIsAddOpen(false);
  //     setCategoryName('');
  //   });
  // };
  const handleSaveCategory = () => {
  addCategory({ name: categoryName })
    .then(() => {
      loadCategories();
      setIsAddOpen(false);
      setCategoryName('');
    })
    .catch((err) => {
      alert(err.response?.data);
    });
};

  const handleDeleteClick = (category) => {
    setDeletingCategory(category);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteCategory(deletingCategory.id)
      .then(() => {
        loadCategories();
        setIsDeleteOpen(false);
        setDeletingCategory(null);
      })
      .catch(() => {
        alert("Cannot delete category. Delete related skills first.");
      });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600">Manage skill categories for better organization</p>
        </div>
        <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Category Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map(category => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDeleteClick(category)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter category name" />
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveCategory} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Category</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && deletingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Delete Category</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this category? This action cannot be undone.</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-900">{deletingCategory.name}</p>
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

export default Categories;