const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const AuthRouter = require('./Routes/Authrouter');
require('dotenv').config();
require('./Models/db'); // Connect to MongoDB

const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('pong');
}) 
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
