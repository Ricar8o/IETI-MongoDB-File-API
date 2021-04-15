package com.eci.ieti.mongofileapi;

import java.net.URL;

import com.eci.ieti.mongofileapi.data.TodoRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

@SpringBootApplication
public class Application implements CommandLineRunner {

	Logger logger = LoggerFactory.getLogger(Application.class);

    @Autowired
    GridFsTemplate gridFsTemplate;

    @Autowired
    TodoRepository todoRepository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);

    }


    @Override
    public void run(String... args) throws Exception {
        gridFsTemplate.delete(new Query());
        todoRepository.deleteAll();
        URL url = new URL("https://i.dailymail.co.uk/i/pix/tm/2007/07/lionking1807_468x325._to_468x312jpeg");
        gridFsTemplate.store(url.openStream(), "lion.jpeg",  "image/jpeg");
        logger.info("Image successfully uploaded to the database");
    }
}