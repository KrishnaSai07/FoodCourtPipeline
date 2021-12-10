const express = require("express");
const bodyParser = require("body-parser");
const { request, response } = require('express');
const app = express();
const {getOrders,addOrder,getFoodItems,updateOrders} = require('./backendCalls');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.get("/getOrders",(request,response)=>{

    getOrders().then((res)=>{
        console.log(res);
        response.send(res)
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/addOrders",(request,response)=>{
    addOrder(request.body).then((resp)=>{
        console.log(resp);
        response.send(resp);
    }).catch((err)=>{
        console.log(err);
    })

})

app.get("/updateOrder",(request,response)=>{
    updateOrders(request.query.orderNumber).then((resp)=>{
        getOrders().then(respo=>{
            response.send(respo)
        }).catch(err=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log(err);
    })
});

app.get("/getFoodItems",(request,response)=>{
    getFoodItems(request.query.itemCategory).then((resp)=>{
        response.send(resp)
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(9798,()=>{
    console.log("Server is up!")
});