// app/routes.js
//TODO: clean up the way errors are handeled
//TODO: incorperate a way to handle non-existant routes (i.e. a 404 page)
//TODO: add a way to update an existing item in the list
var ProductList  = require('./models/productList.js');
var Product      = require('./models/productList.js');

module.exports = function(app){

    //==================================================================================
    // SERVER ROUTES 
    // =================================================================================


    // test route to make sure everything is working (accessed via GET http:// localhost:8080/api)
    app.get('/api', function(req, res) {
        res.json({ message: "The Product API and is up and running." });
    });

    // on routes that end in /products
    // -----------------------------------------------------------------------------------------
    app.route('/api/productList')

        // create a product (accessed at POST http://localhost:8080/api/productList)
        .post(function(req, res) {
            var productList = new ProductList();        // create a new instance of the ProductList model
            console.log("/api/productList called");

            // save the productList and check for errors
            productList.save(function(err) {
                if (err){
                    res.send(err);
                    console.log("there was an error saving the product list");
                }

                res.json({ message: 'ProductList created!', productListID : productList._id });
            });
        })

        // get all the productLists (accessed at GET http://localhost:8080/api/productList)
        .get(function(req, res) {
            ProductList.find(function(err, productList) {
                if(err)
                    res.send(err);

                res.json(productList);
            });
        });

    // on routes that end in /productList/_id, used when dealing with just a single productList in db
    // ----------------------------------------------------------------------------------------
    app.route('/api/productList/:productList_id')

        // get the productList with _id (accessed via GET http://localhost:8080/api/productList/_id)
        .get(function(req,res) {

            //use the product model to find the product we want
            ProductList.findById(req.params.productList_id, function(err, productList) {
                if(err)
                    res.send(err);
                res.json(productList);
            });
        }) 

        // add a product to the productList with _id (accessed via POST http://localhost:8080/api/productsList/_id)
        .post(function(req,res) {

            //use the productList model to find the productList we want
            ProductList.findById(req.params.productList_id, function(err, productList) {
                if(err)
                    res.send(err);

                var product = new Product();        // create a new instance of the Product model

                // fill the product object with values from the POST request
                product.name = req.body.name;
                product.description = req.body.description;
                product.price = req.body.price;
                product.imagePath = req.body.imagePath;
                
                // save the product to the list
                productList.products.push({name: product.name, description: product.description, price: product.price, imagePath: product.imagePath});

                //save the productList
                productList.save(function(err) {
                    if(err)
                        res.send(err);

                    res.json({ message: 'ProductList updated!' });
                }); 
            });
        })

        // delete the productList with _id (accessed at DELETE http://localhost/api/productsList/_id)
        .delete(function(req, res) {
            ProductList.remove({ _id: req.params.productList_id }, function(err,productList) {
                if(err)
                    res.send(err);

                res.json({ message: 'ProductList successfully deleted' });
                
            });
        });
    // delete a product with product_id from productList with productList_id
    app.delete('/api/productList/:productList_id/:product_id', function(req, res) {
        //use the productList model to find the productList we want
        ProductList.findById(req.params.productList_id, function(err, productList) {
            if(err)
                res.send(err);

            // delete the product from the list
            productList.products.pull({ _id: req.params.product_id });

            //save the productList
            productList.save(function(err) {
                if(err)
                    res.send(err);

                res.json({ message: 'Product successfully deleted' });
            });
        });
    });
    // =========================================================================================
    // FRONTEND ROUTES
    // =========================================================================================
    // any routes that aren't API requests will be passed along to Angular to handle 
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
