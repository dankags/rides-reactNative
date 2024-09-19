# Welcome to your Ryde app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

![alt text](assets/images/Screenshot_20240919-120446.jpg)![alt text](assets/images/Screenshot_20240916-142539.jpg)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```
3. copy the .env variables needed for the project :</br>
   -> Ensure you provide your own api keys</br>
   ```bash
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
    DATABASE_URL=
    <!-- the server url can be your domain name -->
    EXPO_PUBLIC_SERVER_URL=
    EXPO_PUBLIC_GEOAPIFY_API_KEY=
    EXPO_PUBLIC_GOOGLE_API_KEY=
   ```

You can find some of the API key in this URLs
 1. for the Geoapify [geoapify](https://www.geoapify.com/) </br>
   -> this helps in showing an image of your recent last traveland many more.</br>
   -> You can check out the documentation on the above link

 2. for the googleApiKey visit [googleConsole](https://console.cloud.google.com/)</br>
   -> it helps in geting the longitude and latitude whenever ou search for a place to go.

 3. For clerk visit [clerk](https://clerk.com/) </br>
   -> Clerk is used tohandle the authetication prt of your app.</br>
   ->You can go signUp and register our app to get the ApiKey that you can use for your app.


In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
