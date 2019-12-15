const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const habitSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  dates: [Date]
});

habitSchema.plugin(uniqueValidator);

const Habit = mongoose.model("Habit", habitSchema, "habits");

module.exports = Habit;
