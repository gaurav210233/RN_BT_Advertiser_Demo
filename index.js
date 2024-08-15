// index.js (for JavaScript) or index.tsx (for TypeScript)
import {AppRegistry} from 'react-native';
import App from './App'; // Import the App component
import {name as appName} from './app.json'; // Import the app name from app.json

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
