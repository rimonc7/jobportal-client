import { useLoaderData } from "react-router-dom";

const JobDetails = () => {
    const { title } = useLoaderData()
    return (
        <div>
            {title}
        </div>
    );
};

export default JobDetails;