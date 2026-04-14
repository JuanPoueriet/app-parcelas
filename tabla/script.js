// Global state
let currentData = JSON.parse(JSON.stringify(DATA));
let columnVisibility = [true, true, true, true, true, true, true, true, true];
let hoverEnabled = true;
let paginatorEnabled = false;
let pageSize = 15;
let pageIndex = 0;

// Configuration for filter menu
let activeFilterColumn = null;
let currentSortOrder = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    initSettings();
});

function renderTable() {
    const tableHead = document.getElementById('tableHead');
    const tableBody = document.getElementById('tableBody');

    // Filter visible data
    const visibleData = currentData.filter(g => !g.filtered);
    let displayData = visibleData;

    if (paginatorEnabled) {
        const start = pageIndex * pageSize;
        displayData = visibleData.slice(start, start + pageSize);
    }

    // Render Head
    let headHtml = '';
    const columnNames = [
        { name: 'Grupo', type: 'group' },
        { name: 'Provincia', type: 'province' },
        { name: 'Municipio', type: 'municipality' },
        { name: 'Cantidad de parcelas por municipio', type: null },
        { name: 'Metros cuadrados por municipio', type: null },
        { name: 'Cantidad de municipios', type: null },
        { name: 'Cantidad de parcelas por provincia', type: null },
        { name: 'Metros cuadrados', type: null },
        { name: 'Tareas', type: null }
    ];

    columnNames.forEach((col, index) => {
        if (columnVisibility[index]) {
            headHtml += `
                <div class="centered-content" style="width: var(--column-${index}-width)">
                    <div class="column-${index}">
                        <div>${col.name}</div>
                        ${col.type ? `<button class="menu-toggle-button" onclick="openFilterMenu(event, '${col.type}', ${index})">
                            <svg class="menu-icon ${isFiltered(col.type) ? 'filtered' : ''}" viewBox="0 0 16.86 9.43">
                                <path d="m9.14,9.14l7.43-7.43c.63-.63.18-1.71-.71-1.71H1C.11,0-.34,1.08.3,1.71l7.43,7.43c.39.39,1.02.39,1.42,0Z" />
                            </svg>
                        </button>` : ''}
                    </div>
                </div>`;
        }
    });
    tableHead.innerHTML = headHtml;

    // Render Body
    let bodyHtml = '<div>';
    displayData.forEach((group, gIdx) => {
        bodyHtml += `
            <div class="grupo" id="group-${group.id}" onmouseover="handleHover('${group.id}', true)" onmouseleave="handleHover('${group.id}', false)" ondblclick="toggleItemFilterByParams(event, 'group', '${group.id}')">
                ${columnVisibility[0] ? `<div class="centered-content" style="width: var(--column-0-width)"><div class="column-0">${group.name}</div></div>` : ''}
                <div class="provincias">`;

        group.provinces.forEach((province, pIdx) => {
            if (province.filtered) return;

            bodyHtml += `
                <div class="provincia" id="province-${province.id}" onmouseover="handleHover('${province.id}', true)" onmouseleave="handleHover('${province.id}', false)" ondblclick="toggleItemFilterByParams(event, 'province', '${province.id}')">
                    ${columnVisibility[1] ? `<div class="centered-content" style="width: var(--column-1-width)"><div class="column-1">${province.name}</div></div>` : ''}
                    <div class="municipios">`;

            province.municipalities.forEach((muni, mIdx) => {
                if (muni.filtered) return;

                bodyHtml += `
                    <div class="municipio" id="muni-${muni.id}" onmouseover="handleHover('${muni.id}', true)" onmouseleave="handleHover('${muni.id}', false)" ondblclick="toggleItemFilterByParams(event, 'municipality', '${muni.id}')">
                        ${columnVisibility[2] ? `<div class="centered-content" style="width: var(--column-2-width)"><div class="column-2">${muni.name}</div></div>` : ''}
                        ${columnVisibility[3] ? `<div class="centered-content" style="width: var(--column-3-width)"><div class="column-3">${formatNumber(muni.quantity_of_parcels_per_municipality)}</div></div>` : ''}
                        ${columnVisibility[4] ? `<div class="centered-content" style="width: var(--column-4-width)"><div class="column-4">${formatNumber(muni.square_meters_per_municipality, 2)}</div></div>` : ''}
                    </div>`;
            });

            bodyHtml += `</div>
                ${columnVisibility[5] ? `<div class="centered-content" style="width: var(--column-5-width)"><div class="column-5">${formatNumber(getTotal(province.municipalities, 'cant'))}</div></div>` : ''}
                ${columnVisibility[6] ? `<div class="centered-content" style="width: var(--column-6-width)"><div class="column-6">${formatNumber(getTotal(province.municipalities, 'quantity_of_parcels_per_municipality'))}</div></div>` : ''}
                ${columnVisibility[7] ? `<div class="centered-content" style="width: var(--column-7-width)"><div class="column-7">${formatNumber(getTotal(province.municipalities, 'square_meters_per_municipality'), 2)}</div></div>` : ''}
                ${columnVisibility[8] ? `<div class="centered-content" style="width: var(--column-8-width)"><div class="column-8">${formatNumber(getTotal(province.municipalities, 'square_meters_per_municipality') / 628.86, 2)}</div></div>` : ''}
            </div>`;
        });

        bodyHtml += `</div></div>`;
    });

    // Pagination Controls if enabled
    if (paginatorEnabled) {
        const totalPages = Math.ceil(visibleData.length / pageSize);
        bodyHtml += `
            <div class="pagination-controls">
                <button onclick="changePage(-1)" ${pageIndex === 0 ? 'disabled' : ''}>Anterior</button>
                <span>Página ${pageIndex + 1} de ${totalPages || 1}</span>
                <button onclick="changePage(1)" ${pageIndex >= totalPages - 1 ? 'disabled' : ''}>Siguiente</button>
                <select onchange="changePageSize(this.value)">
                    <option value="5" ${pageSize === 5 ? 'selected' : ''}>5</option>
                    <option value="10" ${pageSize === 10 ? 'selected' : ''}>10</option>
                    <option value="15" ${pageSize === 15 ? 'selected' : ''}>15</option>
                    <option value="25" ${pageSize === 25 ? 'selected' : ''}>25</option>
                </select>
            </div>`;
    }

    // Total Row
    bodyHtml += `
        <div class="total">
            <div style="flex-grow: 1"></div>
            ${(columnVisibility[5] || columnVisibility[6] || columnVisibility[7] || columnVisibility[8]) ? '<div class="column-4">Total:</div>' : ''}
            ${columnVisibility[5] ? `<div class="centered-content" style="width: var(--column-5-width)"><div class="column-5">${formatNumber(calculateMunicipalityMetrics('municipalityCount'))}</div></div>` : ''}
            ${columnVisibility[6] ? `<div class="centered-content" style="width: var(--column-6-width)"><div class="column-6">${formatNumber(calculateMunicipalityMetrics('totalParcelsPerMunicipality'))}</div></div>` : ''}
            ${columnVisibility[7] ? `<div class="centered-content" style="width: var(--column-7-width)"><div class="column-7">${formatNumber(calculateMunicipalityMetrics('totalSquareMetersPerMunicipality'), 2)}</div></div>` : ''}
            ${columnVisibility[8] ? `<div class="centered-content" style="width: var(--column-8-width)"><div class="column-8">${formatNumber(calculateMunicipalityMetrics('totalSquareMetersPerMunicipality') / 628.86, 2)}</div></div>` : ''}
        </div>`;

    bodyHtml += '</div>';
    tableBody.innerHTML = bodyHtml;
}

// Utility Functions
function formatNumber(num, decimals = 0) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

function getTotal(items, value) {
    return items.reduce((sum, item) => {
        if (!item.filtered) {
            if (value === 'cant') return sum + 1;
            return sum + (item[value] || 0);
        }
        return sum;
    }, 0);
}

function calculateMunicipalityMetrics(type) {
    let total = 0;
    currentData.forEach(group => {
        if (!group.filtered) {
            group.provinces.forEach(province => {
                if (!province.filtered) {
                    province.municipalities.forEach(muni => {
                        if (!muni.filtered) {
                            if (type === 'municipalityCount') total++;
                            else if (type === 'totalParcelsPerMunicipality') total += muni.quantity_of_parcels_per_municipality;
                            else if (type === 'totalSquareMetersPerMunicipality') total += muni.square_meters_per_municipality;
                        }
                    });
                }
            });
        }
    });
    return total;
}

// Settings logic
function initSettings() {
    document.getElementById('toggleHover').checked = hoverEnabled;
    document.getElementById('togglePaginator').checked = paginatorEnabled;
}

function toggleSettings() {
    const menu = document.getElementById('settingsMenu');
    menu.classList.toggle('hidden');
    document.getElementById('overlay').classList.toggle('hidden');
}

function updateSettings() {
    hoverEnabled = document.getElementById('toggleHover').checked;
    paginatorEnabled = document.getElementById('togglePaginator').checked;
    pageIndex = 0; // Reset to first page
    renderTable();
}

function changePage(delta) {
    pageIndex += delta;
    renderTable();
}

function changePageSize(size) {
    pageSize = parseInt(size);
    pageIndex = 0;
    renderTable();
}

function toggleColumn(index) {
    columnVisibility[index] = !columnVisibility[index];
    renderTable();
}

// Filtering logic
function openFilterMenu(event, type, colIndex) {
    event.stopPropagation();
    activeFilterColumn = { type, index: colIndex };
    const menu = document.getElementById('filterMenu');
    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();

    menu.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    menu.style.left = rect.left + 'px';
    menu.classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');

    renderFilterElements();
}

function renderFilterElements() {
    const container = document.getElementById('filterElementsContainer');
    const elements = getFilteredElements(activeFilterColumn.type);
    const searchVal = document.getElementById('filterSearchInput').value.toLowerCase();

    let html = '';
    elements.forEach(el => {
        if (!el.visible) return;
        if (searchVal && !el.name.toLowerCase().includes(searchVal)) return;

        html += `
            <div class="element-container">
                <label class="custom-checkbox">
                    <input type="checkbox" ${!el.filtered ? 'checked' : ''} onchange="toggleItemFilter('${el.id}')">
                    <span class="checkmark"></span>
                    ${el.name}
                </label>
            </div>`;
    });
    container.innerHTML = html;

    // Update Select All checkbox state
    const allFiltered = areAllElementsFiltered(activeFilterColumn.type);
    const selectAll = document.getElementById('selectAllCheckbox');
    selectAll.checked = allFiltered;
    // Indeterminate state logic could be added here
}

function getFilteredElements(type) {
    let elements = [];
    currentData.forEach(group => {
        if (type === 'group') elements.push(group);
        group.provinces.forEach(province => {
            if (type === 'province') elements.push(province);
            province.municipalities.forEach(muni => {
                if (type === 'municipality') elements.push(muni);
            });
        });
    });
    return elements;
}

function toggleItemFilterByParams(event, type, id) {
    if (event) event.stopPropagation();

    currentData.forEach(group => {
        if (type === 'group' && group.id === id) {
            group.filtered = !group.filtered;
            group.provinces.forEach(p => {
                p.filtered = group.filtered;
                p.municipalities.forEach(m => m.filtered = group.filtered);
            });
        }
        group.provinces.forEach(province => {
            if (type === 'province' && province.id === id) {
                province.filtered = !province.filtered;
                province.municipalities.forEach(m => m.filtered = province.filtered);
                updateGroupState(group);
            }
            province.municipalities.forEach(muni => {
                if (type === 'municipality' && muni.id === id) {
                    muni.filtered = !muni.filtered;
                    updateProvinceState(province);
                    updateGroupState(group);
                }
            });
        });
    });
    if (activeFilterColumn) renderFilterElements();
    renderTable();
}

function toggleItemFilter(id) {
    const type = activeFilterColumn.type;
    currentData.forEach(group => {
        if (type === 'group' && group.id === id) {
            group.filtered = !group.filtered;
            group.provinces.forEach(p => {
                p.filtered = group.filtered;
                p.municipalities.forEach(m => m.filtered = group.filtered);
            });
        }
        group.provinces.forEach(province => {
            if (type === 'province' && province.id === id) {
                province.filtered = !province.filtered;
                province.municipalities.forEach(m => m.filtered = province.filtered);
                updateGroupState(group);
            }
            province.municipalities.forEach(muni => {
                if (type === 'municipality' && muni.id === id) {
                    muni.filtered = !muni.filtered;
                    updateProvinceState(province);
                    updateGroupState(group);
                }
            });
        });
    });
    renderFilterElements();
    renderTable();
}

function updateProvinceState(province) {
    province.filtered = province.municipalities.every(m => m.filtered);
}

function updateGroupState(group) {
    group.filtered = group.provinces.every(p => p.filtered);
}

function areAllElementsFiltered(type) {
    const elements = getFilteredElements(type);
    return elements.every(el => !el.filtered);
}

function toggleSelectAll(checked) {
    const type = activeFilterColumn.type;
    const elements = getFilteredElements(type);
    elements.forEach(el => {
        if (el.visible) {
            el.filtered = !checked;
            // Also need to update children/parents
            if (type === 'group') {
                el.provinces.forEach(p => {
                    p.filtered = !checked;
                    p.municipalities.forEach(m => m.filtered = !checked);
                });
            } else if (type === 'province') {
                el.municipalities.forEach(m => m.filtered = !checked);
            }
        }
    });
    // Final pass to sync parents if needed
    if (type === 'municipality' || type === 'province') {
        currentData.forEach(g => {
            g.provinces.forEach(p => updateProvinceState(p));
            updateGroupState(g);
        });
    }

    renderFilterElements();
    renderTable();
}

function applySearchFilter() {
    renderFilterElements();
}

function resetColumnFilters() {
    toggleSelectAll(true);
}

function isFiltered(type) {
    const elements = getFilteredElements(type);
    return elements.some(el => el.filtered);
}

// Sorting logic
function sortData(order) {
    const type = activeFilterColumn.type;
    if (type === 'group') {
        currentData.sort((a, b) => compare(a.name, b.name, order));
    } else if (type === 'province') {
        currentData.forEach(g => g.provinces.sort((a, b) => compare(a.name, b.name, order)));
    } else if (type === 'municipality') {
        currentData.forEach(g => g.provinces.forEach(p => p.municipalities.sort((a, b) => compare(a.name, b.name, order))));
    }
    renderTable();
    renderFilterElements();
}

function compare(a, b, order) {
    if (order === 'asc') return a.localeCompare(b);
    return b.localeCompare(a);
}

// Interaction
function handleHover(id, isEntering) {
    if (!hoverEnabled) return;
    const elements = document.querySelectorAll(`[id$="${id}"]`);
    elements.forEach(el => {
        if (isEntering) el.classList.add('hovered');
        else el.classList.remove('hovered');
    });
}

function closeAllMenus() {
    document.getElementById('settingsMenu').classList.add('hidden');
    document.getElementById('filterMenu').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
    activeFilterColumn = null;
    document.getElementById('filterSearchInput').value = '';
}

// Export and Print
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Grupo,Provincia,Municipio,Cant. parcelas por municipio,Metros cuadrados por municipio\r\n";

    currentData.forEach(group => {
        if (group.filtered) return;
        group.provinces.forEach(province => {
            if (province.filtered) return;
            province.municipalities.forEach(muni => {
                if (muni.filtered) return;
                csvContent += `${group.name},${province.name},${muni.name},${muni.quantity_of_parcels_per_municipality},${muni.square_meters_per_municipality}\r\n`;
            });
        });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tabla_resumen.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printTable() {
    const printContent = document.getElementById('tableContainer').innerHTML;
    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);

    printFrame.contentDocument.write(`
        <html>
            <head>
                <title>Imprimir Tabla</title>
                <link rel="stylesheet" href="style.css">
                <style>
                    body { background-color: white; color: black; padding: 0; }
                    .table-summary { border: 1px solid black; }
                    .table-summary-head, .grupo, .provincia, .municipio { border-bottom: 1px solid black; color: black !important; }
                    .table-summary-head .div { color: black !important; }
                    .sdkfjaslf, .menu-toggle-button, .safasgld { display: none !important; }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
        </html>
    `);
    printFrame.contentDocument.close();

    printFrame.onload = () => {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
        setTimeout(() => document.body.removeChild(printFrame), 1000);
    };
}
