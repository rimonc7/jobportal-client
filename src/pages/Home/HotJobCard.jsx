import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotJobCard = ({ job }) => {
    const { _id, title, location, jobType, category, applicationDeadline, salaryRange, description, company, requirements, responsibilities, status, hr_email, hr_name, company_logo } = job;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="flex gap-2 m-2">
                <figure>
                    <img
                        className="w-12"
                        src={company_logo}
                        alt="Shoes" />
                </figure>
                <div>
                    <h3 className="font-bold">{company}</h3>

                    <p className="flex gap-1 items-center">
                        <FaMapMarkerAlt />
                        {location}
                    </p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description}</p>
                <div className="flex gap-2 flex-wrap">
                    {
                        requirements.map(requirement => <p className="badge border-blue-400 text-center px-2 hover:text-red-700">{requirement}</p>)
                    }
                </div>
                <div className="flex items-center">
                    <p>Salary:</p>{salaryRange.min}-{salaryRange.max}<p>Taka</p>
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/JobApply/${_id}`}>
                        <button className="btn btn-primary">Apply Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;