class BankAccount {
    constructor(accountHolderName, accountType) {
        this.accountHolderName = accountHolderName;
        this.accountType = accountType;
        this.balance = 0;
        this.transactionHistory = [];
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.logTransaction(amount, 'deposit');
        } else {
            this.showError("Invalid deposit amount. Please enter a positive value.");
        }
    }

    withdraw(amount) {
        if (amount > 0) {
            if (amount <= this.balance) {
                this.balance -= amount;
                this.logTransaction(amount, 'withdraw');
            } else {
                this.showError("Insufficient funds. Cannot withdraw.");
            }
        } else {
            this.showError("Invalid withdrawal amount. Please enter a positive value.");
        }
    }

    checkBalance() {
        console.log(`${this.accountHolderName}'s ${this.accountType} account balance: $${this.balance}`);
    }

    logTransaction(amount, action) {
        const transactionTime = new Date().toLocaleString();
        this.transactionHistory.unshift({
            accountHolderName: this.accountHolderName,
            accountType: this.accountType,
            amount: amount,
            action: action,
            balance: this.balance,
            transactionTime: transactionTime,
        });
        this.updateTransactionHistory();
        this.checkBalance();
    }

    updateTransactionHistory() {
        const transactionTable = document.getElementById("transaction-history");
        const tbody = transactionTable.querySelector("tbody");
        tbody.innerHTML = ""; // Clear the table body

        this.transactionHistory.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.accountHolderName}</td>
                <td>${transaction.accountType}</td>
                <td>${transaction.action}</td>
                <td>$${transaction.amount}</td>
                <td>$${transaction.balance}</td>
                <td>${transaction.transactionTime}</td>
            `;
            tbody.appendChild(row);
        });
    }

    showError(message) {
        alert(`Error: ${message}`);
    }
}

function updateAccountDetails(account) {
    document.getElementById("account-holder").textContent = account.accountHolderName;
    document.getElementById("account-type").textContent = account.accountType;
    document.getElementById("balance").textContent = account.balance;
}

let myAccount = new BankAccount("John Doe", "Savings");

function deposit() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (!isNaN(amount) && amount > 0) {
        const confirmation = window.confirm(`Are you sure you want to deposit $${amount}?`);
        if (confirmation) {
            myAccount.deposit(amount);
            updateAccountDetails(myAccount);
        }
    } else {
        myAccount.showError("Invalid deposit amount. Please enter a valid positive number.");
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (!isNaN(amount) && amount > 0) {
        const confirmation = window.confirm(`Are you sure you want to withdraw $${amount}?`);
        if (confirmation) {
            try {
                myAccount.withdraw(amount);
                updateAccountDetails(myAccount);
            } catch (error) {
                myAccount.showError(`Error: ${error.message}`);
            }
        }
    } else {
        myAccount.showError("Invalid withdrawal amount. Please enter a valid positive number.");
    }
}

updateAccountDetails(myAccount);
