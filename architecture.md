# Architecture

Notes about the setup.

## TypeScript

This project is using TypeScript mainly for the superior intellisense that comes with static typing, allowing us to work faster, catch bugs faster, and be more confident in what we're coding.

## HTML Script Modules

We're using the newer script module style for modern browsers to import our code. One strange thing about this is that in our TypeScript files, all of the imports need to end in `.js` as in `import ./file.js` to import a local TS file but to get the transpiled JS file to say `import ./file.js`. This is important for the browser to know the mime-type of the file it's requesting.
