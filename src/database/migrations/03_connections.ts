import Knex from 'knex';

export async function up(knex : Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        // Aula2 - 2:18:49 .defaultTo('now()');
        // AULA2 - 2:20:36 .defaultTo('CURRENT_TIMESTAMP');
        table.timestamp('created_at').notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            
        
        table.integer( 'user_id' )
            .notNullable()
            .references( 'id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
}  

export async function down( knex: Knex){
    return knex.schema.dropTable( 'connections' );
}   