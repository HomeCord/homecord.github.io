import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from '../components/Home/home';
import Community from '../components/Community/community';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="server/:guildId" element={<Community />} />
    </Routes>
  </BrowserRouter>
)
