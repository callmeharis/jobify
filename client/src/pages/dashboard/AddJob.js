import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
  generate_Description,
} from '../../features/job/jobSlice';
import { FormRow, FormRowSelect } from '../../components';

const AddJob = () => {
  const {
    isLoading,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
    descriptionText,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [position, setposition] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company || !jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status, descriptionText }));
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleGeneratePosition = async () => {
    if (position !== '') {
      setIsGenerating(true);
      try {
        await dispatch(generate_Description(position)).unwrap();
      } catch (error) {
        toast.error('Failed to generate description');
      }
    }
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: 'jobLocation',
          value: user.location,
        })
      );
    }
  }, [dispatch, isEditing, user.location]);

  useEffect(() => {
    // Only set isGenerating to false when descriptionText is updated
    if (descriptionText) {
      setIsGenerating(false);
    }
  }, [descriptionText]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        <div className="space-y-6">
          {/* position */}
          <div>
            <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">
              Position
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="position"
                name="position"
                value={position}
                onChange={(e) => {
                  setposition(e.target.value);
                  handleJobInput(e);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add a term to generate description..."
              />
              <button
                type="button"
                onClick={handleGeneratePosition}
                disabled={isGenerating}
                className={`bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 ${
                  isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={descriptionText}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              rows={4}
              disabled
            />
          </div>
          {/* status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="flex space-x-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;