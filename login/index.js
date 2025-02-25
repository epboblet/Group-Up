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
const port = 8080;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Open database
const dbPromise = open({
    filename: './database/group-Up.sqlite',
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
    console.log('Cookies:', req.cookies);
    const { authToken } = req.cookies;
    console.log(authToken);

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
    const user = req.user;
    console.log("User: " + user.user_id);

    res.send({
            projects : [
                {
                    id: 1,
                    user: {
                        id: 1,
                        displayName: "Nimrod",
                        username: "nimrod",
                        profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
                    },
                    name: "Tower of Babel",
                    type: "Building",
                    description: `So were going to build this city right? 
                    στο κέντρο της πόλης θα είναι αυτός ο γιγάντιος πύργος. 
                    уый тыххæй хъæудзæн бирæ кусæг. 
                    つまり、本物のチームプレーヤーが何人か必要になるということです。
                    אם אינך יכול לעבוד כחלק מצוות אל תטרח אפילו להגיש מועמדות.
                    Ta wieża prawdopodobnie sięgnie nieba.`,
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg/500px-Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg',
                },
                {
                    id: 2,
                    user: {
                        id: 2,
                        displayName: "Tree Lover",
                        username: "arbor",
                        profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
                    },
                    name: "Planting a Bunch of Trees",
                    type: "Tree",
                    description: `TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
                    TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
                    TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, 
                    TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES, TREES! `,
                    image: 'https://www.snexplores.org/wp-content/uploads/2020/04/1030_LL_trees.png',
                },
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
                },
                {
                    id: 4,
                    user: {
                        id: 4,
                        displayName: "b",
                        username: "b",
                        profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
                    },
                    name: "b",
                    type: "b",
                    description: `b`,
                    image: 'https://www.shutterstock.com/image-illustration/hell-inferno-metaphor-souls-entering-600nw-2214585577.jpg',
                },
            ],
            users: [
                {
                    user: {
                        id: 1,
                        displayName: "Nimrod",
                        username: "nimrod",
                        profileIcon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg",
                        major: "Hunting",
                        year: "2154",
                        about: "Woah I really love stuff, big fan of stuff. I also really enjoy long sentences that fill out the about section of the profile so that I can see how stuff looks on the page.",
                        projectIDs: [ 1 ],
                    },
                }
            ]
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

//Start server on port 8080
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
        return res.render("login", { error: "All fields required" });
    }
    
    try{
        //Query database to see if username exists
        const result = await db.get('SELECT * FROM users WHERE username=?;', username); 
        if(!result){
            throw 'Error: username or password incorrect' //Return error message if user isn't found
        }
        //Check if passwords match
        const passwordMatch = await bcrypt.compare(password, result.password);
        if(!passwordMatch){
            throw 'Error: username or password incorrect' //Return error message if password is incorrect
         }
        const token = await grantAuthToken(result.user_id);
        res.cookie('authToken',token); //Set cookie with token 
        res.redirect('/'); //Redirect user to homepage after login is succesful 

    }catch(e){
        return res.render('login', { error: e});
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
        return res.render("register", { error: "All fields required" });
    }

    if(password !== confirmPass){
        return res.render("register", { error: "Passwords must match" });
    }

    //Query database to see if username exists
    const result = await db.get('SELECT * FROM users WHERE username=?;', username); 

    if(result){
        //If username already exists then render to login 
        return res.render("login", { error: "Error: user already exists" });
    }else{
        //If username does not exist then insert into database
        db.run("INSERT INTO users (username, password) VALUES(?, ?)", username, passwordHash);
        const createdAccount = await db.get("SELECT * FROM users WHERE username=?;", username);
        const token = await grantAuthToken(createdAccount.user_id);
        res.cookie('authToken', token);
        res.redirect("/");
    }

})




//If user clicks logout then redirect to login 
app.get("/logout", async(req, res) =>{
    res.clearCookie("authToken");
    res.redirect("/login")
})

