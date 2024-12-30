import Lottie from "lottie-react";
import regAnimation from "../../assets/Animation - 1733913504037.json";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { createUserWithEmail } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = {
            email,
            password
        }
        createUserWithEmail(email, password)
            .then(userCredential => {
                console.log(userCredential.user)
            })
            .then(() => {
                form.reset()
                navigate("/");
            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl my-4 font-bold">Register Now</h2>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={regAnimation} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
