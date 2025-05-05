const express = require('express');
const router = express.Router();
const BankCustomer = require('../models/BankSchema'); // Import the BankCustomer model

// Create a new customer (POST)
router.post('/', async (req, res) => {
    try {
        const newCustomer = new BankCustomer(req.body);
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all customers (GET)
router.get('/', async (req, res) => {
    try {
        const customers = await BankCustomer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Count the number of customers (GET)
router.get('/count', async (req, res) => {
    try {
        const count = await BankCustomer.countDocuments(); // Count all documents in the collection
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single customer by ID (GET)
router.get('/:accountNumber', async (req, res) => {
    try {
        const customer = await BankCustomer.findOne({ accountNumber: req.params.accountNumber }); // Use findOne
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a customer by ID (PUT)
// Update a customer's balance (PUT)
router.put('/:accountNumber', async (req, res) => {
    try {
        const { amount, operation } = req.body; // Expecting `amount` and `operation` in the request body
        console.log(operation);
        console.log(amount);

        // Find the customer by account number
        const customer = await BankCustomer.findOne({ accountNumber: req.params.accountNumber });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Perform the operation (add or subtract)
        if (operation === 'Deposit') {
            customer.balance = amount;  //Add the amount for deposits
            customer.transactions.push({
                type: 'Deposit',
                amount,
                date: new Date(),
            });

        } else if (operation === 'Withdraw') {
            if (customer.balance < amount) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }
            else {
                customer.balance = amount; //Subtract the amount for withdrawals
                customer.transactions.push({
                    type: 'Withdraw',
                    amount,
                    date: new Date(),
                });
            }

        }
        else if(operation === "Transfer") {
            const { receiverName, receiverAccountNumber } = req.body;
            const receiverCustomer = await BankCustomer.findOne({ accountNumber: receiverAccountNumber });
            if (!receiverCustomer) {
                return res.status(404).json({ message: 'Receiver not found' });
            }
            if (customer.balance < amount) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }
            customer.balance -= amount; // Subtract the amount from the sender's account
            receiverCustomer.balance += amount; // Add the amount to the receiver's account
            customer.transactions.push({
                type: 'Transfer',
                amount,
                date: new Date(),
                receiverName,
            });
            receiverCustomer.transactions.push({
                type: 'Transfer',
                amount,
                date: new Date(),
                receiverName: customer.name,
            });
            await receiverCustomer.save(); // Save the receiver's updated account
        }
        else {
            return res.status(400).json({ message: 'Invalid operation' });
        }

        // Save the updated customer
        const updatedCustomer = await customer.save();

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a customer by ID (DELETE)
router.delete('/:accountNo', async (req, res) => {
    const { accountNo } = req.params;
    try {
        console.log("DELETE request received for accountNo:", accountNo);
        const result = await BankCustomer.deleteOne({ accountNumber: accountNo });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "Account not found" });
        }
        res.status(200).send({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;