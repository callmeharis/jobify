import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyById, updateCompanyById } from '../features/company/companySlice';

export default function CompanyDetails() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const { company, isLoading, error } = useSelector((store) => store.companies);

  // Initialize formData when company data is available
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    dispatch(getCompanyById(id)); // Fetch company details when component mounts
  }, [dispatch, id]);

  // Sync formData with company details when the data is available
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        address: company.address || '',
        city: company.city || '',
        postalCode: company.postalCode || '',
      });
    }
  }, [company]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateCompany = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsUpdating(true);
    dispatch(updateCompanyById({id, formData}))
      .unwrap()
      .then(() => {
        setIsUpdating(false);
        setUpdateSuccess(true);
      })
      .catch(() => {
        setIsUpdating(false);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Company Details</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
        <div className="p-6">
          <div className="flex justify-center items-center">
            <img
              src={company?.image}
              alt={company?.name}
              className="w-[30vw] h-60 object-cover mb-6 rounded"
            />
          </div>
          <form className="space-y-4" onSubmit={updateCompany}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mt-6">
              <motion.button
                type="submit"
                disabled={isUpdating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Update Company'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
      <AnimatePresence>
        {updateSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-center"
          >
            Company details updated successfully!
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mt-4 p-4 bg-red-100 text-red-700 rounded-md text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
