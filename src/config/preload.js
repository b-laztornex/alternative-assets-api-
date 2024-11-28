const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const preloadData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected...");

        // Remove previous data if exist 
        await User.deleteMany();

        // Preloaded users
        const users = [
            {
                username: "TomasMarkus",
                password: "TomasMarkus",
                role: "user",
                metadata: {
                    preferences: {
                        theme: "dark",
                        languages: ["English", "Spanish"]
                    },
                    last_login: "2023-11-01T08:30:00Z"
                },
                assets: [
                    {
                        type: "Private Equity",
                        market_worth: 120000,
                        valuation_history: [
                            { date: new Date("2024-11-25"), value: 118000 },
                            { date: new Date("2024-11-26"), value: 120000 },
                        ],
                    },
                    {
                        type: "Real Estate",
                        market_worth: 80000,
                        valuation_history: [
                            { date: new Date("2024-11-25"), value: 79000 },
                            { date: new Date("2024-11-26"), value: 80000 },
                            { date: new Date("2024-11-27"), value: 80500 },
                            { date: new Date("2024-11-28"), value: 81000 },
                            { date: new Date("2024-11-29"), value: 82000 },
                            { date: new Date("2024-11-30"), value: 82500 },
                            { date: new Date("2024-12-01"), value: 83000 },
                            { date: new Date("2024-12-02"), value: 83500 },
                            { date: new Date("2024-12-03"), value: 84000 },
                            { date: new Date("2024-12-04"), value: 84500 },
                            { date: new Date("2024-12-05"), value: 85000 },
                            { date: new Date("2024-12-06"), value: 85500 }
                        ],
                    },
                ],
            },
            {
                username: "FlorianBartelt",
                password: "FlorianBartelt", // This will be hashed
                role: "user",
                feedback: "No comments provided.",
                assets: [
                    {
                        type: "Cryptocurrency",
                        market_worth: 40000,
                        valuation_history: [
                            { date: new Date("2024-11-25"), value: 39000 },
                            { date: new Date("2024-11-26"), value: 40000 },
                        ],
                    },
                    {
                        type: "Commodities",
                        market_worth: 60000,
                        valuation_history: [
                            { date: new Date("2024-11-25"), value: 59000 },
                            { date: new Date("2024-11-26"), value: 60000 },
                        ],
                    },
                ],
            },
            {
                username: "MarcoCasanova",
                password: "MarcoCasanova",
                role: "user",
                tags: ["B2B", "Priority"],
                assets: [
                    {
                        type: "Hedge Funds",
                        market_worth: 150000,
                        valuation_history: [
                            { date: new Date("2024-11-25"), value: 148000 },
                            { date: new Date("2024-11-26"), value: 150000 },
                        ],
                    },
                    {
                        type: "Venture Capital",
                        market_worth: 90000,
                        valuation_history: [
                            { date: new Date("2024-11-25"), value: 88000 },
                            { date: new Date("2024-11-26"), value: 90000 },
                        ],
                    },
                ],
            },
            {
                username: "GoldingAdmin",
                password: "GoldingAdmin",
                role: "admin",
                assets: [], // Assets are not needed for the Admin guy
            },
        ];

        // Save users to the database
        for (let userData of users) {
            const user = new User(userData);
            await user.save();
            console.log(`User ${user.username} created.`);
        }

        console.log("Preloading complete!");
        mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        mongoose.connection.close();
        process.exit(1);
    }
};

preloadData();
