import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Outlet } from "react-router-dom";


// const plusJakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   display: "swap",
// });



export default function RootLayout() {
  return (
    <div className={`min-h-screen antialiased bg-black text-white`}>
        <Outlet />
    </div>
  );
}
