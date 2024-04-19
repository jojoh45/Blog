import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// To count the number of posts
var count = 1;

var posts = [];




//Route to render the Home Page
app.get("/", (req,res) =>{
    res.render("index.ejs",{posts: posts});
});

//Route to render the create page for a post
app.get("/create", (req,res) =>{
    res.render("create.ejs");
});

// Route to render the edit page for a specific post
app.get("/edit/:postId", (req, res) => {
    const postId = req.params.postId;
    // Find the post with the given id
    const post = posts.find(post => post.id === parseInt(postId));
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }
    res.render('edit.ejs', { post: post });
});



// Route to handle post editing
app.post("/edit/:postId", (req, res) =>{
    const postId = req.params.postId;
    const updatedContent = req.body["content"];

    const post = posts.find(post => post.id === parseInt(postId));
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }
    // Update the post content
    post.content = updatedContent;
    res.redirect("/");
    console.log(posts);

});


//Route to handle submiting a post
app.post("/submit" , (req,res) =>{
    var userTitle = req.body["createTitle"];
    var userText = req.body["createText"];

    posts.push({id: count, title: userTitle, content: userText});
    count++;

    //Take the user back to the home page once the buttonis clicked
    res.redirect("/");
    console.log(posts);
});


//To delete a post
app.get("/delete", (req,res) => {
   posts.pop();

   //Take the user back to the home page once the buttonis clicked
   res.redirect("/");
   console.log(posts);
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
