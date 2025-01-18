import { Schema, model, models } from "mongoose";

const userSchems = new Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const DivarUser = models.DivarUser || model("DivarUser", userSchems);

export default DivarUser;
