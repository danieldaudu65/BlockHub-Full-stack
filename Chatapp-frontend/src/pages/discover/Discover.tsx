import Downbar from "../../components/Downbar";
import Nav from "./components/Nav";
import Top_Oppurtunities from "./components/Top_Oppurtunities";
// import Featured from "./components/Featured";
// import Upcoming_Event from "./components/Upcoming_Event";
import RecentJobs from "./components/RecentJobs";
// import LiveEvents from "./components/LiveEvents";

export default function Discover() {
  return (
    <>
      <div className="mb-16">
          <Nav />
          {/* <LiveEvents />  */}
          <Top_Oppurtunities />
          {/* <Featured /> */}
          {/* <Upcoming_Event />   */}
          <RecentJobs />
      </div>

      <Downbar />
    </>
  );
}
