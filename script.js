const svg = document.getElementById('coordinate-plane');

// Create grid lines and labels
for (let i = 0; i <= 30; i++) {
  const lineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  lineX.setAttribute('x1', i * 20 + 10);
  lineX.setAttribute('y1', 10);
  lineX.setAttribute('x2', i * 20 + 10);
  lineX.setAttribute('y2', 610);
  lineX.style.stroke = '#ccc';
  lineX.style.strokeWidth = '1';
  svg.appendChild(lineX);

  const lineY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  lineY.setAttribute('x1', 10);
  lineY.setAttribute('y1', i * 20 + 10);
  lineY.setAttribute('x2', 610);
  lineY.setAttribute('y2', i * 20 + 10);
  lineY.style.stroke = '#ccc';
  lineY.style.strokeWidth = '1';
  svg.appendChild(lineY);

  // Adding numbers to the grid
  if (i !== 15) {
    const textX = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textX.setAttribute('x', i * 20 + 5);
    textX.setAttribute('y', 310);
    textX.textContent = i - 15;
    textX.style.fontSize = '10px';
    svg.appendChild(textX);

    const textY = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textY.setAttribute('x', 300 + 5);
    textY.setAttribute('y', (30 - i) * 20 + 12);
    textY.textContent = i - 15;
    textY.style.fontSize = '10px';
    svg.appendChild(textY);
  }
}

// Adding axis labels
const labelX = document.createElementNS('http://www.w3.org/2000/svg', 'text');
labelX.setAttribute('x', 625);
labelX.setAttribute('y', 300);
labelX.textContent = 'X';
svg.appendChild(labelX);

const labelY = document.createElementNS('http://www.w3.org/2000/svg', 'text');
labelY.setAttribute('x', 320);
labelY.setAttribute('y', 15);
labelY.textContent = 'Y';
svg.appendChild(labelY);

// Create draggable point
const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
point.setAttribute('cx', 310);
point.setAttribute('cy', 310);
point.setAttribute('r', 10);
point.style.fill = 'red';
svg.appendChild(point);

point.addEventListener('mousedown', startDrag);
svg.addEventListener('mousemove', drag);
svg.addEventListener('mouseup', endDrag);
svg.addEventListener('mouseleave', endDrag);

let offsetX, offsetY, isDragging = false;

function startDrag(e) {
  isDragging = true;
  offsetX = e.clientX - parseFloat(point.getAttribute('cx'));
  offsetY = e.clientY - parseFloat(point.getAttribute('cy'));
}

function drag(e) {
  if (!isDragging) return;
  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Snap to grid: round x and y to nearest multiple of 20 (grid spacing)
  x = Math.round((x - 10) / 20) * 20 + 10;
  y = Math.round((y - 10) / 20) * 20 + 10;

  point.setAttribute('cx', x);
  point.setAttribute('cy', y);

  // Update displayed x and y values
  const xValue = (x - 310) / 20;
  const yValue = (310 - y) / 20;
  document.getElementById('x-value').textContent = xValue;
  document.getElementById('y-value').textContent = yValue;
  document.getElementById('coordinate-pair').textContent = `(${xValue}, ${yValue})`;
}

function endDrag() {
  isDragging = false;
}
