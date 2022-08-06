
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

  /*["Buy Food", "Cook Food", "Eat Food"];*/

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

mongoose.connect("mongodb+srv://admin-hartik:Hartik123@cluster0.141lk.mongodb.net/todolistDB",{useNewUrlParser: true})

// Creating Schema
 const itemSchema = ({
    name: String
 });


 //creating new Schema nameed List

 const listSchema = ({
    name: String,
    items: [itemSchema]
 })


 //Creating Mongoose Model

 const item = mongoose.model("Item", itemSchema);

 //creating mongoose model ofr 'List' collections

 const List = mongoose.model("List", listSchema);


 //Mongoose Document

 const item1 = new item({
    name: "Welcome to your ToDoList!!"
 });

 const item2 = new item({
    name: "Hit the + buttom to add a new Item."
 });

 const item3 = new item ({
    name: "<-- Hit this to delete an item."
 });

 //Storing all items in a single array
const defaultItem = [item1, item2, item3];

//inserting item in the array into the "ITEMS" collections using insertMany 









//Home route
app.get("/", function(req, res){

    //logging our data from databse into our todolist app
    item.find({}, function(err,foundItems){

        if(foundItems.length === 0){
            item.insertMany(defaultItem, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("successfully added!!");
                }
            })
            res.redirect("/");
        }
        else{
            res.render("list", { kindOfDay: day, newListItems: foundItems });
        }
    })
   
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    
    };

    let day = today.toLocaleDateString("en-US", options);
});


app.post("/",function(req,res){
    const itemName = req.body.newItem;

    //getting name of the list
    const listName = req.body.list;
    
    const firstItem = new item ({
        name: itemName
    });

        firstItem.save();


    res.redirect("/");
    
})

//deleting the item present in the database
app.post("/delete", function(req,res){
        const checkedItemId = req.body.check;


        item.findByIdAndDelete(checkedItemId, function(err){
            if(!err){
                console.log("Deleted Successfully!")
            }
            
        })
        
        // to reflect the outcome on the page
        res.redirect("/");
})

const port = process.env.PORT || 3000 ;

app.listen(port,()=>{  
    console.log("server listening to port "+port);
});