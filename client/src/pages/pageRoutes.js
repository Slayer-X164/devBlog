export const IndexRoute = "/";
export const profileRoute = "/profile";
export const categoriesRoute = "/categories";
export const addCategoryRoute = "/add-category";
export const signInRoute = "/sign-in";
export const signUpRoute = "/sign-up";
export const editCategoryRoute = (categoryId) => {
  if (categoryId) {
    return `/category/update-category/${categoryId}`;
  } else {
    return `/category/update-category/:categoryId`;
  }
};
export const blogRoute = "/blog";
export const addBlogRoute = "/blog/add";
export const updateBlogRoute = (blog_id) => {
  if (blog_id) {
    return `/blog/edit/${blog_id}`;
  } else {
    return "/blog/edit/:blog_id";
  }
};
export const blogReadRoute = (slug) => {
  if (slug) {
    return `/read/${slug}`;
  } else {
    return `/read/:slug`;
  }
};
export const getBlogByCategoryRoute = (category) => {
  if (!category) {
    return "/blog/get-all/:category";
  } else {
    return `/blog/get-all/${category}`;
  }
};

export const searchRoute = (query) => {
  if (query) {
    return `/blog/search?query=${query}`;
  } else {
    return `/blog/search`;
  }
};
export const blogAllCommentsRoute = "/blog/all-comments"
export const usersAllDetailRoute = "/blog/all-users"
