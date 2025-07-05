import React from 'react'
import AdminHeader from '../Eventadmin/AdminHeader'
// import Header from '../components/header'
import AttendanceTable from '../Eventadmin/AttendanceTable'

function Attendance() {
  return (
    <div className='w-full h-[100vh]'>
        {/* <Header /> */}
        {/* <AdminHeader/> */}
        <AttendanceTable/>
    </div>
  )
}

export default Attendance