const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

//Prompt the user with two messages. The first should ask them the ID of the product key they would like to buy.
// Second message should ask how many units of the product key they would like to buy.
const purchaseItem = () => {
    connection.query('SELECT * FROM products', function (err, results) {
    inquirer.prompt([
    // Ask ID of Product
        {
            name: 'userChoice',
            type:'input',
            message: 'Welcome to Bamazon! Please enter the Item ID of the product you would like to purchase.',
            choices: function () {
                let products = [];
                for (let i = 0; i < results.length; i++) {
                    products.push(results[i].item_id.product_name);
                }
                return products;
            },
        },
     // Ask how many units
        {
            name: 'units',
            type: 'input',
            message: 'How many units of the product would you want to purchase?'

        },
    
    // Here we ask the user to confirm.
        {
            type: 'confirm',
            message: 'Are you sure:',
            name: 'confirm',
            default: true
        }

    ])
    .then(function(inquirerResponse) {
      /* 1. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
            If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through. */
      
     /*  2. However, if your store does have enough of the product, you should fulfill the customer's order. This means updating the SQL database to reflect the remaining quantity.
            Once the update goes through, show the customer the total cost of their purchase. */
     

      // If the inquirerResponse confirms, we displays the inquirerResponse's item and price amount if there are enough units for the item.
        if (inquirerResponse.confirm) {
          console.log(`You have chosen item ${inquirerResponse.product_name}!\n`);
        }
        else {
            console.log('\nSorry. There is insufficeint quantity for your item. \n Please try again later or select a different product to purchase.\n \n \n \n');
        }

      });

    });
}