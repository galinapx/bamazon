var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table'); 

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "milka19988",
    database: "bamazon"
  });

    // Creates the connection with the server and loads the product data upon a successful connection
       connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    getProuducts();
  });
  //create a function to load the products tables from the database - print the results. 
  function getProuducts() {
  //select all the data from mySQL products table. 
    connection.query("SELECT * FROM products",function(err,results) {
      if (err) throw err;
      console.table(results);
      promptCustomerForItem(results);
    });   
  }
    //getProuducts(); 

    function promptCustomerForItem(inventory) {
      inquirer.prompt([
        {
          type: "input", 
          name: "choice",
          message: "what is the ID of the item you want to purchase? [quit with Q]",
          validate: function(value) {
            return !isNaN(value) || value.toLowerCase() === "q";
          }

      }
    ])
    .then(function(value) {
      // Check if the user wants to quit the program
      checkIfShouldExit(value.choice);
      var choiceId = parseInt(value.choice);
      var product = inventoryCheck(choiceId, inventory);

      // If there is a product with the id the user chose, prompt the customer for a desired quantity
      if (product) {
        
        promptCustomerQuantity(product);
      }
      else {
        // Otherwise let them know the item is not in the inventory, re-run loadProducts
        console.log("\nThat item is not in the inventory.");
        getProducts();
      }
    });    
 }
function promptCustomerQuantity(product) {
  inquirer.prompt([
    {
        type: "input",
        name: "quantity",
        message: "how many would you like? [quit with Q]",
        validate: function(value) {
          return !isNaN(value) || value.toLowerCase() === "q";
        }
    }
  ])
  .then(function(value) {
    checkIfShouldExit(value.quantity);
    var quantity = parseInt(value.quantity);
    if (quantity > product.stockQuantity) {
      console.log("\ninsufficient quantity");
      getProuducts();

    } else {
      makePurchase(product, quantity)
    }
  })
}

function makePurchase(product, quantity) {
connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
  [quantity, product.item_id],
  function(error, results) {
    console.log("\nsuccessful purchase " + quantity + " " + product.product_name);
    getProuducts();
    } 
  );
} 

function inventoryCheck(choiceId, inventory) {
  for(var i = 0; i < inventory.length; i++) {
    if(inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

function checkIfShouldExit(choice) {
  if(choice.toLowerCase() === "q"){
    console.log("goodbye!")
    process.exit(0);
  }
}








//     inquirer.prompt([{
//       name: "ID",
//       message: "What product ID do you want to buy?"
//     },{
//       name: "quantity",
//       message: "How many would you like to buy?"
//     }]).then(function(answers) {
// //then set the answers to a variable
//       var productID = answers.ID;
//       var productStock = answers.quantity;
// //create a mysql connection with query to select stockquantity column based on ? or user's ID number input under itemID column
// connection.query('SELECT stockQuantity FROM products WHERE ?', {itemID: productID}, function(err, res, field){


// //res[0] will limit down to rowdatapacket{stockquantity: 7000}, and .(columnName) will only return as the number
// var currentStock = res[0].stockQuantity;


// if(err)throw err;
// if(productStock > currentStock){
//   console.log("Sorry, out of stock!");
//   console.log("Currently only have" + currentStock + "in stock");
// }else{
//   console.log("in stock!");
//   console.log("Currently we have " + currentStock + " in stock");
//   var newStock = currentStock - productStock


// //runs the updateStock function to update the inventory in mysql for stockQuantity value
// //passes the newStock and productID values in as it doesnt have access to those variables
//   updateStock(newStock, productID);
// }
// })
// });


// //function update stock runs update mysql query to update the table using user passed in data, that is passed in from argument
// //selects and prints the price
// var updateStock = function(newStock, productID){

// connection.query('UPDATE products SET ? WHERE ?',[{stockQuantity: newStock},{itemID: productID}], function(err, res, field){
//   connection.query('SELECT stockQuantity FROM products WHERE ?', {itemID: productID}, function(err, res){
//   if(err)throw err;
//   console.log("...................................")
//   console.log("Purchased!");
//   console.log("the stock leftover now has " + res[0].stockQuantity);
// })
// connection.query('SELECT price FROM products WHERE ?', {itemID: productID}, function(err, res){
// if(err)throw err;
// console.log("...................................")
// console.log("Your total cost is " + res[0].price);
// })
// })

// }
  