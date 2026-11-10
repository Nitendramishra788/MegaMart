import { Heart, Trash2 } from "lucide-react";

function WishlistHeader({ totalItems = 0, onClearWishlist }) {
    return (
        <div className="wishlistHeader">

            <div className="wishlistHeaderTitle">

                <Heart size={42} fill="currentColor" />

                <div>
                    <h2>My Wishlist</h2>
                    <p>
                        Save your favorite products for later
                    </p>
                </div>

            </div>

            <button
                type="button"
                className="clearWishlistBtn"
                onClick={onClearWishlist}
            >
                <Trash2 size={19} />
                Clear All
            </button>

        </div>
    );
}

export default WishlistHeader;