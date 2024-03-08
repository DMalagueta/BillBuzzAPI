import mongoose, { Document, Schema } from 'mongoose';

interface IInvoice extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  clientName: string;
  amount: number;
  dueDate: Date;
  status: string;
}

const InvoiceSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true },
});

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);
