
function WhyHero() {
    return (
        <div className="why-hero">
            <samp className="heading"><h1>Why Shop With Us?</h1></samp>


            <div className="container">
                <div className="row whyFeatures">

                    {/* 01 */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="whyFeature">
                            <div className="imgBox">
                                <span className="whySectionIcon">
                                    <i className="fa-solid fa-truck"></i>
                                </span>
                            </div>
                            <div className="whyText">
                                <h3>Free Shipping</h3>
                                <p>On orders above 999</p>
                            </div>
                        </div>
                    </div>

                    {/* 02 */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="whyFeature">
                            <div className="imgBox">
                                <span className="whySectionIcon">
                                    <i className="fa-solid fa-recycle"></i>
                                </span>
                            </div>
                            <div className="whyText">
                                <h3>Easy Returns</h3>
                                <p>Hassle-free returns</p>
                            </div>
                        </div>
                    </div>

                    {/* 03 */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="whyFeature">
                            <div className="imgBox">
                                <span className="whySectionIcon">
                                    <i className="fa-regular fa-credit-card"></i>
                                </span>
                            </div>
                            <div className="whyText">
                                <h3>Secure Payment</h3>
                                <p>100% safe and secure</p>
                            </div>
                        </div>
                    </div>

                    {/* 04 */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="whyFeature">
                            <div className="imgBox">
                                <span className="whySectionIcon">
                                    <i className="fa-solid fa-headset"></i>
                                </span>
                            </div>
                            <div className="whyText">
                                <h3>24/7 Support</h3>
                                <p>We're here to help</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default WhyHero;
