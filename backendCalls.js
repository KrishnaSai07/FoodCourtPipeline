const mysql = require('mysql2')

const getOrders = () =>{
    return new Promise((resolve,reject)=>{

        var connection = mysql.createConnection({
            host:'footballmadesimple.c18ndxpocyny.us-east-2.rds.amazonaws.com',
            port:'3306',
            user:'admin',
            password:'JethroGibbs',
            database: 'foodcourt'
        })
        
        connection.connect()
    
        connection.query('SELECT orderNumber as orderNumber,customerName as customerName,orderData as orderData,totalPrice as totalPrice,orderStatus as orderStatus FROM orders where orderStatus="PEND"', function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        
        connection.end();
    });
}

const addOrder = (data) =>{
    return new Promise((resolve,reject)=>{

        var connection = mysql.createConnection({
            host:'footballmadesimple.c18ndxpocyny.us-east-2.rds.amazonaws.com',
            port:'3306',
            user:'admin',
            password:'JethroGibbs',
            database: 'foodcourt'
        })
        
        connection.connect()
    
        connection.query('INSERT INTO orders (orderNumber,customerName,orderData,totalPrice,orderStatus) VALUES(?,?,?,?,?)',[data.orderNumber,data.customerName,data.orderData,data.totalPrice,data.orderStatus], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(data);
            });
        
        
        connection.end();
    });
}

const updateOrders = (orderNumber) => {
    return new Promise((resolve,reject)=>{

        var connection = mysql.createConnection({
           host:'footballmadesimple.c18ndxpocyny.us-east-2.rds.amazonaws.com',
            port:'3306',
            user:'admin',
            password:'JethroGibbs',
            database: 'foodcourt'     
        })
        
        connection.connect()
    
        connection.query("UPDATE orders SET orderStatus='COMP' WHERE orderNumber=?",[orderNumber], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        
        connection.end();
    });
}

const getFoodItems = (itemCategory) =>{
    return new Promise((resolve,reject)=>{

        var connection = mysql.createConnection({
            host:'footballmadesimple.c18ndxpocyny.us-east-2.rds.amazonaws.com',
            port:'3306',
            user:'admin',
            password:'JethroGibbs',
            database: 'foodcourt'
        })
        
        connection.connect()
    
        connection.query("SELECT itemId as itemId, itemName as itemName, price as price, itemCategory as itemCategory FROM fooditems WHERE itemCategory=?",[itemCategory], function (error, results, fields) {
            if (error){ reject(error) };
            resolve(results);
            });
        
        
        connection.end();
    });
}

module.exports = {getOrders,addOrder,getFoodItems,updateOrders}
