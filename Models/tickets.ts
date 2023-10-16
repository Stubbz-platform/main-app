import { Document, Schema, model, models } from "mongoose";


interface ITicketsMetaData {
  name: string;
  symbol: string;
  description: string;
  attributes?: { trait_type: string; value: string }[];
  properties?: [];
}

//For each inidivdual ticket class
interface ITicketsClass {
  ticketClass?: string; //e.g "Regular", "VIP"
  publicKey: string; //For onchain id
  image: string; //Iamge of the individual ticket
  metadata: ITicketsMetaData;
  quantity: number; //Total supply of that particular ticket class
  sellerFee: number; //% of secondary sale to be collected by seller
  price: number; //Price of this particular class of ticket
}

interface ITickets extends Document {
  name: string;
  location?: string;
  eventType?: string;
  dateTime: string;
  tickets: ITicketsClass[];
}

const TicketsClassSchema: Schema<ITicketsClass> = new Schema({
  ticketClass: { type: String },
  image: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed, required: true },
  quantity: { type: Number, required: true },
  sellerFee: { type: Number, required: true },
  price: { type: Number, required: true },
});

const TicketsSchema = new Schema<ITickets>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    eventType: { type: String },
    dateTime: {
      type: String,
      required: true,
      default: new Date().toISOString(),
    },
    tickets: [TicketsClassSchema],
  },
  { timestamps: true }
);

const Ticket =
  models.Ticket || model<ITickets>("Ticket", TicketsSchema);

export default Ticket;
