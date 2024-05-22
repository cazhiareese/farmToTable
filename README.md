# Farm-to-Table E-Commerce Platform



# CMSC 100-U5L
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

### Admin Dashboard


### Product Listing


### Shopping Cart


## Usage Guidelines

- Windows Subsystem for Linux and Visual Studio Code are recommended to be used  

- 3 Terminals are needed to run the program and server (backend, frontend, MongoDB)  
For Windows Users, remove the following in the **package.json** file in the *frontend* folder so it can load normally

    WATCHPACK_POLLING=true 
      
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

https://www.mongodb.com/try/download/tools

MongoDB Shell (for mongosh)

    sudo apt install /path/to/file/mongodb-mongosh_2.2.6_amd64.deb

3. Navigate to the project directory and install dependencies:

    cd /path/farmToTable/backend
    npm install

    cd /path/farmToTable/frontend
    npm install

4. Set-up MongoDB

    mongosh mongodb+srv://username:password@farm.kzqurki.mongodb.net/ftt

5. Start the development server:

    cd /path/farmToTable/backend
    npm start

    cd /path/farmToTable/frontend
    npm start

## Contributing

1. Fork/Clone the repository

2. Create a new branch

    git checkout -b feature-branch-name

3. Make your changes

4. Commit your changes:

    git commit -m "This is a commit message"

5. Push the changes to the branch 

    git push origin feature-branch-name

6. Create a pull request