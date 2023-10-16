import { Document, Schema, model, models } from "mongoose";

interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  connectedWallet?: Boolean;
  walletAddress?: string;
  walletProvider?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    connectedWallet: { type: Boolean },
    walletAddress: { type: String },
    walletProvider: { type: String },
  },
  { timestamps: true }
);

const User =
  models.User || model<IUser>("User", userSchema);

export default User;
