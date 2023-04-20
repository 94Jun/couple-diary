import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
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
import { useSelector } from "react-redux";
import Modal from "./components/shared/modal/Modal";
import MyPage from "./pages/MyPage";
import ScheduleList from "./components/schedule/ScheduleList";
import EditAnniversary from "./components/anniversary/EditAnniversary";
import EditSchedule from "./components/schedule/EditSchedule";

function App() {
  const activeModal = useSelector((state) => state.modal.activeModal);
  const loginMaintenance = useLoginMaintenance();
  useEffect(() => {
    loginMaintenance();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anniversary" element={<AnniversaryPage />} />
        <Route path="/anniversary/add/" element={<AddAnniversary />} />
        <Route path="/anniversary/add/:dateParams" element={<AddAnniversary />} />
        <Route path="/anniversary/edit/:anniversary_id" element={<EditAnniversary />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedule/all" element={<ScheduleList />} />
        <Route path="/schedule/add/:dateParams" element={<AddSchedule />} />
        <Route path="/schedule/add/" element={<AddSchedule />} />
        <Route path="/schedule/edit/:schedule_id" element={<EditSchedule />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/letter/add" element={<AddLetter />} />
        <Route path="/memory" element={<Memories />} />
        <Route path="/memory/photo" element={<Photos />} />
        <Route path="/memory/:memory_id" element={<MemoryView />} />
        <Route path="/memory/add" element={<AddMemory />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>} />
      </Routes>
      <Footer />
      {activeModal && <Modal />}
    </div>
  );
}

export default App;
