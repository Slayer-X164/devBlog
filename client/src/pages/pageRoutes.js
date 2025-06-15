export const IndexRoute = "/"
export const profileRoute = "/profile"
export const categoriesRoute = "/categories"
export const addCategoryRoute = "/add-category"
export const signInRoute = "/sign-in"
export const signUpRoute = "/sign-up"
export const editCategoryRoute = (category_id)=>{
    if(category_id){
        return `/edit-category/${category_id}`
    }else{
        return `/edit-category/:category_id`
    }
}