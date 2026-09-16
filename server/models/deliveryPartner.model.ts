import mongoose, { Document, Schema } from "mongoose";

export interface IDeliveryPartner extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
  vehicleType?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const deliveryPartnerSchema =
  new Schema<IDeliveryPartner>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
        select: false,
      },

      phone: {
        type: String,
        required: true,
      },

      avatar: {
        type: String,
        default: "",
      },

      vehicleType: {
        type: String,
        enum: ["bike", "scooter", "car", "van", "truck"],
        default: "bike",
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

const DeliveryPartner =
  mongoose.model<IDeliveryPartner>(
    "DeliveryPartner",
    deliveryPartnerSchema
  );

export default DeliveryPartner;