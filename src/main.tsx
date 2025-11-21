// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
// import { LanguageProvider } from './context/LanguageContext.tsx';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <LanguageProvider>
//       <App />
//     </LanguageProvider>
//   </StrictMode>,
// );

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { BrowserRouter } from 'react-router-dom';   // ✅ ADD THIS

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>          {/* ✅ WRAP YOUR ENTIRE APP */}
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);

