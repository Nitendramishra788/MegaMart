import CategoryCard from "../../../../components/common/CategoryCard";

function CategorySectionHero() {
    return (
        <div className="category-section-hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="heading">
                            <h1>Featured Categories</h1>
                        </div>
                    </div>

                    <div className="col-4 text-end">
                        <button className="badge">View All</button>
                    </div>
                </div>
            </div>

            <div className="category-cards-container">
                <CategoryCard
                    // name="Electronics"
                    image="phone.png"
                    cardBgColor="#DC2626"
                />

                <CategoryCard
                    // name="Clothing"
                    image="laptop.png"
                    cardBgColor="#064E3B"
                />

                <CategoryCard
                    // name="Home & Kitchen"
                    image="fashion.png"
                    cardBgColor="#F59E0B"
                />

                <CategoryCard
                    // name="Books"
                    image="headphone.png"
                    cardBgColor="#166534"
                />

                <CategoryCard
                    // name="Beauty"
                    image="beauty.png"
                    cardBgColor="#D1FAE5"
                />

                <CategoryCard
                    // name="Toys"
                    image="teddy.png"
                    cardBgColor="#166534"
                />

                <CategoryCard
                    // name="Shoes"
                    image="shoes.png"
                    cardBgColor="#F59E0B"
                />
                <CategoryCard
                    // name="Clothing"
                    image="laptop.png"
                    cardBgColor="#064E3B"
                />
            </div>
        </div>
    );
}

export default CategorySectionHero;