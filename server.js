const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser")

const app = express();

const customerRoutes =require('./routes/customers')

app.use(bodyParser.json());


app.use(customerRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://supun:itpmITPM123@customer.hawkgfz.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 
.then(() => {
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));


app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});
