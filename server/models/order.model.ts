import mongoose, { Document, Schema } from "mongoose";

/* =========================
   Order Item
========================= */

interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit?: string;
}

/* =========================
   Shipping Address
========================= */

interface IShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  label?: string;
}

/* =========================
   Status History
========================= */

interface IStatusHistory {
  status: string;
  message?: string;
  timestamp: Date;
}

/* =========================
   Live Location
========================= */

interface ILiveLocation {
  lat: number;
  lng: number;
  updatedAt: Date;
}

/* =========================
   Order
========================= */

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;

  items: IOrderItem[];

  shippingAddress: IShippingAddress;

  paymentMethod: string;

  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;

  status: string;

  statusHistory: IStatusHistory[];

  deliveryPartnerId?: mongoose.Types.ObjectId;

  deliveryOtp?: string;

  liveLocation?: ILiveLocation;

  isPaid: boolean;

  createdAt: Date;
  updatedAt: Date;
}

/* =========================
   Schemas
========================= */

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      default: "piece",
    },
  },
  {
    _id: false,
  }
);

const shippingAddressSchema =
  new Schema<IShippingAddress>(
    {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      zip: {
        type: String,
        required: true,
      },

      label: {
        type: String,
        default: "Home",
      },
    },
    {
      _id: false,
    }
  );

const statusHistorySchema =
  new Schema<IStatusHistory>(
    {
      status: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        default: "",
      },

      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    {
      _id: false,
    }
  );

const liveLocationSchema =
  new Schema<ILiveLocation>(
    {
      lat: {
        type: Number,
        required: true,
      },

      lng: {
        type: Number,
        required: true,
      },

      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      _id: false,
    }
  );

/* =========================
   Order Schema
========================= */

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["card", "cod", "upi"],
      default: "card",
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "Preparing",
        "OutForDelivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },

    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },

    deliveryPartnerId: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryPartner",
      default: null,
    },

    deliveryOtp: {
      type: String,
      default: "",
    },

    liveLocation: {
      type: liveLocationSchema,
      default: null,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>(
  "Order",
  orderSchema
);

export default Order;