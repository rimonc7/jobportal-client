import { useEffect, useState } from "react";
import HotJobCard from "./HotJobCard";

const HotJobs = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        fetch('https://job-portal-server-alpha-seven.vercel.app/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data)
            })
    }, [])


    return (
        <div>
            <div className="grid grid-cols-4 gap-5">
                {
                    jobs.map(job => <HotJobCard key={job._id} job={job} ></HotJobCard>)
                }
            </div>
        </div>
    );
};

export default HotJobs;