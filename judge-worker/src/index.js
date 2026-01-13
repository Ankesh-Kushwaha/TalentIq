import express from 'express'
import { environment } from './utils/env.js'
import cors from 'cors'
import mongoose from 'mongoose'
import redis from './config/redisConfig.js'
import { startQueueConsumer } from './utils/codeexecutionEngine.js'
import submissionRouter from './routes/codeSubmissionroute.js'

const PORT = environment.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/health', (req, res) => {
  res.status(200).json("server is healthy");
})

//to do apply rate-limiting  on this api;
app.use('/api', submissionRouter);  

//connection to data base and redis;

(async () => {
  await redis.connect();

  mongoose
    .connect(environment.DB_URL)
    .then(() => console.log("Worker connected to Mongo"))
    .catch((err) => console.error("Worker Mongo error:", err));

  console.log("Worker listening to Redis queue…");
  startQueueConsumer();
})();


app.listen(PORT, () => {
  console.log(`server is running on the :${PORT}`);
})