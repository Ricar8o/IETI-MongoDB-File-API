**NOTE**


## Run Backend

    cd mongo-file-api
    gradle bootRun

    # then go to http://localhost:8080

## ROUTES


### Task
    
    GET
    /api/todo   # Get All Todos

    POST
    /api/todo   # Post Task
    Example body:
        {
            "description": "Test",
            "priority": 0,
            "dueDate": "2021-04-15T00:00:00.000+00:00",
            "responsible": {
                "name": "Ricardo Martinez",
                "email": "ricardo@somemail.com"
            },
            "status": "Done",
            "fileUrl": "/api/files/icfes.jpg"
        }

### Files

    GET 
    /api/files

    POST
    /api/files
    Body is a form data with an atributte called "file" that contains the file to upload.



# Test React component 

    cd frontend-consumption
    npm install
    npm start

    Go to http://localhost:3000/