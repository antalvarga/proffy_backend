import express from 'express';
import routes from './routes';

// Aula2 - 2:24:08
import cors from 'cors';


const app = express();

// Aula2 - 2:24:08
app.use( cors());



// Aula2 47:51
app.use( express.json());

// Aula2 - 1:27:03
app.use( routes );



app.listen(3333);

// Aula2 - 1:26:23 transfere as rotas para o arquivo routes.ts

// Rota é o endereço da aplicação
// http://localhost:3333/users
// http://localhost:3333 é a URL base
// /users é o recurso

// Aula2 - 45:00
// Corpo da requisição (request body) - Dados para criar/atualizar registros

// Aula2 - 47:58
// Route Params: Identificar um recurso na nossa rota que queremos atualizar / deletar
// Exemplo: 
// app.delete('/users/:id', ... )
// console.log( request.params )
// http://localhost:3333/users/1 

// Aula2 - 48:30
// Query Params: Usado por exemplo em listagem com paginação, filtros, ordenacao... 
// Exemplo:
// console.log( request.query )
// http://localhost:3333/users?page=2&sort=name

// app.get('/users', (request, response) => {

//     const users = [
//         {name: 'Antal', age: 52},
//         {name: 'Diego', age: 25},
//         {name: 'Vini' , age: 30},
//         {name: 'Juliana', age: 43},
//     ];

//     console.log( 'hello world');
//     console.log( 'hello zord2');
//     console.log( 'Acessou');

//     // return response.json( users );
//     return response.json( {message: 'Hello world'} );
    
// } );



// app.post('/users', (request, response) => {

//     console.log(request.body);

//     const users = [
//         {name: 'Antal', age: 52},
//         {name: 'Diego', age: 25},
//         {name: 'Vini' , age: 30},
//         {name: 'Juliana', age: 43},
//     ];

//     return response.json( users );    
// } );

