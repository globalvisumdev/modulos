const tableHTML = `
<div class="tr_table" id="table__responsive">
        <section class="tr_table__header">
            <div class="tr_header_top">
                <span id="tr_goBack_btn"><img src="" alt=""></span>
                <h1 class="tr_title_table"></h1>
                <div class="tr_export__file" onclick="openExportFile(this)">
                    <label class="tr_export__file-btn" title="Export File"></label>
                    <input type="checkbox" id="tr_export-file">
                    <div class="tr_export__file-options">
                        <label>Exportar A</label>
                        <label id="tr_toPDF">PDF <img src="" alt=""></label>
                        <label id="tr_toJSON">JSON <img src="" alt=""></label>
                        <label id="tr_toCSV">CSV <img src="" alt=""></label>
                        <label id="tr_toEXCEL">EXCEL <img src="" alt=""></label>
                    </div>
                </div>
            </div>
            <div class="tr_header_bottom">
                <div class="tr_input-group">
                    <input type="search" placeholder="Buscar...">
                    <img class="searchImg" src="" alt="">
                </div>
                <div class="tr_date-group">
                    <input type="datetime-local" id="fechaDesde" placeholder="Fecha Desde">
                    <input type="datetime-local" id="fechaHasta" placeholder="Fecha Hasta">
                    <img class="searchImg searchDate" src="" alt="">
                    <div class="limpiarFiltroFecha"></div>
                </div>
                <div class="tr_select-group">
                    <select name="tr_searchColumn" id="tr_searchColumn"></select>
                </div>
            </div>
        </section>
        <section class="tr_table__body">
            <table>
                <thead>
                </thead>
                <tbody>
                </tbody>
            </table>
        </section>
        <section class="tr_table_bottom">
            <div class="tr_pagination" id="tr_pagination">
                <ul></ul>
            </div>
        </section>
    </div>
`;
const keyColor = {
    red: "tr_red",
    green: "tr_green",
    yellow: "tr_yellow",
    lightBlue: "tr_lightBlue",
}



var variablesTable = {};
// var tr_bodyFetch = "";
// var tr_search,
//     tr_table_rows,
//     tr_table_headings,
//     tr_table_filter_column_number = 0,
//     paginationElement,
//     pagination_page = 1,
//     rowVisible,
//     totalPages,
//     tr_pdf_btn,
//     table__responsive,
//     tr_json_btn,
//     tr_excel_btn,
//     tr_csv_btn;


// 1. Buscar datos en la tabla
function tr_searchTable(idTable, searchValue, columnNumber, filterName = "",coincidenciaExacta = false) {
    let search_data = searchValue.toLowerCase();

    if (filterName == "filterDate") {
        let fechaDesde = document.querySelector(`#${idTable} #fechaDesde`).value
        let fechaHasta = document.querySelector(`#${idTable} #fechaHasta`).value

        if (fechaDesde != "" && fechaHasta != "") {


            variablesTable[idTable].tr_table_rows.forEach((row, i) => {
                let table_data_x_columna = [...row.querySelectorAll("td")].map(data => data.innerHTML.toLowerCase())
                let table_data = table_data_x_columna[columnNumber];

                table_data = table_data.slice(3, 5) + "/" + table_data.slice(0, 2) + "/" + table_data.slice(6)

                if (
                    new Date(table_data).getTime() >= new Date(fechaDesde).getTime() &&
                    new Date(table_data).getTime() <= new Date(fechaHasta).getTime()
                ) row.classList.remove("tr_hide")
                else row.classList.add("tr_hide")

                row.style.setProperty("--delay", (i < 25 ? i / 25 : 1 ) + "s")

            });
        }

        return
    }
    if (search_data != "") {

        let cantRegistrosCoinciden = 0;

        variablesTable[idTable].tr_table_rows.forEach((row, i) => {
            let table_data_all = row.textContent.toLowerCase();
            // let table_data_x_columna = [...row.querySelectorAll("td")].map(data => data.innerHTML.toLowerCase())

            let table_data_x_columna = [];
            row.querySelectorAll("td").forEach((td,index) =>{
                let data;
                if(td.querySelector("p") != null) data = td.querySelector("p")
                else data = td
                table_data_x_columna.push(data.innerHTML.toLowerCase())
            })

            let table_data;

            columnNumber != 0 ?
                table_data = table_data_x_columna[columnNumber] :
                table_data = table_data_all;

            // busca alguna coincidencia con el texto que haya dentro de la cada dato

            // aca se guarda un booleano para saber si el texto coincide o no
            // se pone en negativo porque el metodo toggle si recibe un False quita la clase, en este caso quita el hide

            let coincideTexto = coincidenciaExacta ?  !table_data.startsWith(search_data) : table_data.indexOf(search_data) < 0
            if (!coincideTexto) {
                cantRegistrosCoinciden++
            } 
            row.classList.toggle("tr_hide", coincideTexto);
            row.style.setProperty("--delay", (cantRegistrosCoinciden < 25 ? cantRegistrosCoinciden / 25 : 1 ) + "s")

   
       

        });

        document.querySelectorAll(`#${idTable} #table__responsive tbody tr:not(.tr_hide)`).forEach((visible_row, i) => {
            visible_row.style.backgroundColor = (i % 2 == 0) ? "transparent" : "#000000b";
        });
    } else {

        let primerElementoVisible = (variablesTable[idTable].pagination_page - 1) * variablesTable[idTable].rowVisible;
        let ultimoElementoVisible = primerElementoVisible + variablesTable[idTable].rowVisible - 1;

        variablesTable[idTable].tr_table_rows.forEach((row, index) => {
            if (index < primerElementoVisible || index > ultimoElementoVisible) {
                row.classList.add("tr_hide")
            } else {
                row.classList.remove("tr_hide")
                row.style.setProperty("--delay", (index < 25 ? index / 25 : 1 ) + "s")
            }
        });
    }

}


// 2. Ordenar la tabla por columna

const start_sort_table = (idTable) => {
    variablesTable[idTable].tr_table_headings.forEach((head, i) => {
        let sort_asc = true;
        head.onclick = () => {
            // elimino la propiedad active de todos los th
            variablesTable[idTable].tr_table_headings.forEach(head => {
                head.classList.remove("active")
            });
            // le asigno el active al th seleccionado
            head.classList.add("active")

            // elimino la propiedad active de todos los td
            document.querySelectorAll(`#${idTable} td`).forEach(td => td.classList.remove("active"))

            // accedo las filas de la columna seleccionada
            variablesTable[idTable].tr_table_rows.forEach(row => {
                row.querySelectorAll(`#${idTable} td`)[i].classList.add("active")
            })

            head.classList.toggle("asc", sort_asc)
            sort_asc = head.classList.contains("asc") ? false : true;

            tr_sortTable(idTable, i, sort_asc);
        }
    });
}

function tr_sortTable(idTable, column, sort_asc) {
    [...variablesTable[idTable].tr_table_rows].sort((a, b) => {
        // accedo a los td de la columna seleccionada
        let first_row = a.querySelectorAll(`#${idTable} td`)[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll(`#${idTable} td`)[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    }).map(sorted_row => document.querySelector(`#${idTable} #table__responsive tbody`).appendChild(sorted_row))
}

// 3. Convertir a PDF

const tr_toPDF = (table) => {
    const html_code = `
        <link rel="stylesheet" href="style.css">
        <div id="table__responsive" class="table">${table.innerHTML}</div>
    `;
    // creo una nueva ventana en el navegador
    // const new_window = window.open('url','target', 'width=500, height=600, top=0')
    // const new_window = window.open('','', 'width=500, height=600, top=0')
    const new_window = window.open()
    // a la nueva ventana le agrego el html
    new_window.document.write(html_code)

    // se le agrega un tiempo para que de tiempo a cargar el css
    setTimeout(() => {
        new_window.print();
        new_window.close();
    }, 300);
}



// 4. Convertir a JSON


const tr_toJSON = (table) => {
    let table_data = [],
        t_head = [],
        t_headings = table.querySelectorAll("th"),
        t_rows = table.querySelectorAll("tbody tr");

    for (let t_heading of t_headings) {
        // sacar los espacios del principio y final del texto
        let actual_head = t_heading.textContent.trim();
        t_head.push(actual_head.slice(0, actual_head.length - 1).trim().toLowerCase())
    }

    t_rows.forEach(row => {
        const row_object = {},
            t_cells = row.querySelectorAll("td");

        t_cells.forEach((t_cell, cell_index) => {
            let img = t_cell.querySelector("img");
            if (img) {
                row_object["customer image"] = decodeURIComponent(img.src);
            }
            row_object[t_head[cell_index]] = t_cell.textContent.trim();
        })

        table_data.push(row_object)
    })

    // el 4 significa la cantidad de espacios con lo que se muestra el json
    return JSON.stringify(table_data, null, 4)
}




// 5. Convertir a EXCEL


// \t sirve para hacer un tab
// \n sirve para hacer un enter

const tr_toEXCEL = (table) => {
    // codigo para una tabla simple
    // const t_rows = table.querySelectorAll("tr");
    // return [...t_rows].map(row => {
    //     const cells = row.querySelectorAll("th, td");
    //     return [...cells].map(cell => cell.textContent.trim()).join("\t")
    // }).join("\n")

    const t_heads = table.querySelectorAll("th"),
        tbody_rows = table.querySelectorAll("tbody tr");

    //   para quitar las flechas a las cabeceras
    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim();
        return actual_head.slice(0, actual_head.length - 1).trim().toLowerCase()
    }).join("\t");

    let table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll("td");

        data_without_img = [...cells].map(cell => cell.textContent.trim()).join("\t")

        if (row.querySelector("img") != null) {
            img = decodeURIComponent(row.querySelector("img").src);
            headings += "\t" + "image name";
            return data_without_img + "\t" + img;
        }

        return data_without_img;

    }).join("\n")


    return headings + "\n" + table_data
}



// 6. Convertir a CSV


// \t sirve para hacer un tab
// \n sirve para hacer un enter

const tr_toCSV = (table) => {
    // codigo para una tabla simple
    // const t_rows = table.querySelectorAll("tr");
    // return [...t_rows].map(row => {
    //     const cells = row.querySelectorAll("th, td");
    //     return [...cells].map(cell => cell.textContent.trim()).join(",")
    // }).join("\n")

    const t_heads = table.querySelectorAll("th"),
        tbody_rows = table.querySelectorAll("tbody tr");

    //   para quitar las flechas a las cabeceras
    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim();
        return actual_head.slice(0, actual_head.length - 1).trim().toLowerCase()
    }).join(",");

    let table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll("td");

        data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(",")

        if (row.querySelector("img") != null) {
            img = decodeURIComponent(row.querySelector("img").src);
            headings += "," + "image name";
            return data_without_img + "," + img;
        }

        return data_without_img;

    }).join("\n")


    return headings + "\n" + table_data
}





const downloadFile = (data, fileType, fileName = "") => {
    const a = document.createElement("a");
    a.download = fileName;

    // hay diferentes tipos de mimeTypes 
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const mime_types = {
        "json": "application/json",
        "csv": "text/csv",
        "excelDrive": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "excel": "application/vnd.ms-excel",
        "wordDrive": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "word": "application/msword",
    }

    a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;

    document.body.appendChild(a);
    a.click();
    a.remove();

}

function filterDate(idTable) {
    let columnNumber = document.querySelector(`#${idTable} #tr_searchColumn`).value
    tr_searchTable(idTable, "", columnNumber, "filterDate")
}

function limpiarFiltroFecha(idTable) {
    document.querySelector(`#${idTable} #fechaDesde`).value = "";
    document.querySelector(`#${idTable} #fechaHasta`).value = "";
    tr_searchTable(idTable, "", 0)
}


const tr_makeTableSections = (table__responsive, arrColumnData, arrJson, tableOptions) => {
    // COMIENZA A ARMAR EL HEAD DE LA TABLA
    let thead = table__responsive.querySelector("thead")
    let tr = document.createElement("tr");


    if (tableOptions.index) {
        let thIndex = document.createElement("th");
        thIndex.innerHTML = "#";
        tr.appendChild(thIndex)
    }

    arrColumnData.forEach(columnData => {
        let th = document.createElement("th");
        th.innerHTML = columnData.columnName;

        let span = document.createElement("span");
        span.classList.add("tr_icon-arrow")
        span.innerHTML = "&UpArrow;";

        th.appendChild(span);
        tr.appendChild(th);
    });

    thead.appendChild(tr);


    // COMIENZA A ARMAR EL BODY DE LA TABLA
    let tbody = table__responsive.querySelector("tbody")
    var docFragment = document.createDocumentFragment();
    arrJson.forEach((data, index) => {

        let tr = document.createElement("tr");
        if (tableOptions.onclickEvent) {
            tr.setAttribute("onclick", tableOptions.onclickEvent)
        }

        if (tableOptions.rowAttributes_jsonKey) {
            tableOptions.rowAttributes_jsonKey.forEach(rowAttribute => {
                tr.setAttribute(rowAttribute, data[rowAttribute])
            });
        }
        


        if (tableOptions.index) {
            let tdIndex = document.createElement("td");
            tdIndex.innerHTML = index + 1;
            tdIndex.classList.add("tr_td_bold");
            tr.appendChild(tdIndex)
        }

        arrColumnData.forEach(columnData => {

            let td = document.createElement("td");

            if (columnData.type == undefined || columnData.type.name == "normal") {
                td.innerHTML = data[columnData.jsonKey];
            } else if (columnData.type.name == "status") {
                let p = document.createElement("p");
                p.classList.add("tr_status")
                p.classList.add(keyColor[data[columnData.type.keyColor]])
                p.innerHTML = data[columnData.jsonKey];

                td.appendChild(p)
            } else if (columnData.bold) {
                td.classList.add("tr_td_bold");
            }

            tr.appendChild(td)
        });

        docFragment.appendChild(tr)
    });

    tbody.appendChild(docFragment);
}

function tr_makeOptionSearchColumn(idTable, arrColumnData) {
    let tr_searchColumn = document.querySelector(`#${idTable} #tr_searchColumn`);

    let option = document.createElement("option");
    option.innerHTML = "Todas las columnas";
    option.value = 0;
    option.setAttribute("selected", "")
    tr_searchColumn.appendChild(option)


    arrColumnData.forEach((columnData, index) => {
        let option = document.createElement("option");
        option.innerHTML = columnData.columnName;
        option.value = index + 1;
        columnData.filter == undefined ? option.setAttribute("filter", "normal") : option.setAttribute("filter", columnData.filter);
        tr_searchColumn.appendChild(option)
    });
}

function tr_createPagination(idTable, totalPages, page) {
    let primerElementoVisible = (page - 1) * variablesTable[idTable].rowVisible;
    let ultimoElementoVisible = primerElementoVisible + variablesTable[idTable].rowVisible - 1;

    variablesTable[idTable].tr_table_rows.forEach((row, index) => {
        if (index < primerElementoVisible || index > ultimoElementoVisible) {
            row.classList.add("tr_hide")
        } else {
            row.classList.remove("tr_hide")
            row.style.setProperty("--delay", (index < 25 ? index / 25 : 1 ) + "s")
        }
    });


    let liTag = '';
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (page >= 2) { //show the next button if the page value is greater than 1
        liTag += `<li class="tr_pagination_btn prev" onclick="tr_createPagination('${idTable}',${totalPages}, ${page - 1})"><span><i class="fas fa-angle-left"></i> </span></li>`;
    }

    if (page >= 3) { //if page value is less than 2 then add 1 after the previous button
        liTag += `<li class="tr_pagination_first tr_pagination_numb" onclick="tr_createPagination('${idTable}',${totalPages}, 1)"><span>1</span></li>`;
        if (page >= 4) { //if page value is greater than 3 then add this (...) after the first li or page
            liTag += `<li class="tr_pagination_dots"><span>...</span></li>`;
        }
    }

    // how many pages or li show before the current li
    if (page == totalPages) {
        beforePage = beforePage - 2;
    } else if (page == totalPages - 1) {
        beforePage = beforePage - 1;
    }
    // how many pages or li show after the current li
    if (page == 1) {
        afterPage = afterPage + 2;
    } else if (page == 2) {
        afterPage = afterPage + 1;
    }

    if (beforePage <= 0) beforePage = 0
    if (totalPages == 3 && page == 3) beforePage = 2

    if (totalPages == 4) {
        if (page == 1) afterPage = 2
        if (page == 2) afterPage = 3
        if (page == 3 || page == 4) beforePage = 2
    }
    // if(totalPages == 4 && page == 1) afterPage = 2
    // if(totalPages == 4 && page == 2) afterPage = 3

    // if(totalPages == 4 && page == 3) beforePage = 2
    // if(totalPages == 4 && page == 4) beforePage = 2


    if (afterPage > totalPages) afterPage = totalPages
    if (totalPages == 3 && afterPage == 3 && page < 2) afterPage = totalPages - 1



    for (var plength = beforePage; plength <= afterPage; plength++) {
        if (plength > totalPages) { //if plength is greater than totalPage length then continue
            continue;
        }
        if (plength == 0) { //if plength is 0 than add +1 in plength value
            plength = plength + 1;
        }
        if (page == plength) { //if page is equal to plength than assign active string in the active variable
            active = "tr_pagination_active";
        } else { //else leave empty to the active variable
            active = "";
        }
        liTag += `<li class="tr_pagination_numb ${active}" onclick="tr_createPagination('${idTable}',${totalPages}, ${plength})"><span>${plength}</span></li>`;
    }

    if (page < totalPages - 1) { //if page value is less than totalPage value by -1 then show the last li or page
        if (page < totalPages - 2) { //if page value is less than totalPage value by -2 then add this (...) before the last li or page
            liTag += `<li class="tr_pagination_dots"><span>...</span></li>`;
        }
        liTag += `<li class="tr_pagination_last tr_pagination_numb" onclick="tr_createPagination('${idTable}',${totalPages}, ${totalPages})"><span>${totalPages}</span></li>`;
    }

    if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
        liTag += `<li class="tr_pagination_btn next" onclick="tr_createPagination('${idTable}',${totalPages}, ${page + 1})"><span> <i class="fas fa-angle-right"></i></span></li>`;
    }
    variablesTable[idTable].paginationElement.innerHTML = liTag; //add li tag inside ul tag
    return liTag; //reurn the li tag
}

function getBase64(path) {
    return new Promise((resolve, reject) => {
        // Utiliza fetch para cargar el archivo
        fetch(path)
            .then(response => {
                // Obtiene un objeto Blob a partir de la respuesta
                return response.blob();
            })
            .then(blob => {
                // Procesa el objeto Blob para obtener la imagen en formato base64
                var reader = new FileReader();
                reader.onloadend = function () {
                    // Obtiene la extensión del archivo
                    var extension = path.split('.').pop();

                    var base64 = reader.result;
                    resolve({
                        type: extension.toUpperCase(),
                        data: reader.result
                    });
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                // Si hay un error al cargar el archivo, rechaza la promesa con el mensaje de error
                reject(error);
            });
    });
}

var tr_closeExport = (event,exportFileBtn,checkbox) =>{
    if (event.target !== exportFileBtn) {
        checkbox.checked = false
        document.removeEventListener("click", tr_removeFunction);
    }
}

var tr_removeFunction = function(event) {
    tr_closeExport(event,exportFileBtn, checkbox);
};

var exportFileBtn;
var checkbox;

function openExportFile(element){
    checkbox = element.querySelector("input")
    exportFileBtn = element.querySelector(".tr_export__file-btn")

    checkbox.checked = !checkbox.checked
    document.addEventListener("click", tr_removeFunction);
}

const tr_createTable = async (idTable, arrColumnData, arrJsonData, tableOptions) => {
    
    if (tableOptions.goBack == undefined) tableOptions.goBack = true

    variablesTable[idTable] = {};
    variablesTable[idTable].tr_table_filter_column_number = 0;
    variablesTable[idTable].pagination_page = 1;

    document.getElementById(idTable).classList.add("tr_flex_container_table");
    document.getElementById(idTable).innerHTML = tableHTML;

    document.querySelector(`#${idTable} .tr_title_table`).innerHTML = tableOptions.tableName;


    // Download buttons actions *******************************
    var table__responsive = document.querySelector(`#${idTable} #table__responsive`);

    let tr_goBack_btn = document.querySelector(`#${idTable} #tr_goBack_btn`),
        tr_pdf_btn = document.querySelector(`#${idTable} #tr_toPDF`),
        tr_json_btn = document.querySelector(`#${idTable} #tr_toJSON`),
        tr_excel_btn = document.querySelector(`#${idTable} #tr_toEXCEL`),
        tr_csv_btn = document.querySelector(`#${idTable} #tr_toCSV`),
        pathname = (document.location.pathname).split("/")[1] + "/",
        img;

    img = await getBase64(`/${pathname}/modulos/responsiveTable/images/search.png`)
    document.querySelectorAll(`#${idTable} .searchImg`).forEach(search => {
        search.src = img.data;
    });

    document.querySelector(`#${idTable} .searchDate`).addEventListener("click", () => {
        filterDate(idTable)
    })
    document.querySelector(`#${idTable} .limpiarFiltroFecha`).addEventListener("click", () => {
        limpiarFiltroFecha(idTable)
    })


    // *******************************************

    tr_goBack_btn.onclick = () => {
        history.go(-1)
    }

    img = await getBase64(`/${pathname}modulos/responsiveTable/images/goBack.svg`)
    tr_goBack_btn.querySelector("img").src = img.data;


    // *******************************************

    let scriptJsPdf = document.createElement('script');
    scriptJsPdf.src = `/${pathname}modulos/jsPDF-1.3.2/dist/jspdf.min.js`;
    document.head.appendChild(scriptJsPdf);

    setTimeout(() => {
        let scriptAutoTable = document.createElement('script');
        scriptAutoTable.src = `/${pathname}modulos/jsPDF-Autotable/jsPDF-Autotable.js`;
        document.head.appendChild(scriptAutoTable);
    }, 700);
    
    
    tr_pdf_btn.onclick = () => {
        let tableBody = arrJsonData.map(data => {
            let res = [];
            arrColumnData.map(header => header.jsonKey).forEach(rowKey =>{
                res.push(data[rowKey])
            })
            return res;
        })


        tr_generarPdf(tableOptions.tableName,arrColumnData.map(header => header.columnName),tableBody)
        // tr_toPDF(table__responsive)
    }

    img = await getBase64(`/${pathname}modulos/responsiveTable/images/pdf.png`)
    // img = await getBase64(`/${pathname}images/pdf.png`)
    //img = await getBase64(`/${pathname}/images/pdf.png`)
    tr_pdf_btn.querySelector("img").src = img.data;

    // *******************************************

    tr_json_btn.onclick = () => {
        const json = tr_toJSON(table__responsive);
        downloadFile(json, "json", "nombreArchivo")
    }

    img = await getBase64(`/${pathname}modulos/responsiveTable/images/json.png`)
    // img = await getBase64(`/${pathname}images/json.png`)
    tr_json_btn.querySelector("img").src = img.data;

    // *******************************************

    tr_excel_btn.onclick = () => {
        const excel = tr_toEXCEL(table__responsive);
        downloadFile(excel, "excel", "nombreArchivo")
    }

   img = await getBase64(`/${pathname}modulos/responsiveTable/images/excel.png`)
    // img = await getBase64(`/${pathname}images/excel.png`)
    tr_excel_btn.querySelector("img").src = img.data;

    // *******************************************

    tr_csv_btn.onclick = () => {
        const csv = tr_toCSV(table__responsive);
        downloadFile(csv, "csv", "nombreArchivo")
    }

    img = await getBase64(`/${pathname}/modulos/responsiveTable/images/csv.png`)
    tr_csv_btn.querySelector("img").src = img.data;

    // *******************************

    tr_makeTableSections(table__responsive, arrColumnData, arrJsonData, tableOptions)

    tr_makeOptionSearchColumn(idTable, arrColumnData);

    document.querySelector(`#${idTable} #tr_searchColumn`).addEventListener("change", () => {
        variablesTable[idTable].tr_table_filter_column_number = document.querySelector(`#${idTable} #tr_searchColumn`).value;
        let tr_table_filter_column_type = document.querySelector(`#${idTable} #tr_searchColumn`).selectedOptions[0].getAttribute("filter");

        if (tr_table_filter_column_type == "normal" || tr_table_filter_column_type == null) {
            document.querySelector(`#${idTable} .tr_date-group`).classList.remove(`activeFilterDate`)
            document.querySelector(`#${idTable} .tr_input-group`).classList.remove(`disableSearchBar`)
        } else {
            document.querySelector(`#${idTable} .tr_date-group`).classList.add(`activeFilterDate`)
            document.querySelector(`#${idTable} .tr_input-group`).classList.add(`disableSearchBar`)
        }

    });

    variablesTable[idTable].tr_search = document.querySelector(`#${idTable} #table__responsive .tr_input-group input`),
    variablesTable[idTable].tr_table_rows = document.querySelectorAll(`#${idTable} #table__responsive tbody tr`),
    variablesTable[idTable].tr_table_headings = document.querySelectorAll(`#${idTable} #table__responsive thead th`);


    var timerInputSearch = null;

    variablesTable[idTable].tr_search.addEventListener("input", () => {
        let search_data = variablesTable[idTable].tr_search.value.toLowerCase();

        let numberColumn = variablesTable[idTable].tr_table_filter_column_number

        
        if (search_data.length < 4) return
        
        // Reiniciar el temporizador cada vez que se escribe algo
        clearTimeout(timerInputSearch);
        timerInputSearch = setTimeout(() => {
            if (tableOptions.ownSearchFunction != undefined) {
                let searchColumn = numberColumn == 0 ? "all" : numberColumn - 1;

                let arrSearchColumn = [];
                if (searchColumn == "all") {
                   arrSearchColumn = arrColumnData.map(columnData => columnData.jsonKey);
                }else{
                   arrSearchColumn.push(arrColumnData[searchColumn].jsonKey);
                }
                
                let tr_bodyFetchPath = `&search=${search_data}&tr_arrSearchColumn=${JSON.stringify(arrSearchColumn) }`;
                
                tableOptions.ownSearchFunction({
                    tr_bodyFetch: tableOptions.tr_bodyFetch,
                    tr_bodyFetchPath: tr_bodyFetchPath,
                })
            }else{
                tr_searchTable(idTable, search_data, numberColumn);
            }

        }, 1000);

    });

    start_sort_table(idTable)

    // pagination
    if (tableOptions.pagination) {
        variablesTable[idTable].rowVisible = tableOptions.rowVisible;
        variablesTable[idTable].totalPages = Math.round(arrJsonData.length / variablesTable[idTable].rowVisible)
    
        variablesTable[idTable].paginationElement = document.querySelector(`#${idTable} #tr_pagination ul`);
        variablesTable[idTable].paginationElement.innerHTML = tr_createPagination(idTable, variablesTable[idTable].totalPages, variablesTable[idTable].pagination_page);
    }


    // tableBody height
    // let heightTable = document.querySelector(`#${idTable} #table__responsive`).clientHeight;
    // let heightTableHeader = document.querySelector(`#${idTable} .tr_table__header`).clientHeight;
    // let heightTableBottom = document.querySelector(`#${idTable} .tr_table_bottom`).clientHeight;

    // document.querySelector(`#${idTable} .tr_table__body`).style.setProperty("height", `${heightTable - heightTableHeader - heightTableBottom - 20}px`)




}

function formatDate(fecha){
    let fechaFormat   = new Date(fecha);
    let options = {month: '2-digit', day: '2-digit',  year: '2-digit', hour: '2-digit',minute: '2-digit',second: '2-digit',hour12: false };
    fechaFormat = fechaFormat.toLocaleDateString("es-US", options)

    return fechaFormat

}

// GENERAR PDF

function redondearProximoCinco(number) {
    // Redondea el número al entero más próximo
    var roundedNumber = Math.round(number);

    // Si el número redondeado es divisible por 5, devuelve el número redondeado
    if (roundedNumber % 5 === 0) return roundedNumber;

    // Si el número redondeado es mayor o igual a 5, devuelve el número redondeado hacia abajo
    // if (roundedNumber >= 5) return roundedNumber - roundedNumber % 5;

    // Si el número redondeado es menor que 5, devuelve el número redondeado hacia arriba
    return roundedNumber + (5 - roundedNumber % 5);
}

function añadirTablaAPdf(pdf,titulosTabla,bodyTable,themeTable){
    pdf.autoTable({
        theme: themeTable, // Aplica un tema de filas alternas grises y blancas
        head: [titulosTabla],
        body: bodyTable,
        startY: tr_renglonPDF,
        margin: {
            top: 30
        }
    })


    // Obtiene el objeto de la tabla anterior
    let previousTable = pdf.previousAutoTable;

    // Obtiene el alto de la tabla
    let tableHeight = previousTable.finalY;

    tr_renglonPDF = redondearProximoCinco(tableHeight) + 10

}

function añadirTextoAPdf(pdf,texto, posicionY, tamañoLetra,tipoLetra,sumarRenglon){
    if (tipoLetra == "negrita") tipoLetra = "bold" ;

    pdf.setFontSize(tamañoLetra);
    pdf.setFontType(tipoLetra);
    pdf.text(texto, posicionY, tr_renglonPDF);

    if(sumarRenglon) tr_renglonPDF += 7;

}

const tr_consttr_RenglonPDF = 20
var tr_renglonPDF = tr_consttr_RenglonPDF;
const tr_margenRenglon = 15;

function tr_generarPdf(titleTable,tableHeaders,tableBody){
    return new Promise(async(resolve) => {

        // Crea una nueva instancia de jsPDF
        var doc = jsPDF();
        añadirTextoAPdf(doc,titleTable,  (doc.internal.pageSize.width / 2) - 30, 15,"negrita",true)

        añadirTablaAPdf(doc,tableHeaders,tableBody,"striped")

        doc.save();
        
        // Obtiene el PDF en formato base64
        var pdfBase64 = doc.output('datauristring');

        const html_code = `
            <div id="printSection"></div>
            <iframe src='${pdfBase64}' style='width: 100%; height: 100vh;'></iframe>
        `;

        const new_window = window.open()
        new_window.document.write(html_code)

        return 
    });

}

// let arrColumnData = [{
//         columnName: "id",
//         jsonKey: "id",
//         type: {
//             name: "normal",
//         },
//     },
//     {
//         columnName: "customer",
//         jsonKey: "customer",
//         type: {
//             name: "normal",
//         },
//     },
//     {
//         columnName: "location",
//         jsonKey: "location",
//         type: {
//             name: "normal",
//         },
//     },
//     {
//         columnName: "order date",
//         jsonKey: "order date",
//         type: {
//             name: "normal",
//         },
//     },
//     {
//         columnName: "status",
//         jsonKey: "status",
//         type: {
//             name: "status",
//             keyColor: "colorStatus"
//         },
//     },
//     {
//         columnName: "amount",
//         jsonKey: "amount",
//         type: {
//             name: "normal",
//         },
//         bold: true
//     },
// ]

// let tableOptions = {
//     tableName: "Test table",
//     index: true,
//     rowVisible: 10,
//     onclickEvent: "alert(this)",
//     rowAttributes_jsonKey: ["id"]
// }

// tr_createTable("my-table", arrColumnData, CUSTOMERS, tableOptions)