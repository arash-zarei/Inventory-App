import Storage from "./Storage.js";

const categoryTitle = document.querySelector('#category-title');
const categoryDescription = document.querySelector('#category-description');
const addNewCategoryBtn = document.querySelector('#add_category_btn');
const newCategoryForm = document.querySelector('.new_category')
const addCategoryFormBtn = document.querySelector('.add_category');
const canselCategoryFormBtn = document.querySelector('.calnsel_btn');
const addProductDIV = document.querySelector('.add_products');
console.log(addProductDIV);

class CategoryView{
    constructor(){
        addNewCategoryBtn.addEventListener('click' , (e)=> this.addNewCategory(e))
        addCategoryFormBtn.addEventListener('click' , this.addCategoryForm);
        canselCategoryFormBtn.addEventListener('click' ,(e)=> this.canselAddCategory(e))
        this.categories = [];
    }
    addNewCategory(e){
        e.preventDefault();
        const title = categoryTitle.value;
        const description = categoryDescription.value;
        if(!title || !description) return;
        Storage.savecategory({title , description})
        this.categories = Storage.getAllCategories()
        this.creatCategoryList();
        categoryTitle.value = '';
        categoryDescription.value = '';
        newCategoryForm.classList.remove('show_category_form');
        addCategoryFormBtn.classList.remove('hid_btn_add');
    }
    setApp(){
        this.categories = Storage.getAllCategories()
    }
    creatCategoryList(){
        let resulte = `<option value="">Select A Category</option>`;
        this.categories.forEach(element =>{
            resulte += `<option value="${element.id}">${element.title}</option>`
        })

        const categoryDOM = document.querySelector('#selected-category');
        categoryDOM.innerHTML = resulte
    }
    addCategoryForm(){
        newCategoryForm.classList.add('show_category_form');
        addCategoryFormBtn.classList.add('hid_btn_add');
        addProductDIV.scrollTop = addProductDIV.scrollTopMax;
    }
    canselAddCategory(e){
        e.preventDefault()
        newCategoryForm.classList.remove('show_category_form');
        addCategoryFormBtn.classList.remove('hid_btn_add')
    }
}

export default new CategoryView()