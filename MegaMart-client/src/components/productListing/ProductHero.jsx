
import ProductListCard from "../productListing/ProductListCard"

function ProductHero() {
    return (
        <>
            <div className="container">
                <div className="row productListingRow">
                    <div className="col-4">
                        <div className="mainFiler">

                            <div className="filterHeader">
                                <h3>Filters</h3>
                                <button type="reset">Clear All</button>
                            </div>

                            {/* Price Filter */}
                            <div className="filterGroup">
                                <h4>Price Range</h4>

                                <div className="priceInputs">
                                    <input type="number" placeholder="Min ₹" />
                                    <span>To</span>
                                    <input type="number" placeholder="Max ₹" />
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <div className="filterGroup">
                                <h4>Brand</h4>

                                <label><input type="checkbox" /> Samsung</label>
                                <label><input type="checkbox" /> Apple</label>
                                <label><input type="checkbox" /> OnePlus</label>
                                <label><input type="checkbox" /> Realme</label>
                                <label><input type="checkbox" /> Xiaomi</label>
                            </div>

                            {/* Rating Filter */}
                            <div className="filterGroup">
                                <h4>Customer Rating</h4>

                                <label><input type="radio" name="rating" /> ⭐ 4★ & above</label>
                                <label><input type="radio" name="rating" /> ⭐ 3★ & above</label>
                                <label><input type="radio" name="rating" /> ⭐ 2★ & above</label>
                                <label><input type="radio" name="rating" /> ⭐ 1★ & above</label>
                            </div>

                            {/* Discount Filter */}
                            <div className="filterGroup">
                                <h4>Discount</h4>

                                <label><input type="checkbox" /> 10% & above</label>
                                <label><input type="checkbox" /> 20% & above</label>
                                <label><input type="checkbox" /> 30% & above</label>
                                <label><input type="checkbox" /> 40% & above</label>
                                <label><input type="checkbox" /> 50% & above</label>
                            </div>


                            {/* Apply Button */}
                            <div className="filterActions">
                                <button type="button" className="applyFilterBtn">
                                    Apply Filters
                                </button>
                            </div>


                        </div>
                    </div>
                    <div className="col-8">

                        <div className="mainProductListCon">
                    
                           

                            <ProductListCard
                                image="ROG Strix G16 Gaming Laptop1.jpg"
                                title="ASUS ROG Strix G16 Gaming Laptop"
                                price={124999}
                                originalPrice={1299}
                                discount={38}
                                rating={4.5}
                                reviews={120}

                            />

                            <ProductListCard
                                image="phone.png"
                                title="Men Casual Shirt"
                                price={799}
                                originalPrice={1299}
                                discount={38}
                                rating={4.5}
                                reviews={120}

                            />

                            <ProductListCard
                                image="phone.png"
                                title="Men Casual Shirt"
                                price={799}
                                originalPrice={1299}
                                discount={38}
                                rating={4.5}
                                reviews={120}

                            />

                             <ProductListCard
                                image="phone.png"
                                title="Men Casual Shirt"
                                price={799}
                                originalPrice={1299}
                                discount={38}
                                rating={4.5}
                                reviews={120}

                            />

                             <ProductListCard
                                image="phone.png"
                                title="Men Casual Shirt"
                                price={799}
                                originalPrice={1299}
                                discount={38}
                                rating={4.5}
                                reviews={120}

                            />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductHero;