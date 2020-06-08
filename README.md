# Coding challenge

This small React app shows popular recent repositories on GitHub. The results can be filtered by date and programming language. Starred project are saved in the local storage.

## Start locally

Node.js is required for development.

After having cloned the project locally with git,
navigate in your terminal to the folder of the project and run :

```sh
npm install
npm start
```

Your default browser should then open the application.
If not, follow the instructions displayed in the terminal.

## Packages and libraries used

- create-react-app
- material-ui
- redux

## Thoughts about the Good, the Bad, and the Clock

This very simple app was built to show how I write code in a professional context. I put a lot of effort to make the code easy to read and understand.

The requirements were to spend about 4 hours of work. A couple of things are therefore missing: type safety, tests, and a proper style theming.

On the other hand, I chose to migrate to redux, because I believe that a centralized state management is the best feature of modern frameworks, although for an app of this size, it is bit unnecessary.
