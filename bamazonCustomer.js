const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Georgieboy12gy',
    database: 'bamazon',
    insecureAuth : true
});

connection.connect(function (err) {
    if (err) throw err;
    purchaseItem();
    console.log('Connection established');
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

        }

    ])
    .then(function(input) {

      /* 1. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
            If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through. */
      
     /*  2. However, if your store does have enough of the product, you should fulfill the customer's order. This means updating the SQL database to reflect the remaining quantity.
            Once the update goes through, show the customer the total cost of their purchase. */
        let chosenItem;
        for (let i = 0; i < results.length; i++) {
            if (input.userChoice === results[i].product_name) {
                chosenItem = results[i];
            }
        }

        if (chosenItem.stock_quantity >= parseInt(input.units)) {

            let unitsBought = parseInt(input.units);
            let priceOfUnits = (unitsBought * chosenItem.price).toFixed(2);
            

            let stockLeft = parseInt(chosenItem.stock_quantity - unitsBought);

            connection.query(
                'UPDATE products SET ? WHERE ?',
                [
                    {
                        product_sales: priceOfUnits,
                        stock_quantity: stockLeft
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ],
                function (error) {
                    if (error) {
                        throw err;

                    } else {
                        console.log(`\nDone!\nThank you for your purchase of ${item.units} units of ${chosenItem.product_name}.\nYour total cost for this purchase is ${priceOfUnits}\n \n \n`);
                        setTimeout(function () {
                            purchaseItem();
                        }, 1500);
                    }


                }
            );

        } else {
            console.log('\nSorry. There are not enough units your purchase. \n Please try again later or select a different product to purchase.\n \n \n \n');
            setTimeout(function () {
                purchaseItem();
            }, 1500);

        }

      });

    });
}