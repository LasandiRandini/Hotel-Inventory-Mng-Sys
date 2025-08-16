import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Login      from './pages/Login.jsx';
import Dashboard  from './pages/Dashboard.jsx';
import Inventory  from './pages/Inventory.jsx';
import Reports    from './pages/Reports.jsx';
import StockOut from './pages/StockOut.jsx';
import Dashboard2 from './pages/Dashboard2.jsx';
import StockIn2 from './pages/StockIn2.jsx';
//import StockOut2 from './pages/StockOut2.jsx';
import Logs from './pages/Logs.jsx';
import DashboardBar from './components/layout/DashboardBar.jsx';
import { store } from './store';
import { Provider } from 'react-redux';
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
            path="dashboard2"
            element={
           //   <ProtectedRoute role="OTHER_ADMIN">
                <Dashboard2 />
           //   </ProtectedRoute>
            }
          />
           <Route
            path="stock-in"
            element={
           //   <ProtectedRoute role="OTHER_ADMIN">
                <Provider store={store}>
      <div className="App">
        <StockIn2 />
      </div>
    </Provider>
           //   </ProtectedRoute>
            }
          />
                    <Route
            path="logs"
            element={
           //   <ProtectedRoute role="OTHER_ADMIN">
                <Logs />
           //   </ProtectedRoute>
            }
          />
<Route
            path="stock-out"
            element={
          //    <ProtectedRoute role="MAIN_ADMIN">
                <StockOut />
          //    </ProtectedRoute>
            }
          />
     {/* <Route
            path="stock-out2"
            element={
          //    <ProtectedRoute rol e="MAIN_ADMIN">
                <StockOut2 />
          //    </ProtectedRoute>
            }
          /> */}
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
