import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import path from 'path';
import { defaultToPets } from './controllers/petsController';
import { db } from './models';
import petsRoutes from './routes/petsRoutes'


const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../src/public')));

// Setting view engine as Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../src/views"));
app.set('view options', { layout: 'layout' });

// Routing Middleware
app.use('/pets', petsRoutes)
app.use('/', defaultToPets)

// Error Handling Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).render('error', {
    message: "This is not the URL you are looking for!"
  });
})

// Syncing our database
db.sync().then(() => {
  console.info("-------- DATABASE CONNECTION SUCCESSFUL --------")
});

app.listen(3000);