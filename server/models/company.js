
const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Company name is required',
        trim: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: 'City is required',
        trim: true,
    },
    postalCode: {
        type: String,
        required: 'Postal code is required',
        trim: true,
    },
    image: {
        type: String,
    },
    Admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]

}, {
    timestamps: true,
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;