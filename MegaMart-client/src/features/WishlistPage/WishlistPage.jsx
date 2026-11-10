import Announcement from "../../../src/features/home/pages/AnnoucementBar/Hero";
import Header from "../../../src/features/home/pages/Header/Hero";
import Navbar from "../../../src/features/home/pages/Navbar/Hero";
import Footer from "../../../src/features/home/pages/FooterSection/Hero";
import WishlistHeader from "../../../src/components/WishlistPage/WishlistHeader/WishlistHeader";
import WishlistProductCard from "../../../src/components/WishlistPage/WishlistProductCard/WishlistProductCard";

function WishlistPage() {
  return (
    <div>
        <Announcement />
        <Header />
        <Navbar />
        
          <div className="wishlistPageContainer">

                <WishlistHeader
                    totalItems={3}
                    onClearWishlist={() => console.log("Clear wishlist")}
                />

                <div className="wishlistProductsSection">

                    <WishlistProductCard
                        image="/bannerA.png"
                        title="ASUS ROG Strix G16"
                        variant="16GB RAM / 512GB SSD"
                        price={85000}
                        originalPrice={95000}
                        rating={4.8}
                        reviews={120}
                        discount={11}
                        onAddToCart={() => console.log("Added to Cart")}
                        onRemove={() => console.log("Product Removed")}
                    />

                    <WishlistProductCard
                        image="/bannerB.png"
                        title="boAt Airdopes 141"
                        variant="Wireless Earbuds / Black"
                        price={1299}
                        originalPrice={2990}
                        rating={4.5}
                        reviews={250}
                        discount={57}
                        onAddToCart={() => console.log("Added to Cart")}
                        onRemove={() => console.log("Product Removed")}
                    />

                    <WishlistProductCard
                        image="/bannerC.png"
                        title="iPhone 16"
                        variant="128GB / Black"
                        price={69900}
                        originalPrice={79900}
                        rating={4.7}
                        reviews={180}
                        discount={13}
                        onAddToCart={() => console.log("Added to Cart")}
                        onRemove={() => console.log("Product Removed")}
                    />

                </div>

            </div>
    
        <Footer />
    </div>
  );
}

export default WishlistPage;    