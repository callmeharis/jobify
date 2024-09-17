const express = require('express')
const router = express.Router()
const { createCompany, deleteCompany, getAllCompanies, getCompany, updateCompany} = require('../controllers/company')

router.post("/create", createCompany)
router.get("/All", getAllCompanies)
router.get("/:id", getCompany)
router.put("/update/:id", updateCompany)

module.exports = router