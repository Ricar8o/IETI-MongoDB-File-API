package com.eci.ieti.mongofileapi.controller;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

import com.eci.ieti.mongofileapi.data.TodoRepository;
import com.eci.ieti.mongofileapi.data.model.Todo;
import com.mongodb.client.gridfs.model.GridFSFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RequestMapping("api")
@RestController
public class RESTController {
    
    @Autowired
    GridFsTemplate gridFsTemplate;

    @Autowired
    TodoRepository todoRepository;

    @RequestMapping("/files/{filename}")
    public ResponseEntity<InputStreamResource> getFileByName(@PathVariable String filename) throws IOException {

        GridFSFile file = gridFsTemplate.findOne(new Query().addCriteria(Criteria.where("filename").is(filename)));

        if (file!=null){
            GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
        return ResponseEntity.ok()
            .contentType(MediaType.valueOf(resource.getContentType()))
            .body(new InputStreamResource(resource.getInputStream()));
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/files")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws IOException {
        String name  = URLEncoder.encode(file.getOriginalFilename(), StandardCharsets.UTF_8);
        gridFsTemplate.store(file.getInputStream(), name, file.getContentType());

        return ResponseEntity.created(null)
        .contentType(MediaType.APPLICATION_JSON)
        .body("/api/files/"+name);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/todo")
    public Todo createTodo(@RequestBody Todo todo) {        
        return todoRepository.save(todo);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/todo")
    public List<Todo> getTodoList() {
        return todoRepository.findAll();
    }

}
