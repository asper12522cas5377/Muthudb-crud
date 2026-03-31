const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()

app.use(cors({
    origin:'http://localhost:3000',
     https://muthudb-crud.onrender.com,
    methods:['PUT','GET','POST','DELETE']
}))

app.use(express.json())

const FoodModel=require("./models/food")
mongoose.connect("mongodb+srv://admin:admin@cluster0.afrlaow.mongodb.net/food")
.then(()=>console.log('connected'))
.catch(err=>console.log(err))


//insert the data 
app.post("/insert",async(req,res)=>{
    const {foodName,description}=req.body;
    const food=new FoodModel({
        foodName:foodName,
        description:description
    })
    try{
        const result=await food.save()
        res.send(result)
        console.log(result)
    }
    catch(err)
    {
        console.log(err)

    }
})

//Read the data
app.get("/read",async(req,res)=>{
    try
    {
        const food=await FoodModel.find();
        res.send(food);
    }
    catch(err)
    {
        res.send("Error")
    }
})

//updating the data
app.put("/update",async(req,res)=>{
    const {newFoodName,id}=req.body;
    try
    {
        const updateFood=await FoodModel.findById(id);
        if(!updateFood)
        {
            return res.status(400).send("Data not found");
        }
        updateFood.foodName=newFoodName;
        await updateFood.save()
        res.send("Data Updated...")
    }
    catch(err)
    {
        console.log(err);
    }
})

//deleting the data
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try
    {
        const result=await FoodModel.findByIdAndDelete(id);
        if(!result)
        {
            return res.status(404).send("Food item not found")
        }
        res.send("Food item delete")
    }catch(err)
    {
        console.errror(err)
    }
})

app.listen(3001,()=>{
    console.log("Server is Running...")
})
