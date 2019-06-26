# Node React Full-Stack Practice

> This repo contains resources and code related to my own work on improving my skills related to Node, Express, MongoDB, React, Redux, Redux Forms, and Email Porvider.

## Table of Contents

 - [Server Side Architecture](#ServerSideArchitecure)
 - [OAuth Via Google](#OAuthViaGoogle)
 - [Helpful Notes](#HelpfulNotes)
 - [MongoDB](#MongoDB)

---

## Server Side Architecture

- _description of server side archictecture coming soon_

## Oauth Via Google

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
5. Deploying to heroku after creating the app...
   ```sh
    git push heroku master
   ```


### &nbsp; MongoDB

- It's **_schema-less_** in that each record doesn't have to have the exact same schema.
- **Model Class** represents an entire Mongo collection of records. It contains helpful methods.
- **Model Instance** represents a single Mongo Data Record, which represents one single item from  mongo collection.
- We will use remotely hosted situation...
- [**Connection Properties For My Emaily Cluster:**](https://cloud.mongodb.com/v2/5d13b34bd5ec13b6c2d7d1f2#clusters) 
    ```js
    const admin = 'mango';
    const pw: 'W2ig2nDyuNqCE8aM';
    const uri = `mongodb+srv:/${admin}:${pw}@emaily-6zjdd.mongodbnet/test?retryWrites=true&w=majority`;
    const mogooseConnectFunction = (uri) => {
        // within index.js
        mongoose.connect(uri);
    }
    ```
