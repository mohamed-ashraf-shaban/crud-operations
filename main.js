
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let submitBtn = document.getElementById("submitBtn");
var allProducts = [];
var currentIndex;

// have data
if(localStorage.getItem("product") != null){
    allProducts = JSON.parse(localStorage.getItem("product"));
    displayProducts();
}
// ============== to Add New Product=======================================
function addProducts(){


    var product = {
        name : productName.value,
        price : productPrice.value,
        desc : productDesc.value,
        category : productCategory.value,
    }

    allProducts.push(product);
    localStorage.setItem("product" ,JSON.stringify(allProducts));
    clearForm();
    displayProducts();
    
}

//======================== for Display Products Data ===========================

function displayProducts(){
    var tableBox = ``;
    for(var i = 0 ; i < allProducts.length; i++){
        tableBox += `<tr>
                    <td>${i}</td>
                    <td>${allProducts[i].name}</td>
                    <td>${allProducts[i].price}</td>
                    <td>${allProducts[i].desc}</td>
                    <td>${allProducts[i].category}</td>
                    <td><button onclick= getProductInfo(${i})  class="btn btn-info">update</button></td>
                    <td><button onclick = deleteProduct(${i}) class="btn btn-danger">Delete</button></td>
                </tr>`
    }
   
    document.getElementById("tableBody").innerHTML = tableBox;
    
}

//======================== To Search in Products ===========================

function searchProducts(term){
    var tableBox = ``;
    for(var i = 0 ; i < allProducts.length; i++){

        if(allProducts[i].name.toLowerCase().includes(term.toLowerCase())== true){
            tableBox += `<tr>
            <td>${i}</td>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].desc}</td>
            <td>${allProducts[i].category}</td>
            <td><button onclick= getProductInfo(${i})  class="btn btn-info">update</button></td>
            <td><button onclick = deleteProduct(${i}) class="btn btn-danger">Delete</button></td>
        </tr>`
        }

    }
    document.getElementById("tableBody").innerHTML = tableBox;
}

//======================== To Clear Form Inbuts ===========================

function clearForm(){

        productName.value = '';
        productPrice.value = '';
        productDesc.value = '';
        productCategory.value = '';
}

//======================== For Delete Product ===========================

function deleteProduct(index){ 

    allProducts.splice(index,1)
    localStorage.setItem("product" ,JSON.stringify(allProducts));
    displayProducts();
}
//======================== For AddProducts Button ===========================

// ================= to get value in Form ==================================
function getProductInfo(index){

    productCategory.value = allProducts[index].category;
    productName.value = allProducts[index].name;
    productDesc.value = allProducts[index].desc;
    productPrice.value = allProducts[index].price;
    submitBtn.innerHTML = "Update Product"
    currentIndex = index;
}
// =================== to change value at current products===================
function updateProduct(){

    var product = {
        name : productName.value,
        price : productPrice.value,
        desc : productDesc.value,
        category : productCategory.value
    }
    console.log(product);
  allProducts[currentIndex]=product;
  localStorage.setItem("product" ,JSON.stringify(allProducts));
}

//======================== For AddProducts Button ===========================

submitBtn.addEventListener("click", function(){

    if(submitBtn.innerHTML == "add product"){
        addProducts();
    }else{
        updateProduct(); 
    }
    
});