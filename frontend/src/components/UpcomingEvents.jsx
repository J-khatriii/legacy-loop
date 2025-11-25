import {
  FaBirthdayCake,
  FaLandmark,
  FaMusic,
  FaSmile,
  FaTheaterMasks,
} from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "Garden BBQ",
    date: "Sat 16 June",
    location: "Tom's Garden",
    icon: <FaBirthdayCake />,
  },
  {
    id: 2,
    title: "City Council Vote",
    date: "Sat 16 June",
    location: "Town Hall",
    icon: <FaLandmark />,
  },
  {
    id: 3,
    title: "Post-punk Festival",
    date: "Sat 16 June",
    location: "Tom's Garden",
    icon: <FaMusic />,
  },
  {
    id: 4,
    title: "Maybe Boring Stand-up",
    date: "Sat 16 June",
    location: "Tom's Garden",
    icon: <FaSmile />,
  },
  {
    id: 5,
    title: "Yeboncé Tour 2023",
    date: "Sat 16 June",
    location: "Tom's Garden",
    icon: <FaTheaterMasks />,
  },
]

const UpcomingEvents = () => {
  return (
    <div className="bg-white max-w-xs w-full p-4 rounded-lg shadow-md text-sm mt-4">
      <h3 className="font-semibold text-gray-800 mb-4">Your upcoming events</h3>
      <div className="flex flex-col divide-y divide-gray-200">
        {events.map((event) => (
          <div key={event.id} className="flex items-center py-3 gap-3">
            <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600">
              {event.icon}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{event.title}</span>
              <span className="text-gray-500 text-xs">
                {event.date}, {event.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingEvents;
