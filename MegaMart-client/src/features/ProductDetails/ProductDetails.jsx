import Announcement from "../../../src/features/home/pages/AnnoucementBar/Hero";
import HeaderHero from "../../../src/features/home/pages/Header/Hero";
import Footer from "../../../src/features/home/pages/FooterSection/Hero";
import Navbar from "../../../src/features/home/pages/Navbar/Hero"
import ProductGallery from "../../../src/components/ProductDetails/ProductGallery/ProductGallery"
 import ProductInfo from "../../../src/components/ProductDetails/ProductInfo/ProductInfo"
 import ProductVariants from "../../../src/components/ProductDetails/ProductVariants/ProductVariants"
 import ProductQuantity from "../../../src/components/ProductDetails/QuantitySelector/QuantitySelector"
 import ProductAction from "../../../src/components/ProductDetails/ProductActions/ProductActions"
 import ProductTabs from "../../components/ProductDetails/ProductTabs/ProductTabs";
 import ProductDescription from "../../components/ProductDetails/ProductDescription/ProductDescription";

function productDetails() {
    const productImages = [
    "/ROG Strix G16 Gaming Laptop1.jpg",
    "/ROG Strix G16 Gaming Laptop2.jpg",
    "/ROG Strix G16 Gaming Laptop3.jpg",
   "/ROG Strix G16 Gaming Laptop4.jpg",
   "/ROG Strix G16 Gaming Laptop5.jpg",
];
   return (
     <>
        <Announcement />
        <HeaderHero />
         <Navbar />
       <div className="productDetailsContainer">

         <div className="productDetailsMain">


              <div className="productGalleryWrapper">
            <ProductGallery
                images={productImages}
                productName="ASUS ROG Strix G16"
            />
        </div>

        <div className="productInfoWrapper">
            <ProductInfo/>
            <ProductVariants/>
            <ProductQuantity/>
            <ProductAction/>
        </div>

            <ProductTabs/>
            <ProductDescription/>
         </div>

       </div>

      
       <Footer />   
     </>
   );
}


export default productDetails;