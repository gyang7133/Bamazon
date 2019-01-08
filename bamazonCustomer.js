//Dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

//MYSQL Connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "password", //Your password
    database: "bamazon"
});

//MAIN CHECK AND ORDER FUNCTION WHICH DISPLAYS ALL ITEMS FROM MY SQL DATABASE AND THEN ADDS FUNCTIONALITY TO BUY AN ITEM WITH QUANTITIY CHOICES. 
var checkAndOrder = function() {
        // Make the database query
        connection.query('SELECT * FROM products', function(err, data) {
            if (err) throw err;

            console.log('Available Items to Buy in Bamazon Inventory: ');
            console.log("---------------------------------------------------------------------\n");

            var output = '';
            for (var i = 0; i < data.length; i++) {
                output = '';
                output += 'Item ID: ' + data[i].item_id + '  |  ';
                output += 'Product Name: ' + data[i].product_name + '  |  ';
                output += 'Department: ' + data[i].department_name + '  |  ';
                output += 'Price: $' + data[i].price + '\n';

                console.log(output);
            }

         console.log("---------------------------------------------------------------------\n");
        inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the item ID you would like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            },
            filter: Number
        }, 
        {
            name: "quantity",
            type: "input",
            message: "How many of this item would you like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            },
            filter: Number
        }
        ]).then(function(answer) {
            var chosenId = answer.item_id;
            var chosenQuantity = answer.quantity;
            
        // Query the database to confirm that the given item ID exists in the desired quantity
            connection.query('SELECT * FROM products WHERE ?', {item_id: chosenId}, function(err, data) {
                if (err) throw err;
       
        if(data.length === 0) {
            
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');


        } else {
            var productData = data[0];

        // Checks if the quantity requested by the user is in stocks
            if (chosenQuantity <= productData.stock_quantity) {
                console.log("Hooray! The product you selected is in stock! Your total for " + "(" + answer.quantity + ")" + " - " + productData.product_name + " is: $" + productData.price.toFixed(2) * chosenQuantity);
                console.log('Thank you for shopping at Bamazon!');
                console.log("---------------------------------------------------------------------\n");
        // Update the Inventory   
            var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - chosenQuantity) + " WHERE item_id = " + chosenId;
            connection.query(updateQueryStr, function(err, data){
                if (err) throw err;

        // End Database Connection
            connection.end
            })
            
            } 
            else {
                console.log("Sorry, insufficient Quanity at this time. All we have is " + productData.stock_quantity + " in our Inventory.");
                console.log("Please modify your order.");
                console.log("---------------------------------------------------------------------\n");
                checkAndOrder();
            }
        }

        
         })
     })
  })
}

//Run the application
checkAndOrder();