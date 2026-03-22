import React from "react";
import Router from "./router/Routes";
import { Toaster } from "react-hot-toast"; 
import './App.css';

const App:React.FC = () => {
    return (
        <>
            <Router />
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default App;
