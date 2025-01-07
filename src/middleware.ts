import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,

} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  console.log("Ruta actual:", request.nextUrl.pathname);
  console.log("Usuario autenticado:", convexAuth.isAuthenticated());

  if (!isPublicPage(request) && !convexAuth.isAuthenticated()) {
    console.log("Redirigiendo a /auth");
    return nextjsMiddlewareRedirect(request, "/auth");
  }
  if (isPublicPage(request) && convexAuth.isAuthenticated()) {
    console.log("Redirigiendo a /");
    return nextjsMiddlewareRedirect(request, "/");
  }

  return null;
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
