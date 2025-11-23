// import { Outlet } from "react-router-dom";
// import Sidebar from "../Components/Sidebar";

// const Shell = () => {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       {/* Everything on the right of the sidebar changes per page */}
//       <div className="flex-1 overflow-hidden">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Shell;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Shell = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Shell;
