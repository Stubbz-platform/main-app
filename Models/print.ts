import { Document, Schema, Types, model, models } from "mongoose";

interface IPrint extends Document {
  address: string;
}

const PrintSchema = new Schema<IPrint>(
  {
    address: { type: String, required: [true, "Address Do Not Match"] },
  },
);

const Print = models.print;

export default Print;
