# Ecommerce audio shop app

## Overview

This full stack website was my first experience of using the react testing library, typescript and graphql. The backend is hosted on heroku and the front end is hosted on a separate heroku express application to make sure react router works.

## Features

- A user can navigate the site
- They can add products to the cart, if the user tries to add more than in stock a warning message is shown
- The user can log in and sign up
- The user can only checkout if they are signed in
- Local storage saves their cart
- Responsive website- changes layout on mobile, tablet and desktop

## Screenshot

![](/screenshot.png)

## Live site

http://audio-first-react-express.herokuapp.com

## My process

Built with

- React and React hooks
- Formik is used to create the sign up, log in and checkout details. Formik handles the validation
- SASS using BEM 
- React transition group is used to create exiting transitions as forms enter and leave the page
- Mobile-first workflow- the application layout changes for mobile, tablet and desktop views, on mobile there is a downdown menu.
- Developed from Sketch design prototypes
- React testing library used for the front end
- GraphQL
- Typescript
- Express
- MongoDB
- React slick slider used for carousel on the product page
- Material UI for loading spinner
- Local storage used to persist the cart if the user refreshes or returns to the page
- React router
- Heroku deployment

### Still to do

Integrate a payment system such as stripe or paypal

# To run locally

To run this project please download and from the terminal

- type npm i to load the dependencies

- npm start to view the project.
