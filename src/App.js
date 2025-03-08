import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginHome from './components/LoginHome';
import RegisterHome from './components/RegisterHome';
import VolRegister from './components/VolRegister';
import UserRegister from './components/UserRegister';
import AdminLogin from './components/AdminLogin';
import VolLogin from './components/VolLogin';
import UserLogin from './components/UserLogin';
import ViewVolunteer from './components/ViewVolunteer';
import AdminDashboard from './components/AdminDashboard';
import SearchVolunteer from './components/SearchVolunteer';
import UserDashboard from './components/UserDashboard';
import AssignJob from './components/AssignJob';
import VolunterDashboard from './components/VolunterDashboard';
import RequestVolunteer from './components/RequestVolunteer';
import JobView from './components/JobView';
import Feedback from './components/Feedback';
import Jobs from './components/Jobs';
import CertificateRequest from './components/CertificateRequest';



function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path='/' element={<HomePage />} />
        <Route path='/lhome' element={<LoginHome />} />
        <Route path='/rhome' element={<RegisterHome />} />
        <Route path='/vregister' element={<VolRegister />} />
        <Route path='/uregister' element={<UserRegister />} />
        <Route path='/alogin' element={<AdminLogin />} />
        <Route path='/vlogin' element={<VolLogin />} />
        <Route path='/ulogin' element={<UserLogin />} />
        <Route path='/admindash' element={<AdminDashboard />} />
        <Route path='/search' element={<SearchVolunteer />} />
        <Route path='/voldash' element={<VolunterDashboard />} />
        <Route path='/userdash' element={<UserDashboard />} />
        <Route path='/assignjob' element={<AssignJob />} />
        <Route path='/vvol' element={<ViewVolunteer />} />
        <Route path='/vrequest' element={<RequestVolunteer />} />
        <Route path='/jobview' element={<JobView />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/crequest' element={<CertificateRequest />} />
      </Routes>
    </BrowserRouter>
      
  );

}

export default App;
