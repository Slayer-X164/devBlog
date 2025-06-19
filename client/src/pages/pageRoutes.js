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
export const blogRoute = "/blog"
export const addBlogRoute = "/blog/add"
export const updateBlogRoute = (blog_id)=>{
    if(blog_id){
        return `/blog/edit/${blog_id}`
    }else{
        return "/blog/edit/:blog_id"
    }
}