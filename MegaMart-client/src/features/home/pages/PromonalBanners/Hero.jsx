
function PromotionalBannersHero() {
    return (
        <div className="promotional-banners-hero">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="leftPoster">
                            <img
                                src="/leftPoster.png"
                                alt="Left poster"
                                className="promotionalImg"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="rightPoster">
                            <img
                                src="/rightPoster.png"
                                alt="Right poster"
                                className="promotionalImg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotionalBannersHero;
