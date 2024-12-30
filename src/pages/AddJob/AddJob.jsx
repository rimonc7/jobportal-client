import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddJob = () => {
    const { user } = useContext(AuthContext)

    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        const { min, max, currency, ...newJob } = initialData;
        newJob.salaryRange = { min, max, currency }
        newJob.requirements = newJob.requirements.split('\n')

        console.log(newJob)

        fetch('https://job-portal-server-alpha-seven.vercel.app/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

    }


    return (
        <div>
            <h2 className="text-3xl font-bold text-center mt-10">Add Your Job</h2>
            <div className="card bg-base-100 w-3/4 mx-auto shadow-2xl">
                <form onSubmit={handleAddJob} className="card-body">
                    {/* {Job Title} */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Title</span>
                        </label>
                        <input name="title" type="text" placeholder="Job Title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">HR Email</span>
                        </label>
                        <input defaultValue={user?.email} name="hr_email" type="text" placeholder="Job Title" className="input input-bordered" required readOnly />
                    </div>
                    {/* {Location} */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input name="location" type="text" placeholder="Location" className="input input-bordered" required />
                    </div>
                    {/* {Job Type} */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Type</span>
                        </label>
                        <select name="jobType" className="select select-ghost w-full max-w-xs" defaultValue="">
                            <option value="" disabled>Pick a Job Type</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Intern">Intern</option>
                        </select>
                    </div>
                    {/* {Job Field} */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Field</span>
                        </label>
                        <select name="jobField" className="select select-ghost w-full max-w-xs" defaultValue="">
                            <option value="" disabled>Pick a Job Field</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>
                    {/* {Salary Range} */}
                    <label className="label">
                        <span className="label-text">Salary</span>
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Min</span>
                            </label>
                            <input name="min" type="text" placeholder="Min" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Max</span>
                            </label>
                            <input name="max" type="text" placeholder="Max" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Currency</span>
                            </label>
                            <select name="currency" className="select select-ghost w-full max-w-xs" defaultValue="">
                                <option value="" disabled>Currency</option>
                                <option value="BDT">BDT</option>
                                <option value="USD">USD</option>
                                <option value="EURO">EURO</option>
                            </select>
                        </div>
                    </div>
                    {/* {Job Requirement} */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job requirements</span>
                        </label>
                        <textarea name="requirements" className="textarea textarea-bordered" placeholder="Job Description"></textarea>
                    </div>
                    {/* {Job Description} */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Description</span>
                        </label>
                        <textarea name="description" className="textarea textarea-bordered" placeholder="Job Description"></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Add Job</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
