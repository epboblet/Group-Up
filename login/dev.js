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
    credentials: true, // Allow credentials (cookies)
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Open database
const dbPromise = open({
    filename: './database/Newgroup-Up.sqlite',
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
        console.log(req.user);
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
app.post("/logout", async(req, res) =>{
    res.cookie("authToken", "");
    res.status(200);
    res.send({message: "logged out"});
})

// Need a /profile route that returns the information for the logged in user(req.user)

app.get("/profile/:username", async (req, res) => {
    console.log(req.body);
    const db = await dbPromise;
    const username = req.params.username;

     //Retrieve user based on username
    const user = await db.get("SELECT user_id, username FROM users where username = ?", username);
    
    //If user not found return 404
    if (!user){
        return res.status(404).send("User not found");
    }
    //Ger users profile details
    const profile = await db.get("SELECT name, bio, skills, photo FROM profile WHERE user_id = ?", user.user_id);

    //Send the retrieved profile data as the response
    return res.send(profile);
})

//Edit/Update Profile page
app.post("/profile/:username", async (req, res) => {
    const db = await dbPromise;
    const username = req.params.username;

    //Retrieve user based on username
    const user = await db.get("SELECT user_id, username FROM users where username = ?", username);
    
    //If user not found return 404
    if(!user){
        return res.status(404).send("User not found");
    }

    //Get updated profile details
    const {name, bio, skills, picture } = req.body;

    //Update the profile details in the database for the user
    await db.run("UPDATE profile SET name = ?, bio = ?, skills = ?, picture = ? WHERE user_id = ?",
        name, bio, skills, picture, user.user_id);

        res.redirect(`/profile/${username}`);

});


