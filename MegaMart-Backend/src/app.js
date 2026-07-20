const express = require('express');
const cors = require('cors');
const authRoutes = require('./routers/auth/authRoutes');
const profileRoutes = require('./routers/user/profileRoutes');
const path = require('path');
const sellerRoutes = require('./routers/seller/sellerRoutes');
const adminRoutes = require('./routers/admin/adminRoutes');
const storeRoutes = require("./routers/store/storeRoutes");
const productRouter= require("./routers/product/productRoutes");
const variantRoutes = require("./routers/variant/variantRoutes");
const categoryRoutes = require("./routers/product/categoryRoutes");
const cartRoutes = require("./routers/cart/cartRoutes");
const wishlistRoutes = require("./routers/wishlist/wishlistRouter");
const addressRoutes = require("./routers/address/addressRoutes");
const checkoutRoutes = require("./routers/checkout/checkoutRoutes");
const oderRoutes = require("./routers/order/orderRoutes");
const adminOrderRoutes = require("./routers/order/adminOrderRouters");
const sellerOrderRoutes = require("./routers/order/sellerOrderRouters");
const paymentRoutes = require("./routers/payment/paymentRoutes");
const shipmentRoutes = require("./routers/shipping/shippingRoutes");

// ERROR MIDDLEWARE (IMPORTANT)
const errorMiddleware = require("./middlewares/errorMiddleware");



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


app.use(authRoutes);

// Routes
app.use('/api/auth' , authRoutes);
app.use('/api/profile' , profileRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/store" , storeRoutes);
app.use("/api/product" , productRouter);
app.use("/api/variant" , variantRoutes);
app.use("/api/category" , categoryRoutes);
app.use("/api/cart" , cartRoutes);
app.use("/api/wishlist" , wishlistRoutes);
app.use("/api/address" , addressRoutes);
app.use("/api/checkout" , checkoutRoutes);
app.use("/api/oder" , oderRoutes);
app.use("/api/admin/order" , adminOrderRoutes);
app.use("/api/seller/order" , sellerOrderRoutes);
app.use("/api/payment" , paymentRoutes);
app.use("/api/shipping" , shipmentRoutes);

app.get('/', (req , res)=>{
    res.send("Welcome to MegaMart API");
});


// ERROR HANDLER 

app.use(errorMiddleware);

module.exports = app;