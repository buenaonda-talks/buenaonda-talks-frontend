import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: [
        '/',
        '/api/monitoring',
        '/monitoring',
        '/graphql',
        '/admin',
        '/becas-y-procesos',
    ],
});

export const config = {
    // Only catch routes under /dashboard, we should use javascript regex, example: '/((?!.+\\.[\\w]+$|_next).*)'
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|graphql)(.*)'],
};
