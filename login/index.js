/*
Author: Ava Flansbaum

Date: 11/14/2024

Description: Group Up Login

*/


import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid'
import multer from 'multer';
import fs from 'fs';

let postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Image/Post/')
    },
    filename: function (req, file, cb) {
      let extension = file.mimetype.split("/").at(-1);
      cb(null, nanoid() + Date.now() + '.' + extension);
    }
})

const postUpload = multer({ 
    storage: postStorage,
    //25 mb
    limits: {fileSize: 25000000},
})

let profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Image/Profile/')
    },
    filename: function (req, file, cb) {
        let extension = file.mimetype.split("/").at(-1);
        cb(null, nanoid() + '.' + extension);
    }
})

const profileUpload = multer({ 
    storage: profileStorage,
    //25 mb
    limits: {fileSize: 25000000},
})




const app = express();
const port = 8080;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//this lets express serve images
//'/image' sets the root route 
//default icon is at 'localhost:8080/image/profile/default.jpg'
app.use('/image', express.static('image'));

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

    res.send({
            projects : [
                {
                    id: 1,
                    user: {
                        id: 1,
                        displayName: "Nimrod",
                        username: "nimrod",
                        profileIcon: "http://localhost:8080/image/profile/default.jpg"
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
                        profileIcon: "http://localhost:8080/image/profile/default.jpg"
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
                        profileIcon: "http://localhost:8080/image/profile/default.jpg"
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
                        profileIcon: "http://localhost:8080/image/profile/default.jpg"
                    },
                    name: "b",
                    type: "b",
                    description: `b`,
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Thomas_Bresson_-_Hym%C3%A9nopt%C3%A8re_sur_une_fleur_de_pissenlit_%28by%29.jpg/2560px-Thomas_Bresson_-_Hym%C3%A9nopt%C3%A8re_sur_une_fleur_de_pissenlit_%28by%29.jpg',
                },
            ],
            users: [
                {
                    user: {
                        id: 1,
                        name: "Nimrod",
                        username: "nimrod",
                        photo: "http://localhost:8080/image/profile/default.jpg",
                        major: "Hunting",
                        year: "2154",
                        bio: "Woah I really love stuff, big fan of stuff. I also really enjoy long sentences that fill out the about section of the profile so that I can see how stuff looks on the page.",
                        skills: "",
                    },
                }
            ]
        }
    )
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
    //Get username and id based on token 
    const user = await db.get('SELECT user_id, username FROM users WHERE user_id=?;',token.user_id);
    return user;

}

const linkFromPath = (path, type) => {
    if(path == null && type == "profile"){
        path = path ?? "Image/Profile/Default/profile-icon.jpg";
    }
    else if(path == null && type == "post") {
        return null;
    }
    path = pathFromLink(path);
    return `http://localhost:${port}/${path}`;
}

const pathFromLink = (link) => {

    return link.replaceAll(`http://localhost:${port}/`, "");
}


//Login 
app.post("/login", async(req, res)=>{
    const db = await dbPromise;
    const username = req.body.username; //Get username from form
    const password = req.body.password; //Get password from form 

      //If there is an empty field than return error and render login
      if((!username) || (!password)){
        return res.status(401).send({ message: "All fields required" });
    }
    
    try{
        //Query database to see if username exists
        const result = await db.get('SELECT * FROM users WHERE username=?;', username); 
        if(!result){
            return res.status(401).send({message: 'Username or password incorrect'});
        }
        //Check if passwords match
        const passwordMatch = await bcrypt.compare(password, result.password);
        if(!passwordMatch){
            return res.status(401).send({message: 'Username or password incorrect'});
        }
        const token = await grantAuthToken(result.user_id);
        res.cookie('authToken',token); //Set cookie with token 
        return res.status(200).send({message: "yipee"}); //Redirect user to homepage after login is succesful 

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
        return res.send({ error: "All fields required" });
    }

    if(password !== confirmPass){
        return res.send({ error: "Passwords must match" });
    }

    //Query database to see if username exists
    const result = await db.get('SELECT * FROM users WHERE username=?;', username);

    if(result){
        //If username already exists then render to login 
        return res.send({ error: "Error: user already exists" });
    }else{
        //If username does not exist then insert into database
        db.run("INSERT INTO users (username, password) VALUES(?, ?)", username, passwordHash);
        const createdAccount = await db.get("SELECT * FROM users WHERE username=?;", username);

        //Update: Insert default profile for user
        await db.run("INSERT INTO profile (user_id, name, bio, skills, photo, major, year) VALUES (?, ?, ?, ?, ?, ?, ?)",createdAccount.user_id, username,"", "", "http://localhost:8080/image/profile/default.jpg", "", "")
        .then(res => {
            //logs the number of changes made to the db
            //this is for making sure something was added
            // console.log(res.changes)
        })
    
        const token = await grantAuthToken(createdAccount.user_id);
        res.cookie('authToken', token);
        return res.status(200).send({message: "yipee"});
    }

});

//If user clicks logout then redirect to login 
app.get("/logout", async(req, res) =>{
    res.clearCookie("authToken");
    res.status(200).send({message: "logged Out"})
});

//Get Profile page route
app.get("/profile", async (req, res) => {
    const db = await dbPromise;
    const username = req.user.username;

     //Retrieve user based on username
    const user = await db.get("SELECT user_id, username FROM users where username = ?", username);
    
    //If user not found return 404
    if (!user){
        return res.status(404).send("User not found");
    }
    //Get users profile details
    const profile = await db.get("SELECT user_id, name, displayname, bio, skills, photo, major, year FROM profile WHERE user_id = ?", user.user_id);

    if (!profile){
        return res.status(404).send("User not found");
    }

    profile.username = user.username;
    profile.photo = linkFromPath(profile.photo, "profile");

    //Send the retrieved profile data as the response
    return res.send(profile);
});

app.get("/profile/:username", async (req, res) => {
    const db = await dbPromise;
    const username = req.params.username;

     //Retrieve user based on username
    const user = await db.get("SELECT user_id, username FROM users where username = ?", username);
    
    //If user not found return 404
    if (!user){
        return res.status(404).send("User not found");
    }
    //Get users profile details
    const profile = await db.get("SELECT user_id, name, displayname, bio, skills, photo, major, year FROM profile WHERE user_id = ?", user.user_id);

    if (!profile){
        return res.status(404).send("User not found");
    }

    profile.username = user.username;
    profile.photo = linkFromPath(profile.photo, "profile");

    //Send the retrieved profile data as the response
    return res.send(profile);
});

//Edit/Update Profile page
app.post("/profile", profileUpload.single('photo'), async (req, res) => {
    const db = await dbPromise;
    const username = req.user.username;

    //Retrieve user based on username
    const user = await db.get("SELECT user_id, username FROM users where username = ?", username);
    
    //If user not found return 404
    if(!user){
        return res.status(404).send("User not found");
    }

    //Get updated profile details
    const {user_id, name, displayname, bio, skills, photo, major, year } = JSON.parse(req.body.user);
    const updatedPhoto = req?.file != null ? req.file.path : photo;

    if(req?.file != null && photo != linkFromPath(null, "profile")) {
        console.log(pathFromLink(photo));
        fs.unlink(pathFromLink(photo), (err) => {
            if (err){ 
                throw err
            };
            console.log(`${pathFromLink(photo)} was deleted`);
          });
    }

    //Update the profile details in the database for the user
    await db.run("UPDATE profile SET displayname = ?, bio = ?, skills = ?, photo = ?, major = ?, year = ? WHERE user_id = ?",
    displayname, bio, skills, updatedPhoto, major, year, user.user_id);

    res.status(200).send({
        message: "Profile Updated",
        profile: {
            user_id: user.user_id, 
            displayname: displayname, 
            username: username, 
            major: major, 
            year: year, 
            bio: bio, 
            skills: skills, 
            photo: linkFromPath(updatedPhoto, "profile")
        }
    });
});

//Creating a new post
app.post("/createposts", postUpload.single('photo'), async (req,res) => {
    if(!req.user){
        return res.status(401).send({message: "You do not have permission to perform this action."});
    }
    const db = await dbPromise;
    const user_id = req.user.user_id; //get user_id from logged in user
    const username = req.user.username;
    const profile = await db.get("SELECT displayname, photo FROM profile where user_id = ?", user_id);
    const {title, content, primarytag, secondarytag} = req.body;
    const photo = req?.file != null ? req.file.path : null;
    console.log(primarytag);
    console.log(secondarytag);

    //checks to make sure the post was added to the database
    try {
        const result = await db.run("INSERT INTO posts (user_id, username, primarytag, secondarytag, displayname, photo, title, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", user_id, username, primarytag, secondarytag, profile.displayname, photo, title, content);
        
        if (result.changes > 0) {
            return res.status(200).send({ 
                message: 'Post added to the database',
                post: {
                    id: result.lastID,
                    user: {
                        user_id: profile.user_id,
                        displayName: profile.displayname,
                        username: profile.name,
                        profileIcon: linkFromPath(profile.photo, "profile"),
                    },
                    name: title,
                    type: "",
                    description: content,
                    image: linkFromPath(photo, "post"),
                },
            });
        } else {
            return res.status(500).send({ message: 'Failed to add post to the database' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding post to the database', error: err.message });
    }
});

app.get("/posts/:post_id", async (req, res) => {
    const db = await dbPromise;
    const post_id = req.params.post_id;

    //Query database
    const post = await db.get("SELECT * FROM posts where post_id = ?", post_id);
    const profile = await db.get("SELECT * FROM profile WHERE user_id = ?", post.user_id);

    if(!post){
        return res.status(404).send("Post not found");
    }
    res.send({
        id: post.post_id,
        user: {
            user_id: profile.user_id,
            displayName: profile.displayname,
            username: profile.name,
            profileIcon: linkFromPath(profile.photo, "profile"),
        },
        name: post.title,
        type: "",
        description: post.content,
        image: linkFromPath(post.photo, "post"),
    });

});

//Edit and update post
app.post("/edit-post/:post_id", async (req, res) => {
    const db = await dbPromise;
    const post_id = req.params.post_id;
    const {title, content, photo} = req.body;

    //Query database for post details
    const post = await db.get("SELECT * FROM posts WHERE post_id = ?", post_id);

    if(!post){
        return res.status(404).send("Post not found");
    }

    await db.run("UPDATE posts SET title = ?, primarytag = ?, secondarytag = ?, content = ?, photo = ? WHERE post_id = ?", title, primarytag, secondarytag, content, photo, post_id);

    res.status(200).send({message: "yipee"});
});

//Retrieve all posts
app.get("/posts", async (req, res) => {
    const db = await dbPromise;

    //Get posts from database
    const posts = await db.all("SELECT * FROM posts");
    const response = [];

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const profile = await db.get("SELECT * FROM profile WHERE user_id = ?", post.user_id);

        response.push({
            id: post.post_id,
            user: {
                user_id: profile.user_id,
                displayName: profile.displayname,
                username: profile.name,
                profileIcon: linkFromPath(profile.photo, "profile"),
            },
            name: post.title,
            type: "",
            description: post.content,
            image: linkFromPath(post.photo, "post"),
        });
        
    }
    
    res.send(response);
});
