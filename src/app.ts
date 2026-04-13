import express from "express";
import cors from 'cors';
import router from "./routes/mail";
const app = express();
app.use(express.json());
app.use(cors());

//endpoints:
app.use('/api',router);

app.use(express.static('public'));
export default app;