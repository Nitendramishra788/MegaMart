import AnnouncementBar from "../../../src/features/home/pages/AnnoucementBar/Hero";
import HeaderHero from "../../../src/features/home/pages/Header/Hero";
import NavbarHero from "../../../src/features/home/pages/Navbar/Hero";
import Footer from "../../../src/features/home/pages/FooterSection/Hero";
import ProductListHead from "./ProductListHead";
import ProductHero from "./ProductHero";

function ProductListingPage(){
    return(
        <>
        <AnnouncementBar/>
        <HeaderHero/>
        <NavbarHero/>
        <ProductListHead/>
        <ProductHero/>
        <Footer/>
        </>
    )
}

export default ProductListingPage;