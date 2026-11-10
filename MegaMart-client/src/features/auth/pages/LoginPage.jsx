
import { useState } from "react";
import {
    UserRound,
    UserRoundPlus,
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

import "./LoginPage.css";

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Announcement />
            <Header />
            <Navbar />

            <main className="loginPage">

                <div className="loginContainer">

                    {/* Left Banner */}
                    <section className="loginBanner">

                        <h3>Welcome to MegaMart</h3>

                        <h1>
                            Your One-Stop
                            <br />
                            Shopping Destination
                        </h1>

                        <div className="loginBenefits">

                            <p>
                                <CheckCircle />
                                Get the best deals & offers
                            </p>

                            <p>
                                <CheckCircle />
                                Fast & reliable delivery
                            </p>

                            <p>
                                <CheckCircle />
                                A seamless shopping experience
                            </p>

                        </div>

                        <div className="loginBannerImage">
                            <ShoppingBag size={180} strokeWidth={1.2} />
                        </div>

                    </section>

                    {/* Right Login Form */}
                    <section className="loginFormSection">

                        <div className="authTabs">

                            <button className="activeAuthTab">
                                <UserRound />
                                Login
                            </button>

                            <button className="authTab">
                                <UserRoundPlus />
                                <a href="/register">Sign Up</a>
                            </button>

                        </div>

                        <div className="loginFormHeading">
                            <h2>Login to Your Account</h2>
                            <p>Welcome back! Please login to continue</p>
                        </div>

                        <form className="loginForm">

                            <div className="loginInputGroup">
                                <Mail />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div className="loginInputGroup">
                                <LockKeyhole />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                />

                                <button
                                    type="button"
                                    className="passwordToggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>

                            <div className="loginFormOptions">

                                <label>
                                    <input type="checkbox" />
                                    Remember me
                                </label>

                                <a href="#">Forgot Password?</a>

                            </div>

                            <button type="submit" className="loginSubmitBtn">
                                Login
                                <ArrowRight />
                            </button>

                        </form>

                        <div className="loginDivider">
                            <span>or continue with</span>
                        </div>

                        <div className="socialLogin">

                            <button type="button">Google</button>
                            <button type="button">Facebook</button>
                            <button type="button">Apple</button>

                        </div>

                        <p className="signupRedirect">
                            Don't have an account?
                           <a href="/register">Sign Up</a>
                        </p>

                    </section>

                </div>

            </main>

            <Footer />
        </>
    );
}

export default LoginPage;
