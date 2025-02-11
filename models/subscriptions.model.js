import express from "express";
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            minLength: 2,
            maxLength: 32,
            lowercase: true,
            unique: true,
        },
        price: {
            type: Number,
            required: [true, "Subscription price is required"],
            min: [0, "Price must be greater than 0"]
        },
        currency: {
            type: String,
            required: [true, "Currency is required"],
            enum: ["USD", "EUR", "GBP", "INR"],
            default: "INR",
            trim: true,
            minLength: 3,
            maxLength: 3
        },
        frequency: {
            type: String,
            required: [true, "Frequency is required"],
            enum: ["daily", "weekly", "monthly", "yearly"],
            default: "monthly",
            trim: true,
            minLength: 3,
            maxLength: 8
        },
        category: {
            type: String,
            enum: ["sports", "entertainment", "news", "music", "movies", "lifestyle", "education", "kids"],
            required: [true, "Category is required"],
        },
        paymentMethod: {
            type: String,
            enum: ["credit card", "debit card", "net banking", "wallet", "UPI", "cash"],
            required: [true, "Payment method is required"],
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
            required: [true, "Status is required"],
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
            validate: {
                validator: function (v) {
                    return v > new Date();
                },
                message: "Start date must be in past",
            },
            renewalDate: {
                type: Date,
                validate: {
                    validator: function (v) {
                        return v > this.startDate;
                    },
                    message: "Renewal date must be after a start date",
                },
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
    }
);

//Auto-calculated renewal date if missing
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = 'Expired';
    }
    next();
});

const subscription = mongoose.model("Subscription", subscriptionSchema);

export default subscription;