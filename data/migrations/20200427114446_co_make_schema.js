
exports.up = function(knex) {

	return knex.schema.createTable('locations', locations => {
		locations.increments();
		locations.string('zip_code', 10)
			.notNullable();
	})

	.createTable('users', users => {
		users.increments();

		users.string('username', 64)
			.notNullable()
			.unique();
		users.string('password', 64)
			.notNullable();
		users.string('first_name', 64)
			.notNullable();
		users.string('last_name', 64)
			.notNullable();
		users.string('zip_code', 10)
			.notNullable();
		users.integer('locationsId', 10)
			.unsigned()
	        .references('id')
	        .inTable('locations')
			.onUpdate('CASCADE')
        	.onDelete('CASCADE');
	})

	.createTable('issues', issues => {
		issues.increments();

		issues.string('zip_code', 10)
			.notNullable();
		issues.string('title', 64)
			.notNullable();
		issues.string('post', 256)
			.notNullable();
		issues.integer('upvote', 10)
			.defaultTo(0);
		issues.integer('userId', 9)
			.unsigned()
	        .references('id')
	        .inTable('users')
			.onUpdate('CASCADE')
        	.onDelete('CASCADE');
        issues.integer('locationsId', 9)
			.unsigned()
	        .references('id')
	        .inTable('locations')
			.onUpdate('CASCADE')
        	.onDelete('CASCADE');
	})

/*
	.createTable('users-locations', userLocations => {
		userLocations.increments();

		userLocations.integer('usersId', 9)
			.unsigned()
	        .notNullable()
	        .references('id')
	        .inTable('users')
			.onUpdate('CASCADE')
        	.onDelete('CASCADE');
		userLocations.integer('locationsId', 9)
			.unsigned()
	        .notNullable()
	        .references('id')
	        .inTable('locations')
			.onUpdate('CASCADE')
        	.onDelete('CASCADE');
	})

	.createTable('locations-issues', locationsIssues => {
		locationsIssues.increments();
		locationsIssues.integer('locationsId', 9)
			.unsigned()
	        .notNullable()
	        .references('id')
	        .inTable('locations')
			.onUpdate('CASCADE')
        	.onDelete('CASCADE');
		locationsIssues.integer('issuesId', 9)
			.unsigned()
	        .notNullable()
	        .references('id')
	        .inTable('issues')
			.onUpdate('CASCADE')
        	.onDelete('CASCADE');
	})
*/

};

exports.down = function(knex) {
 	return knex.schema
		 	// .dropTableIfExists('locations-issues')
		 	// .dropTableIfExists('users-locations')
		 	.dropTableIfExists('issues')
		 	.dropTableIfExists('users')
		 	.dropTableIfExists('locations');
};
