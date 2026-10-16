function HeroSectionHero() {
    return (
        <div className="hero-section-hero">
            <div id="carouselExample" className="carousel carousel-overlay slide">

                <div className="carousel-inner rounded-5">
                    <div className="carousel-item active">
                        <img
                            src="/bannerA.png"
                            alt="MegaMart Banner 1"
                            className="d-block w-100 BannerImgs"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src="/bannerB.png"
                            alt="MegaMart Banner 2"
                            className="d-block w-100 BannerImgs"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src="/bannerC.png"
                            alt="MegaMart Banner 3"
                            className="d-block w-100 BannerImgs"
                        />
                    </div>
                </div>

                <div className="carousel-overlay-controls">
                    <div>
                        <button
                            className="btn-icon btn-sm btn-subtle theme-secondary"
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-icon-prev" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button
                            className="btn-icon btn-sm btn-subtle theme-secondary"
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide="next"
                        >
                            <span className="carousel-icon-next" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>

                        <button
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>

                        <button
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeroSectionHero;