import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

export const main = async (): Promise<void> => {
  const app = express();
  app.use(bodyParser.json());

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World!');
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
  });
};
