// import React, { useState } from "react";

// const formatDate = (isoString) => {
//   try {
//     if (!isoString) {
//       return format(new Date(), "dd/MM/yyyy");
//     }
//     const date = parseISO(isoString);
//     return format(isoString, "dd/MM/yyyy");
//   } catch (error) {
//     console.error("Error parsing date:", error);
//     return "Invalid Date";
//   }
// };

// const RemarkItem = ({ remark_id, remark, onUpdateStatus }) => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState("");

//   const handleUpdateStatus = () => {
//     setShowOptions(true);
//   };

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//   };

//   const handleConfirmUpdate = () => {
//     // console.log(remark);
//     // console.log(remark.id);
//     onUpdateStatus(remark.id, selectedStatus);
//     setShowOptions(false);
//   };

//   return (
//     <div className="remark">
//       <p>{remark.remark}</p>
//       <p>
//         <strong>Status:</strong>{" "}
//         {showOptions ? (
//           <select value={selectedStatus} onChange={handleStatusChange}>
//             <option defaultChecked>Select Status</option>
//             <option key="Still Communication" value={1}>
//               Still Communication
//             </option>
//             <option key="Confirmed" value={2}>
//               Confirmed
//             </option>
//             <option key="Paused" value={4}>
//               Paused
//             </option>
//           </select>
//         ) : (
//           <>
//             <span
//               className="statusRemark"
//               style={{ margin: "0 30px 0 0", width: "200px" }}
//             >
//               {remark.status_name}
//             </span>
//             <button onClick={handleUpdateStatus}>Update</button>
//           </>
//         )}
//       </p>
//       <p>
//         <strong>Date:</strong> {formatDate(remark.createdAt)}
//       </p>
//       <div className="buttonCover">
//         {showOptions && <button onClick={handleConfirmUpdate}>Save</button>}
//       </div>
//     </div>
//   );
// };

// export default RemarkItem;

//newely ui added
import React from "react";
import { format, parseISO } from 'date-fns';

const RemarkItem = ({ remark }) => {
    console.log("Remark:",remark)
    const formatDate = (isoString) => {
    try {
      if (!isoString) {
        return format(new Date(), "dd/MM/yyyy");
      }
      const date = parseISO(isoString);
      return format(isoString, "dd/MM/yyyy");
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date";
    }
  };
  return (
    <div className="remark w-full sm:w-1/4">
    <p>{remark.remark}</p>
    <p>
      <strong>Status:</strong> {remark.status}
    </p>
    <p>
      <strong>Drive Date:</strong> {remark.drive_date === null ? 'NA' : formatDate(remark.drive_date)}
    </p>
    <p>
      <strong>Reminder Date:</strong> {remark.reminder_date === null ? 'NA' : formatDate(remark.reminder_date)}
    </p>
  </div>
  
  );
};

export default RemarkItem;
