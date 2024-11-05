export default function Navbar(){
    return(
        <>
            <nav className="main-header navbar navbar-expand navbar-primary navbar-dark">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href=""><i className="fas fa-bars"></i></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link"  href=""><i className="fas fa-home"></i> Home</a>
                </li>
                
                </ul>


  
                <ul className="navbar-nav ml-auto">
                
                {/* <li className="nav-item ">
                    <a href="../logout.php" className="nav-link ">
                    <i className="fa fa-power-off"></i> Logout
                    </a>
                </li> */}
                
                </ul>
            </nav>
        </>
    )
}