const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const preloadData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");

        // Remove all users from the database
        const deletedCount = await User.deleteMany();
        console.log(`Deleted ${deletedCount.deletedCount} users.`);

        // Preload user data
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
                assets: [
                    {
                        type: "Hedge Funds",
                        market_worth: 150000,
                        valuation_history: [
                            { date: new Date("2024-11-20"), value: 145000 },
                            { date: new Date("2024-11-21"), value: 146000 },
                            { date: new Date("2024-11-22"), value: 147000 },
                            { date: new Date("2024-11-23"), value: 148000 },
                            { date: new Date("2024-11-24"), value: 149000 },
                            { date: new Date("2024-11-25"), value: 148000 },
                            { date: new Date("2024-11-26"), value: 150000 },
                        ],
                    },
                    {
                        type: "Cryptocurrency",
                        market_worth: 40000,
                        valuation_history: [
                            { date: new Date("2024-11-20"), value: 38000 },
                            { date: new Date("2024-11-21"), value: 38500 },
                            { date: new Date("2024-11-22"), value: 39000 },
                            { date: new Date("2024-11-23"), value: 39500 },
                            { date: new Date("2024-11-24"), value: 39800 },
                            { date: new Date("2024-11-25"), value: 39000 },
                            { date: new Date("2024-11-26"), value: 40000 },
                        ],
                    },
                    {
                        type: "Private Equity",
                        market_worth: 120000,
                        valuation_history: [
                            { date: new Date("2024-11-20"), value: 115000 },
                            { date: new Date("2024-11-21"), value: 116000 },
                            { date: new Date("2024-11-22"), value: 118000 },
                            { date: new Date("2024-11-23"), value: 119000 },
                            { date: new Date("2024-11-24"), value: 118500 },
                            { date: new Date("2024-11-25"), value: 119500 },
                            { date: new Date("2024-11-26"), value: 120000 },
                        ],
                    },
                    {
                        type: "Real Estate",
                        market_worth: 250000,
                        valuation_history: [
                            { date: new Date("2024-11-20"), value: 640000 },
                            { date: new Date("2024-11-21"), value: 242000 },
                            { date: new Date("2024-11-22"), value: 345000 },
                            { date: new Date("2024-11-23"), value: 448000 },
                            { date: new Date("2024-11-24"), value: 549000 },
                            { date: new Date("2024-11-25"), value: 249500 },
                            { date: new Date("2024-11-26"), value: 350000 },
                        ],
                    },
                    {
                        type: "Commodities",
                        market_worth: 50000,
                        valuation_history: [
                            { date: new Date("2024-11-20"), value: 48000 },
                            { date: new Date("2024-11-21"), value: 48200 },
                            { date: new Date("2024-11-22"), value: 48500 },
                            { date: new Date("2024-11-23"), value: 48800 },
                            { date: new Date("2024-11-24"), value: 48900 },
                            { date: new Date("2024-11-25"), value: 49000 },
                            { date: new Date("2024-11-26"), value: 50000 },
                        ],
                    },
                    {
                        type: "Venture Capital",
                        market_worth: 100000,
                        valuation_history: [
                            { date: new Date("2024-11-20"), value: 95000 },
                            { date: new Date("2024-11-21"), value: 96000 },
                            { date: new Date("2024-11-22"), value: 97000 },
                            { date: new Date("2024-11-23"), value: 98000 },
                            { date: new Date("2024-11-24"), value: 99000 },
                            { date: new Date("2024-11-25"), value: 99500 },
                            { date: new Date("2024-11-26"), value: 100000 },
                        ],
                    },
                    {
                        type: "Art Collections",
                        market_worth: 70000,
                        valuation_history: [
                            { date: new Date("2024-11-20"), value: 68000 },
                            { date: new Date("2024-11-21"), value: 68200 },
                            { date: new Date("2024-11-22"), value: 68500 },
                            { date: new Date("2024-11-23"), value: 68800 },
                            { date: new Date("2024-11-24"), value: 69000 },
                            { date: new Date("2024-11-25"), value: 69500 },
                            { date: new Date("2024-11-26"), value: 70000 },
                        ],
                    },
                ],
            } 
        ];

    

        for (const user of users) {
            const newUser = new User(user);
            await newUser.save(); // This will trigger the pre-save hook
        }

        console.log("Preloading complete!");
    } catch (err) {
        console.error("Error during preloading:", err.message);
    } finally {
        // Close the database connection
        mongoose.connection.close();
        process.exit(0); // Exit the process with a success status
    }
};

preloadData();
