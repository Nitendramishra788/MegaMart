import ProductCard from "../../../../components/common/ProductCard";

function FeatureProductHero() {
    return (
        <div className="feature-product-hero">
            
            <div className="container">
                <div className="row" >
                <div className="col-6"><samp className="heading"><h1>Featured Products</h1></samp></div>
                <div className="col-4"></div>
                <div className="col-1"><button  className="badge">View All</button></div>
            </div>
            </div>
            <div className="products-container">
                <ProductCard name="Product Name" category="Category" rating={4.5} price={999} oldPrice={1299} img="bannerC.png" /> 
                <ProductCard name="Product Name" category="Category" rating={4.5} price={999} oldPrice={1299} img="bannerC.png" /> 
                <ProductCard name="Product Name" category="Category" rating={4.5} price={999} oldPrice={1299} img="bannerC.png" />
                <ProductCard name="Product Name" category="Category" rating={4.5} price={999} oldPrice={1299} img="bannerC.png" />
            </div>
        </div>
    );
}

export default FeatureProductHero;