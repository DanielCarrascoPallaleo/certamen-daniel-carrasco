import React, { useState, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';
import { agregarEntrada } from './assets/Services/localStorage'; // usa tu método

function ComprarEntradas() {
  const msg = useRef(null);
  const toast = useRef(null);

  const [dia, setDia] = useState(null);
  const [tipoPago, setTipoPago] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [ciudad, setCiudad] = useState('');
  const [pelicula, setPelicula] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const dias = [
    { label: 'Lunes', value: 'Lunes' },
    { label: 'Martes', value: 'Martes' },
    { label: 'Miércoles', value: 'Miércoles' },
    { label: 'Jueves', value: 'Jueves' },
    { label: 'Viernes', value: 'Viernes' }
  ];

  const opcionesPago = [
    { label: 'Efectivo', value: 'Efectivo' },
    { label: 'Tarjeta', value: 'Tarjeta' }
  ];

  const peliculas = [
    { label: 'Wifi Ralph', value: 'wifi-ralph' },
    { label: 'Dragon Ball Super Broly', value: 'dbs-broly' },
    { label: 'Cascanueces', value: 'cascanueces' },
    { label: 'El Grinch', value: 'el-grinch' }
  ];

  const validar = () => {
    const errores = [];
    if (!dia) errores.push(
        {
            nivel: 'error', descripcionerror: 'Día obligatorio', detalleerror: 'Selecciona un día.' 
        });

    if (!tipoPago) errores.push({
        nivel: 'error', descripcionerror: 'Tipo de pago', detalleerror: 'Selecciona Efectivo o Tarjeta.'
    });
    if (!Number.isInteger(cantidad) || cantidad <= 0) errores.push({
        nivel: 'error', descripcionerror: 'Cantidad inválida', detalleerror: 'La cantidad debe ser un entero mayor que 0.'
    });
    if (!ciudad || ciudad.trim() === '') errores.push({
        nivel: 'error', descripcionerror: 'Ciudad obligatoria', detalleerror: 'Ingresa la ciudad.'
    });
    if (!pelicula) errores.push({
        nivel: 'error', descripcionerror: 'Película obligatoria', detalleerror: 'Selecciona una película.'
    });
    return errores;
  };

  const mostrarErrores = (errores) => {
    if (!msg.current) return;
    msg.current.clear();
    errores.forEach(err => msg.current.show(err));
  };

  const handleComprar = (e) => {
    e.preventDefault();
    msg.current && msg.current.clear();

    const errores = validar();
    if (errores.length > 0) {
      mostrarErrores(errores);
      return;
    }

    const entrada = {
      dia,
      tipoPago,
      cantidad,
      ciudad: ciudad.trim(),
      pelicula,
      fechaCreacion: new Date().toISOString()
    };

    setGuardando(true);
    try {
      agregarEntrada(entrada);

      toast.current && toast.current.show({ nivel: 'success', descripcionerror: 'Compra guardada', detalleerror: `Se guardó la compra de ${cantidad} entradas.`, life: 3000 });

      setDia(null);
      setTipoPago(null);
      setCantidad(1);
      setCiudad('');
      setPelicula(null);
    } catch (error) {
      mostrarErrores([{ nivel: 'error', descripcionerror: 'Error', detalleerror: 'No se pudo guardar la entrada.' }]);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <Toast ref={toast} />
      <Messages ref={msg} />
      <div className="row">
        <div className="col-md-6">
          <Panel header="Comprar Entrada">
            <form onSubmit={handleComprar} className="p-fluid">
              <div className="p-field mb-3">
                <label htmlFor="dia">Día</label>
                <Dropdown id="dia" value={dia} options={dias} onChange={(e) => setDia(e.value)} placeholder="Selecciona un día" />
              </div>

              <div className="p-field mb-3">
                <label>Tipo de pago</label>
                <SelectButton value={tipoPago} options={opcionesPago} onChange={(e) => setTipoPago(e.value)} optionLabel="label" />
              </div>

              <div className="p-field mb-3">
                <label htmlFor="cantidad">Cantidad de entradas</label>
                <InputNumber id="cantidad" value={cantidad} onValueChange={(e) => setCantidad(e.value)} mode="decimal" min={1} showButtons step={1} />
              </div>

              <div className="p-field mb-3">
                <label htmlFor="ciudad">Ciudad</label>
                <InputText id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
              </div>

              <div className="p-field mb-3">
                <label>Película</label>
                <ListBox options={peliculas} value={pelicula} onChange={(e) => setPelicula(e.value)} optionLabel="label" style={{ minHeight: 120 }} />
              </div>

              <div className="d-flex justify-content-end" style={{ gap: 8 }}>
                <Button type="button" label="Limpiar" className="p-button-secondary" onClick={() => {
                  msg.current && msg.current.clear();
                  setDia(null); setTipoPago(null); setCantidad(1); setCiudad(''); setPelicula(null);
                }} />
                <Button type="submit" label={guardando ? 'Guardando...' : 'Comprar'} className="p-button-primary" disabled={guardando} />
              </div>
            </form>
          </Panel>
        </div>

        <div className="col-md-6">
          <Panel header="Instrucciones">
            <p>Seleccione día, tipo de pago, cantidad, ingrese la ciudad y elija la película. Al confirmar se guarda la entrada en localStorage y se muestra un Toast de éxito.</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default ComprarEntradas;