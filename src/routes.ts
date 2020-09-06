// Aula2 - 1:25:33
import express, { request, response } from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
// routes.get('/users', (request, response) => {
//     // return response.json( users );
//     return response.json( {message: 'Hello world 2 (a missão)'} );    
// } );

// Aula2 - 1:55:46
const classesControllers = new ClassesController();

// Aula2 - 2:17:13
const connectionsController = new ConnectionsController();

// Criando a rota para aulas
// async = promisses
// Aula2 - 1:53:54 - Vide em ...> _NLW2> OmniStack_Diego> Aula2
// Transferir o conteúdo abaixo para controller> 
routes.post('/classes', classesControllers.create);

// Aula2 - 2:01:42
routes.get('/classes', classesControllers.index);

// Aula2 - 2:17:00
routes.post('/connections', connectionsController.create);

// Aula2 - 2:22:51
routes.get('/connections', connectionsController.index);


export default routes; 