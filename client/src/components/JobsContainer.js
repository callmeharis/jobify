import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import { motion, AnimatePresence } from 'framer-motion';

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch, search, searchStatus, searchType, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs !== 1 && 's'} found
      </h5>
      <AnimatePresence>
        <motion.div 
          className='jobs'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {currentJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Job {...job} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {totalJobs > jobsPerPage && (
        <div className="pagination flex justify-center items-center my-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 border rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default JobsContainer;