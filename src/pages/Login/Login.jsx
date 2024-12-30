import Lottie from "lottie-react";
import logAnimation from "../../assets/login.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const {
        loginWithEmail,
        loginWithGoogle,
        loginWithFacebook,
        loginWithGitHub,
        loading,
    } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginWithEmail(email, password)
            .then((userCredential) => {
                console.log("Email Login Successful:", userCredential.user.email);
                form.reset();
                const user = { email: userCredential.user.email }
                axios.post('https://job-portal-server-alpha-seven.vercel.app/jwt', user, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data)
                    })
                // navigate(from);
            })
            .catch((error) => console.error("Login Error:", error.message));
    };

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then((userCredential) => {
                console.log("Google Login Successful:", userCredential.user);
                navigate(from);
            })
            .catch((error) => console.error("Google Login Error:", error.message));
    };

    const handleLoginWithFacebook = () => {
        loginWithFacebook()
            .then((userCredential) => {
                console.log("Facebook Login Successful:", userCredential.user);
                navigate(from);
            })
            .catch((error) => console.error("Facebook Login Error:", error.message));
    };

    const handleLoginWithGitHub = () => {
        loginWithGitHub()
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="hero bg-base-200 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl my-4 font-bold">Login Now</h2>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={logAnimation} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="form-control px-6 pb-6">
                        {/* Social Login Buttons */}
                        <button
                            onClick={handleLoginWithGoogle}
                            className="btn btn-outline btn-secondary flex items-center gap-2 mb-2"
                        >
                            <FaGoogle /> Continue with Google
                        </button>
                        <button
                            onClick={handleLoginWithFacebook}
                            className="btn btn-outline btn-secondary flex items-center gap-2 mb-2"
                        >
                            <FaFacebook /> Continue with Facebook
                        </button>
                        <button
                            onClick={handleLoginWithGitHub}
                            className="btn btn-outline btn-secondary flex items-center gap-2"
                        >
                            <FaGithub /> Continue with GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
