import Storage from "./Storage.js";

const productTitle = document.getElementById('product-title');
const productQuantity = document.getElementById('product-quantity');
const productCategory = document.getElementById('selected-category');
const addNewProductBtn = document.getElementById('add-product');
const serachInput = document.getElementById('search-product');
const sortSelected = document.getElementById('sort-products');
const btnAddProductDIV = document.querySelector('.btn_add_product');
const addProductDIV = document.querySelector('.add_products');
const btnHideProductDiv = document.querySelector('.btn_close_product');
const countProducts = document.querySelector('.count')

class ProductView{
    constructor(){
        addNewProductBtn.addEventListener('click' , (e)=> this.addNewProduct(e))
        serachInput.addEventListener('input' , (e)=> this.searchProducts(e))
        sortSelected.addEventListener('change' , (e)=> this.sortProducts(e))
        btnAddProductDIV.addEventListener('click' , this.viewProductDiv)
        btnHideProductDiv.addEventListener('click' , this.hideProductDiv)
        this.products = [];
    }

    viewProductDiv(){
        addProductDIV.classList.add('show');
    }
    hideProductDiv(){
        addProductDIV.classList.remove('show');
    }

    setApp(){
        this.products = Storage.getAllProducts()
    }

    addNewProduct(e){
        e.preventDefault()
        const title = productTitle.value;
        const quantity = productQuantity.value;
        const category = productCategory.value;
        if(!title || !quantity || !category) return;
        Storage.saveProducts({title , quantity , category});
        this.products = Storage.getAllProducts()
        this.creatProductList(this.products)
        this.hideProductDiv()
        productTitle.value = '';
        productQuantity.value = '';
    }

    creatProductList(products){
        let result = '';
        products.forEach(element =>{
            const selectedCategory = Storage.getAllCategories().find((c) => c.id == element.category);
            result += `
            <div class="product">
            <div class="title"><p>${element.title}</p></div>
            <div class="specifications">
                <span class="date">${new Date().toLocaleDateString('fa-IR')}</span>
                <span class="category">${selectedCategory.title}</span>
                <span class="quentity">${element.quantity}</span>
                <button data-id="${element.id}" class="delete_product">Delete</button>
            </div>
        </div>
            `
        })

        const productDOM = document.querySelector('.items_products').querySelector('.content');
        productDOM.innerHTML = result

        const deleteBtns = [...document.querySelectorAll('.delete_product')];
        deleteBtns.forEach(items =>{
            items.addEventListener('click' , (e)=> this.deleteProduct(e))
        })

        countProducts.innerHTML = this.products.length

    }

    searchProducts(e){
        const value = e.target.value.trim().toLowerCase()
        const filterestProducts = this.products.filter((p) =>{
            return p.title.toLowerCase().includes(value)
        })
        this.creatProductList(filterestProducts)
    }

    sortProducts(e){
        const value = e.target.value;
        this.products = Storage.getAllProducts(value)
        this.creatProductList(this.products)
    }
    deleteProduct(e){
        const productId = e.target.dataset.id;
        Storage.deleteProduct(productId);
        this.products = Storage.getAllProducts()
        this.creatProductList(this.products)
    }
}

export default new ProductView()