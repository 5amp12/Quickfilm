const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

 //WHEN EDITING HERE MAKE SURE TO RELOAD NODE SERVER.JS COMMAND TO SEE EFFECTS

exports.signUp = async (req, res) => {            //req means the request from the user  and res is used for the response to the user
    const {username, password} = req.body;
    try{
        // Hash password before storing
        const complexity = 10;
        const hashedPassword = await bcrypt.hash(password, complexity);

        // Insert user into database
        const newUser = await pool.query(
            "INSERT INTO user_accounts (username, password_hash) VALUES ($1, $2)",
            [username, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
    }catch (error) {        
        console.error("error :", error);
        // console.error("Error Message :", error.message);

        if (error.code === '23505') {     //error number for unique constraint violation in postgres
            return res.status(400).json({ error: "Username already in use" });
        }
        
        return res.status(500).json({ error: "Internal server error" });
        
        
    }
}

exports.signIn = async (req, res) => {
    const {username, password} = req.body;
    try{
        
        const result = await pool.query('SELECT id, username, password_hash FROM public.user_accounts WHERE username = $1', 
            [username]
        );
        const user = result.rows[0];
        console.log(user);
        console.log("Password from user:", `${password}`);
        console.log("Password from DB:", `"${user.password_hash}"`)
        
        if (!user){
            return res.status(401).json({ error: "Invalid username or     password"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch){
            return res.status(401).json({ error: "Invalid username or password"})
        }
        
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '2h' });     //change the key name later
        return res.status(200).json({ 
            message: 'Sign in successful', user,
            token
        })
    } catch (err){
        console.error("Error in signIn:", err);
        res.status(500).json({ error: "Internal server error"})
    }
}