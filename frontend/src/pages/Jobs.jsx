import { useEffect, useState } from "react";
import moment from "moment";
import { Briefcase, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/jobs", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setJobs(res.data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete job (Admin only)
  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Briefcase className="text-blue-600" size={24} />
          Job Openings
        </h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {jobs.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No job openings available 💼
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="p-4 rounded-lg border bg-blue-50 border-blue-200 cursor-pointer transition-all duration-200 hover:shadow-md"
                onClick={() => navigate(`/app/jobs/${job._id}`)}
              >
                {/* Job Title */}
                <div className="flex items-center justify-between">
                  <h2 className="text-md text-blue-700 font-bold">
                    {job.title}
                  </h2>
                </div>

                {/* Company Logo */}
                {job.companyLogo && (
                  <img
                    src={job.companyLogo}
                    alt="Company Logo"
                    className="w-full h-40 object-cover rounded mt-3"
                  />
                )}

                {/* Short Description */}
                <p className="text-gray-700 text-sm mt-2">
                  {job.description.slice(0, 120)}...
                </p>

                {/* Location + Salary */}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    📍 {job.location || "Not specified"}
                  </p>
                  {job.salary && (
                    <p className="text-sm text-green-700 font-semibold">
                      ₹ {job.salary}
                    </p>
                  )}
                </div>

                {/* Time + Delete button */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    {moment(job.createdAt).fromNow()}
                  </p>

                  {user.role === "admin" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteJob(job._id);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
