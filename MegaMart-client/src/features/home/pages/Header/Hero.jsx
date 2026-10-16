
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";

function HeaderHero() {
    return (
        <header className="header-hero">
            <div className="container-fluid px-3 px-lg-4">
                <div className="row align-items-center g-3 py-2">

                    {/* Logo */}
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="HeadCom HeadCom1">
                            <img
                                src="/megaLogo.png"
                                alt="MegaMart Logo"
                                className="LogoImg"
                            />
                        </div>
                    </div>

                    {/* Account, Wishlist, Cart */}
                    <div className="col-6 col-md-8 col-lg-3 order-md-2 order-lg-3">
                        <div className="d-flex align-items-center justify-content-end gap-3 gap-lg-4">

                            <div className="HeadCom HeadCom3">
                                <i className="fa-solid fa-circle-user"></i>
                                <span className="UserText">Account</span>
                                <span className="dropdownArrow">
                                    <i className="fa-solid fa-caret-down"></i>
                                </span>
                            </div>

                            <div className="HeadCom HeadCom4">
                                <i className="fa-regular fa-heart"></i>
                                <span className="UserText">Wishlist</span>
                            </div>

                            <div className="HeadCom HeadCom5">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="UserText">Cart</span>
                            </div>

                        </div>
                    </div>

                    {/* Search */}
                    <div className="col-12 col-md-12 col-lg-7 order-md-3 order-lg-2">
                        <form
                            action="#"
                            className="SearchForm"
                            role="search"
                        >
                            <Input
                                type="text"
                                name="search"
                                placeholder="Search for products..."
                                className="SearchInput"
                            />

                            <Button
                                type="submit"
                                className="SearchButton"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default HeaderHero;
