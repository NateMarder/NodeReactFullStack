# Node React Full-Stack Practice

> This repo contains resources and code related to my own work on improving my skills related to Node, Express, MongoDB, React, Redux, Redux Forms, and Email Porvider.

## Table of Contents

 - [Server Side Architecture](#ServerSideArchitecure)
 - [Helpful Notes](#HelpfulNotes)

---


## Server Side Architecture

- _description of server side archictecture coming soon_

## Helpful Notes

### &nbsp; The Tutorial From Grider

- [_LINK TO GRIDER'S UDEMY TUTORIAL_](https://www.udemy.com/node-with-react-fullstack-web-development)

### &nbsp; Heroku Deloyments

1. Handle dynamic port binding. This is done within the file that handles setting up the server. You can get the port dynamically from heroku, or if deploying within a dev environment just use port 5000.
    ```js
    const PORT = process.env.PORT || 5000;
    ```
2. Specify node environment - we need to tell Heroku which version of node to actually run. Thjis can be done through the package.json file.
    ```js
    "engines": {
      "node": "8.1.1",
      "npm": "5.0.3"
    },
    ```
3. Specify node start script for Heroku
    ```js
    "scripts": {
      "start": "node index.js"
    },
    ```
4. Create .gitignore file 
    ```js
    // see .gitignore file within the server module
    ```