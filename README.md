# Use Node Version 20.18.0

## How to run the backend server?

Clone this repository in your local directory.

In your terminal, make sure that your cloned repository is the current working directory.

Run the following commands to start the server:

    cd backend
    npm install (do it once)
    node api/index.js

Note: Your local server must be running at http://localhost:3000

## For App
1. Navigate to DOAHospitap then Install dependencies

   ```bash
   cd DOAHospitap
   npm install
   npx expo install --fix
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.


## For Admin Site

Run the following commands to start the server:

    cd 'frontend-admin'
    npm install (do it once)
    npm start
    
