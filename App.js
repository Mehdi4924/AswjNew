import React, { useState, useEffect } from "react";
import Routes from "./src/Routes/Routes";
import { LoginManager ,Settings} from 'react-native-fbsdk-next'

// Settings.initializeSDK();
const App = () => {
  Settings.initializeSDK();

  return <Routes />;
};
export default App;
