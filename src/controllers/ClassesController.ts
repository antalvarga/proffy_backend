// Aula2 - 1:25:33 ~ 1:55:45
import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';


// Aula2 - 1:43:17
interface ScheduleItem {
    week_day : number;
    from: string;
    to: string;
}


export default class ClassesController {
    // Aula2 - 1:57:13
    async index( request:Request, response:Response) {
        const filters = request.query;

        // Aula2 - 2:02:45
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // Aula2 - 1:57:48
        if( !filters.week_day || !filters.subject || !filters.time ) {
            response.status(400).json({
                error: 'Missing filter to search classes'
            })
        }

        // Aula2 - 2:00:39 ~ 2:03:13
        const timeInMinutes = convertHourToMinutes(time);

        //console.log( timeInMinutes);

        // Aula2 - 2:02:02 ~ 2:05:13
        // Aula2 - 2:08:27 - no whereRaw é necessário usar aspas simples 
        // e crase (para identificar a tabela e suas colunas) 
        const classes = await db( 'classes' )
            .whereExists( function() {
                this.select( 'class_schedule.*' )
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <=??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where( 'classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']) ;


        return response.json( classes );

    }


    // Aula2 - 1:55:13 ~ 1:55:45
    // perdeu a tipagem do express qd abstraimos para este arquivo controller
    // async create(request, response) {
    async create(request : Request, response : Response) {
        // const data = request.body;
        // console.log(data);
        // Aula2 - 1:32:38 fazer a desestruturação
        const {
            name
            , avatar
            , whatsapp
            , bio
            , subject
            , cost 
            , schedule
        } = request.body;
    
    
        // Aula2 - 1:49:07 - Criar transation
        const trx = await db.transaction();
    
        // Aula2 - 1:50:10 - try
        try {
    
            // Aula2 1:33:38 - Se o nome que vou passar como valor for o mesmo então posso omitir
            // Aula2 1:37:10 - await db('users').insert({
            // Recuperar o id do usuario inserido
            // Aula2 - 1:49:20 - trocar db por trx (transation)
            // const insertedUsersIds = await db('users').insert({    
            const insertedUsersIds = await trx('users').insert({    
                name
                , avatar
                , whatsapp
                , bio
                ,
            });
        
            // É retornado um array com todos os ids inseridos 
            const user_id = insertedUsersIds[0];
        
            // Aula2 1:37:00
            // Aula2 1:39:40 await db('classes').insert({
            const insertedClassesIds = await trx('classes').insert({    
                subject
                , cost
                , user_id
                ,
            })
        
            // Aula2 - 1:39:50 - Criar o schedule
            const class_id = insertedClassesIds[0];
        
            // Aula2 - 1:42:59 ~ 
            // Como será necessário converter mais de uma vez faremos uma funcao
            // Aula2 - 1:44:24 - Criar funcao na pasta utils
            // Para não usarmos tipo any criaremos uma interface
            // const classSchedule = schedule.map( (scheduleItem : any) => {
            // converter para a menor unidade de tempo - Neste caso minutos
            const classSchedule = schedule.map( (scheduleItem : ScheduleItem) => {
                return {
                    class_id
                    , week_day: scheduleItem.week_day
                    , from: convertHourToMinutes(scheduleItem.from)
                    , to: convertHourToMinutes(scheduleItem.to)
                    ,
                };
            });
        
            // Inserir o schedule - Aula2 - 1:47:11
            // Aula2 - 1:49:20 - trocar db por trx (transation)
            //await db('class_schedule').insert( classSchedule );
            await trx('class_schedule').insert( classSchedule );
        
            // Aula2 - 1:49:30 
            await trx.commit();
        
            // Aula2 - 1:51:37
            // return response.send();
            return response.status(201).send();
    
        } catch (err) {
    
            // Aula2 - 1:51:00
            console.log(err);
    
            // Aula2 - 1:51:18
            trx.rollback();
    
            return response.send( 400 ).json({
                error: 'Unexpected error while creating new class'
            })
        }
    
    }    
}