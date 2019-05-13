# Emaily Sapper App

Notes:

- No need to tinker with "exact" path matching issues found on React Router or having to use the Link component for links, routing with Sapper is a breeze.
- Had to JSON.stringify and JSON.parse the mongoose req.user object in order to use Sapper's session store.
- Auth route definitions can be created as seen in the course or using Sapper's built-in routing using folders and .js files.
