import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import productRoutes from './routes/products.js';
import userRoutes from './routes/user.js';
import bannerRoutes from './routes/banner.js';
import categoriesRoutes from './routes/categories.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/banner', bannerRoutes);
app.use('/categories', categoriesRoutes);
// ssl certificate path .... may need to be updated if the file name changes
let server =  https.createServer({cert: fs.readFileSync('/etc/letsencrypt/live/grocygo.in-0001/fullchain.pem', 'utf8'), key: fs.readFileSync('/etc/letsencrypt/live/grocygo.in-0001/privkey.pem', 'utf8')},app)
const CONNECTION_URL = "DatabaseURL";
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // DB connection
.then(() => server.listen(PORT, () => console.log(`Server Running on port : ${PORT}`)))
.catch((error) => console.log(error));

app.get('/',(req,res)=>{
res.send('Server Working'); // test server live
});
