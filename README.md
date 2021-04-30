# Ass-Training
Ass-Training

## API

User Creation

Create Admin User : http://localhost:3000/api/v1/user/signup

{
    "email": "raviraj@gmail.com",
    "password": "raviraj",
    "type": "admin"
}

Create View User :  http://localhost:3000/api/v1/user/signup

{
    "email": "view@gmail.com",
    "password": "view",
    "type": "view"
}

Pass Token as part of bearer auth

Add New Subject – This should add new subject in the subject table.
POST: http://localhost:3000/api/v1/subject
{
    "name": "Physics",
    "stream": "science"
}

Get All Subject – Sort by ASC / DSC – This should return a list of all subjects. Default page size 10. User can pass parameter specifying different page size.
http://localhost:3000/api/v1/subject

Add New Training – This should add new training in the Training Course Table
POST: http://localhost:3000/api/v1/training
{
    "name": "Basics of Engg",
    "subjects": ["English"],
    "type": "Detailed"
}

Get Training – Filtered by Stream 
http://localhost:3000/api/v1/training?stream=Commerce

Get Training – Filtered by Type 
http://localhost:3000/api/v1/training?type=Detailed

Get Training – Filtered by Subject 
http://localhost:3000/api/v1/training?subject=math

Get Training
http://localhost:3000/api/v1/training
