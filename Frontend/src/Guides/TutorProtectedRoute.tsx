import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface TutorProtectedProps {
  children: React.ReactNode;
}

const TutorProtectedRoute: React.FC<TutorProtectedProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tutorToken = localStorage.getItem("tutorToken");

    if (!tutorToken) {
      // Navigate back to where they came from or to a default page
      if (location.state && (location.state as any).from) {
        navigate((location.state as any).from, { replace: true });
      } else {
        navigate("/", { replace: true }); // default fallback
      }
    }
  }, [navigate, location]);

  // If token exists, render the protected content
  return <>{children}</>;
};

export default TutorProtectedRoute;