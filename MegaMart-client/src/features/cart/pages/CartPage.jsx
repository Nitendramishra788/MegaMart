import Announcement from "../../../../src/features/home/pages/AnnoucementBar/Hero";
import HeaderHero from "../../../../src/features/home/pages/Header/Hero";
import Footer from "../../../../src/features/home/pages/FooterSection/Hero";
import Navbar from "../../../../src/features/home/pages/Navbar/Hero";
import CartHeader from "../../../../src/components/CartPage/CartHeader";
import CartProductCard from "../../../../src/components/CartPage/CartProductCard/CartProductCard";
import PriceDetails from "../../../../src/components/CartPage/PriceDetails/PriceDetails";
import CheckoutSection from "../../../../src/components/CartPage/CheckoutSection/CheckoutSection";


function CartPage() {
  return (
    <>
      <Announcement />
      <HeaderHero />
      <Navbar />
      <div className="cartPageContainer">

        <CartHeader
          totalItems={5}
          onClearCart={() => console.log("Clear cart clicked")}
        />

        <div className="cartMainLayout">

          {/* Left Side - Cart Products */}
          <div className="cartProductsSection">

            <CartProductCard
              image="/bannerA.png"
              title="ASUS ROG Strix G16"
              variant="16GB RAM / 512GB SSD"
              price={85000}
              originalPrice={95000}
              quantity={1}
              onQuantityChange={(newQuantity) => console.log(newQuantity)}
              onRemove={() => console.log("Product Removed")}
              onSaveForLater={() => console.log("Saved for Later")}
            />

            <CartProductCard
              image="/bannerA.png"
              title="ASUS ROG Strix G16"
              variant="16GB RAM / 512GB SSD"
              price={85000}
              originalPrice={95000}
              quantity={1}
              onQuantityChange={(newQuantity) => console.log(newQuantity)}
              onRemove={() => console.log("Product Removed")}
              onSaveForLater={() => console.log("Saved for Later")}
            />

            <CartProductCard
              image="/bannerA.png"
              title="ASUS ROG Strix G16"
              variant="16GB RAM / 512GB SSD"
              price={85000}
              originalPrice={95000}
              quantity={1}
              onQuantityChange={(newQuantity) => console.log(newQuantity)}
              onRemove={() => console.log("Product Removed")}
              onSaveForLater={() => console.log("Saved for Later")}
            />

          </div>

          {/* Right Side - Price Details */}
          <div className="cartPriceSection">
            <PriceDetails
              subtotal={255000}
              discount={30000}
              deliveryCharges={0}
            />
          </div>


          <CheckoutSection
            onCheckout={() => console.log("Proceed to Checkout")}
          />

        </div>

      </div>
      <Footer />
    </>
  );
}

export default CartPage;