const products = []
const categories = []

export default class Storage{

    static getAllCategories(){
        const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
        const sortCaregories = savedCategories.sort((a , b)=>{
            return new Date(a.careatedAt) > new Date(b.careatedAt) ? -1 : 1;
        })
        return sortCaregories;
    }
    static savecategory(categoryToSaved){
        const savedCategories = Storage.getAllCategories();
        const existItems = savedCategories.find((c)=> c.id === categoryToSaved.id)

        if(existItems){
            existItems.title = categoryToSaved.title;
            existItems.description = categoryToSaved.description;
        }else{
            categoryToSaved.id = new Date().getTime()
            categoryToSaved.careatedAt = new Date().toISOString();
            savedCategories.push(categoryToSaved)
        }
        localStorage.setItem('category' , JSON.stringify(savedCategories))
    }
    static getAllProducts(sort = 'newest'){
        const saveProducts = JSON.parse(localStorage.getItem('products')) || [];
        const sortProducts = saveProducts.sort((a , b)=>{
            if(sort === 'newest'){
                return new Date(a.careatedAt) > new Date(b.careatedAt) ? -1 : 1;
            }else if(sort === 'oldest'){
                return new Date(a.careatedAt) > new Date(b.careatedAt) ? 1 : -1;
            }
        })
        return sortProducts;
    }
    static saveProducts(productToSaved){
        const saveProducts = Storage.getAllProducts();
        const existItems = saveProducts.find((c)=> c.id === productToSaved.id)

        if(existItems){
            existItems.title = productToSaved.title;
            existItems.quantity = productToSaved.quantity;
            existItems.category = productToSaved.category;
        }else{
            productToSaved.id = new Date().getTime()
            productToSaved.careatedAt = new Date().toISOString();
            saveProducts.push(productToSaved)
        }
        localStorage.setItem('products' , JSON.stringify(saveProducts))
    }
    static deleteProduct(id){
        const savedProducts = Storage.getAllProducts();
        const filterestProducts = savedProducts.filter((p) => p.id !== parseInt(id));
        localStorage.setItem('products' , JSON.stringify(filterestProducts))
    }

}