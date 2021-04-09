package com.eci.ieti.mongofileapi.data;

import com.eci.ieti.mongofileapi.data.model.Todo;
import com.eci.ieti.mongofileapi.data.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TodoRepository extends MongoRepository<Todo, String> {

    List<Todo> findByResponsible(User responsible);

}


