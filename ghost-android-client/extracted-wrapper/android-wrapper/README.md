# Ghost Android Wrapper

This folder contains a React Native / Expo chat wrapper for the Ghost Wholesale Agent brain.

## Expected Ghost API

The app talks to your Ghost brain HTTP server on port 4000:

- POST /session/start
  Request body: {}
  Response: { "sessionId": string, "replyText": string, "session": object }

- POST /session/turn
  Request body: { "sessionId": string, "message": string }
  Response: { "sessionId": string, "replyText": string, "session": object }

## How to use this wrapper

1. On your Android dev machine, create a new React Native or Expo app.
   Example (Expo):
   - npx create-expo-app ghost-android
   - cd ghost-android

2. Copy these two files from this folder into your new app:
   - android-wrapper/src/App.js -> your-app/App.js (or your-app/src/App.js)
   - android-wrapper/src/config.js -> your-app/src/config.js

3. Edit src/config.js in the app and set GHOST_AGENT_API_BASE
   to your exposed Ghost URL (for Codespaces something like
   https://YOURCODESPACE-4000.app.github.dev).

4. Run the app on an Android device or emulator:
   - npx expo start

This wrapper is read-only and does not modify the Ghost brain logic.
