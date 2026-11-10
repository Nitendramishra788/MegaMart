import { LockKeyhole, ShieldCheck } from "lucide-react";

function CheckoutSection({ onCheckout }) {
    return (
        <div className="checkoutSection">

            <button
                type="button"
                className="checkoutBtn"
                onClick={onCheckout}
            >
                Proceed to Checkout
            </button>

            <div className="secureCheckout">
                <LockKeyhole size={17} />
                <span>Secure Checkout</span>
            </div>

            <div className="paymentSecurity">
                <ShieldCheck size={20} />
                <p>
                    Your payment information is safe and secure.
                </p>
            </div>

        </div>
    );
}

export default CheckoutSection;