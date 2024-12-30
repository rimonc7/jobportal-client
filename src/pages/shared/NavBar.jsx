import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const NavBar = () => {
    const { signOutUser } = useContext(AuthContext);

    const { user } = useContext(AuthContext);

    const links =
        <>
            <li> <NavLink to='/' >Home</NavLink></li>
            <li> <NavLink to='/myPostedJob' >My Posted Job</NavLink></li>
            <li> <NavLink to='/myApplication' >My Application</NavLink></li>
            <li> <NavLink to='/addJob' >Add Job</NavLink></li>
        </>

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });

    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Job Portal</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {links}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                {
                    user ?
                        <Link onClick={handleSignOut} className="btn" >Logout</Link>
                        :
                        <div className="space-x-2">
                            <Link to="/register" className="btn">Register</Link>
                            <Link to='/login' className="btn">Sign In</Link>
                        </div>
                }


            </div>
        </div>
    );
};

export default NavBar;