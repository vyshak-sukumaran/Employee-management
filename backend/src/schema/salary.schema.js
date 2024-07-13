const mongoose = require("mongoose");

/**
 * @type {import('mongoose').Schema}
 */
const salarySchema = mongoose.Schema({
    basicPay: Number,
    hra: Number,
    pf: Number,
    tax: Number,
    grossPay: Number,
    netPay: Number
}, { timestamps: true });

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary