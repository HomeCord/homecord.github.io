import { StrictMode } from 'react';


export default function PageInternalError() {
    return (
        <StrictMode>
          <>
            <img src="https://http.cat/500" alt="A cat inside a metallic server casing, holding some disconnected wires in its front paw. Below the image is text reading '500 Internal Server Error'." />
          </>
        </StrictMode>
    );
}
