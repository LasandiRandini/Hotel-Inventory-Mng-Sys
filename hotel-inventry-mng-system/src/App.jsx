import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Login      from './pages/Login.jsx';
import Dashboard  from './pages/Dashboard.jsx';
import Inventory  from './pages/Inventory.jsx';
import Reports    from './pages/Reports.jsx';
import DashboardBar from './components/layout/DashboardBar.jsx';
//import ProtectedRoute from './routes/ProtectedRoute.jsx';

const DashLayout = () => (
  <div className="flex h-screen">
   
    <div className="w-64">
      <DashboardBar />
    </div>
   
    <div className="flex-1 overflow-auto">
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/login" element={<Login />} />

     
        <Route
          element={
          //  <ProtectedRoute>
              <DashLayout />
        //    </ProtectedRoute>
          }
        >

          <Route index element={<Dashboard />} />

        
          <Route
            path="inventory"
            element={
           //   <ProtectedRoute role="OTHER_ADMIN">
                <Inventory />
           //   </ProtectedRoute>
            }
          />

     
          <Route
            path="reports"
            element={
          //    <ProtectedRoute role="MAIN_ADMIN">
                <Reports />
          //    </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
