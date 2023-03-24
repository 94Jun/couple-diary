import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPage from "./pages/MyPage";
import AnniversaryPage from "./pages/AnniversaryPage";
import SchedulePage from "./pages/SchedulePage";
import LetterPage from "./pages/LetterPage";
import MemoryPage from "./pages/MemoryPage";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import WriteLetterPage from "./pages/WriteLetterPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/anniversary" element={<AnniversaryPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/letter/write" element={<WriteLetterPage />} />
        <Route path="/memory" element={<MemoryPage />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
