import { Navigate, Route, Routes } from 'react-router-dom';
import Diagnosis from './components/Diagnosis';
import Layout from './components/Layout';
import Login from './components/Login';
import AuthContextProvider from './context/auth';
import SymptomsContextProvider from './context/symptoms';

function App() {
  return (
    <AuthContextProvider>
      <SymptomsContextProvider>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/app" element={<Layout />}>
            <Route path="diagnosis" element={<Diagnosis />} />
            <Route path="appointments" element={<>Appointments</>} />
            <Route path="profile" element={<>Profile</>} />
            <Route path="" element={<Navigate to="diagnosis" />} />
          </Route>
          <Route path="" element={<Navigate to="/auth" />} />
        </Routes>
      </SymptomsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
