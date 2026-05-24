import { useReducer } from 'react';
import { crearBien } from '../api/bienesApi';

const estadoInicial = {
  codigo: '', descripcion: '', dependenciaId: '',
  fechaIngreso: '', valorAdquisicion: '',
  cargando: false, error: null, exito: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'CAMPO':
      return { ...state, [action.campo]: action.valor };
    case 'ENVIANDO':
      return { ...state, cargando: true, error: null, exito: false };
    case 'EXITO':
      return { ...estadoInicial, exito: true };
    case 'ERROR':
      return { ...state, cargando: false, error: action.mensaje };
    default:
      return state;
  }
}

const NuevoBien = () => {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  const handleChange = e =>
    dispatch({ type: 'CAMPO', campo: e.target.name, valor: e.target.value });

  const handleSubmit = async () => {
    dispatch({ type: 'ENVIANDO' });
    try {
      await crearBien({
        codigo:           state.codigo,
        descripcion:      state.descripcion,
        dependenciaId:    state.dependenciaId,
        fechaIngreso:     state.fechaIngreso,
        valorAdquisicion: state.valorAdquisicion,
      });
      dispatch({ type: 'EXITO' });
    } catch (err) {
      dispatch({ type: 'ERROR', mensaje: err.message || 'Error al registrar' });
    }
  };

  return (
    <div>
      {state.exito && <p className='alerta-exito'>Bien registrado.</p>}
      {state.error && <p className='alerta-error'>{state.error}</p>}
      <input name='codigo' value={state.codigo} onChange={handleChange}
             placeholder='Código del bien (ej: ALQ-2024-0042)' />
      <input name='descripcion' value={state.descripcion} onChange={handleChange}
             placeholder='Descripción' />
      <input name='fechaIngreso' type='date' value={state.fechaIngreso}
             onChange={handleChange} />
      <input name='valorAdquisicion' value={state.valorAdquisicion}
             onChange={handleChange} placeholder='Valor de adquisición' />
      <button onClick={handleSubmit} disabled={state.cargando}>
        {state.cargando ? 'Registrando...' : 'Registrar bien'}
      </button>
    </div>
  );
};

export default NuevoBien;