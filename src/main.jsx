import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Imporo el tema de PrimeReact
import 'primereact/resources/themes/saga-blue/theme.css'; 
// Importo estilos base de PrimeReact
import 'primereact/resources/primereact.min.css';
// Importa los íconos
import 'primeicons/primeicons.css';
// Importo Bootstrap
import 'bootstrap/dist/css/bootstrap-grid.min.css';

// Importo un css custom
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)