import express from 'express';
import cors from 'cors';
import { hostsRouter } from './routes/hosts';
import { signupsRouter } from './routes/signups';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.use('/api', hostsRouter);
app.use('/api', signupsRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
