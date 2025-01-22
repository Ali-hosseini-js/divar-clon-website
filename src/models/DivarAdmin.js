import { Schema, model, models } from "mongoose";

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const DivarAdmin = models.DivarAdmin || model("DivarAdmin", adminSchema);

export default DivarAdmin;
