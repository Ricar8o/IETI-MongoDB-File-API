package com.eci.ieti.mongofileapi.data;

import com.eci.ieti.mongofileapi.data.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
