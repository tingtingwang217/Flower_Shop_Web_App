
<img width="697" alt="Screen Shot 2023-02-08 at 12 08 16 AM" src="https://user-images.githubusercontent.com/103472533/217439552-90ea8e9f-b271-4765-96b2-1c0ca311d490.png">
<img width="691" alt="Screen Shot 2023-02-07 at 5 16 29 PM" src="https://user-images.githubusercontent.com/103472533/217439669-ca252876-102f-4bdd-a145-a6d47ca61584.png">
<img width="685" alt="Screen Shot 2023-02-07 at 5 16 38 PM" src="https://user-images.githubusercontent.com/103472533/217439686-3e12e008-0eb6-4eae-a766-6bde51d8724c.png">
<img width="692" alt="Screen Shot 2023-02-07 at 5 16 48 PM" src="https://user-images.githubusercontent.com/103472533/217439729-d0657680-4e7d-4f84-8f2f-5e7d3801530a.png">
<img width="693" alt="Screen Shot 2023-02-07 at 5 16 58 PM" src="https://user-images.githubusercontent.com/103472533/217439762-a458db07-cb65-4c92-b542-cc46a9a0e3f0.png">
<img width="696" alt="Screen Shot 2023-02-07 at 5 17 07 PM" src="https://user-images.githubusercontent.com/103472533/217439796-13f5352a-1a63-4ca1-ab1a-2432409cd720.png">
<img width="697" alt="Screen Shot 2023-02-07 at 5 17 20 PM" src="https://user-images.githubusercontent.com/103472533/217439814-180dfd0c-e84d-49b8-84c8-b630f53d1da0.png">
<img width="697" alt="Screen Shot 2023-02-07 at 5 17 31 PM" src="https://user-images.githubusercontent.com/103472533/217439835-28742868-0516-41e6-9c24-60810562f806.png">
<img width="697" alt="Screen Shot 2023-02-07 at 5 17 39 PM" src="https://user-images.githubusercontent.com/103472533/217439877-5900916a-3588-48a9-b4db-8afef8f762a4.png">






Flower Shop Web Application


Overview

This flower shop project is a web application I designed for one of my friends who is planning to have her own flower shop. This is an E-Commerce application using MERN Stack. MERN Stack is a very popular development kit for building full stack web application. MERN includes MongoDB as a database, Express, which is a framework for Node,  React for creating user interfaces and Node as a server. I combined these four technologies together and built this web application which is fully responsive.

This web application was developed as backend and frontend. By using RESTful(Representational state transfer) API, data can be fetched from the MongoDB database and information can be exchanged between the client and the server securely. 


Technology Stack:

This application uses Express JS to handle the Node server at the backend. In the frontend, React as a JavaScript framework is used and ES6 syntax is applied. In addition, JSX enables me to write HTML elements in JavaScript and place them in the DOM. To design the frontend user interface, I used React-Bootstrap and created CSS styling sheet to beautify the web pages. MongoDB is the database used to store products, users, reviews and orders data. To verify the users, the application uses JSON web token in every request to the middleware before sending response from the server. RESTful API is also created to assist communication between the client and the server. Finally, Heroku is used for the application deployment.


Main Application Features:

Searching bar and carousel in home page
Product lists and details page
Products searching, sorting and filtering
User login and register
Shopping cart
Editing products, users and orders
Application deployment to Heroku



This web application includes the following 4 modules: home page, login system, product pages and user dashboard.

1. Home Page

The home page includes the following  four main components: 
1)Header
The header applies the “navbar” template from React-Bootstrap. There is a search bar on the left. The user can search the products by typing into the text box or search a category from the dropdown menu. On the right hand side, it shows the login/register and cart button. When the screen shrinks to medium size, these buttons will become a dropdown menu. 
2)Flowers Carousel
This part has several sliding windows showing some popular flowers from the shop. It applied the “carousel” template from React-Bootstrap.
3) Category Cards	
Below the carousel, the flowers category cards are presented. It displays all the categories from the flower shop. It shows a picture, the name and description of this category. At the bottom of the card,  there is a button for displaying all the products in this category. The category card used the “card” template from React-Bootstrap.
4)Footer
At the bottom of the homepage, a footer is displayed and it shows the copyright of the this web application. 


2. Login System

1)Register
If the user is not an existing client of the shop, he needs to register for the website. He will be asked for the first name, last name, email and password. Once this information has been provided, the user can submit it. Only if all the information is provided and the password matches, React hooks will make sure the validation states got updated to true and new user will be created at the backend MongoDB database. For security, all users’ passwords will be hashed. 


2)Login 
Whenever the user wants to see his profile, check orders and view the cart details, a verification will be conducted. By comparing the JSON web access token stored as the cookie in web browser, the program will decide if the user is already logged in. If the user is not logged in, the username and the password will be asked for verification. Once the user logged in, the Reack hook will update the validation states to true. At the same time, an access token will be generated by the cookie-parser and it will be kept for 7 days. 



3. Products Page

After the user chose flower categories, a list of products will show up. 

On the left hand side, several filters were built to help the user choose the flowers they want. These filters were developed based on the template from the React-Bootstrap. The user can sort the flowers based on the price and ratings, search flower within a price range, select flowers with a specific rating and find different categories. Once the user submits the filter button, the filter handler will set the filter by updating filter states. Then flowers satisfying these requirements will show up. 

On the right hand side of the product lists page, the user can see a list of products selected based on the filter, if the user click on the “See product” button, the product details page will be shown. This page will display the product name, price, stock status, description, pictures, rating and reviews. The user can select the quantity and add this product to the cart. 


4. User Dashboard

1)Admin Dashboard
When the admin user log into the web application, he can see a list of orders, products and clients. The admin user is able to see all the orders and check the order details. If the order is completed, he can also mark it as delivered. In addition, the admin user can edit and delete users and products and also add new products with images.  When the admin user clicks the submit button, handleSubmit function will update states about products and users and API requests will be sent to the database and data will be updated at the backend. 



2)Client Dashboard
When the client user log into his account, he is able to update his profile and see order histories and order details. In addition, by click on the CART button the top right corner, the user can view the cart details with a list a products added to the cart. The user can update the quantity, delete the products and proceed to checkout. In this case, event handlers will update the states about the cart and products added to cart will be stored in local storage. Once the order is placed, new order will be created and database will be updated at the backend.









