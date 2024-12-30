import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
    const [myJobs, setMyJobs] = useState([])
    const { user } = useContext(AuthContext)


    useEffect(() => {
        fetch(`https://job-portal-server-alpha-seven.vercel.app/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyJobs(data))
    }, [user.email])
    return (
        <div>
            <h2 className="text-2xl my-3 font-bold text-center">My Posted Job</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Job Type</th>
                            <th>Application Count</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myJobs.map(myJob => <tr>
                                <th>{myJob.title}</th>
                                <td>{myJob.location}</td>
                                <td>{myJob.jobType}</td>
                                <td>{myJob.applicationCount}</td>
                                <td>
                                    <Link className="btn btn-link" to={`/viewApplication/${myJob._id}`} > View Application</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;