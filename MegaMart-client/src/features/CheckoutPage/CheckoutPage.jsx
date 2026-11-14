import AnnouncementBar from "../home/pages/AnnoucementBar/Hero";
import Header from "../home/pages/Header/Hero";
import Navbar from "../home/pages/Navbar/Hero";
import Footer from "../home/pages/FooterSection/Hero";

import CheckoutHeader from "../../components/Checkout/CheckoutHeader/CheckoutHeader";
import ShippingAddress from "../../components/Checkout/ShippingAddress/ShippingAddress";
import PaymentMethod from "../../components/Checkout/PaymentMethod/PaymentMethod";
import OrderSummary from "../../components/Checkout/OrderSummary/OrderSummary";
import CheckoutActions from "../../components/Checkout/CheckoutActions/CheckoutActions";

import "./CheckoutPage.css";

function CheckoutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Navbar />

      <main className="checkoutPage">
        <div className="checkoutContainer">

          <CheckoutHeader />

          <div className="checkoutLayout">

            <div className="checkoutLeft">
              <ShippingAddress />
              <PaymentMethod />
            </div>

            <div className="checkoutRight">
              <OrderSummary />
              <CheckoutActions />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default CheckoutPage;