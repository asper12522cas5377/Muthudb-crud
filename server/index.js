const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
    origin:[ "http://localhost:3000",
    "https://muthudb-crud-glrb.vercel.app/crud"
    ],
    methods: ["PUT", "GET", "POST", "DELETE"]
}));

app.use(express.json());

const FoodModel = require("./models/food");

// ✅ Correct MongoDB Connection String
mongoose.connect("mongodb+srv://admin:admin@cluster0.afrlaow.mongodb.net/food?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// INSERT DATA
app.post("/insert", async (req, res) => {
    const { foodName, description } = req.body;

    const food = new FoodModel({
        foodName,
        description
    });

    try {
        const result = await food.save();
        res.send(result);
        console.log(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error inserting data");
    }
});


// READ DATA
app.get("/read", async (req, res) => {
    try {
        const food = await FoodModel.find();
        res.send(food);
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});


// UPDATE DATA
app.put("/update", async (req, res) => {
    const { newFoodName, id } = req.body;

    try {
        const updateFood = await FoodModel.findById(id);

        if (!updateFood) {
            return res.status(404).send("Data not found");
        }

        updateFood.foodName = newFoodName;

        await updateFood.save();

        res.send("Data Updated...");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating data");
    }
});


// DELETE DATA
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await FoodModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send("Food item not found");
        }

        res.send("Food item deleted");
    } catch (err) {
        console.error(err); // ✅ fixed typo
        res.status(500).send("Error deleting data");
    }
});


app.listen(3001, () => {
    console.log("Server is Running on port 3001...");
});