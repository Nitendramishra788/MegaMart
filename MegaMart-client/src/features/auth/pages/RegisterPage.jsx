
import { useState } from "react";
import {
    UserRound,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    CheckCircle,
    ArrowRight,
    ShoppingBag
} from "lucide-react";

import Announcement from "../../home/pages/AnnoucementBar/Hero";
import Header from "../../home/pages/Header/Hero";
import Navbar from "../../home/pages/Navbar/Hero";
import Footer from "../../home/pages/FooterSection/Hero";

import "./RegisterPage.css";

function RegisterPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Announcement />
            <Header />
            <Navbar />

            <main className="registerPage">

                <div className="registerContainer">

                    {/* Left Banner */}
                    <section className="registerBanner">

                        <h3>Join MegaMart Today</h3>

                        <h1>
                            Create Your
                            <br />
                            Account & Start
                            <br />
                            Shopping
                        </h1>

                        <div className="registerBenefits">

                            <p>
                                <CheckCircle />
                                Exclusive deals for members
                            </p>

                            <p>
                                <CheckCircle />
                                Easy and secure shopping
                            </p>

                            <p>
                                <CheckCircle />
                                Track all your orders
                            </p>

                        </div>

                        <div className="registerBannerImage">
                            <ShoppingBag size={180} strokeWidth={1.2} />
                        </div>

                    </section>

                    {/* Register Form */}
                    <section className="registerFormSection">

                        <div className="registerFormHeading">
                            <h2>Create Your Account</h2>
                            <p>Join us and enjoy a better shopping experience</p>
                        </div>

                        <form className="registerForm">

                            {/* Full Name */}
                            <div className="registerInputGroup">
                                <UserRound />

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div className="registerInputGroup">
                                <Mail />

                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            {/* Password */}
                            <div className="registerInputGroup">
                                <LockKeyhole />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create password"
                                />

                                <button
                                    type="button"
                                    className="registerPasswordToggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>

                            {/* Confirm Password */}
                            <div className="registerInputGroup">
                                <LockKeyhole />

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                />

                                <button
                                    type="button"
                                    className="registerPasswordToggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>

                            {/* Terms */}
                            <label className="registerTerms">
                                <input type="checkbox" />
                                <span>
                                    I agree to the Terms & Conditions
                                </span>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="registerSubmitBtn"
                            >
                                Create Account
                                <ArrowRight />
                            </button>

                        </form>

                        <div className="registerDivider">
                            <span>or sign up with</span>
                        </div>

                        <div className="registerSocialLogin">
                            <button type="button">Google</button>
                            <button type="button">Facebook</button>
                            <button type="button">Apple</button>
                        </div>

                        <p className="registerLoginRedirect">
                            Already have an account?
                            <a href="/login"> Login</a>
                        </p>

                    </section>

                </div>

            </main>

            <Footer />
        </>
    );
}

export default RegisterPage;
