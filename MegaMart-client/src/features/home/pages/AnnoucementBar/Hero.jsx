
import { useState } from "react";

function AnnouncementBar() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="announcement-bar">
            <div className="announcement-inner">

                <div className="announcement-item">
                    <i className="fa-solid fa-truck"></i>
                    <span>Free Shipping on Orders Over $50</span>
                </div>

                <button
                    className="announcement-see-more"
                    type="button"
                    onClick={() => setShowMore(!showMore)}
                    aria-expanded={showMore}
                >
                    {showMore ? "See less" : "See more"}
                    <i className={`fa-solid ${showMore ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </button>

                <div className={`announcement-extra ${showMore ? "is-open" : ""}`}>
                    <div className="announcement-item">
                        <i className="fa-solid fa-money-bill-1-wave"></i>
                        <span>30-Day Money-Back Guarantee</span>
                    </div>

                    <div className="announcement-item">
                        <i className="fa-regular fa-heart"></i>
                        <span>100% Satisfaction Guarantee</span>
                    </div>

                    <div className="announcement-item">
                        <span>Download App</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AnnouncementBar;
