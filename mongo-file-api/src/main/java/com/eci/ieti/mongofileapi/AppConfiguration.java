package com.eci.ieti.mongofileapi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

@Configuration
public class AppConfiguration {
	
	@Value("${spring.data.mongodb.uri}")
	private String connectionString;

    @Bean
	public MongoDatabaseFactory mongoDbFactory() throws Exception {

		// Create URI
		// MongoClientURI mongoClientUri = new MongoClientURI();

		// Create DB factory
		return new SimpleMongoClientDatabaseFactory(connectionString);
	}

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {

        return new MongoTemplate(mongoDbFactory());
    }

    @Bean
    public GridFsTemplate gridFsTemplate() throws Exception {
        MongoTemplate mongoTemplate = mongoTemplate();
        return new GridFsTemplate(mongoDbFactory(), mongoTemplate.getConverter());
    }



}

