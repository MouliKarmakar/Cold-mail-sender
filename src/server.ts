import http from 'http';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const PORT=8000;
const Server=http.createServer(app);
Server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})