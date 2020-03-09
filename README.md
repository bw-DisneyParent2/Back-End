# Disney-Parent2 Back-End
The Purpose of this App is to swap your kids with volunteer parents at rides at Disney Land.
### End Points

## Auth Routes

# POST /api/auth/register

{
	"email": "Gokusan@dbz.com",
	"password":"Kakarot",
	"name": "Goku",
	"number_of_kids": 3,
	"ride": "Nimbus",
	"time": "7:30 AM"
}

# Returns

{
    "created_user": {
        "id": 9,
        "email": "Gokusan@dbz.com",
        "password": "$2a$12$w5yuIF30QJHLhHNmnVHEm.TxiM22/9lP1wkDZMBFnUb5gFp8DuLwu",
        "name": "Goku",
        "number_of_kids": 3,
        "ride": "Nimbus",
        "time": "7:30 AM"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJlbnRpZCI6OSwiZW1haWwiOiJHb2t1c2FuQGRiei5jb20iLCJpYXQiOjE1ODM3ODE3ODcsImV4cCI6MTU4Mzc4NTM4N30.bDnPvZ6JNfywPc8TqGe0cZLR_HVuIovyTRT_GuJTEPM"
}

# POST /api/aut/ login


{
      email': 'Goku@DBZ.com',
      'password': 'password',
      'name': 'Goku'
}

# Returns

{
    "email": "Gokusan@dbz.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJlbnRpZCI6OSwiZW1haWwiOiJHb2t1c2FuQGRiei5jb20iLCJpYXQiOjE1ODM3ODE5MDIsImV4cCI6MTU4Mzc4NTUwMn0._H_UHKDT_cohy8W4bBcDdAX6o8oCvs_TPmjVQ6qVgfI"
}

# DEL api/auth/logout

Destroys session. Button should lead to above URL.
 If succesful should get message "See you again soon!"

 ## PARENTS these endpoints are protected and need to have a token submitted in the Header under Authorization

 # GET api/parents

 Will work with With Token in header 

 # Token Example 
 "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJlbnRpZCI6OSwiZW1haWwiOiJHb2t1c2FuQGRiei5jb20iLCJpYXQiOjE1ODM3ODE5MDIsImV4cCI6MTU4Mzc4NTUwMn0._H_UHKDT_cohy8W4bBcDdAX6o8oCvs_TPmjVQ6qVgfI

 # Returns

 [
    {
        "id": 7,
        "email": "poop@scoop.com",
        "name": "Scooby Doo",
        "number_of_kids": 1,
        "ride": "Tea cups",
        "time": "1:00 am"
    },
    {
        "id": 8,
        "email": "Raph@tmnt.com",
        "name": "Leonardo",
        "number_of_kids": 1,
        "ride": "Haunted Mansion",
        "time": "7:30 AM"
    },
    {
        "id": 9,
        "email": "Gokusan@dbz.com",
        "name": "Goku",
        "number_of_kids": 3,
        "ride": "Nimbus",
        "time": "7:30 AM"
    }
]

# GET /api/parents/:id

 Will work with With Token in header 

 # Returns

 {
    "id": 9,
    "email": "Gokusan@dbz.com",
    "password": "$2a$12$w5yuIF30QJHLhHNmnVHEm.TxiM22/9lP1wkDZMBFnUb5gFp8DuLwu",
    "name": "Goku",
    "number_of_kids": 3,
    "ride": "Nimbus",
    "time": "7:30 AM"
}

# PUT /api/parents/:id

{
	"email": "Gokusan@dbz.com",
	"password":"Kakarot",
	"name": "Goku",
	"number_of_kids": 3,
	"ride": "Nimbus",
	"time": "7:30 AM"
}

# Returns 

{
    "message": "Updated the user!",
    "data": {
        "email": "Gokusan@dbz.com",
        "password": "Kakarot",
        "name": "Goku",
        "number_of_kids": 4,
        "ride": "Space Mountain",
        "time": "11:45 PM"
    }
}

# DEL /api/parents/:id

 Will work with With Token in header 

 # Returns

{
    "message": "Successfully removed the parent 9."
}




