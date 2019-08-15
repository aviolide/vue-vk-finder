export const globalRouter = (router) => {
  router.beforeEach((to, from, next) => {
    return next();
  });
};
