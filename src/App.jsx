import { useState, useRef } from 'react'; // Importamos los Hooks
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';

import ComprarEntradas from './ComprarEntradas';
import EntradasCompradas from './EntradasCompradas';

function App() {
  // Toas
  const toastRef = useRef(null);
  
  const toolbarIzquierda = (
    <h3 className="m-0">"Sansamark"</h3>
  );

  return (
    <div>
      <Toast ref={toastRef} />
      <Toolbar start={toolbarIzquierda} />
      <TabView>
        <TabPanel header="Comprar Entradas">
          <ComprarEntradas />
        </TabPanel>
        <TabPanel header="Entradas compradas">
          <EntradasCompradas 
          
          />
        </TabPanel>
      </TabView>
    </div>
  )
}

export default App