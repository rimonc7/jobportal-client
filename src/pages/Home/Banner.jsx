import { easeOut } from "motion";
import { motion } from "motion/react"
import banner1 from "../../assets/banner 1.jpg"
const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96">
            <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
                <div className="flex-1 ">
                    <motion.img
                        animate={{ x: [50, 100, 50] }}
                        transition={{ duration: 5 }}
                        src={banner1}
                        className="max-w-sm w-48 rounded-t-[40px] rounded-br-[40px] shadow-2xl flex-1 border-b-4  border-l-4 border-blue-500" />
                </div>
                <div className="flex-1" >
                    <motion.h1
                        animate={{ x: 60 }}
                        transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}
                        className="text-5xl font-bold">Latest <motion.span
                            animate={{ color: ['#ecff33', '#33ffe3', '#ff6133'] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >Jobs</motion.span> For You</motion.h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;