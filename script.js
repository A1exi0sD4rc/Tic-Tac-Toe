let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'circle'; // Der Spieler, der anfängt (alternativ 'cross')


function init() {
    render();
}


function render() {
    const container = document.getElementById('container');
    let html = '<table>';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let content = '';
            if (fields[index] === 'circle') {
                content = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                content = generateCrossSVG();
            }
            html += `<td onclick="fillFields(this, ${index})">${content}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    container.innerHTML = html;
}


function generateCircleSVG() {
    let color = '#00B0EF';
    let height = 70;
    let width = 70;
    let svgHtmlCircle = `
        <svg width="${width}" height="${height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${width / 2}" cy="${height / 2}" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0, 188.4" to="188.4, 0" dur="0.25s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgHtmlCircle;
}


function generateCrossSVG() {
    let color = '#FFC000';
    let height = 70;
    let width = 70;    
    let svgHtmlCross = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="${width - 10}" y2="${height - 10}" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0, ${width}" to="${width}, 0" dur="300ms" fill="freeze" />
            </line>
            <line x1="${width - 10}" y1="10" x2="10" y2="${height - 10}" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0, ${width}" to="${width}, 0" dur="300ms" fill="freeze" />
            </line>
        </svg>
    `;

    return svgHtmlCross;
}


function fillFields(cell, index) {
    // Prüfen, ob das Feld bereits belegt ist
    if (fields[index] !== null) {
        return; // Falls das Feld belegt ist, nichts tun
    }
      
    // Das Feld mit dem aktuellen Spieler belegen
    fields[index] = currentPlayer;

    // Im Feld wird entweder ein Kreis oder Kreuz eingesetzt, je nachdem welcher currentPlayer dran ist
    cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG(); 

    // Überprüfen, ob jemand gewonnen hat
    if (checkWinner()) {

    }

    // Spieler wechseln
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}


function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale von links oben nach rechts unten
        [2, 4, 6]  // Diagonale von rechts oben nach links unten
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(a, c);
            return true;
        }
    }

    return false;
}

function drawWinningLine(startIndex, endIndex) {
    const cellSize = 100; // Größe der Zelle
    const padding = cellSize / 2; // Padding für das Zentrum der Zelle
    const extension = 15; // Verlängerung um 15 Pixel

    const startCoords = getLineCoords(startIndex, cellSize);
    const endCoords = getLineCoords(endIndex, cellSize);

    const startX = startCoords.x + padding;
    const startY = startCoords.y + padding;
    const endX = endCoords.x + padding;
    const endY = endCoords.y + padding;

    // Richtung und Länge der Linie berechnen
    const dx = endX - startX;
    const dy = endY - startY;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Neue Endpunkte berechnen
    const newEndX = endX + (dx / length) * extension;
    const newEndY = endY + (dy / length) * extension;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", newEndX);
    line.setAttribute("y2", newEndY);
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "5");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "300");
    svg.setAttribute("height", "300");
    svg.setAttribute("style", "position: absolute; top: 0; left: 0; pointer-events: none;");
    svg.appendChild(line);

    document.getElementById('container').appendChild(svg);
}

function getLineCoords(index, cellSize) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const padding = cellSize / 2; // Padding für das Zentrum der Zelle
    const x = col * cellSize;
    const y = row * cellSize;

    return { x, y };
}