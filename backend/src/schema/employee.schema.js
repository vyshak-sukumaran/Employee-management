const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * @type {import('mongoose').Schema}
 */
const employeeSchema = mongoose.Schema({
  id: { type: Number, default:0, unique: true },
  name: { type: String, min: 2, max: 50, required: true },
  address: { type: String, max: 500 },
  dob: { type: Date },
  empStatus: Boolean,
  salary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salary'
  }
}, { timestamps: true });


employeeSchema.plugin(AutoIncrement, { inc_field: 'id' })

const Employee = mongoose.model("Employee", employeeSchema);


module.exports = Employee