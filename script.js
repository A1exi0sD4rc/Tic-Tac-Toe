let fields = [
    'circle',
    null,
    null,
    null,
    null,
    'cross',
    null,
    null,
    null
];


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
                content = 'o';
            } else if (fields[index] === 'cross') {
                content = 'x';
            }
            html += `<td>${content}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    container.innerHTML = html;
}