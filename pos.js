//Product Class
function Product(prod_name, prod_price) {
	this.prod_name = prod_name;
	this.prod_price = prod_price;
}

//Collection Class
function Collection(coll_name, product_array) {
	this[coll_name] = product_array ? product_array : [];
	var coll_key = Object.keys(this).shift();
	this.addProduct = function(product_name,product_price) {
		this[coll_key].push(new Product(product_name,product_price));
	}
	this.deleteProduct = function(product_name) {
		if (!this[coll_key]) console.log('The Collection is empty!');
		for(i=this[coll_key].length-1;i>=0;i--) {
			if(this[coll_key][i].prod_name == product_name) this[coll_key].splice(i,1);
		}
	}
}

//Inventory Class
function Inventory(collection) {
	this.collections = [];
	this.addCollection = function(collection) {
		this.collections.push(collection);
	}
	this.deleteCollection = function(collection_name) {
		if (this.collections.length == 0) console.log('The Inventory is empty!');
		for(i=this.collections.length-1;i>=0;i--) {
			if(Object.keys(this.collections[i]).shift() == collection_name) this.collections.splice(i,1);
		}
	}
}

	function populateProducts(products){
			for(i in products) {
				var stringifiedProduct = JSON.stringify(products[i]);
				$('#collectionProducts').append("<label class='checkbox'><input type='checkbox' class='productCheckbox' value='"+stringifiedProduct+"'>"+products[i].attributes.prod_name+" $"+products[i].attributes.prod_price+"</label>");
			}	
	}
Parse.initialize("yZ6yAZYf09r6KbM0ujYAAwhZquCzA0x5hxOSPzw0", "CoewNUrTBvBolxNz1DbIYRJ0tNpK8pzbDX9mcpSq");

$(document).ready(function(){

	var productQuery = new Parse.Query('Product');	
	productQuery.find({
			success: function(results){
				populateProducts(results);
			}
	})

	$('#productSubmit').on('click',function(e){
		var prod_name = $('#productName').val();
		var prod_price = $('#productPrice').val();
		var ProductObject = Parse.Object.extend('Product');
		var productObject = new ProductObject();
		productObject.save(new Product(prod_name,prod_price));
		var stringifiedProduct = JSON.stringify(new Product(prod_name,prod_price));
		$('#collectionProducts').append("<label class='checkbox'><input type='checkbox' class='productCheckbox' value='"+stringifiedProduct+"'>"+prod_name+" $"+prod_price+"</label>");
	});

	$('#collectionSubmit').on('click',function(e){
		var coll_name = $('#collectionName').val();
		var new_coll = new Collection(coll_name);
		$('input[class="productCheckbox"]:checked').each(function() {
			var product = JSON.parse(this.value);
   		new_coll.addProduct(product.prod_name,product.prod_price);
   	});
   	console.log(new_coll);
		var CollectionObject = Parse.Object.extend('Collection');
		var collectionObject = new CollectionObject();
		collectionObject.save(new_coll);
	});
});

// var prod = new Product('first_product', 0);
// var coll = new Collection('coll_name');
// coll.addProduct('second_product',1);
// console.log(coll);
// coll.deleteProduct('second_product');
// console.log(coll);
// coll.addProduct('third_product', 2);
// console.log(coll);
// var inv = new Inventory();
// console.log(inv);
// inv.addCollection(coll);
// console.log(inv);
// inv.deleteCollection('coll_name');
// console.log(inv);
