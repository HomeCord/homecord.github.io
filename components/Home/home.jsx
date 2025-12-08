import { StrictMode } from 'react';
import './home.css';
import homeCordIcon from '/homecord-icon.png';


export default function HomePage() {
    return (
        <StrictMode>
          <>
            <img src={homeCordIcon} className="logo" alt="HomeCord's logo, a white house with a grey roof, the letter 'H' is in blue font above where the door of the house is located." />
            <h1>HomeCord</h1>
            <p>
              Promote your Discord community with a specialised home page<br /><br /><i>This website is still work in progress as a Buildathon project.</i>
            </p>
            <br />
            <hr />

            <p className="faded-text">
              This website is open sourced on <a href='https://github.com/HomeCord/homecord.github.io' target='_blank'>GitHub here</a>.
            </p>
          </>
        </StrictMode>
    );
}
