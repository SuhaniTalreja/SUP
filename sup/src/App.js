import './App.css';
import LoginPage from './PAGES/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './PAGES/UserProfile';
import SignUp from './PAGES/SignUp';
import Dashboard from './PAGES/Dashboard';
import Coaches from './PAGES/Coaches';
import LoginCoach from './COACH_PAGES/LoginCoach';
import SignUpCoach from './COACH_PAGES/SignUpCoach';
import CoachDashboard from './COACH_PAGES/CoachDashboard';
import HomePage from './PAGES/HomePage';
import RegisterMatch from './COACH_PAGES/RegisterMatch';
import UpdateMatch from './COACH_PAGES/UpdateMatch';
import Matches from './PAGES/Matches';
import SmartPost from './PAGES/SmartPost';
import WinnerSelection from './COACH_PAGES/WinnerSelection';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up/player' element={<SignUp />}></Route>
          <Route path='/login/player' element={<LoginPage/>}></Route>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/user-profile' element={<UserProfile />}> </Route>
          <Route path='/dashboard' element={<Dashboard />}> </Route>
          <Route path='/coach-dashboard' element={<CoachDashboard />}></Route>
          <Route path='/coaches' element={<Coaches />}> </Route>
          <Route path='/login/coach' element={<LoginCoach />}> </Route>
          <Route path='/sign-up/coach' element={<SignUpCoach />}> </Route> 
          <Route path='/coach-profile' element={<CoachDashboard />}></Route>
          <Route path='/register-match' element={<RegisterMatch />}></Route>
          <Route path='/update-match' element={<UpdateMatch />}></Route>
          <Route path='/matches' element={<Matches />}></Route>
          <Route path='/smart-post' element={<SmartPost />}></Route>
          <Route path='/winner-selection' element={<WinnerSelection />}></Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
