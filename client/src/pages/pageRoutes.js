export const IndexRoute = "/"
export const profileRoute = "/profile"
export const categoriesRoute = "/categories"
export const addCategoryRoute = "/add-category"
export const signInRoute = "/sign-in"
export const signUpRoute = "/sign-up"
export const editCategoryRoute = (categoryId)=>{
    if(categoryId){
        return `/category/update-category/${categoryId}`
    }else{
        return `/category/update-category/:categoryId`
    }
}