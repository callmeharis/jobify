const express = require('express');
const testUser = require('../middleware/testUser');

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
  generateText,
} = require('../controllers/jobs');

router.route('/').post(testUser, createJob).get(getAllJobs);
router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(getJob)
  .delete(testUser, deleteJob)
  .patch(testUser, updateJob);

router.route('/generateText').post(generateText)

module.exports = router;
