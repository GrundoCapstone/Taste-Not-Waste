<div style="text-align:center"><img src=assets/TNWLogoSmall.png width="250" height="288"></div>

# Taste Not Waste

## Description

Taste Not Waste helps minimize food waste by keeping track of all your perishables and when they will expire. Users can add items to their "fridge" after a shopping trip and the app can estimate when each item will expire, or a user can input the expiration date on the packaging. The app also sends notifications to remind users about their items that are expiring soon and will suggest recipes using that item.

## Download

```
cd <DIRECTORY_YOU_WANT_TO_DOWNLOAD_TO>

git clone https://github.com/GrundoCapstone/Taste-Not-Waste.git

npm install

npm start
```

On a mobile app/tablet, download Expo Go app

Visit: https://expo.io/@daniellaaceves/projects/TasteNotWaste

## Team

Laura Buffington:<br/>
https://www.linkedin.com/in/laura-c-buffington/
https://github.com/laura177

Daniella Aceves:<br/>
https://github.com/dani-aceves
https://www.linkedin.com/in/daniella-aceves/

Clare Sweeny:<br/>
https://www.linkedin.com/in/clare-sweeny/
https://github.com/csweeny

Mabel Lawrence:<br/>
https://www.linkedin.com/in/mabellawrence/

## Current Features

- New users can access the Need Help modal for instructions on how to use the app
- User have the ability to add items to the fridge manually with or without an expiration date
- Users can add items to the fridge by scanning a receipt from their shopping trip
- App will search our database and prepopulate expiration dates if the information is found
- The "fridge" will display how many days remain until each item is expiring
- When users click on each item they can see recipes using that ingredient
- Users have the option to delete items from the fridge when they have eaten them
- The app will notify users 2 days prior to an item expiring, reminding them to eat it
- Users can search for recipes by any ingredient
- Selecting a recipe will redirect the user to the source of the recipe for instructions

## Tech Stack

- React-Native
  Used as a framework for a mobile app that can be run on Android and iOS
- Firebase Firestore
  Store user and food information
- Google OCR
  Used to parse the text on receipt photos to add to fridge
- Edamam Recipe Search API
  Search recipes by ingredient
- Redux
  Manage state throughout the app
- Expo
  To quick start the app, test in real time, and send notifications
- Ngrok
  Hosts a tunnel for many users to access the app

## Next Steps

- Allow users to toggle dietary restrictions such as "gluten free" or "vegetarian" for a more personalized experience
- Have users be able to maintain a list of favorite recipes
- Make profile editable, including the ability to set how often you want to receive notifications
- Expand expiration estimation times to include freezer and pantry items
