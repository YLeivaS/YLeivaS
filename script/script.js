// Alternar entre modo claro y oscuro
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('modeToggle');
  toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  });

  // Detectar la tecla Enter en los campos de entrada
  document.getElementById('function').addEventListener('keypress', handleKeyPress);
  document.getElementById('timeStart').addEventListener('keypress', handleKeyPress);
  document.getElementById('timeEnd').addEventListener('keypress', handleKeyPress);
});

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    calculateEnergy();
  }
}

function calculateEnergy() {
  const func = document.getElementById('function').value;
  const tStart = parseFloat(document.getElementById('timeStart').value);
  const tEnd = parseFloat(document.getElementById('timeEnd').value);
  const resultDiv = document.getElementById('result');

  if (isNaN(tStart) || isNaN(tEnd) || !func) {
      resultDiv.textContent = "Por favor, completa todos los campos correctamente.";
      return;
  }

  try {
      // Reemplazar `^` por `math.pow()` en la función
      const normalizedFunc = func.replace(/\^/g, 'math.pow');

      // Crear una función evaluable usando `math.compile` para mayor control
      const energyFunc = math.compile(normalizedFunc);

      // Calcular la integral definida manualmente usando sumas de Riemann
      const numSteps = 1000; // Número de pasos para la aproximación
      const stepSize = (tEnd - tStart) / numSteps;
      let energy = 0;

      for (let i = 0; i < numSteps; i++) {
          const currentT = tStart + i * stepSize;
          energy += energyFunc.evaluate({ t: currentT }) * stepSize;
      }

      // Mostrar el resultado
      resultDiv.textContent = `El consumo de energía es: ${energy.toFixed(2)} watts-hora.`;
  } catch (error) {
      console.error("Error al procesar la función:", error);
      resultDiv.textContent = "Ocurrió un error al procesar la función. Verifica que sea válida.";
  }
}
