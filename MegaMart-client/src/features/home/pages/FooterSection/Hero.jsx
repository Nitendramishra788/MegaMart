function FooterSectionHero() {
    return (

        <footer className="footer-section-hero">
            <div className="footer-container">
                <div className="footer-grid">

                    {/* Brand Section */}
                    <div className="footer-brand">
                        <img
                            src="/whiteA.png"
                            alt="MegaMart Logo"
                            className="WhiteLogoImg"
                        />

                        <p>
                            Your one-stop destination for shopping.
                            Discover quality products at amazing prices,
                            all in one place.
                        </p>

                        <div className="footer-socials">
                            <a href="#" aria-label="Instagram"><i class="fa-brands fa-linkedin"></i></a>
                            <a href="#" aria-label="Facebook"><i class="fa-brands fa-github"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube-shorts"></i></a>
                            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Shop Now</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-column">
                        <h3>Categories</h3>
                        <ul>
                            <li><a href="/products?category=mobiles">Mobiles</a></li>
                            <li><a href="/products?category=fashion">Fashion</a></li>
                            <li><a href="/products?category=home">Home & Living</a></li>
                            <li><a href="/products?category=beauty">Beauty</a></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div className="footer-column">
                        <h3>Customer Care</h3>
                        <ul>
                            <li><a href="/account/orders">Track Order</a></li>
                            <li><a href="/shipping">Shipping Policy</a></li>
                            <li><a href="/returns">Returns & Refunds</a></li>
                            <li><a href="/faq">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-contact">
                        <h3>Get In Touch</h3>

                        <p>
                            <span>✉</span>
                            support@megamart.com
                        </p>

                        <p>
                            <span>⌖</span>
                            India
                        </p>

                        <p className="footer-contact-note">
                            Need help with your order? We're here to help.
                        </p>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} MegaMart. All rights reserved.
                    </p>

                    <p className="developer-credit">
                        Developed with <span>♥</span> by
                        <strong> Nitendra Nit Mishra</strong>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default FooterSectionHero;   