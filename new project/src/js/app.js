import CategoryView from "./CategotyView.js";
import ProductView from "./ProductView.js"

document.addEventListener('DOMContentLoaded' , ()=>{
    CategoryView.setApp();
    ProductView.setApp()
    CategoryView.creatCategoryList()
    ProductView.creatProductList(ProductView.products);
})