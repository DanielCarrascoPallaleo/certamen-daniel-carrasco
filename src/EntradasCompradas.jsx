import React, { useEffect, useState } from 'react';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { obtenerEntradas } from './assets/Services/localStorage';


export default function EntradasCompradas() {
  const [entradas, setEntradas] = useState([]);
  const [filtroPelicula, setFiltroPelicula] = useState(null);
  const [opcionesPeliculas, setOpcionesPeliculas] = useState([]);

  const peliculasCatalogo = {
    'wifi-ralph': 'Wifi Ralph',
    'dbs-broly': 'Dragon Ball Super Broly',
    'cascanueces': 'Cascanueces',
    'el-grinch': 'El Grinch'
  };

  useEffect(() => {
    cargarEntradas();
    const onStorage = (e) => {
      if (e.key === 'entradas_cine') cargarEntradas();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

    const entradasFiltradas = filtroPelicula ? entradas.filter(e => e.pelicula === filtroPelicula) : entradas;

  const peliculaBody = (row) => peliculasCatalogo[row.pelicula] || row.pelicula || '-';
  const valorBody = (row) => formatearPrecio((Number(row.cantidad) || 0) * 5000);
  const cantidadBody = (row) => Number(row.cantidad) || 0;

  const cargarEntradas = () => {
    const datos = obtenerEntradas(); // obtiene array desde localStorage
    setEntradas(datos || []);

    const uniq = Array.from(new Set((datos || []).map(d => d.pelicula).filter(Boolean)));
    const opciones = uniq.map(code => ({ label: peliculasCatalogo[code] || code, value: code }));

    opciones.unshift({ label: 'Todas', value: null });
    setOpcionesPeliculas(opciones);
  };

  

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <Panel header="Entradas Compradas">
            <div className="p-grid p-align-center p-justify-between" style={{ marginBottom: 12 }}>
              <div className="p-col-12 p-md-4">
                <label style={{ display: 'block', marginBottom: 6 }}>Filtrar por película</label>
                <Dropdown
                  value={filtroPelicula}
                  options={opcionesPeliculas}
                  onChange={(e) => setFiltroPelicula(e.value)}
                  optionLabel="label"
                  placeholder="Selecciona una película"
                />
              </div>

              <div className="p-col-12 p-md-4" style={{ textAlign: 'right' }}>
                <Button label="Mostrar todas" className="p-button-secondary" onClick={() => setFiltroPelicula(null)} />
              </div>
            </div>

            <DataTable
              value={entradasFiltradas}
              paginator
              rows={10}
              responsiveLayout="scroll"
              emptyMessage="No hay entradas registradas"
            >
              <Column field="dia" header="Día" sortable />
              <Column header="Película" body={peliculaBody} />
              <Column header="Cantidad de Entradas" body={cantidadBody} style={{ textAlign: 'right' }} />
              <Column header="Valor a Pagar" body={valorBody} style={{ textAlign: 'right' }} />
            </DataTable>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function formatearPrecio(monto) {
  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    try {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(monto);
    } catch (e) { /* fallback */ }
  }
  return `$${monto.toLocaleString ? monto.toLocaleString() : monto}`;
}