
const express=require("express");
const Joi= require('joi');
const  app = express();
app.use(express.json());

const books =[
    {title:'harry potter',id:1},
    {title:'twilight',id:2},
    {title:'mogembo',id:3}
]

//read req handlers
app.get("/",(req,res)=>{
    res.send("welcome to rest api with node js");
    });

    app.get('/api/books',(req,res)=>{
        res.send(books);
    });

    app.get("/api/books/:id",(req,res)=>{
        const book =books.find(c => c.id === parseInt(req.params.id));

    if (!books) req.status(404).send('<h2 style="font-family:malgun gothic;color:darkred;"> oops...cant find what');
    res.send(book);

    
    });

    //create req handler
    app.post('/api/books', (req,res)=>{
        const {error }=validateBook(req.body);
        if(error){
           res.status(400).send(error.details[0].message)
           return; 
       
        }
const book={
    id:books.length + 1,
    title:req.body.title};
    books.push(book);
    res.send(book);
    });

    //update req handler
app.put('/api/books/:id',(req,res)=>{
    const book = books.find(c => c.id ===parseInt(req.params.id));
    if (!book) res.status(404).send('<h2 style ="font-family:malfun gothic;color:darkred;">not found!! </h2>');

const {error }=validateBook(req.body);
if (error){
    res.status(400).send(error.details[0].message);
    return;

}
book.title = req.body.title;
res.send(book);

});
//delete req handler
app.delete('/api/books/:id',(req,res)=>{

const book = books.find(c =>c.id ===parseInt(req.params.id));
if(!book) res.status(404).send('<h2 style="font-family:malgun gothic;color:darkred;"> not found!! </h2>');

const index =books.indexOf(book);
books.splice(index,1);

res.send(book);


});
function validateBook(book){
    const schema = {
        title: Joi.string().min(3).required()

    };
    return Joi.validate(book,schema);

}

//port environment variable
const port =process.env.PORT || 8080;
app.listen(port,()   => console.log('listening on port ${8080}...'));


        




























