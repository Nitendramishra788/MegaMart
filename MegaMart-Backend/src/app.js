const express = require('express');
const cors = require('cors');
const authRoutes = require('./routers/auth/authRoutes');
const profileRoutes = require('./routers/user/profileRoutes');
const path = require('path');




const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads' , 
    express.static(
        path.join(__dirname, "uploads  ")
    )
);


app.use(authRoutes);

// Routes
app.use('/api/auth' , authRoutes);
app.use('/api/profile' , profileRoutes);

app.get('/', (req , res)=>{
    res.send("Welcome to MegaMart API");
});

module.exports = app;