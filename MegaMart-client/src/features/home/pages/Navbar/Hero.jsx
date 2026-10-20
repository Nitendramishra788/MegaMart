import Button from "../../../../components/common/Button";


function NavbarHero() {
    return (
        <div className="navbar-hero">
            {/* <h1>Navbar</h1> */}
            <nav class="navbar md:navbar-expand bg-1 fg-2">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><button className="categoryBTN">All Categories</button></a>
    <button class="btn-icon navbar-toggler" type="button" data-bs-toggle="drawer" data-bs-target="#navbarLeftDrawer" aria-controls="navbarLeftDrawer" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" aria-hidden="true"></span>
    </button>
    <dialog class="drawer drawer-start" tabindex="-1" id="navbarLeftDrawer" aria-labelledby="navbarLeftDrawerLabel">
      <div class="drawer-header">
        {/* <h5 class="drawer-title" id="navbarLeftDrawerLabel">Menu</h5> */}
        <button type="button" class="btn-close" data-bs-dismiss="drawer" aria-label="Close"></button>
      </div>
      <div class="drawer-body">
        <ul class="navbar-nav me-auto mb-2 md:mb-0" id="navbarLeftDrawerNav">
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">Home</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="/product-listing">Products</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Electronics</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Home & Living</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Beauty</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Toys and Sports</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Deals</a></li>
        </ul>
      </div>
    </dialog>
  </div>
</nav>
        </div>
    );
}

export default NavbarHero;