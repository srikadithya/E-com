import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </BrowserRouter>
);
