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

// this is part of productList css importing
import "../src/components/productListing/productListStyle/productListStyle.css";

// this is part of productDetails css importing
import "../src/components/ProductDetails/ProductGallery/ProductGallery.css";
import "../src/components/ProductDetails/ProductInfo/ProductInfo.css";
import "../src/components/ProductDetails/ProductVariants/ProductVariants.css";
import "../src/components/ProductDetails/QuantitySelector/QuantitySelector.css";
import "../src/features/ProductDetails/ProductDetails.css";
import "../src/components/ProductDetails/ProductActions/ProductActions.css";
import "../src/components/ProductDetails/ProductTabs/ProductTabs.css";
import "../src/components/ProductDetails/ProductDescription/ProductDescription.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
     <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);