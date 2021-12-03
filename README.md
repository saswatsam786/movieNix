
# MovieNix

Check out the live site **[here]()**

## Features

1. **Built on the Hedera network**
2. **One Tap Buy**
3. **Pay Per Second (PPS)**
4. **Library**
5. **Check balance**
6. 

## Tech Stack used

1. **ReactJS** for front-end
2. **React router** for routing to different pages
3. **Express** middleware on the backened to handle routes and requests
4. **Firebase** database and also used for authentication
5. **Heroku** used for deploying and hosting the project

## Currently working on

1. xyz
2. abc

## API Documentation (for routes)

| Type | Route | Description |
|:--:|:--:| ------------- |
| GET | /createAcc | Creates an account for the user on the Hedera Network and creates and acount ID for them |
| POST | /balance | Checks the balance of the user |
| POST | /transferMonkey | Used for making a transaction (buying/paying for a movie) |
| POST | /delacc | Called when the user deletes his/her account essentially deleting their account from the Hedera network |

## Future plans for the project

1. Remember the last watched position of the user for a particular movie and prompt them to continue watching from there
2. 

## Install this project

```bash
git clone https://github.com/Avash027/Nozama.git
```

```bash
cd project
```

To install all the dependencies

Run the command in the **root directory and the client directory**

```bash
npm install / npm i
```

Now create a .env file in the root directory

```
NODE_ENV = (production/deployment as per the use)
PORT = (Port of the server)
MONGO_URI = (Database URL provided by the MonogDB atlas)
SECRET_KEY = (For JWT Authentication)
STRIPE_SECRET_KEY  = (Secret Key provided by stripe)
STRIPE_PUBLIC_KEY  = (Public Key provided by stripe)
```

**Check out .env.example**

To run the project on the local machine

```bash
npm run dev
```

## Some relevant links of the languages and tools I used

1. [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
2. [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
3. [ReactJS](https://reactjs.org/docs/getting-started.html)
4. [Express](https://expressjs.com/)
5. [NodeJS](https://nodejs.org/en/docs/)

## Project Members

### Team Atreus
- [@saswat](https://github.com/saswatsam786/)
- [@SilverGraph](https://github.com/SilverGraph/)
- [@oyesaurav](https://github.com/oyesaurav)
- [@Pranav0210](https://github.com/Pranav0210)
-  [@DarthSalad](https://github.com/DarthSalad)



<br>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
