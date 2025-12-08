import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import homeCordIcon from '/homecord-icon.png';
//import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
//import { fab } from '@fortawesome/free-brands-svg-icons'
//import { fas } from '@fortawesome/free-solid-svg-icons'

//library.add(fas, fab);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <img src={homeCordIcon} className="logo" alt="HomeCord's logo, a white house with a grey roof, the letter 'H' is in blue font above where the door of the house is located." />
      <h1>HomeCord</h1>
      <p>
        Explore new or popular Discord communities to join<br /><i>This website is still work in progress as a Buildathon project.</i>
      </p>
      <br />
      <hr />
      
      <p className="faded-text">
        This website is open sourced on <a href='https://github.com/HomeCord/homecord.github.io' target='_blank'>GitHub here</a>.
      </p>
    </>
  </StrictMode>,
)
