const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bankRoutes = require('./routes/BankRoutes');// Ensure this path is correct
const cors = require('cors');

const app = express();
const PORT = 5500;
//const MONGO_URL = `mongodb://localhost:27017/customers`;
//const MONGO_URL = `mongodb+srv://selva91823:Selva91823@cluster0.sxbcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const MONGO_URL = `mongodb+srv://selvakumar:WT7XhqzlC6gyEXnW@cluster0.rkrxhzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Connect to MongoDB
mongoose.connect(MONGO_URL, {

})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });


// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use('/api/customers', bankRoutes);// Ensure this path is correct
setTimeout(() => {
    app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));

}, 3000)

