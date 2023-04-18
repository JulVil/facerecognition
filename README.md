# SmartBrain 

![Logo](https://github.com/JulVil/smartBrain/blob/master/.github/logo.png)

This website uses a face recognition API on images to detect if there are any faces on the picture,
just copy an image url to the input and press detect to let the face recognition model do the magic.

You can see the live version here [smartBrain](https://smartbrain.julianvilalta.com)

Note: The database will be reset every 90 days, there may be some downtime during this period. 

![Demo](https://github.com/JulVil/smartBrain/blob/master/.github/demo.gif)

## Description

This project is a cool website that lets you create an account, sign in, edit your profile and paste a URL of an image to check if there are any faces in it. 

The front-end of the application is built using [React](https://react.dev/) that allows for fast and responsive user interactions, making it an ideal choice for this type of application. 

![Home](https://github.com/JulVil/smartBrain/blob/master/.github/home.png)

On the back-end, I use [Node.js](https://nodejs.org/en/about) and [Express](https://expressjs.com/) to help manage HTTP requests and responses, as well as the [Knex](https://knexjs.org/) library for managing the database schema and querying the database. And to ensure the security of the application, I used the [Bcrypt](https://www.npmjs.com/package/bcrypt) library to encrypt user passwords before storing them in the database.

![Signin](https://github.com/JulVil/smartBrain/blob/master/.github/signin.png)

The database used in this application is [PostgreSQL](https://www.postgresql.org/), a powerful and open-source relational database management system.

![Profile](https://github.com/JulVil/smartBrain/blob/master/.github/profile.png)

One of the key features of this application is its use of [Clarifai](https://www.clarifai.com/) API for face recognition. The API is called via the backend, with the user giving a URL of an image in the front-end input. The API then returns a response with the location of the faces in the image, and the front-end displays the image with a box around the detected faces.

This is the final project of the complete web developer course from [Zero to Mastery](https://github.com/zero-to-mastery)

## Tech Stack

This project was created using:

**Client:** React

**Server:** Node, Express, Knex, Bcrypt

**Database**: PostgreSQL


## License

[MIT](https://choosealicense.com/licenses/mit/)
