require("dotenv").config()
const fs = require('fs')
const express = require('express');
const { log } = require("console");
const app = express();
const port = 3000;


app.use(express.json())
app.use(express.urlencoded({extended : false}));

app.use(express.static(__dirname + '/'));


//! ALL GET ENDPOINTS!!!
    //? NAVBAR
        app.get('/',(req, res) => {
            // res.writeHead(200,{ 'Content-Type':'html' })
            res.status(200)
            res.sendFile( __dirname + '/index.html')
        })

        app.get('/home', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/index.html')
        })

        app.get('/apparels', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/apparels.html')
        })

        app.get('/anime', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/anime.html')
        })

        app.get('/support', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/support.html')
        })
        app.get('/search', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/search.html')
        })
        app.get('/login', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/login.html')
        })
        app.get('/signin', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/signin.html')
        })
        app.get('/profile',(req, res)=> {
            res.status(200)
            res.sendFile(__dirname + '/profile.html')
        })

    //?  MAIN AREA OF INDEX
        app.get('/product-tshirts', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/tshirt.html')
        })
        
        app.get('/product-hoodies', (req,res) => {
            res.status(200)
            res.sendFile( __dirname + '/hoodie.html')
        })









        app.get('/users', (req,res) => {
            let jsondata
            try {
                const data = fs.readFileSync('./products/data/users.json', 'utf-8');
                jsondata = JSON.parse(data);
                console.log(jsondata)
                res.status(200).json(jsondata);
            } catch (err) {
                console.error(err)
            }
        })

//! POST METHODS
    app.post('/signin',(req,res,next) => {
        try {
            const user = req.body;
            console.log("\"94, server.js\"", user )
            if (!checkUser(user)) {
                console.log("User not found.")
                console.log("Creating new user.")
                addUser(user)
                // 204 - Data received but No response sent.
                // 201 - Resource Created
                res.status(201)
                res.redirect('/login')
            }
            else {
                console.log(checkUser(user))
                console.log("ERR - user found")
                // res.redirect('/signin')
                // 400 - Bad request. Error from client side.
                res.status(400).json({
                    "err":"User already exists, go to login.",
                    "code":400
                })
            }
            next();
        } catch (error) {
            console.error(error);
        }
    })

    app.post('/login',(req,res,next) => {
        console.log(req.body);
        const user = req.body;
        searchUser(user);
        
        res.status(200)
        res.redirect('/')
        next();
    })



//! LISTEN
app.listen(port,() => {
    console.log(`Listening to http://localhost:${port}/`)
})




//! === === Functions === === 

function checkUser(inputuser) {
    let jsondata
    let check = 0
    try {
        const data = fs.readFileSync('./products/data/users.json', 'utf-8');
        jsondata = JSON.parse(data);
        jsondata.forEach(user => {
            if(inputuser.email === user.email) {
                check = 1
            }
        });
    } catch (err) {
        console.error(err)
    }
    
    if (check ==0) {
        return 0
    }
    if(check == 1) {
        return 1
    }
}


function addUser(user) {
    let push = []

    if (user.username !=="" & user.email !=="" & user.phonenumber !=="" & user.password !=="") {
        try {
            try {
                const data = fs.readFileSync('./products/data/users.json', 'utf-8');
                const jsondata = JSON.parse(data);
                jsondata.push(user)
                push = jsondata
            } catch (err) {
                console.error(err)
            }

            fs.writeFile("./products/data/users.json", JSON.stringify(push, null, 4), err => {
                if (err) {
                    console.log(err.message)
                } else {
                    console.log('File successfully written!')
                }
            })  
            console.log("User added successfully")        
        } catch (err) {
            console.error(err.message)
        }
    }
}