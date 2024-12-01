import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './Components/Auth/AuthPage';
import MainPage from './Components/MainPage/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
