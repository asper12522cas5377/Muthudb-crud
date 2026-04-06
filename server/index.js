const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://muthudb-crud-glrb.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

// Allow preflight requests
app.options("*", cors());

app.use(express.json());

const FoodModel = require("./models/food");

// MongoDB Connection
mongoose.connect("mongodb+srv://admin:admin@cluster0.afrlaow.mongodb.net/food?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// INSERT DATA
app.post("/insert", async (req, res) => {
  try {
    const { foodName, description } = req.body;

    const food = new FoodModel({
      foodName,
      description
    });

    const result = await food.save();
    res.send(result);

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
  try {
    const { newFoodName, id } = req.body;

    const updateFood = await FoodModel.findById(id);

    if (!updateFood) {
      return res.status(404).send("Data not found");
    }

    updateFood.foodName = newFoodName;

    await updateFood.save();

    res.send("Data Updated");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating data");
  }
});


// DELETE DATA
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await FoodModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Food item not found");
    }

    res.send("Food item deleted");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting data");
  }
});


// PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});