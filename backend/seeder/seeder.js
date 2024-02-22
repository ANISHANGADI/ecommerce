import mongoose from "mongoose";
import Product from "../models/products.js";
import data from './data.js';

const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce");
        await Product.deleteMany();
        console.log("Products are deleted");

        // Add a dummy user field to each product
        const productsWithUser = data.map(product => ({
            ...product,
            user: "65d078bcad60c79d5ee047a9" // Replace "dummyUser" with an actual user ID or username
        }));

        await Product.insertMany(productsWithUser);
        console.log('Data inserted');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();
