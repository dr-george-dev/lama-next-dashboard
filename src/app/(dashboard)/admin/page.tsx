import CountChart from "@/components/countChart";
import UserCard from "@/components/userCard";
import AttendanceChart from "@/components/AttendanceChart";
import FinanceChart from "@/components/FinanceChart";
import EventCalender from "@/components/EventCalender";
import Announcement from "@/components/Announcement";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARD */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="staff" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="supervisor" />
        </div>
        {/* Middle Charts will be displayed here */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
          <AttendanceChart />
          </div>
        </div>
        {/* Bottom Charts will be displayed here */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
       
      </div>
       {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcement />
        </div>
    </div>
  );
};

export default AdminPage;
