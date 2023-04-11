import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
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
import useLoginMaintenance from "./hooks/useLoginMaintenance";
import MemoryView from "./components/memory/MemoryView";
import AddMemory from "./components/memory/AddMemory";
import Photos from "./components/memory/Photos";
import AddLetter from "./components/letter/AddLetter";
import Memories from "./components/memory/Memories";
import AddAnniversary from "./components/anniversary/AddAnniversary";
import AddSchedule from "./components/schedule/AddSchedule";

function App() {
  const loginMaintenance = useLoginMaintenance();
  useEffect(() => {
    loginMaintenance();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/anniversary" element={<AnniversaryPage />} />
        <Route path="/anniversary/add/" element={<AddAnniversary />} />
        <Route path="/anniversary/add/:dateParams" element={<AddAnniversary />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedule/add/:dateParams" element={<AddSchedule />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/letter/add" element={<AddLetter />} />
        <Route path="/memory" element={<MemoryPage />}>
          <Route path="/memory" element={<Memories />} />
          <Route path="/memory/photo" element={<Photos />} />
        </Route>
        <Route path="/memory/:memory_id" element={<MemoryView />} />
        <Route path="/memory/add" element={<AddMemory />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
