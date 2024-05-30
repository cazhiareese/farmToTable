# Farm-to-Table E-Commerce Platform

![ftt_bg](https://github.com/cazhiareese/farmToTable/assets/146474697/980b6e82-077f-42ad-ba26-7bcc921cc0ed)

## CMSC 100-U5L
Lleva, Cazhia Reese  
Cea, Alyssa F.  
Ramos, John Miles  
Combalicer, Lawrence S. 

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Usage Guidelines](#usage-guidelines)
- [Installation](#installation)
- [Contributing](#contributing)

## Project Overview
"Farm-to-table" is a social movement emphasizing a direct link between consumers and farmers as the source of food. This project involves developing an e-commerce website used by the Department of Agriculture (DA) to facilitate transactions between farmers and customers directly. The DA will compile a catalog of items for sale in the public market.

## Features
- **User Authentication**
  - Sign-up and sign-in functionality for customers.
  - Login/Logout functionality.
  - Authentication and authorization for protected routes.
- **User Management**
  - Admin dashboard to oversee registered users.
- **Product Management**
  - Users can browse the available products and view product details.
  - Create, read, update, and delete products.
  - Manage product inventory.
  - Sort products by name, type, price, or quantity.
- **Order Management**
  - Create, cancel, and confirm orders.
  - Manage orders with different statuses (Pending, Confirmed, Canceled).
- **Cart Management**
  - Add, update, and delete items in the shopping cart.
  - Calculate the total price of items in the cart.
- **Sales Reports**
  - Generate sales reports summarizing weekly, monthly, and annual sales.

## Screenshots

### Sign-in / Sign-up

![msedge_UWJT9gO83I](https://github.com/cazhiareese/farmToTable/assets/146474697/8c1d7b64-2174-4a90-bdae-06489d5d4fad)

![msedge_WyoanqaBsf](https://github.com/cazhiareese/farmToTable/assets/146474697/602a11ae-bae5-4ca0-ad8c-fcd0af82c81d)


### Admin Dashboard

![msedge_zylxXxfWSf](https://github.com/cazhiareese/farmToTable/assets/146474697/d0b56b78-4edf-41cd-ac67-19cd8a75a100)

![msedge_pXagwUPTc8](https://github.com/cazhiareese/farmToTable/assets/146474697/58ba4dab-7ec5-4bf0-9335-6217129f664f)

![msedge_7ea24xmucJ](https://github.com/cazhiareese/farmToTable/assets/146474697/f825214a-66f6-4025-b970-8edca761507c)

### Admin Management

![msedge_93aRb5s05v](https://github.com/cazhiareese/farmToTable/assets/146474697/6326947c-7ee7-4165-9bc7-c5082188fe3e)

![msedge_qZZ0yMTJEq](https://github.com/cazhiareese/farmToTable/assets/146474697/2b42f413-44e3-4f5f-8b2e-2317aab4c159)

![msedge_uMPeWz2E2a](https://github.com/cazhiareese/farmToTable/assets/146474697/e685a044-5e02-4342-8383-c3bb74d6c530)

![msedge_ieSu59R3MX](https://github.com/cazhiareese/farmToTable/assets/146474697/d257910a-aff5-4047-823e-ddc8f9301ca1)

### Customer

![msedge_M7P5LcVplj](https://github.com/cazhiareese/farmToTable/assets/146474697/6ce20d69-f0a2-4fe8-97bc-d789770c9ab5)

![msedge_WeAvLZuZrK](https://github.com/cazhiareese/farmToTable/assets/146474697/6f3edc23-022e-4a22-8b11-143c616bb061)

![msedge_ydq3guc2gi](https://github.com/cazhiareese/farmToTable/assets/146474697/c7239abf-d2a4-40ce-87be-b20a7a8a0ee9)


## Usage Guidelines
- 3 Terminals are needed to run the program and server (backend, frontend, MongoDB)
- Ensure that you have a .GITIGNORE file before pushing to the repository
  
      node_modules/*
  
- **For Windows Users**
  - Windows Subsystem for Linux and Visual Studio Code are recommended to be used     
      
- Administrator login for the website

      ftt@gmail.com
      banana11

- Sign up for a new account to see the customer view

## Installation
Follow these steps to set up the project locally:

1. Clone the repository:

       git clone https://github.com/cazhiareese/farmToTable.git

2. Make sure to have updated operating system and modules. Versions used in this project:

       lsb_release -a //Ubuntu 22.04.1

NodeJS and npm

https://github.com/nvm-sh/nvm#installing-and-updating

After installing it, restart the terminal and run *nvm install stable* to install the stable version

    nvm -v //0.39.7
    node -v //21.7.2
    npm -v //10.5.0

3. Navigate to the project directory and install dependencies:

       cd /path/farmToTable/backend
       npm install

       cd /path/farmToTable/frontend
       npm install

4. Database Setup

   https://www.mongodb.com/try/download/tools

- **MongoDB Shell (for mongosh)**

      sudo apt install /path/to/file/mongodb-mongosh_2.2.6_amd64.deb
    
- **MongoDB Command Line Database Tools (for mongodump and mongorestore)**

      sudo apt install /path/to/file/mongodb-database-tools-ubuntu2204-x86_64-100.9.4.deb
  
   - Ensure MongoDB is running and you have access to MongoDB Atlas or a local MongoDB instance.
   - Obtain the MongoDB dump file from the project repository/administrator maintaining the database.
   - Obtain the MongoDB Atlas credentials (username and password) from the project administrator.
   - Restore the MongoDB dump file by replacing `<username>`, `<password>`, and `/path/to/dumpfile` with your MongoDB Atlas credentials and the path to your dump file

         mongorestore --uri="mongodb+srv://<username>:<password>@farm.kzqurki.mongodb.net/ftt" --drop /path/to/dumpfile

6. Start the development server:

       cd /path/farmToTable/backend
       npm start

       cd /path/farmToTable/frontend
       npm start

## Contributing

1. Clone the repository

2. Create a new branch

       git checkout -b feature-branch-name

3. Make your changes

4. Commit your changes:

       git commit -m "This is a commit message"

5. Push the changes to the branch 

       git push origin feature-branch-name

6. Create a pull request
