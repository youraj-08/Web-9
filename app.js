const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname+"/date.js");

const app = express();

app.use(bodyParser.urlencoded ({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");    //using ejs with the help of express.

var items = [];
var workItems = [];

app.get("/", function (req, res) {

    let day = date();

    res.render("list", { listTitle: day, newList: items });
});

app.post("/", function(req, res){
   item = req.body.newItem;

   if(req.body.list==="Work List"){
    workItems.push(item);
    res.redirect("/work");
   }else{
    items.push(item);
    res.redirect("/");

    console.log(req.body);
   }

   app.post("/work", function (req,res){
    item = req.body.newItem;
   workItems.push(item); 
   res.redirect("/work");

})
});

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work List", newList: workItems});
})

app.get("/about", function(req,res){
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});