import React from 'react';

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';
import reportWebVitals from './reportWebVitals';
import CourierApp from './CourierApp';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider domain="dev-6n1xot3k0d7iu4hw.us.auth0.com"
  clientId="gZHiwdqnkt1xKkIrP9GANbeMICFI9A8l"
  authorizationParams={{
    redirect_uri: "http://localhost:3000/fill-signup"
  }}
  >
  <React.StrictMode>
    <CourierApp/>
  </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
