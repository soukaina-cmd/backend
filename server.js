const express = require("express");
const User = require("./models/user");
require("./config/connect");

const app =express();
app.use(express.json());

// creation data
app.post( "/add" , (req , res)=>{
   data = req.body;
   
   usr = new User(data);
//    mongo
   usr.save()
     .then(
        (savedUser)=>{
            res.send(savedUser)
        }
     )
     .catch(
        (err)=>{
            res.send(err)
        }
     )
});
// creation data 2eme methode

app.post("/create" , async (req, res)=>{
    try{
        data =req.body;
        user = new User(data);

        savedUser = await usr.save();

        res.send(savedUser)

    }catch (error) {
        res.send(error)
    }
})

app.post("/add/login", async (req, res) => {
    try{
        // trouver 
     const user = await User.findUser(req.body.email, req.body.password);
     const authToken = await user.generateAuthTokenAndSaveUser();

     res.send({user, authToken});
  }catch(e) {
     console.log(e)
    res.status(400).send();

 }
 })


// importation des user f response
app.get( "/getall" , (req, res)=>{
   User.find()
    .then(
        (users)=>{
            res.send(users);
        }

    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})

app.put( "/update" , ()=>{
    console.log("update");
})^

app.delete( "/delete" , ()=>{
    console.log("delete work");
})




app.listen( 3000 , ()=>{
    console.log("server work");
} );
//  app.post("/add/login", async (req, res) => {
//    try{
//     const user = await User.findUser(req.body.email, req.body.password);
//     const authToken = await user.generateAuthTokenAndSaveUser();

//     res.send({user, authToken});
//   }catch(e) {
    // res.status(400).send();

// }
// })