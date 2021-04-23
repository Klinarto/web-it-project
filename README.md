# Breakout Room 3 - Project

For this project, we are hosting our live server hosted on Heroku with a valid URL with the features listed below.
The backend of the app is connected with mongoDB using Mongoose. This will allow us to fetch data that we want from the database.
Due to privacy and security, we have implemented such features to not disclose vendors/customer's detail from a simple get.

## Running this project locally

- **Clone this repo**:
  `git clone https://github.com/INFO30005-2021-SM1/project-t05-breakout-room-3.git`

- **Install Dependencies**:
  `npm install`

- **Start the project**:
  `npm start`

## Postman Routes

1. **Get menu list**

   - Under Menu/Get menu
   - GET route recieves menu as JSON file displaying every item in menu with their name, price, image url and detail description

2. **View menu detail**

   - Under Menu/Get menu item
   - GET specific menu item by adding item's name in route
   - e.g /menu/latte, which will display item's name, price, image url and detail description

3. **Customer adds new order by requesting a snack**

   - Under Customer/Start new order
   - Example JSON in body:

   ```javascript
    {
        "CustomerId": ObjectId
        "VendorId": ObjectId
        "foodItems": {
        "latte": 2,
        "cappuccino": 1 },
    }
   ```

4. **Setting van status:**

   - Under Vendor/Set van status
   - PUT route sends a json in the body
   - Example JSON in body:

   ```javascript
   {
       "status":"open"
   }
   ```

5. **Show list of all outstanding orders:**

   - Under Order/Get all outstanding orders
   - All orders that aren't "fulfilled" will be displayed

6. **Mark an order as "fulfilled":**

   - Under Order/Update order

   The new order made has status set as "pending" by default. We take an order id param from the request, then update the status of the identified order. The status update request body contains:

   ```javascript
   {
       "status": "fulfilled"
   }
   ```

## MongoDB Access details

| Fields   | Details                                                                                     |
| -------- | ------------------------------------------------------------------------------------------- |
| URL      | mongodb+srv://admin:admin@br3.jdd2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority |
| Username | admin                                                                                       |
| Password | admin                                                                                       |

##
