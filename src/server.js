import passport from 'passport';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import { logs } from './vars';
import routes from './routes';
import { jwt, facebook, google } from './passport';
import error from './middlewares/error';
/**
* Express instance
* @public
*/
const server = express();

// request logging. dev: console | production: file
server.use(morgan(logs));

// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
server.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
server.use(methodOverride());

// secure apps by setting various HTTP headers
server.use(helmet());

// enable CORS - Cross Origin Resource Sharing
server.use(cors());

// enable authentication
server.use(passport.initialize());
passport.use(jwt);
passport.use('facebook', facebook);
passport.use('google', google);

// mount api v1 routes
server.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
server.use(error.converter);

// catch 404 and forward to error handler
server.use(error.notFound);

// error handler, send stacktrace only during development
server.use(error.handler);

export default server;
