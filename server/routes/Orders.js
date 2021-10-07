const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');

router.get("/Orders/:id", function (req, res) {
    const CustomerId = req.params.id;
    const query = "SELECT * FROM orders where CustomerId = ?";

    const query1 = "select * from orders inner join restaurant on orders.RestaurantId = restaurant.RestaurantId where CustomerId = ?" ;

    con.query(query1, [CustomerId], (err, results, fields) => {
        res.status(200).send(results);

    });
});

router.get("/restaurant/Orders/:id", function (req, res) {
    const RestaurantId = req.params.id;
    const query = "SELECT * FROM orders where CustomerId = ?";

    const query1 = "select * from orders inner join Customer1 on orders.CustomerId = Customer1.CustomerId where RestaurantId = ?" ;

    con.query(query1, [RestaurantId], (err, results, fields) => {
        res.status(200).send(results);

    });
});

router.post("/restaurant/Orders/:id1/:id2", function (req, res) {
    const OrderStatus = req.params.id2;
    const OrderId= req.params.id1;

    console.log("i am here")

    const query= "update orders set OrderStatus = ? where OrderId = ?"

    con.query(query, [OrderStatus, OrderId], (err, results, fields) =>{
       if(err){
           console.log(err)
       } 
       else{
           res.status(200).send(results)
       }
    })
})


router.post("/orders/customer/:id", function (req, resp) {
    let orderId = uuidv4();
    let customerId = req.params.id;
    let cart = req.body.cart;
    let Total = req.body.TotalAmt
    console.log(Total)
    let addressId = req.body.addressId;
    let deliverytype = req.body.deliverytype;
    let restaurantId = req.body.restaurantId;
    orderId = uuidv4();
    currentTimeStamp = new Date();

    const orderQuery = "INSERT INTO orders (OrderId, CustomerId, RestaurantId, OrderStatus, DeliveryType, CreatedAt, LastUpdatedTime, TotalAmount, DeliveryAddressId) VALUES (?,?,?,?,?,?,?,?,?)";
    con.query(orderQuery, [orderId,customerId,restaurantId,"Order Received",deliverytype,currentTimeStamp,currentTimeStamp,Total, addressId], (err, results, fields) => {
        if (err) {
            console.log(err)
            resp.status(500).send({ error: 'Unknown internal server error' });
        } else {
            let orderDetails = [];
            cart.map(
                item => {
                    orderDetails.push([
                        orderId,
                        item.DishId,
                        item.Quantity
                    ]);
                }
            );
            const detailsQuery = "INSERT INTO orderdetails (OrderId, DishId, Quantity) VALUES ?";
            con.query(detailsQuery, [orderDetails], (err, results, fields) => {
                if (err) {
                    console.log(err);
                    resp.status(500).send({ error: 'Unknown internal server error' });
                } else {
                    resp.send({orderId: orderId });
                }
            });

        }
    });
});


router.get("/orders/customer/:id", function (req, res) {
    const customerId = req.params.id;
    const query = "SELECT * FROM address as a INNER JOIN orders as o INNER JOIN restaurant as r on r.RestaurantId = o.RestaurantId and o.DeliveryAddressId = a.AddressId where o.CustomerId = ?";
    //console.log(req);
    con.query(query, [customerId], (err, results, fields) => {
        console.log(err);
        res.status(200).send(results);
    });
});

router.get("/orders/:id/items", function (req, res) {
    const orderId = req.params.id;
    const query = "SELECT * from orderdetails as o INNER JOIN dishes as d on d.DishId = o.DishId where o.OrderId = ?";
    //console.log(req);
    con.query(query, [orderId], (err, results, fields) => {
        console.log(err);
        res.status(200).send(results);
    });
});

module.exports = router;