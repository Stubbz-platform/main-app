import { Document, Schema, Types, model, models } from "mongoose";
// import { Ticket, ITickets } from "./tickets";
import { ITicket } from "../types/ticketTypes";

interface IPartners extends Document {
  name?: string;
  location:string;
  tickets: Types.ObjectId | ITicket;

}

const partnersSchema = new Schema<IPartners>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    tickets: [{type: Schema.Types.Mixed, ref: "Tickets"}]

  },
  { timestamps: true }
);

const Partner =
  models.Partner || model<IPartners>("Partner", partnersSchema);

export default Partner;
