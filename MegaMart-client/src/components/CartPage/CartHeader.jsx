import { ShoppingCart, Trash2 } from "lucide-react";

function CartHeader({ totalItems = 0, onClearCart }) {
    return (
        <div className="cartHeader">

            <div className="cartHeaderTitle">
                <ShoppingCart size={38} />
                <h2>
                    Your Cart <span>({totalItems} Items)</span>
                </h2>
            </div>

            <button
                type="button"
                className="clearCartBtn"
                onClick={onClearCart}
            >
                <Trash2 size={20} />
                Clear Cart
            </button>

        </div>
    );
}

export default CartHeader;