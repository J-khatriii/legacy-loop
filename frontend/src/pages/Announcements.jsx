import { useEffect, useState } from "react";
import moment from "moment";
import { Megaphone, Trash2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("announcements"));
//     if (saved && saved.length > 0) {
//       setAnnouncements(saved);
//     } else {
//       const demo = [
//         {
//           id: 1,
//           title: "Placement Drive 2025 – Full Details Inside",
//           message:
//             "The placement drive will start from next Monday. A complete schedule, company list, eligibility criteria, and preparation guide is available inside.",
//           fullText: `
//             The Placement Drive 2025 is officially scheduled to begin next Monday. This year, more than 42 companies are participating, including major recruiters such as TCS, Amazon, Wipro, Tech Mahindra, Infosys, and Cognizant.

//             **Eligibility Criteria**
//             • Minimum 6 CGPA required  
//             • No current backlogs  
//             • Students must bring 3 copies of their updated resume  
//             • College ID card is mandatory  

//             **Timings**
//             Registration opens at 8:30 AM sharp. Students are advised to report before 8:15 AM.

//             **Important Instructions**
//             • Formal dress code is COMPULSORY  
//             • Bring 2 passport-size photographs  
//             • Keep both hardcopy & digital copy of resume  
//             • Mobile phones must be kept silent  
//             • Follow the instructions of volunteers during the drive  

//             **Preparation Tips**
//             • Review your fundamentals in DSA, DBMS, OS, and Networking  
//             • Practice aptitude tests (quant + reasoning)  
//             • Prepare a strong introduction for HR round  

//             Wishing you all the best! Prepare well, stay confident, and make the most of this opportunity.
//             `,
//           media: "",
//           time: moment().subtract(2, "hours").toISOString(),
//           read: false,
//         },

//         {
//           id: 2,
//           title: "Holiday Notice",
//           message:
//             "College will remain closed on Friday due to a national event.",
//           fullText:
//             "The college will remain closed due to the national celebration across the state. Classes will resume normally on Saturday.",
//           media: null,
//           time: moment().subtract(22, "hours").toISOString(),
//           read: false,
//         },

//         {
//           id: 3,
//           title: "New Campus Rules Update",
//           message:
//             "The college has updated several academic and disciplinary rules.",
//           fullText: `Several new rules have been added regarding attendance, internal assessments, and code of conduct. Please read the full details on the website.`,
//           media: null,
//           time: moment().subtract(3, "days").toISOString(),
//           read: true,
//         },
//       ];

//       setAnnouncements(demo);
//       localStorage.setItem("announcements", JSON.stringify(demo));
//     }
//   }, []);


    useEffect(() => {
  const DEMO_VERSION = "2"; // <- increment this whenever you change the demo data

  const demo = [
    {
          id: 1,
          title: "Placement Drive 2025 – Full Details Inside",
          message:
            "The placement drive will start from next Monday. A complete schedule, company list, eligibility criteria, and preparation guide is available inside.",
          fullText: `
            The Placement Drive 2025 is officially scheduled to begin next Monday. This year, more than 42 companies are participating, including major recruiters such as TCS, Amazon, Wipro, Tech Mahindra, Infosys, and Cognizant.

            **Eligibility Criteria**
            • Minimum 6 CGPA required  
            • No current backlogs  
            • Students must bring 3 copies of their updated resume  
            • College ID card is mandatory  

            **Timings**
            Registration opens at 8:30 AM sharp. Students are advised to report before 8:15 AM.

            **Important Instructions**
            • Formal dress code is COMPULSORY  
            • Bring 2 passport-size photographs  
            • Keep both hardcopy & digital copy of resume  
            • Mobile phones must be kept silent  
            • Follow the instructions of volunteers during the drive  

            **Preparation Tips**
            • Review your fundamentals in DSA, DBMS, OS, and Networking  
            • Practice aptitude tests (quant + reasoning)  
            • Prepare a strong introduction for HR round  

            Wishing you all the best! Prepare well, stay confident, and make the most of this opportunity.
            `,
          media: "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d",
          time: moment().subtract(2, "hours").toISOString(),
          read: false,
        },
    {
      id: 2,
      title: "Holiday Notice",
      message: "College will remain closed on Friday due to a national event.",
      fullText:
        "The college will remain closed due to the national celebration across the state. Classes will resume normally on Saturday.",
      media: null,
      time: moment().subtract(22, "hours").toISOString(),
      read: false,
    },
    {
      id: 3,
      title: "New Campus Rules Update",
      message: "Several new rules have been added.",
      fullText:
        "New rules have been added regarding attendance, internal assessments, and code of conduct.",
      media: null,
      time: moment().subtract(3, "days").toISOString(),
      read: true,
    },
  ];

  const saved = JSON.parse(localStorage.getItem("announcements"));
  const savedVersion = localStorage.getItem("announcements_version");

  // If no saved data OR version mismatch → overwrite with demo
  if (!saved || savedVersion !== DEMO_VERSION) {
    localStorage.setItem("announcements", JSON.stringify(demo));
    localStorage.setItem("announcements_version", DEMO_VERSION);
    setAnnouncements(demo);
  } else {
    setAnnouncements(saved);
  }
}, []);


  const markAsRead = (id) => {
    const updated = announcements.map((a) =>
      a.id === id ? { ...a, read: true } : a
    );
    setAnnouncements(updated);
    localStorage.setItem("announcements", JSON.stringify(updated));
  };

  const deleteAnnouncement = (id) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem("announcements", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Megaphone className="text-amber-600" size={24} />
          Announcements
        </h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {announcements.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No announcements yet 📢
            </p>
          ) : (
            announcements.map((a) => (
              <div
                key={a.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200
                ${
                  a.read
                    ? "bg-gray-50 border-gray-200"
                    : "bg-amber-50 border-amber-200"
                }
                hover:shadow-md`}
                onClick={() => navigate(`/app/announcements/${a.id}`)}
              >
                {/* Title */}
                <div className="flex items-center justify-between">
                  <h2
                    className={`text-md ${
                      a.read
                        ? "text-gray-700 font-semibold"
                        : "text-amber-700 font-bold"
                    }`}
                  >
                    {a.title}
                  </h2>
                </div>

                {/* Media Preview */}
                {a.media && (
                  <img
                    src={a.media}
                    alt=""
                    className="w-full h-40 object-cover rounded mt-3"
                  />
                )}

                {/* Short Message Preview */}
                <p className="text-gray-700 text-sm mt-2">
                  {a.message.slice(0, 120)}...
                </p>

                {/* Time */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    {moment(a.time).fromNow()}
                  </p>

                  {!a.read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(a.id);
                      }}
                      className="flex items-center gap-1 text-amber-600 text-xs hover:underline"
                    >
                      <CheckCircle size={14} /> Mark read
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAnnouncement(a.id);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
