const CreateAccount = document.getElementById("createAccount");
const loginAccount = document.getElementById("loginAccount");
const popupForm = document.getElementById("popupForm");
const adminPage = document.getElementById("adminPage");

const apiUrl = "http://127.0.0.1:5500/api/customers";

document.getElementById("LOGIN").onclick = () => {
    loginAccount.style.display = "block";
    CreateAccount.style.display = "none";
}
document.getElementById("NewAccountInAdmin").onclick = () => {
    loginAccount.style.display = "none";
    CreateAccount.style.display = "block";
    adminPage.style.display = "none";
}

document.getElementById("AdminPageForm").onclick = (e) => {
    e.preventDefault();
}


document.getElementById("NewAccount").onclick = () => {
    loginAccount.style.display = "none";
    CreateAccount.style.display = "block";
}

document.getElementById("LOGINinAdmin").onclick = () => {
    loginAccount.style.display = "block";
    CreateAccount.style.display = "none";
    adminPage.style.display = "none";
}


document.getElementById("adminpageOpenForNewAcc").onclick = () => {
    console.log("hello");
    loginAccount.style.display = "none";
    CreateAccount.style.display = "none";
    adminPage.style.display = "block";
}

document.getElementById("adminpageOpenForLogin").onclick = () => {
    console.log("hello");
    loginAccount.style.display = "none";
    CreateAccount.style.display = "none";
    adminPage.style.display = "block";
}

const createAccBtn = document.getElementById("submit");
const loginSubmit = document.getElementById("loginSubmit");
const content = document.getElementById("content");
const container = document.getElementById("container");



const AmountInput = document.getElementById("AmountInput");

loginSubmit.onclick = (e) => {
    let check = true;
    e.preventDefault();
    const accName = "Selva";
    const accNo = 123456;
    const accountName = document.getElementById("loginAccountName");
    loginAccNo = document.getElementById("loginAccNo");
    //console.log(accountName.value, loginAccNo.value);
    //console.log(Customers);
    for (let i = 0; i < COunt; i++) {

        if (Customers[i].name == accountName.value.trim() && Customers[i].accountNumber == loginAccNo.value.trim()) {
            check = false;
            Amount = Customers[i].balance;
            content.innerHTML = "";
            content.innerHTML = `
    <div id="mainPage">
        <h1 id="nameTag"></h1>
        <hr>
        <br>
        <br>
        <div id="operation">
            <h1 id="withdraw">Withdraw</h1>
            <h1 id="deposit">Deposit</h1>
            <h1 id="transfer">Transfer</h1>
            <h1 id="CheckBalance">Check Balance</h1>
            <h1 id="history">Transaction History</h1>
            <h1 id="LogOut">LogOut</h1>
        </div>
    </div>`;
            document.getElementById("LogOut").onclick = () => {
                location.reload();
            }

            document.getElementById("nameTag").innerHTML = `Account Holder ${accountName.value}`;
            document.getElementById("para").style.display = "block";

            document.getElementById("withdraw").onclick = () => {
                //if is needed
                popupForm.reset();
                document.getElementById("transferRow").style.display = "none";
                document.getElementById("transferRow2").style.display = "none";
                AmountInput.disabled = false;
                document.getElementById("save").style.display = "inline";
                document.getElementById("mainpopup").style.display = "block";
                document.getElementById("tableHead").textContent = "Withdraw";
                document.getElementById("tableLabel").textContent = "Withdraw Amount:";
                document.getElementById("historyrow").style.display = "none";
                document.getElementById("historyGet").style.display = "none";
                AmountInput.style.display = "inline";
            }

            document.getElementById("cancel").onclick = () => {
                document.getElementById("mainpopup").style.display = "none";
            }

            document.getElementById("save").onclick = () => {

                setTimeout(() => {
                    document.getElementById("mainpopup").style.display = "none";
                }, 100);

                if (document.getElementById("tableHead").textContent == "Withdraw") {
                    if (AmountInput.value > Amount) {
                        document.getElementById("messageBox").textContent = "Insufficient Balance";
                        document.getElementById("message").style.display = "block";
                        setTimeout(() => {
                            document.getElementById("message").style.display = "none";
                        }, 3000)
                        return;
                    }
                    else {
                        Amount -= Number(AmountInput.value);
                        //console.log(AmountInput.value);
                        //console.log(Amount);
                        const updatedCustomer = {
                            operation: "Withdraw",
                            amount: Amount,
                        };
                        //console.log(updatedCustomer);
                        updateCustomer(String(loginAccNo.value), updatedCustomer);
                        document.getElementById("messageBox").textContent = "Amount Withdrawn Successfully";
                        document.getElementById("message").style.display = "block";
                        setTimeout(() => {
                            document.getElementById("message").style.display = "none";
                        }, 3000)
                    }

                }
                else if (document.getElementById("tableHead").textContent == "Deposit") {
                    Amount += Number(AmountInput.value);
                    const updatedCustomer = {
                        operation: "Deposit",
                        amount: Amount,
                    };
                    //console.log(updatedCustomer);
                    updateCustomer(String(loginAccNo.value), updatedCustomer);

                    document.getElementById("messageBox").textContent = "Amount Deposited Successfully";
                    document.getElementById("message").style.display = "block";
                    setTimeout(() => {
                        document.getElementById("message").style.display = "none";
                    }, 3000)
                }
                else if (document.getElementById("tableHead").textContent == "Transfer") {
                    const TransferAccName = document.getElementById("TransferAccName");
                    const TransferAccNo = document.getElementById("TransferAccNo");
                    const TransferAmt = document.getElementById("AmountInput");
                    TransferAmount(TransferAccName.value, TransferAccNo.value, Number(TransferAmt.value), accountName.value.trim(), loginAccNo.value.trim());
                }

            }

            document.getElementById("deposit").onclick = () => {
                popupForm.reset();
                document.getElementById("transferRow").style.display = "none";
                document.getElementById("transferRow2").style.display = "none";
                AmountInput.disabled = false;
                document.getElementById("save").style.display = "inline";

                document.getElementById("mainpopup").style.display = "block";
                document.getElementById("tableHead").textContent = "Deposit";
                document.getElementById("tableLabel").textContent = "Deposit Amount:";
                document.getElementById("historyrow").style.display = "none";
                document.getElementById("historyGet").style.display = "none";
                AmountInput.style.display = "inline";
            }

            const CheckBalance = document.getElementById("CheckBalance");
            CheckBalance.onclick = () => {
                popupForm.reset();
                document.getElementById("transferRow").style.display = "none";
                document.getElementById("transferRow2").style.display = "none";
                document.getElementById("mainpopup").style.display = "block";
                document.getElementById("tableHead").textContent = "Balance";
                document.getElementById("tableLabel").textContent = "Your Balance is:";
                AmountInput.value = Amount;
                AmountInput.disabled = true;
                document.getElementById("save").style.display = "inline";
                document.getElementById("historyrow").style.display = "none";
                AmountInput.style.display = "inline";
                document.getElementById("historyGet").style.display = "none";
            }

            const transfer = document.getElementById("transfer");
            transfer.onclick = () => {

                popupForm.reset();
                document.getElementById("transferRow").style.display = "inline";
                document.getElementById("transferRow2").style.display = "inline";
                document.getElementById("withdrawRow").style.display = "inline";
                document.getElementById("mainpopup").style.display = "block";
                document.getElementById("tableHead").textContent = "Transfer";
                document.getElementById("tableLabel").textContent = "Transfer Amount:";
                AmountInput.disabled = false;
                AmountInput.style.display = "inline";
                document.getElementById("save").style.display = "inline";
                document.getElementById("historyrow").style.display = "none";
                document.getElementById("historyGet").style.display = "none";

            }

            const history = document.getElementById("history");
            history.onclick = () => {
                popupForm.reset();

                document.getElementById("transferRow").style.display = "none";
                document.getElementById("transferRow2").style.display = "none";
                document.getElementById("mainpopup").style.display = "block";
                document.getElementById("tableHead").textContent = "History";
                document.getElementById("tableLabel").textContent = "History:";
                document.getElementById("withdrawRow").style.display = "inline";
                AmountInput.style.display = "none";
                document.getElementById("historyrow").style.display = "inline";

                //document.getElementById("historyDiv").textContent = "receiverName : Selva \n transition amount : 1000 \n Date : 12/10/2023 \n";
                document.getElementById("save").style.display = "none";
                document.getElementById("historyGet").style.display = "inline";

            }

        }
    }
    if (check) {
        document.getElementById("message").style.display = "block";
        document.getElementById("messageBox").textContent = "No Account Found";
        document.getElementById("message").style.backgroundColor = "red";
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
            document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";

        }, 2000);
    }


}

let TransactionHistory = [];
const getHistory = document.getElementById("historyGet");
const HistoryDiv = document.getElementById("historyDiv");
let repeat = true;

getHistory.onclick = async () => {
    if (repeat) {
        repeat = false;
        await getCustomer(loginAccNo.value.trim());
        if (response.ok) {
            setTimeout(() => {
                //console.log(TransactionHistory);
                TransactionHistory.forEach((transaction) => {
                    const transactionDiv = document.createElement("div");
                    //transactionDiv.classList.add("transaction");
                    transactionDiv.innerHTML = `
            <p>Type: ${transaction.type}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: ${new Date(transaction.date).toLocaleString()}</p>
            <hr>
        `;
                    HistoryDiv.appendChild(transactionDiv);
                })
            }, 2000);
        }
        else {
            document.getElementById("message").style.display = "block";
            document.getElementById("messageBox").textContent = "No Transaction History Found";
            document.getElementById("message").style.backgroundColor = "red";
            setTimeout(() => {
                document.getElementById("message").style.display = "none";
                document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";

            }, 2000);
        }
    }
}

async function TransferAmount(TransferAccName, TransferAccNo, TransferAmt, accountName, accountNo) {
    //console.log(TransferAccName, TransferAccNo, TransferAmt);
    if (TransferAccName.trim() == "" || TransferAccNo.trim() == "" || TransferAmt == "") {
        document.getElementById("message").style.display = "block";
        document.getElementById("messageBox").textContent = "Enter the valid Account Number or Name";
        document.getElementById("message").style.backgroundColor = "red";
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
            document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";

        }, 2000);
        return;
    }
    Amount -= TransferAmt;
    //console.log(Amount);
    const updatedCustomer = {
        operation: "Transfer",
        amount: TransferAmt,
        receiverName: TransferAccName,
        receiverAccountNumber: TransferAccNo
    };
    await updateCustomer(String(accountNo), updatedCustomer);
    if (ResponseUpdate) {
        document.getElementById("message").style.display = "block";
        document.getElementById("messageBox").textContent = "Amount Transferred Successfully";
        document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";
        //console.log(TransferAccName, TransferAccNo, TransferAmt);
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
        }, 2000);
    }
}

document.getElementById("AdminSubmit").onclick = async (e) => {

    const adminName = "Admin";
    const adminAccNo = 1234;
    if (adminName == document.getElementById("AdminName").value.trim() && adminAccNo == document.getElementById("AdminNo").value.trim()) {
        
        content.innerHTML =
            `
        <div id="adminMainPage">
        <h2 id="adminHeading">Accounts</h2>
        <div id="AllAccounts">

        </div>
    </div>
    `;
    await getCustomers();
    console.log(Customers);
    e.preventDefault();
    for (let i = 0; i < Customers.length; i++) {
        const customer = Customers[i];
        //console.log(customer.name, customer.accountNumber, customer.balance);
        const accountDiv = document.createElement("div");
        accountDiv.classList.add("account");
        accountDiv.innerHTML = `
            <label class="label">Name:</label>
            <h2 id="Name">${customer.name}</h2><br>
            <label class="label">Account No:</label>
            <h2 id="AccNo">${customer.accountNumber}</h2><br>
            <label class="label">Balance:</label>
            <h2 id="Balance">${customer.balance}</h2><br>
            <button id="DeleteBtn" onclick="deleteFunction(event)">Delete</button>
        `;
        const allAccountsDiv = document.getElementById("AllAccounts");
        allAccountsDiv.appendChild(accountDiv);
    }
    }
    else {
        document.getElementById("message").style.display = "block";
        document.getElementById("messageBox").textContent = "Invalid Admin Credentials";
        document.getElementById("message").style.backgroundColor = "red";
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
            document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";

        }, 2000);
    }
}

const deleteFunction = async (event) => {

    event.preventDefault();
    const accounterName = event.target.parentElement.querySelector("#Name").textContent;
    var accountNo = event.target.parentElement.querySelector("#AccNo").textContent;
    //console.log(accounterName, accountNo);
    accountNo = String(accountNo);

    //const accountName = accountDiv.querySelector("#Name").textContent;
    //const accountNo = accountDiv.querySelector("#AccNo").textContent;
    console.log(accounterName, accountNo);
    await fetch(`${apiUrl}/${accountNo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    event.target.parentElement.remove();
    document.getElementById("message").style.display = "block";
    document.getElementById("messageBox").textContent = "Account Deleted Successfully";
    document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";
    setTimeout(() => {
        document.getElementById("message").style.display = "none";
    }, 2000);
}

createAccBtn.onclick = async (e) => {
    Amount = 0;
    e.preventDefault();
    const accName = "Selva";
    const accNo = 123456;
    const accountName = document.getElementById("accountName");
    const loginAccNo = document.getElementById("AccountNo");

    //console.log( typeof accountName.value,typeof loginAccNo.value);
    if (accountName.value.trim() == "" || loginAccNo.value.trim() == "") {
        document.getElementById("message").style.display = "block";
        document.getElementById("messageBox").textContent = "Enter the valid Account Number or Name";
        document.getElementById("message").style.backgroundColor = "red";
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
            document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";

        }, 2000);
        return;
    }

    const newCustomer = {
        name: accountName.value,
        accountNumber: loginAccNo.value,
        balance: 0,
    };

    await createCustomer(newCustomer);
    //console.log(response.ok);
    if (response.ok) {

        content.innerHTML = "";
        content.innerHTML = `
    <div id="mainPage">
        <h1 id="nameTag"></h1>
        <hr>
        <br>
        <br>
        <div id="operation">
            <h1 id="withdraw">Withdraw</h1>
            <h1 id="deposit">Deposit</h1>
            <h1 id="transfer">Transfer</h1>
            <h1 id="CheckBalance">Check Balance</h1>
            <h1 id="history">Transaction History</h1>
        </div>
    </div>`;
        document.getElementById("nameTag").innerHTML = `Account Holder ${accountName.value}`;
        document.getElementById("para").style.display = "block";

        document.getElementById("withdraw").onclick = () => {
            //if is needed
            document.getElementById("balance").style.display = "none";
            popupForm.reset();
            document.getElementById("transferRow").style.display = "none";
            document.getElementById("transferRow2").style.display = "none";
            AmountInput.disabled = false;
            document.getElementById("save").style.display = "inline";
            document.getElementById("mainpopup").style.display = "block";
            document.getElementById("tableHead").textContent = "Withdraw";
            document.getElementById("tableLabel").textContent = "Withdraw Amount:";
            document.getElementById("historyrow").style.display = "none";
            document.getElementById("historyGet").style.display = "none";
            AmountInput.style.display = "inline";
        }

        document.getElementById("cancel").onclick = () => {
            document.getElementById("mainpopup").style.display = "none";
        }

        document.getElementById("save").onclick = () => {

            setTimeout(() => {
                document.getElementById("mainpopup").style.display = "none";
            }, 100);

            if (document.getElementById("tableHead").textContent == "Withdraw") {
                if (AmountInput.value > Amount) {
                    document.getElementById("messageBox").textContent = "Insufficient Balance";
                    document.getElementById("message").style.display = "block";
                    setTimeout(() => {
                        document.getElementById("message").style.display = "none";
                    }, 3000)
                    return;
                }
                else {
                    Amount -= Number(AmountInput.value);
                    //console.log(AmountInput.value);
                    //console.log(Amount);
                    const updatedCustomer = {
                        operation: "Withdraw",
                        amount: Amount,
                    };
                    //console.log(updatedCustomer);
                    updateCustomer(String(loginAccNo.value), updatedCustomer);
                    document.getElementById("messageBox").textContent = "Amount Withdrawn Successfully";
                    document.getElementById("message").style.display = "block";
                    setTimeout(() => {
                        document.getElementById("message").style.display = "none";
                    }, 3000)
                }

            }
            else if (document.getElementById("tableHead").textContent == "Deposit") {
                Amount += Number(AmountInput.value);
                //console.log(AmountInput.value);
                //console.log(Amount);
                //console.log(loginAccNo.value);

                const updatedCustomer = {
                    operation: "Deposit",
                    amount: Amount,
                };
                //console.log(updatedCustomer);
                updateCustomer(String(loginAccNo.value), updatedCustomer);

                document.getElementById("messageBox").textContent = "Amount Deposited Successfully";
                document.getElementById("message").style.display = "block";
                setTimeout(() => {
                    document.getElementById("message").style.display = "none";
                }, 3000)
            }
            else if (document.getElementById("tableHead").textContent == "Transfer") {
                const TransferAccName = document.getElementById("TransferAccName");
                const TransferAccNo = document.getElementById("TransferAccNo");
                const TransferAmt = document.getElementById("AmountInput");
                TransferAmount(TransferAccName.value, TransferAccNo.value, Number(TransferAmt.value), accountName.value.trim(), loginAccNo.value.trim());
            }

        }

        document.getElementById("deposit").onclick = () => {
            document.getElementById("balance").style.display = "none";
            popupForm.reset();
            document.getElementById("transferRow").style.display = "none";
            document.getElementById("transferRow2").style.display = "none";
            AmountInput.disabled = false;
            document.getElementById("save").style.display = "inline";

            document.getElementById("mainpopup").style.display = "block";
            document.getElementById("tableHead").textContent = "Deposit";
            document.getElementById("tableLabel").textContent = "Deposit Amount:";
            document.getElementById("historyrow").style.display = "none";
            document.getElementById("historyGet").style.display = "none";
            AmountInput.style.display = "inline";

        }

        const CheckBalance = document.getElementById("CheckBalance");
        CheckBalance.onclick = async () => {
            await getCustomer(String(loginAccNo.value));
            console.log(AmountInput);
            console.log(Amount);
            document.getElementById("balance").style.display = "inline";
            document.getElementById("balance").textContent = Amount;

            console.log(AmountInput.value);
            AmountInput.value = String(Amount);
            popupForm.reset();
            document.getElementById("transferRow").style.display = "none";
            document.getElementById("transferRow2").style.display = "none";
            document.getElementById("mainpopup").style.display = "block";
            document.getElementById("tableHead").textContent = "Balance";
            document.getElementById("tableLabel").textContent = "Your Balance is:";

            AmountInput.disabled = true;
            document.getElementById("save").style.display = "inline";
            document.getElementById("historyrow").style.display = "none";
            AmountInput.style.display = "inline";
            document.getElementById("historyGet").style.display = "none";
        }

        const transfer = document.getElementById("transfer");
        transfer.onclick = () => {
            document.getElementById("balance").style.display = "none";
            popupForm.reset();
            document.getElementById("transferRow").style.display = "inline";
            document.getElementById("transferRow2").style.display = "inline";
            document.getElementById("withdrawRow").style.display = "inline";
            document.getElementById("mainpopup").style.display = "block";
            document.getElementById("tableHead").textContent = "Transfer";
            document.getElementById("tableLabel").textContent = "Transfer Amount:";
            AmountInput.disabled = false;
            AmountInput.style.display = "inline";
            document.getElementById("save").style.display = "inline";
            document.getElementById("historyrow").style.display = "none";
            document.getElementById("historyGet").style.display = "none";

        }

        const history = document.getElementById("history");
        history.onclick = () => {
            document.getElementById("balance").style.display = "none";
            popupForm.reset();
            //console.log("hello");
            document.getElementById("transferRow").style.display = "none";
            document.getElementById("transferRow2").style.display = "none";
            document.getElementById("mainpopup").style.display = "block";
            document.getElementById("tableHead").textContent = "History";
            document.getElementById("tableLabel").textContent = "History:";
            document.getElementById("withdrawRow").style.display = "inline";
            AmountInput.style.display = "none";
            document.getElementById("historyrow").style.display = "inline";
            //document.getElementById("historyDiv").textContent = "receiverName : Selva \n transition amount : 1000 \n Date : 12/10/2023 \n";
            document.getElementById("save").style.display = "none";
            document.getElementById("historyGet").style.display = "inline";
        }

    }
    else {
        document.getElementById("message").style.display = "block";
        document.getElementById("messageBox").textContent = "Account Already Exists";
        document.getElementById("message").style.backgroundColor = "red";
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
            document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";

        }, 2000);
    }

    //let TransactionHistory = [];
    const getHistory = document.getElementById("historyGet");
    const HistoryDiv = document.getElementById("historyDiv");
    let repeat = true;
    getHistory.onclick = async () => {
        if (repeat) {
            repeat = false;
            await getCustomer(loginAccNo.value.trim());
            if (response.ok) {
                setTimeout(() => {
                    //console.log(TransactionHistory);
                    TransactionHistory.forEach((transaction) => {
                        const transactionDiv = document.createElement("div");
                        //transactionDiv.classList.add("transaction");
                        transactionDiv.innerHTML = `
            <p>Type: ${transaction.type}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: ${new Date(transaction.date).toLocaleString()}</p>
            <hr>
        `;
                        HistoryDiv.appendChild(transactionDiv);
                    })
                }, 3000);
            }
            else {
                document.getElementById("message").style.display = "block";
                document.getElementById("messageBox").textContent = "No Transaction History Found";
                document.getElementById("message").style.backgroundColor = "red";
                setTimeout(() => {
                    document.getElementById("message").style.display = "none";
                    document.getElementById("message").style.backgroundColor = "rgb(0, 255, 17)";

                }, 2000);
            }
        }
    }
}


// Example usage


// const updatedCustomer = {
//     name: "John Doe Updated",
//     accountNumber: "123456789",
//     balance: 6000,
// };

// Call the functions
// createCustomer(newCustomer); // POST
// updateCustomer("12345", updatedCustomer); // PUT (replace "12345" with the actual customer ID)
// getCustomers(); // GET

// Base API URL
//const apiUrl = "/api/customers"; // Replace with your actual backend API URL

// POST Function: Create a new customer
async function createCustomer(customerData) {
    try {
        response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData),
        });

        if (response.ok) {
            const result = await response.json();
            //console.log("Customer created successfully:", result);
        } else {
            console.error("Failed to create customer:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// PUT Function: Update an existing customer
async function updateCustomer(accountNumber, updatedData) {
    try {
        //console.log(accountNumber, updatedData)
        const response = await fetch(`${apiUrl}/${accountNumber}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        ResponseUpdate = response.ok;

        if (response.ok) {
            const result = await response.json();
            //console.log("Customer updated successfully:", result);
        } else {
            console.error("Failed to update customer:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// GET Function: Retrieve all customers
async function getCustomers() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const customers = await response.json();
            Customers = customers;
            //console.log("Customers retrieved successfully:", customers);
        } else {
            console.error("Failed to retrieve customers:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


// GET Function: Retrieve a single customer by account number
async function getCustomer(accountNumber) {
    //console.log(accountNumber);
    try {
        response = await fetch(`${apiUrl}/${accountNumber}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const customer = await response.json();
            TransactionHistory = customer.transactions;
            //console.log(TransactionHistory);
            //console.log("Customer retrieved successfully:", customer);
            // Display customer details on the UI
            //Amount = customer.balance;
            //console.log(customer.balance);


        } else {
            console.error("Failed to retrieve customer:", response.statusText);

        }
    } catch (error) {
        console.error("Error:", error);

    }
}

// GET Function: Count the number of customers
async function getCustomerCount() {
    try {
        const response = await fetch(`${apiUrl}/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            COunt = data.count;
            //console.log("Total customers:", data.count);

        } else {
            console.error("Failed to fetch customer count:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example usage

document.addEventListener("DOMContentLoaded", () => {
    getCustomers();
    getCustomerCount();
})