import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Import all your page components
import Home from './pages/Home';
import AmbassadorClient from './pages/AmbassadorClient';
import Market from './pages/Market';
import Task from './pages/Task';
import Dashboard from './pages/components/Dashboard';
import TaskOverview from './pages/TaskOverview';
import Submitted_task from './pages/Submitted_task';
import UserProjectsHome from './pages/UserProjectsHome';
import UserProjects from './pages/UserProjects';
import UserProjectsDetails from './pages/UserProjectDetails';
import RegisterProject from './pages/RegisterProject';
import Logout from './pages/Logout';
import Academy from './pages/Academy';
import AcademyForm from './pages/AcademyForm';
import ProjectEdit from './pages/ProjectEdit';
import ProjectSignup from './pages/ProjectSignup';
import Signin from './pages/Signin';
import About from './pages/About';
import Documentation from './pages/Documentation';
import Whitepaper from './pages/Whitepaper';
import Roadmap from './pages/Roadmap';
import FAQs from './pages/FAQs';
import Waitlist from './pages/Waitlist';
import UserProfile from './pages/UserProfile';
import Courses from './pages/Courses';
import Course from './pages/Course';
import ScrollToTop from './components/ScrollToTop';
import UserDashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import AcademyManage from './pages/AcademyManage';
import Sellers from './pages/Sellers';
import MyPurchase from './pages/MyPurchase';
import CourseDetails from './components/CourseDetails';
import TutorSignup from './pages/TutorSignup';
import CourseManagement from './pages/CourseManagement';
import CourseCreate from './pages/CourseCreate';
import TutorProtectedRoute from './Guides/TutorProtectedRoute';
import Contact from './pages/Contact';
import SubmitCoursePage from './pages/SubmitCoursesPage';
import AdminCourseApproval from './pages/AdminCourseApproval';
import Login from './pages/Login';
import WaitlistPopup from './components/WaitlistPopup';
// import Signin from './pages/Signin';

const App: React.FC = () => {
    return (

        <>
            <BrowserRouter>
            <WaitlistPopup />
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/documentations' element={<Documentation />} />
                    <Route path="/ambassador" element={<AmbassadorClient />} />
                    <Route path="/market" element={<Market />} />
                    <Route path="/grindfi" element={<UserProjects />} />
                    <Route path="/grindfi/register" element={<RegisterProject />} />
                    <Route path="/grindfi/:id" element={<UserProjectsDetails />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/contact" element={<Contact />} />

                    // temporary login
                    <Route path="/login" element={<Login />} />
                    


                    // admin page but not secured
                    <Route path="/tutors-submition/courses-approval" element={<AdminCourseApproval />} />

                    // academy
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/academy/courses" element={<Courses />} />
                    <Route path="/academy/courses/:id" element={<Course />} />


                    // user dashboard ( general all )
                    <Route path="/dashboard" element={<UserDashboard />} >
                        <Route index element={<Overview />} />

                        // tutor 
                        <Route path="academy-management" element={ <TutorProtectedRoute > <AcademyManage /> </TutorProtectedRoute>} />
                        <Route path="course-management" element={  <TutorProtectedRoute> <CourseManagement /> </TutorProtectedRoute>} />

                        
                        <Route path="sellers" element={<Sellers />} />
                        <Route path="course-management/submit-course" element={<SubmitCoursePage />} />
                        <Route path="purchase" element={<MyPurchase />} />
                        <Route path="course/:id" element={<CourseDetails />} />
                        <Route path="course-management/create-course" element={<CourseCreate />} />
                        <Route path="submitted-courses" element={<AdminCourseApproval />} />
                    </Route>

                    // Tutor extra page
                    <Route path="signup-tutor" element={<TutorSignup />} />


                    // academy waitlist
                    <Route path="/academy/form" element={<AcademyForm />} />
                    <Route path="/academy/waitlist" element={<Waitlist />} />

                    // documentations
                    <Route path="/documentations/whitepaper" element={<Whitepaper />} />
                    <Route path="/documentations/roadmap" element={<Roadmap />} />
                    <Route path="/documentations/faqs" element={<FAQs />} />

                    <Route path="/grindfi/edit" element={<ProjectEdit />} />
                    <Route path="/grindfi/signup/setup" element={<ProjectSignup />} />
                    <Route path="/grindfi/signinPP" element={<Signin />} />

                    <Route path="/profile" element={<UserProfile />} />



                    {/* Dashboard routes */}
                    <Route path="/grindfi/home" element={<UserProjectsHome />}>
                        <Route index element={<Dashboard />} />
                        <Route path="task" element={<Task />}>
                            <Route index element={<TaskOverview />} />
                            <Route path="overview" element={<TaskOverview />} />
                            <Route path="submitted" element={<Submitted_task />} />
                        </Route>
                    </Route>
                </Routes>

                <ScrollToTop />
            </BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />


        </>
    );
};

export default App;