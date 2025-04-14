const mongoose = require('mongoose');

// Define the schema for a bank customer
const BankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    transactions: [
        {
            type: {
                type: String,
                enum: ['Deposit', 'Withdraw', 'Transfer'],
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
            receiverName: {
                type: String,
                required: function () {
                    return this.type === 'Transfer';
                },
            },
        },
    ],
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('BankCustomer', BankSchema);