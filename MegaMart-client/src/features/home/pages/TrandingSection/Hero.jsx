import TrendingCard from "../../../../components/TrandingCard";

function TrendingSectionHero() {
    return (
        <section className="trending-section-hero">
            <div className="trending-container">


                <div className="container">
                    <div className="trending-header">

                        <h3 className="heading">
                            Trending Now
                        </h3>

                        <div className="tradingNab">
                            <button className="trandingBTN">All</button>
                            <button className="trandingBTN">Mobiles</button>
                            <button className="trandingBTN">Fashion</button>
                            <button className="trandingBTN">Home & Living</button>
                            <button className="trandingBTN">Beauty</button>
                        </div>

                    </div>
                </div>


                <div className="trending-products-grid">
                    <div className="trending-product-item">
                        <TrendingCard
                            img="phone.png"
                            name="Premium Sports Shoes"
                            oldPrice={2499}
                            newPrice={1499}
                            discount={40}
                            onAddToCart={() =>
                                handleAddToCart("Premium Sports Shoes")
                            }
                        />
                    </div>

                    <div className="trending-product-item">
                        <TrendingCard
                            img="iphone.png"
                            name="Classic Smart Watch"
                            oldPrice={1999}
                            newPrice={999}
                            discount={50}
                            onAddToCart={() =>
                                handleAddToCart("Classic Smart Watch")
                            }
                        />

                    </div>

                    <div className="trending-product-item">
                        <TrendingCard
                            img="iphone.png"
                            name="Classic Smart Watch"
                            oldPrice={1999}
                            newPrice={999}
                            discount={50}
                            onAddToCart={() =>
                                handleAddToCart("Classic Smart Watch")
                            }
                        />

                    </div>

                    <div className="trending-product-item">
                        <TrendingCard
                            img="iphone.png"
                            name="Classic Smart Watch"
                            oldPrice={1999}
                            newPrice={999}
                            discount={50}
                            onAddToCart={() =>
                                handleAddToCart("Classic Smart Watch")
                            }
                        />

                    </div>

                </div>
            </div>
        </section>
    );
}

export default TrendingSectionHero;