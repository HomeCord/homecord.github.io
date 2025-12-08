import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from '../components/Home/home';
//import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
//import { fab } from '@fortawesome/free-brands-svg-icons'
//import { fas } from '@fortawesome/free-solid-svg-icons'

//library.add(fas, fab);



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
)
