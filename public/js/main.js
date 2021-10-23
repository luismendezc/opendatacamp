/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function toggleNav() {
    var sidenav = document.getElementById("mySidebar"),
        main = document.getElementById("main");
    sidenav.style.width = sidenav.style.width === "250px" ? '0' : '250px';
    main.style.marginLeft = main.style.marginLeft === "250px" ? '0' :  '250px';
}
