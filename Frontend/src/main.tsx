import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './Context/UserContext.tsx'
// import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <App />
  </UserProvider>

)
