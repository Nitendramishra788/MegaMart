const shipmentSchema = new mongoose.Schema(
  {
    // Identity
    shipmentNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    trackingNumber: {
      type: String,
      default: null,
      index: true,
    },

    // Relationships
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    sellerOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SellerOrder",
      required: true,
      unique: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Status
    status: {
      type: String,
      enum: [
        "created",
        "picked_up",
        "in_transit",
        "out_for_delivery",
        "delivery_failed",
        "delivered",
        "cancelled",
      ],
      default: "created",
    },

    // Items
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    // Shipping Address Snapshot
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      addressLine1: {
        type: String,
        required: true,
      },

      addressLine2: String,

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        default: "India",
      },
    },

    // Package
    package: {
      weight: Number,

      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
    },

    // Courier
    courier: {
      name: String,
      service: String,
    },

    trackingUrl: String,

    // Timeline
    timeline: [
      {
        status: {
          type: String,
          required: true,
        },

        location: String,

        description: String,

        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Delivery
    deliveredAt: {
      type: Date,
      default: null,
    },

    // Delivery Failure
    deliveryAttempts: {
      type: Number,
      default: 0,
    },

    lastFailureReason: {
      type: String,
      default: null,
    },

    // Cancellation
    cancelledAt: {
      type: Date,
      default: null,
    },

    cancellationReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;