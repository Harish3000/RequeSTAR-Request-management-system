import mongoose, { Document, Schema } from "mongoose";

export enum Status {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export interface IRequest extends Document {
  requestId: string;
  createdOn: Date;
  location: string;
  service: string;
  status: Status;
  priority: Priority;
  department: string;
  requestedBy: string;
  assignedTo: string;
}

const requestSchema: Schema = new Schema({
  requestId: { type: String, required: true },
  createdOn: { type: Date, required: true },
  location: { type: String, required: true },
  service: { type: String, required: true },
  status: { type: String, enum: Object.values(Status), required: true },
  priority: { type: String, enum: Object.values(Priority), required: true },
  department: { type: String, required: true },
  requestedBy: { type: String, required: true },
  assignedTo: { type: String, required: true },
});

export default mongoose.model<IRequest>("Request", requestSchema);
