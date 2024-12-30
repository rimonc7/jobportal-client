import { Link, useLoaderData } from "react-router-dom";

const ViewApplication = () => {
    const applications = useLoaderData()

    const handleStatusUpdate = (e, id) => {

        const data = {
            status: e.target.value
        }
        fetch(`https://job-portal-server-alpha-seven.vercel.app/job-applications/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }


    return (
        <div>
            <h2 className="text-2xl my-3 font-bold text-center">My Posted Job</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Applicant Email</th>
                            <th>Applicant LinkedIn</th>
                            <th>Applicant GitHub</th>
                            <th>Applicant Resume</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map(application => <tr>
                                <th>{application.applicant_email}</th>
                                <td>{application.linkedIn}</td>
                                <td>{application.github}</td>
                                <td>{application.resume}</td>
                                <td>
                                    <select
                                        onChange={(e) => handleStatusUpdate(e, application._id)}
                                        defaultValue={application.status || 'Change Status'}
                                        className="select select-bordered select-xs w-full max-w-xs">
                                        <option disabled>Change Status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplication;