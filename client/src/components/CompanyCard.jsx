import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAllCompanies } from "../features/company/companySlice";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
  >
    <img src={company.image} alt={company.name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
      <p className="text-gray-600 mb-2">{company.address}</p>
      <p className="text-gray-600 mb-2">{company.city}, {company.postalCode}</p>
      <p className="text-gray-600">Admins: {company.Admin?.length || 0}</p>
    </div>
  </motion.div>
);

export default function CompanyCards() {
  const dispatch = useDispatch();
  const { companies, isLoading, error } = useSelector((state) => state.companies); 
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 8;

  const navigate = useNavigate()


  useEffect(() => {
    dispatch(getAllCompanies()); 
  }, [dispatch]);

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div className="text-center py-10">Loading companies...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }


  const sendToUpdate = (id) => {
    navigate(`/company/${id}`);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCompanies.map((company) => (
         <div onClick={() =>sendToUpdate(company._id)}  key={company._id} >
           <CompanyCard company={company} />
         </div>
        ))}
      </div>
      {companies.length > companiesPerPage && (
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(companies.length / companiesPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 border rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
