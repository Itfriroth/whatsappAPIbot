import express from 'express';
 import config from './config/env.js';
 import webhookRoutes from './routes/webhookRoutes.js';
 
 const app = express();
 app.use(express.json());
 
 app.use('/', webhookRoutes);
 
 app.get('/', (req, res) => {
   res.send(`<pre>Probando la inmobiliaria, nada que ver.</pre>`);
 });
 
 app.listen(config.PORT, () => {
   console.log(`Server is listening on port:  ${config.PORT}`);
 });