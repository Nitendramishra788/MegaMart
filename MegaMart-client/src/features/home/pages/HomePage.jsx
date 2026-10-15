import AnnouncementBar from "./AnnoucementBar/Hero";
import HeaderHero from "./Header/Hero";
import NavbarHero from "./Navbar/Hero";
import HeroSectionHero from "./HeroSection/Hero";
import CategorySectionHero from "./categorySection/Hero";
import FeatureProductHero from "./featureProduct/Hero";
import FooterSectionHero from "./FooterSection/Hero";
import PromotionalBannersHero from "./PromonalBanners/Hero";
import TrendingSectionHero from "./TrandingSection/Hero";
import WhyHero from "./whyShopWithUs/WhyHero";
import BrandSectionHero from "./BrandSection/Hero";

function HomePage() {
  return (
    <div className="home-page">
      <AnnouncementBar />
      <HeaderHero />
      <NavbarHero />
      <HeroSectionHero />
      <CategorySectionHero />
       <PromotionalBannersHero />
      <FeatureProductHero />
       <PromotionalBannersHero />
       <WhyHero/>
      <BrandSectionHero />
      <TrendingSectionHero />
      <FooterSectionHero />
    </div>
  );
}

export default HomePage;