import { useState } from 'react';
import './App.css';

function App() {
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title: courseName.trim(), // Cambiado a 'title' para JSONPlaceholder
      body: description.trim(), // Cambiado a 'body' para JSONPlaceholder
      userId: 1, // Agregado un userId como parte de la API
    };

    // Verificación de campos vacíos
    if (!data.title || !data.body) {
      alert('Por favor, verifica que todos los campos estén llenos correctamente.');
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al enviar los datos: ${errorMessage}`);
      }

      alert('Datos guardados con éxito');
      // Aquí podrías agregar lógica para limpiar los campos o hacer algo más
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error Detallado:', errorMessage);
      alert(`Hubo un problema al guardar los datos: ${errorMessage}`);
    }
  };

  const handleClear = () => {
    setCourseName('');
    setCredits('');
    setDescription('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre curso:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </label>
        <label>
          Créditos:
          <input
            type="text"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <div className="buttons">
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
