const { StatusCodes } = require("http-status-codes")
const Company = require("../models/company")
const { NotFoundError } = require("../errors")

const createCompany = async (req, res) => {
    const {user: {userId}} = req;
    const company = await Company.create({...req.body, Admin: userId })
    res.status(StatusCodes.OK).json({ company })
}

const getAllCompanies = async (req, res) => {
    const {user: {userId}} = req;
    
    const companies = await Company.find({userId})
    res.status(StatusCodes.OK).json({ companies })
}

const getCompany = async (req, res) => {
    const {params: {id}} = req;
    const company = await Company.findById(id)
    if (!company) {
        throw new NotFoundError("Company not found")
    }
    res.status(StatusCodes.OK).json({ company })
}

const updateCompany = async (req, res) => {
    const {body: formData, params: {id}} = req;

    console.log(req.body)


    const company = await Company.findByIdAndUpdate(id, formData, {new: true})
    if (!company) {
        throw new NotFoundError("Company not found")
    }
    res.status(StatusCodes.OK).json({ company })
}

const deleteCompany = async (req, res) => {
    const {body: {id}} = req;
    await Company.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({msg: "Company deleted successfully"})
}

module.exports = {
    createCompany,
    getAllCompanies,
    getCompany,
    updateCompany,
    deleteCompany,
}