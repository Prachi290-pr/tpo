/* eslint-disable no-unused-vars */
//UI 3
import React, { useState, useRef, useEffect } from "react";

const UpdateRemarkForm = ({ remark,onAddRemark, showModal, setShowModal }) => {
  const [text, setText] = useState(remark.remark);
  const [status, setStatus] = useState(remark.status);
  const [driveDate, setDriveDate] = useState(null); // New state for drive date
  const [reminderDate, setReminderDate] = useState(null);
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter a remark.");
      return;
    }
   
    const newRemark = {
      text: text.trim(),
      status: status,
      drive_date: driveDate, // Include drive date in the new remark object
      date: new Date().toISOString().split("T")[0],
      reminder_date : reminderDate,
      id:remark.id
    };
   
    onAddRemark(newRemark);
    setText("");
    setStatus("Still Communication");
    setDriveDate(""); // Reset drive date
    setReminderDate("");

    handleCloseModal();
  };

  useEffect(() => {
    if (showModal) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [showModal]);

  const handleCloseModal = () => {
    modalRef.current.close();
    setShowModal(false);
  };

  return (
    <dialog ref={modalRef} className="add-remark-modal">
      <button onClick={handleCloseModal} className="close-btn">
        x
      </button>
      <h2>Add New Remark</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Remark:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="10"
            cols="50"
            // defaultValue={remark.remark}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Still Communication">Still Communication</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Paused">Paused</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        {/* <div className="form-group">
          <label htmlFor="driveDate">Drive Date:</label>
          <input
            type="date"
            id="driveDate"
            value={driveDate}
            onChange={(e) => setDriveDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminderDate">Reminder Date:</label>
          <input
            type="date"
            id="reminderDate"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </div> 
        //below code to show select date only if status is confirmed                            
        */}
        {status === "Confirmed" && (
          <>
            <div className="form-group">
              <label htmlFor="driveDate">Drive Date:</label>
              <input
                type="date"
                id="driveDate"
                value={driveDate}
                onChange={(e) => setDriveDate(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="form-group">
              <label htmlFor="reminderDate">Reminder Date:</label>
              <input
                type="date"
                id="reminderDate"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
              />
          </div>
        <button type="submit" onClick={handleSubmit}>Add Remark</button>
      </form>
    </dialog>
  );
};

export default UpdateRemarkForm;


// // newely ui changes UI 2
// import React, { useState, useRef, useEffect } from "react";

// const updateRemarkForm = ({ onAddRemark, showModal, setShowModal }) => {
//   const [text, setText] = useState("");
//   const [status, setStatus] = useState("Still Communication");
//   const modalRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       alert("Please enter a remark.");
//       return;
//     }
//     const newRemark = {
//       text: text.trim(),
//       status: status,
//       date: new Date().toISOString().split("T")[0],
//     };
//     onAddRemark(newRemark);
//     setText("");
//     setStatus("Still Communication");

//     handleCloseModal();
//   };

//   useEffect(() => {
//     if (showModal) {
//       modalRef.current.showModal();
//     } else {
//       modalRef.current.close();
//     }
//   }, [showModal]);

//   const handleCloseModal = () => {
//     modalRef.current.close();
//     setShowModal(false);
//   };
//   return (
//     <dialog ref={modalRef} className="add-remark-modal">
//       <button onClick={handleCloseModal} className="close-btn">
//         x
//       </button>
//       <h2>Add New Remark</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="text">Remark:</label>
//           <textarea
//             id="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             rows="10"
//             cols="50"
//             required
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="status">Status:</label>
//           <select
//             id="status"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="Still Communication">Still Communication</option>
//             <option value="Confirmed">Confirmed</option>
//             <option value="Paused">Paused</option>
//           </select>
//         </div>
//         <button type="submit">Add Remark</button>
//       </form>
//     </dialog>
//   );
// };

// export default updateRemarkForm;


// UI 1
// // import React, { useState, useRef, useEffect } from "react";

// // const updateRemarkForm = ({ onAddRemark, showModal, setShowModal }) => {
// //   const [text, setText] = useState("");
// //   const [status, setStatus] = useState("Still Communication");
// //   const modalRef = useRef(null);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!text.trim()) {
// //       alert("Please enter a remark.");
// //       return;
// //     }
// //     const newRemark = {
// //       remark: text.trim(),
// //       status: status,
// //       // date: new Date().toISOString().split("T")[0],
// //     };
// //     onAddRemark(newRemark);
// //     setText("");
// //     setStatus("Still Communication");

// //     handleCloseModal();
// //   };

// //   useEffect(() => {
// //     if (showModal) {
// //       modalRef.current.showModal();
// //     } else {
// //       modalRef.current.close();
// //     }
// //   }, [showModal]);

// //   const handleCloseModal = () => {
// //     modalRef.current.close();
// //     setShowModal(false);
// //   };
// //   return (
// //     <dialog ref={modalRef} className="add-remark-modal">
// //       <button onClick={handleCloseModal} className="close-btn">
// //         x
// //       </button>
// //       <h2>Add New Remark</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group">
// //           <label htmlFor="text">Remark:</label>
// //           <textarea
// //             id="text"
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //             rows="10"
// //             cols="50"
// //             required
// //           ></textarea>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="status">Status:</label>
// //           <select
// //             id="status"
// //             value={status}
// //             onChange={(e) => setStatus(e.target.value)}
// //           >
// //             <option value={1}>Still Communication</option>
// //             <option value={2}>Confirmed</option>
// //             <option value={4}>Paused</option>
// //           </select>
// //         </div>
// //         <button type="submit">Add Remark</button>
// //       </form>
// //     </dialog>
// //   );
// // };

// // export default updateRemarkForm;

