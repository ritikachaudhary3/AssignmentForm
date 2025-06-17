import { useState, useEffect } from "react";
import axios from "axios";

function AssignmentForm() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    timeLimit: "",
    week: "",
    totalPoints: "",
    minimumPassPoints: "",
    allowUploadFiles: "",
    maxFileSizeLimit: "",
  });
  const [file, setFile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  // 🔁 Fetch assignments
  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:3999/assignments");
      setAssignments(res.data);
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append("attachment", file);
    }

    try {
      await axios.post("http://localhost:3999/assignments", data);
      alert("✅ Assignment submitted successfully!");

      // Reset form
      setFormData({
        title: "",
        summary: "",
        timeLimit: "",
        week: "",
        totalPoints: "",
        minimumPassPoints: "",
        allowUploadFiles: "",
        maxFileSizeLimit: "",
      });
      setFile(null);

      // Refresh assignments list
      fetchAssignments();
    } catch (err) {
      console.error("Submission Error:", err.response || err.message || err);
      alert("❌ Error submitting assignment.");
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 pt-8 rounded-lg shadow-md space-y-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold pl-4 ">Add Assignment</h2>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className=" hover:text-gray-800 text-[20px]"
            aria-label="Close form"
          >
            &#10005;
          </button>
        </div>

        <div>
          <label className="block font-normal mb-1 text-gray-600 text-[15px]">Assignment Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded px-3 py-2"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-normal mb-1 text-gray-600 text-[15px]">Summary</label>
          <textarea
            name="summary"
            className="w-full border rounded px-3 py-2"
            rows="3"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-3 text-gray-600">Attachments</label>
          <label
            htmlFor="attachment"
            className="flex items-center justify-center border-2 border-dashed border-violet-400 py-4 rounded-2xl cursor-pointer bg-blue-50 transition"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16.5 12.5L10 19a4.243 4.243 0 01-6-6l9-9a3 3 0 114.243 4.243L9 17"
            />
          </svg>
            Upload Attachment
            <input
              id="attachment"
              name="attachment"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          {file && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {file.name}
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-2"
              >
                Open
              </a>
            </div>
          )}
        </div>

        {/* Time and week */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-normal mb-1 text-gray-600 text-[15px]">Time Limit (Hours)</label>
            <input
              type="number"
              name="timeLimit"
              className="w-full border rounded px-3 py-2"
              value={formData.timeLimit}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label className="block font-normal mb-1 text-gray-600 text-[15px]">Week</label>
            <input
              type="text"
              name="week"
              className="w-full border rounded px-3 py-2"
              value={formData.week}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block font-normal mb-1 text-gray-600 text-[15px]">Total Points</label>
          <input
            type="number"
            name="totalPoints"
            className="w-full border rounded px-3 py-2"
            value={formData.totalPoints}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-normal mb-1 text-gray-600 text-[15px]">Minimum Pass Points</label>
          <input
            type="number"
            name="minimumPassPoints"
            className="w-full border rounded px-3 py-2"
            value={formData.minimumPassPoints}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-normal mb-1 text-gray-600 text-[15px]">Allow Upload Files</label>
          <input
            type="number"
            name="allowUploadFiles"
            className="w-full border rounded px-3 py-2"
            value={formData.allowUploadFiles}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-normal mb-1 text-gray-600 text-[15px]">Max File Size Limit</label>
          <input
            type="number"
            name="maxFileSizeLimit"
            className="w-full border rounded px-3 py-2"
            value={formData.maxFileSizeLimit}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: "",
                summary: "",
                timeLimit: "",
                week: "",
                totalPoints: "",
                minimumPassPoints: "",
                allowUploadFiles: "",
                maxFileSizeLimit: "",
              });
              setFile(null);
            }}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload Assignment
          </button>
        </div>
      </form>

      {/* 📄 Show existing assignments */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
  <h3 className="text-xl font-bold mb-4">Uploaded Assignments</h3>

  {assignments.length === 0 ? (
    <p className="text-gray-600">No assignments found.</p>
  ) : (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {assignments.map((a) => (
        <div key={a._id} className="border rounded-xl p-4 shadow-sm bg-white">
          <h4 className="font-semibold text-lg text-blue-700">{a.title}</h4>
          <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-3">{a.summary}</p>

          {a.attachment && (
            <a
              href={`http://localhost:3999/uploads/${a.attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline"
            >
              Open Attachment
            </a>
          )}
        </div>
      ))}
    </div>
  )}
</div>

    </>
  );
}

export default AssignmentForm;
