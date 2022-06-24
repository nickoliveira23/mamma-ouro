
exports.up = function (knex) {
    return knex.schema.createTable('schedule', function (table) {
        table.increments('id');
        table.dateTime('date_time');
        table.date('date');
        table.time('hour').notNullable();
        table.string('status').notNullable();

        table.integer('id_donor').references('donor.id').notNullable().onDelete('CASCADE');
        table.integer('id_hospital').references('hospital.id').notNullable().onDelete('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('schedule'); 
};
  