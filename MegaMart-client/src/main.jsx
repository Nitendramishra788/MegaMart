import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./app/App";
import "./index.css";
import store from "./store/store";


// this is part of custom style css importing


import "../src/customStyle/CustomStyle.css";
import "../src/customStyle/cardStyle.css";
import "../src/customStyle/caregoryCardStyle.css";
import "../src/customStyle/trandingCard.css";
import "../src/customStyle/footerStyle.css"



// this is part of Responsive importing 
import "../src/responsive/RespoAnnouncement.css";
import "../src/responsive/headRespo.css";
import "../src/responsive/navBarRespo.css";
import "../src/responsive/cardRespo.css";
import "../src/responsive/categoryRespo.css"
import "../src/responsive/trandingRespo.css";
import "../src/responsive/footerRespo.css"


ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
     <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);