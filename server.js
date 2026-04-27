require('dotenv').config();  


const express = require('express'); 
const cors = require("cors");
const app = express(); 
const PORT = 3000 
const authRoute = require('./router/auth-router.js');
const contactRoute = require("./router/contact-router.js");
const serviceRoute = require("./router/service-router.js");
const adminRoute = require("./router/admin-router.js");
const connectdb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware.js');

// lets tackle cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};



app.use(cors(corsOptions));


app.use(express.json()); 


app.use("/api/auth", authRoute); 
app.use("/api/form", contactRoute);

app.use("/api/data", serviceRoute); 


// lets defind admin route

app.use("/api/admin", adminRoute);


app.use(errorMiddleware);


connectdb().then(()  => {

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
 });