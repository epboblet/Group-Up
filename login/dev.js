/*
Author: Ava Flansbaum

Date: 11/14/2024

Description: Group Up Login

*/


import express, { json } from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const port = 8081;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies)
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Open database
const dbPromise = open({
    filename: './database/group-Up_dev.sqlite',
    driver: sqlite3.Database
})

//Set up base behaviors
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//Set up handlebards as view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Middleware function
app.use(async(req, res, next) => {
    const { authToken } = req.cookies;

    if(!authToken){ //if no authtoken then go to next route 
        return next();
    }
    try{
        const user = await lookupUserFromAuthToken(authToken);
        req.user = user; //Attach user opject to request 
    }catch(e){
        next(e);
    }
    next();
})

//Render homepage
app.get("/", async(req,res) =>{
    if(req.user){ //Check if user exists
        const db = await dbPromise;
        
        res.render('home', {layout:"main",
            
        }) 
    }else{
        return res.redirect('/login');
    }

})

// sends data to the website
app.get("/test", async(req,res) =>{
    res.send(
        {
            id: 3,
            user: {
                id: 3,
                displayName: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                username: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
            },
            name: "AAAAAAAAAAAAAAAAAAAAAAAAA",
            type: "AAAAAAAAAAAAAAAAAAAAAAAA",
            description: `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`,
            image: 'https://www.shutterstock.com/image-illustration/hell-inferno-metaphor-souls-entering-600nw-2214585577.jpg',
        }
    )
})

// recieves data from the website
app.post("/update", async(req,res) =>{
    console.log(req.body);
    res.status(200);
})

app.get("/register", (req,res) =>{
    res.render("register", {layout:false});
})

app.get("/login", (req,res) =>{
    res.render("login", {layout:false});
})

//Start server on port 8081
app.listen(port, () =>{
    console.log(`Server started on port: ${port}`);
})


//Generate an auth token
const grantAuthToken = async(user_id)=>{
    const db = await dbPromise;
    const tokenString = uuidv4(); //Generate unique token string 
    //Insert token and user id into authtokens table
    await db.run('INSERT INTO authtokens (token, user_id) VALUES (?, ?);', tokenString, user_id);
    return tokenString;
}

//Lookup user based on auth token 
const lookupUserFromAuthToken = async(authToken)=>{
    const db = await dbPromise;
    //Query database to find token 
    const token = await db.get('SELECT * FROM authtokens WHERE token=?;', authToken);
    console.log(token);
    console.log(authToken);
    //Get username and id based on token 
    const user = await db.get('SELECT user_id, username FROM users WHERE user_id=?;',token.user_id);
    return user;

}


//Login 
app.post("/login", async(req, res)=>{
    const db = await dbPromise;
    const username = req.body.username; //Get username from form
    const password = req.body.password; //Get password from form 

      //If there is an empty field than return error and render login
      if((!username) || (!password)){
        res.status(401);
        return res.send({ message: "All fields required" });
    }
    
    try{
        //Query database to see if username exists
        const result = await db.get('SELECT * FROM users WHERE username=?;', username); 

        if(!result){
            res.status(401);
            return res.send({message: 'Username or password incorrect'}); //Return error message if user isn't found
        }

        //Check if passwords match
        const passwordMatch = await bcrypt.compare(password, result.password);
        if(!passwordMatch){
            res.status(401);
            return res.send({message: 'Username or password incorrect'}) //Return error message if password is incorrect
        }

        const token = await grantAuthToken(result.user_id);

        res.cookie('authToken',token); //Set cookie with token 
        res.status(200);
        return res.send({message: "yipee"}); //Redirect user to homepage after login is succesful 

    }catch(e){
        return res.send({ message: e});
    }

    });


//Register
app.post("/register", async(req, res)=>{
    const db = await dbPromise;
    const username = req.body.username; //Get username from form
    const password = req.body.password; //Get password from form 
    const confirmPass = req.body.confirmPass; //Get confirmed password from form 
    const passwordHash = await bcrypt.hash(password, 10);

    //If there is an empty field than return error 
    if((!username) || (!password) || (!confirmPass)){
        res.status(401);
        
        return res.send({
            message: "All fields required"
        })
    }

    if(password !== confirmPass){
        res.status(401);
        return res.send({
            message: "Passwords must match"
        })
    }

    //Query database to see if username exists
    const result = await db.get('SELECT * FROM users WHERE username=?;', username); 

    if(result){
        //If username already exists then render to login 
        res.status(401);
        return res.send({ 
            message: "User already exists" 
        });
    }else{
        //If username does not exist then insert into database
        db.run("INSERT INTO users (username, password) VALUES(?, ?)", username, passwordHash);
        const createdAccount = await db.get("SELECT * FROM users WHERE username=?;", username);
        const token = await grantAuthToken(createdAccount.user_id);
        res.cookie('authToken', token);
        return res.send({message: "yipee"});
    }

})




//If user clicks logout then redirect to login 
app.get("/logout", async(req, res) =>{
    res.clearCookie("authToken");
    res.redirect("/login")
})

