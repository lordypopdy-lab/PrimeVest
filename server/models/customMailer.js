import mongoose from "mongoose";

const { Schema } = mongoose;

const mailSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
mailSchema.index({ recipient: 1 });
mailSchema.index({ timestamp: -1 });

const CustomMailer = mongoose.model("customMail", mailSchema);

export default CustomMailer;