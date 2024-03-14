// TIPOS DE MAPA ************************************************************************************

const openLayers = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: [
            ol.source.OSM.ATTRIBUTION,
            'Tiles courtesy of <a href="http://openstreetmap.org">OpenStreetMap</a>'
        ],
        url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
});

var googleMapsLight = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'https://mts0.google.com/vt/lyrs=m@221097413&hl=es_AR&src=app&x={x}&y={y}&z={z}&apistyle=s.t:0|s.e:l|p.v:off,s.t:3|s.e:l|p.v:on,s.t:20|s.e:l|p.v:simplified',
    }),
});

var googleMapsDark = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'https://mts0.google.com/vt/lyrs=m@221097413&hl=es_AR&src=app&x={x}&y={y}&z={z}&apistyle=s.t:0|s.e:l|p.v:off,s.t:3|s.e:l|p.v:on,s.t:20|s.e:l|p.v:simplified,s.t%3A0%7Cs.e%3Ag%7Cp.c%3A%23ff263c3f,s.t%3A3%7Cs.e%3Ag%7Cp.c%3A%23ff38414e,s.t%3A5%7Cs.e%3Ag%7Cp.c%3A%23ff242f3e,s.t%3A0%7Cs.e%3Al.t.s%7Cp.c%3A%23ff000000,s.t%3A1%7Cs.e%3Al.t.f%7Cp.c%3A%23ff9ba3b3%2Cs.t%3A1%7Cs.e%3Al.t.s%7Cp.c%3A%23ff38414e,s.t%3A3%7Cs.e%3Al.t.f%7Cp.c%3A%23ff9ba3b3%2Cs.t%3A3%7Cs.e%3Al.t.s%7Cp.c%3A%23ff38414e,s.t%3A6%7Cs.e%3Ag%7Cp.c%3A%23ff17263c',
    })
});

const cartoVoyager = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: "https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    })
});

const cartoDarkAll = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    })
});

const cartoLightAll = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    })
});

// ************************************************************************************
var actualMap = googleMapsLight;

// Función para cambiar entre las capas de mapa
function toggleMap() {
    if (actualMap == googleMapsLight) {
        map.removeLayer(googleMapsLight);
        googleMapsDark.setZIndex(-1);
        map.addLayer(googleMapsDark);
        actualMap = googleMapsDark
    } else {
        map.removeLayer(googleMapsDark);
        googleMapsLight.setZIndex(-1);
        map.addLayer(googleMapsLight);
        actualMap = googleMapsLight
    }

}

if (localStorage.getItem('dark-mode') === 'true') {
    actualMap = googleMapsDark
}



function createMap({
    id
}) {

    let mapLight = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://mts0.google.com/vt/lyrs=m@221097413&hl=es_AR&src=app&x={x}&y={y}&z={z}&apistyle=s.t:0|s.e:l|p.v:off,s.t:3|s.e:l|p.v:on,s.t:20|s.e:l|p.v:simplified',
        }),
    });

    return new ol.Map({
        controls: ol.control.defaults.defaults({
            zoom: false,
            attribution: false,
        }),
        layers: [mapLight],
        target: id,
        view: new ol.View({
            center: ol.proj.fromLonLat([longitudActual, latitudActual]),
            maxZoom: 18,
            // minZoom: 12.5,
            zoom: 13.5,
            // extent: extent
        }),
    });

}



// ************************************************************************************
// CONFIGURACION INICIAL DEL MAPA


// Obtiene el elemento del mapa
var parametros = {};

var map;
var markerLayer;
var markerLayerTemporal;
var latitudActual;
var longitudActual;
var attribution = new ol.control.Attribution({
    collapsible: false
});

// Crear una fuente y un marcador para la ubicación del usuario
// var userSource = new ol.source.Vector();
// var userMarker = new ol.layer.Vector({
//     source: userSource
// });



mainMapOpenLayer();

async function mainMapOpenLayer() {

    return new Promise(resolve => {
        let respuestaCoordenadas = false;

        navigator.geolocation.getCurrentPosition(position => {
            latitudActual = position.coords.latitude;
            longitudActual = position.coords.longitude;
            // // se define como el aeropuerto
            // latitudActual = -31.315546;
            // longitudActual = -64.214121;

            // se define como el centro de cordoba
            // latitudActual = -31.407449;
            // longitudActual = -64.190716;

            // MapCreate();
            respuestaCoordenadas = true;
            resolve()
        }, async (error) => {
            console.log(error);

            // se define como el centro de cordoba
            latitudActual = -31.407449;
            longitudActual = -64.190716;
            // MapCreate();
            respuestaCoordenadas = true;
            resolve()

        });

        setTimeout(() => {
            if (!respuestaCoordenadas) {
                latitudActual = -31.407449;
                longitudActual = -64.190716;
                resolve()
            }
        }, 3000);
    })



    // setInterval(() => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         latitudActual = position.coords.latitude;
    //         longitudActual = position.coords.longitude;
    //     }, async (error) => {});
    // }, 5000);
}




function eventoAlSeleccionarFeature(event) {
    var feature = map.forEachFeatureAtPixel(event.pixel, feature => feature);
    if (feature == undefined) return
    if (feature.values_.hasOwnProperty("features")) {
        eventClick(feature.values_.features[0].values_.data)
    } else {
        eventClick(feature.values_.data)
    }
}

var functionMarker = {
    ubicacionActual: () => alert("Esta es tu ubicación"),
    // estacion: () => openPopUp(data),
    // bicicleta: () => openPopUp(data)
};

function eventClick(data) {

    if (data === undefined) return
    if (data.tipoMarcador === undefined) return

    // Obtiene la información del marcador seleccionado
    // var data = event.selected[0].get('data');

    functionMarker[data.tipoMarcador](data);
}
// *******************************************************************************************************

// Crea dos variables para guardar la latitud y longitud
var latitud;
var longitud;

function obtenerUbicacion() {

    // Añade un listener para el evento singleclick
    map.on('singleclick', function (event) {
        // Obtiene la coordenada del lugar donde se ha hecho clic
        var coordinate = event.coordinate;
        // Transforma la coordenada a formato lonlat
        var lonlat = ol.proj.toLonLat(coordinate);
        // Asigna los valores de la longitud y latitud a las variables
        longitud = lonlat[0];
        latitud = lonlat[1];
    });

}

function irMiUbicacion() {
    // Transforma las coordenadas de la ubicación actual al formato EPSG:3857
    var center = ol.proj.fromLonLat([longitudActual, latitudActual], 'EPSG:3857');

    // Establece el centro del mapa en la ubicación actual y el zoom en 15
    map.getView().animate({
        center: center,
        zoom: 15,
        duration: 1000
    });
}
// *******************************************************************************************************
// TRAZADO DE RUTA


// Crea una capa de vectores para almacenar la geometría de la ruta

var vectorRuta = new ol.layer.Vector({
    source: new ol.source.Vector()
});

function cerrarRuta() {
    // Elimina las características de la capa de vectores
    vectorRuta.getSource().clear();

    let infoRuta = document.getElementById("infoRuta");

    if (infoRuta != null) {
        infoRuta.classList.remove("infoRutaActive")
        infoRuta.classList.remove("infoRutaSwipeUp")
    }
}

function crearLineaRuta(coordinates) {
    // Crea una geometría de línea utilizando las coordenadas de la ruta
    var line = new ol.geom.LineString(coordinates);

    // Crea una característica utilizando la geometría de línea
    var route = new ol.Feature({
        geometry: line
    });


    if (esColorOscuro(mainColorTheme)) mainColorTheme = "#ffff";

    // le asigna los estilos a la linea del trazado de ruta
    route.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: mainColorTheme,
            width: 6
        })
    }));

    return route
}

function trazarRuta(mode, latInicial, longInicial, latFinal, longFinal) {


    return new Promise(resolve => {

        // modos disponibles : driving, walking, cycling

        // https://routing.openstreetmap.de/routed-car/...
        // https://routing.openstreetmap.de/routed-foot/...
        // https://routing.openstreetmap.de/routed-bike/...

        // example from above: https://routing.openstreetmap.de/routed-car/route/v1/driving/-121.8863286,37.3382082;-121.988583,37.5485396?overview=full
        // Realiza una petición HTTP al servicio de enrutamiento de OpenStreetMap

        const routed = {
            driving: "routed-car",
            walking: "routed-foot",
            cycling: "routed-bike",
        }

        fetch(
                `https://routing.openstreetmap.de/${routed[mode]}/route/v1/${mode}/${longInicial},${latInicial};${longFinal},${latFinal}?overview=false&alternatives=false&steps=true`
                // `https://router.project-osrm.org/route/v1/${mode}/${longInicial},${latInicial};${longFinal},${latFinal}?overview=full&geometries=geojson`

                // http://router.project-osrm.org/route/v1/driving/-31.407449,-64.190716;-31.419484,-64.233045?overview=false&steps=true&alternatives=true
                // http://project-osrm.org/docs/v5.24.0/api/# documentacion
            )
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                // Elimina las características de la capa de vectores
                vectorRuta.getSource().clear();

                // ********************************************************

                // Obtiene el tiempo de la respuesta JSON
                let duracion = Math.ceil(json.routes[0].duration / 60);
                let distancia = json.routes[0].distance;


                // ********************************************************

                // console.log(json.routes[0].legs[0].steps)

                let pasoPrevio = [];
                // Obtiene las etapas de la respuesta JSON
                var etapas = json.routes[0].legs[0].steps.map((paso, index) => {

                    pasoPrevio.push(paso);
                    let distanciaPasoPrevio = pasoPrevio[index - 1] != undefined ? pasoPrevio[index - 1].distance : "";

                    let accion = paso.maneuver.type;
                    let orientacion = "";

                    Object.keys(paso.maneuver).includes("modifier") ? orientacion = paso
                        .maneuver.modifier : orientacion = null;

                    let accionTraduccion = {
                        depart: "comience",
                        arrive: "destino",
                        turn: "gire",
                        fork: "bifurcación",
                        'new name': "continúe",
                        'continue': "continúe",
                        "end of road": "fin del camino"
                    }

                    let orientacionTraduccion = {
                        straight: 'derecho',
                        right: 'derecha',
                        left: 'izquierda',
                        null: '',
                        "slight left": "levemente a la izquierda",
                        "slight right": "levemente a la derecha",
                        "sharp left": "pronunciadamente a la izquierda",
                        "sharp right": "pronunciadamente a la derecha",
                    }

                    let orientacionTraduccionTexto = {
                        straight: 'derecho',
                        right: 'a la derecha',
                        left: 'a la izquierda',
                        null: '',
                        "slight left": "levemente a la izquierda",
                        "slight right": "levemente a la derecha",
                        "sharp left": "pronunciadamente a la izquierda",
                        "sharp right": "pronunciadamente a la derecha",
                    }



                    return {
                        distancia: paso.distance,
                        calle: paso.name,
                        accion: accionTraduccion[accion],
                        orientacion: orientacionTraduccion[orientacion],
                        indicacion: `${accionTraduccion[accion]} ${orientacionTraduccionTexto[orientacion]} ${paso.name != ""? `en ${paso.name}` : `en ${distanciaPasoPrevio} mts.`}`,
                    }


                });

                // console.log(etapas)

                // ********************************************************

                // Obtiene las coordenadas de la ruta de la respuesta JSON
                // var coordinates = json.routes[0].legs[0].steps.map(step => step.maneuver.location);
                var coordinates = json.routes[0].legs[0].steps.map(step => decodePolyline(step.geometry)).flat();

                // Transforma las coordenadas de la ruta al formato EPSG:3857
                coordinates = coordinates.map(function (coord) {
                    return ol.proj.fromLonLat(coord, 'EPSG:3857');
                });


                // *****************************************************************

                var route = crearLineaRuta(coordinates)

                // *****************************************************************

                // // Crea una geometría de línea utilizando las coordenadas de la ruta
                // var line = new ol.geom.LineString(coordinates);


                // // Obtiene las coordenadas de los extremos de la línea
                // var extent = line.getExtent();
                // // var start = ol.extent.getTopLeft(extent);
                // // var end = ol.extent.getBottomRight(extent);

                // var start = coordinates[0];
                // var end = coordinates.pop();

                // console.log(coordinates[0])
                // console.log(coordinates.pop())

                // var canvas = map.getViewport().querySelector('canvas');
                // var context = canvas.getContext('2d');

                // // Agrega un punto al inicio del gradiente
                // var point1 = new ol.Feature({
                //     geometry: new ol.geom.Point(start),
                // });
                // point1.setStyle(new ol.style.Style({
                //     image: new ol.style.Circle({
                //         radius: 6,
                //         fill: new ol.style.Fill({
                //             color: 'blue'
                //         }),
                //         stroke: new ol.style.Stroke({
                //             color: 'white',
                //             width: 2
                //         })
                //     })
                // }));
                // vectorRuta.getSource().addFeature(point1);

                // // Agrega un punto al final del gradiente
                // var point2 = new ol.Feature({
                //     geometry: new ol.geom.Point(end),
                // });
                // point2.setStyle(new ol.style.Style({
                //     image: new ol.style.Circle({
                //         radius: 6,
                //         fill: new ol.style.Fill({
                //             color: 'red'
                //         }),
                //         stroke: new ol.style.Stroke({
                //             color: 'white',
                //             width: 2
                //         })
                //     })
                // }));
                // vectorRuta.getSource().addFeature(point2);


                // // Define el gradiente de color de la línea
                // var gradient = context.createLinearGradient(start[0], start[1], end[0], end[1]);
                // gradient.addColorStop(0, 'red');
                // gradient.addColorStop(0.5, 'yellow');
                // gradient.addColorStop(1, 'green');

                // // Crea una característica utilizando la geometría de línea
                // var route = new ol.Feature({
                //     geometry: line
                // });

                // // le asigna los estilos a la linea del trazado de ruta
                // route.setStyle(new ol.style.Style({
                //     stroke: new ol.style.Stroke({
                //         color: gradient,
                //         width: 6
                //     })
                // }));
                // *******************************************************************

                // Añade la característica a la capa de vectores
                vectorRuta.getSource().addFeature(route);




                // Comprueba si la capa ya está en el mapa
                if (!map.getLayers().getArray().includes(vectorRuta)) {
                    // Si la capa no está en el mapa, agrégala
                    map.addLayer(vectorRuta);
                }

                let coordinate1 = [parseFloat(longInicial), parseFloat(latInicial)];
                let coordinate2 = [parseFloat(longFinal), parseFloat(latFinal)];

                let coordinate1aux = ol.proj.fromLonLat([parseFloat(longInicial), parseFloat(latInicial)], 'EPSG:3857');
                let coordinate2aux = ol.proj.fromLonLat([parseFloat(longFinal), parseFloat(latFinal)], 'EPSG:3857');

                // Obtiene la vista actual del mapa
                var view = map.getView();

                // Calcula el nivel de zoom necesario para mostrar ambas coordenadas
                var resolution = view.getResolutionForExtent(ol.extent.boundingExtent([coordinate1aux, coordinate2aux]), map.getSize());
                var zoom = view.getZoomForResolution(resolution) - 0.1;

                // Ajusta la vista del mapa para que muestre las dos coordenadas
                view.animate({
                    center: ol.proj.fromLonLat([(coordinate1[0] + coordinate2[0]) / 2, (coordinate1[1] + coordinate2[1]) / 2], 'EPSG:3857'),
                    zoom: zoom,
                    duration: 1000
                });

                // ***************************************************************************

                // // Crea una capa para la feature animada
                // var animLayer = new ol.layer.Vector({
                //     source: new ol.source.Vector(),
                //     style: function (route, resolution) {
                //         return new ol.style.Style({
                //             stroke: new ol.style.Stroke({
                //                 color: 'red',
                //                 width: 5
                //             })
                //         });
                //     }
                // });

                // // Crea una feature de animación a partir de la geometría de línea
                // var routeFeature = new ol.Feature({
                //     geometry: line,
                // });

                // // Agrega la feature de animación a la capa de animación
                // animLayer.getSource().addFeature(routeFeature);

                // // Crea un objeto de animación a partir de la geometría de la feature
                // var animPath = new ol.featureAnimation.Path({
                //     path: line, // Geometría a animar
                //     easing: 'linear', // Tipo de interpolación entre puntos
                //     speed: 0.2, // Velocidad de la animación
                //     feature: routeFeature
                // });

                // // Agrega la animación como una feature a la fuente de la capa vectorial de animación
                // animLayer.getSource().addFeature(animPath);

                // // Agrega la capa al mapa
                // map.addLayer(animLayer);

                // // Inicia la animación
                // animPath.animate();
                // ****************************************************************************************

                resolve({
                    distancia: distancia,
                    duracion: duracion,
                    pasos: etapas
                })
            });
    })

}


function trazarCoordenadas(coordenadas) {
    // Obtiene las coordenadas de la ruta de la respuesta JSON

    // Transforma las coordenadas de la ruta al formato EPSG:3857
    let coordinates = coordenadas.map(function (coord) {
        return ol.proj.fromLonLat(coord, 'EPSG:3857');
    });


    // *****************************************************************


    // Crea una geometría de línea utilizando las coordenadas de la ruta
    var line = new ol.geom.LineString(coordinates);

    // Crea una característica utilizando la geometría de línea
    var route = new ol.Feature({
        geometry: line
    });

    var color = getComputedStyle(document.documentElement).getPropertyValue('--f7-theme-color');
    var element = document.querySelector(`.color-theme-${fmw7_conf}`);
    var style = getComputedStyle(element);
    //var color = style.getPropertyValue('--f7-theme-color');

    if (esColorOscuro(color)) color = "#ffff";


    // le asigna los estilos a la linea del trazado de ruta
    route.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: color,
            width: 6
        })
    }));


    // Añade la característica a la capa de vectores
    vectorRuta.getSource().addFeature(route);




    // Comprueba si la capa ya está en el mapa
    if (!map.getLayers().getArray().includes(vectorRuta)) {
        // Si la capa no está en el mapa, agrégala
        map.addLayer(vectorRuta);
    }


    let coordinate1 = [parseFloat(coordenadas[0][0]), parseFloat(coordenadas[0][1])];
    let coordinate2 = [parseFloat(coordenadas[coordenadas.length - 1][0]), parseFloat(coordenadas[coordenadas.length - 1][1])];

    let coordinate1aux = ol.proj.fromLonLat(coordinate1, 'EPSG:3857');
    let coordinate2aux = ol.proj.fromLonLat(coordinate2, 'EPSG:3857');

    // Obtiene la vista actual del mapa
    var view = map.getView();

    // Calcula el nivel de zoom necesario para mostrar ambas coordenadas
    var resolution = view.getResolutionForExtent(ol.extent.boundingExtent([coordinate1aux, coordinate2aux]), map.getSize());
    var zoom = view.getZoomForResolution(resolution) - 0.1;

    // Ajusta la vista del mapa para que muestre las dos coordenadas
    view.animate({
        center: ol.proj.fromLonLat([(coordinate1[0] + coordinate2[0]) / 2, (coordinate1[1] + coordinate2[1]) / 2], 'EPSG:3857'),
        zoom: zoom,
        duration: 1000
    });


}

function esColorOscuro(colorHex) {
    // Elimina el símbolo '#' si está presente
    colorHex = colorHex.replace(/^#/, '');

    // Convierte a valores RGB
    var r = parseInt(colorHex.substr(0, 2), 16);
    var g = parseInt(colorHex.substr(2, 2), 16);
    var b = parseInt(colorHex.substr(4, 2), 16);

    // Calcula la luminosidad según la fórmula Y = 0.299*R + 0.587*G + 0.114*B
    var luminosidad = 0.299 * r + 0.587 * g + 0.114 * b;

    // Compara con un umbral para determinar si es oscuro
    var umbral = 79; // Puedes ajustar este valor según tus preferencias

    return luminosidad < umbral;
}


async function comenzarRuta(tipoVehiculo, nombreDestino, latitudOrigen, longitudOrigen, latidudDestino, longitudDestino) {

    let infoRuta = await trazarRuta(tipoVehiculo, latitudOrigen, longitudOrigen, latidudDestino, longitudDestino)

    let infoRutaContainer = document.getElementById("infoRuta")

    let divIndicaciones = armarIndicaciones(infoRuta.pasos);
    document.getElementById("infoRutaIndicaciones").innerHTML = divIndicaciones;

    setTimeout(() => {
        document.getElementById("infoRuta").classList.add("infoRutaActive")
    }, 300);

    document.getElementById("infoRutaDestino").innerHTML = nombreDestino;
    document.getElementById("infoRutaDuracion").innerHTML =
        `Duración estimada de ${infoRuta.duracion} minutos`;

    let funcionSwUp = () => {
        infoRutaContainer.classList.add("infoRutaSwipeUp")
    }

    let funcionSwDn = () => {
        infoRutaContainer.classList.remove("infoRutaSwipeUp")
    }

    detectarSwipe("infoRutaSlider", funcionSwUp, funcionSwDn)
}


function toggleIndicaciones() {
    document.getElementById("infoRuta").classList.toggle("infoRutaSwipeUp")
}

function armarIndicaciones(arrIndicaciones) {
    let elements = "";
    let icon = {
        "comience": '<i class="fa-solid fa-location-arrow"></i>',
        "destino": '<i class="fa-solid fa-flag-checkered"></i>',
        "gire": {
            "izquierda": '<i class="fa-solid fa-circle-left"></i>',
            "derecha": '<i class="fa-solid fa-circle-right"></i>',
            "levemente a la izquierda": '<i class="fa-solid fa-circle-chevron-left"></i>',
            "levemente a la derecha": '<i class="fa-solid fa-circle-chevron-right"></i>',
            "derecho": '<i class="fa-solid fa-circle-up"></i>',
            "pronunciadamente a la izquierda": '<i class="fa-solid fa-circle-left"></i>',
            "pronunciadamente a la derecha": '<i class="fa-solid fa-circle-right"></i>',

        },
        "continúe": '<i class="fa-solid fa-circle-up"></i>',
        "bifurcación": '<i class="fa-solid fa-code-fork"></i>',
        "fin del camino": '<i class="fa-solid fa-road-circle-exclamation"></i>'
    }

    arrIndicaciones.forEach((indicacion, index) => {
        // console.log(index)
        let icono;
        indicacion.accion == "gire" ? icono = icon[indicacion.accion][indicacion.orientacion] : icono =
            icon[indicacion.accion];

        elements +=
            `
        <div class="containerIndicacion">
        <div class="iconIndicacion">${icono}</div>
        <div class="textIndicación">${indicacion.indicacion}</div>
        </div>
        `;
    })
    return elements;
}

function detectarSwipe(idDiv, funcionSwUp, funcionSwDn) {
    let div = document.getElementById(idDiv);
    let startY;
    let endY;

    div.addEventListener('touchstart', function (event) {
        // Almacena la posición Y del dedo al inicio del gesto
        startY = event.touches[0].clientY;
    });

    div.addEventListener('touchend', function (event) {
        // Almacena la posición Y del dedo al final del gesto
        endY = event.changedTouches[0].clientY;

        // Calcula la distancia recorrida
        let distance = endY - startY;

        // Si la distancia es suficientemente grande en la dirección hacia abajo,
        // consideramos que se ha realizado un "swipe down"
        if (distance < -50) {
            funcionSwUp();
        }

        // Si la distancia es suficientemente grande, consideramos que se ha
        // realizado un "swipe up"
        if (distance > 50) {
            funcionSwDn();
        }
    });
}
// FUNCION PARA DECODIFICAR LAS COORDENADAS DE UNA RUTA
function decodePolyline(encoded) {
    var poly = [];
    var index = 0,
        len = encoded.length;
    var lat = 0,
        lng = 0;

    while (index < len) {
        var b, shift = 0,
            result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        var point = [lng * 1e-5, lat * 1e-5];
        poly.push(point);
    }

    return poly;
}

// *************************************************************************************************************


// function añadirMarcador() {

//     // You can add a marker at a specific location
//     var layer = new ol.layer.Vector({
//         source: new ol.source.Vector({
//             features: [
//                 new ol.Feature({
//                     geometry: new ol.geom.Point(ol.proj.fromLonLat([4.35247, 50.84673]))
//                 })
//             ]
//         })
//     });
//     map.addLayer(layer);

//     // You can create a new <div id="popup"> element right after the <div id="map"> element
//     //     Initialize the popup (the following JavaScript code needs to go in the <script> section)
//     var container = document.getElementById('popup');
//     var content = document.getElementById('popup-content');
//     var closer = document.getElementById('popup-closer');

//     var overlay = new ol.Overlay({
//         element: container,
//         autoPan: true,
//         autoPanAnimation: {
//             duration: 250
//         }
//     });
//     map.addOverlay(overlay);

//     closer.onclick = function () {
//         overlay.setPosition(undefined);
//         closer.blur();
//         return false;
//     };


//     // Add the function to open the popup when you click on the marker

//     map.on('singleclick', function (event) {
//         if (map.hasFeatureAtPixel(event.pixel) === true) {
//             var coordinate = event.coordinate;

//             content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
//             overlay.setPosition(coordinate);
//         } else {
//             overlay.setPosition(undefined);
//             closer.blur();
//         }
//     });

//     content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
//     overlay.setPosition(ol.proj.fromLonLat([4.35247, 50.84673]));
// }


var optionIcon = {
    location0: {
        src: 'https://cdn-icons-png.flaticon.com/512/1281/1281225.png',
        // size: [100, 100],  // Establece el ancho y alto en 15 píxeles
        // scaling: 'fit',  // Ajusta la imagen al tamaño del marcador
        scale: 0.03,
        displacement: [0, -20]
    },
    location1: {
        src: 'https://cdn-icons-png.flaticon.com/512/5737/5737612.png',
        // size: [100, 100],  // Establece el ancho y alto en 15 píxeles
        // scaling: 'fit',  // Ajusta la imagen al tamaño del marcador
        scale: 0.08,
        displacement: [0, 250]
    },
    location2: {
        src: 'https://cdn-icons-png.flaticon.com/128/3156/3156780.png',
        scale: 0.3,
    },
    location3: {
        src: 'https://cdn-icons-png.flaticon.com/512/5266/5266122.png',
        scale: 0.075,
    },
    location4: {
        src: 'https://cdn-icons-png.flaticon.com/512/2711/2711754.png',
        scale: 0.06,
    },
    user1: {
        src: 'https://cdn-icons-png.flaticon.com/512/1321/1321437.png',
        scale: 0.09,
    },
    user2: {
        src: 'https://cdn-icons-png.flaticon.com/512/3603/3603850.png',
        scale: 0.08,
    },
    bike1: {
        src: 'https://cdn-icons-png.flaticon.com/512/1183/1183139.png',
        scale: 0.05,
    },
    bike2: {
        src: `./modulos/openLayerFunctions/imagenes/bike2.png`,
        scale: 0.05,
    },
    bike3: {
        src: `./modulos/openLayerFunctions/imagenes/bike3.png`,
        scale: 0.05,
    },
    bike4: {
        src: `./modulos/openLayerFunctions/imagenes/bike4.png`,
        scale: 0.05,
    },
    car1: {
        src: ' https://cdn-icons-png.flaticon.com/512/809/809998.png',
        scale: 0.07,
        displacement: [0, -15],
        // rotation: Math.PI / 4 // rotación de 45 grados
    },
    // https://www.flaticon.com/free-icon/car_3097180?term=car&page=1&position=4&origin=search&related_id=3097180
    car_green: {
        src: './modulos/openLayerFunctions/imagenes/car_green.png',
        scale: 0.06,
    },
    car_yellow: {
        src: './modulos/openLayerFunctions/imagenes/car_yellow.png',
        scale: 0.06,
    },
    car_white: {
        src: './modulos/openLayerFunctions/imagenes/car_white.png',
        scale: 0.06,
    },
    car_black: {
        src: './modulos/openLayerFunctions/imagenes/car_black.png',
        scale: 0.06,
    },
    car_blue: {
        src: './modulos/openLayerFunctions/imagenes/car_blue.png',
        scale: 0.06,
    },
    car_pink: {
        src: './modulos/openLayerFunctions/imagenes/car_pink.png',
        scale: 0.06,
    },
    car_gray: {
        src: './modulos/openLayerFunctions/imagenes/car_gray.png',
        scale: 0.06,
    },
    flagEnd1: {
        src: 'https://cdn-icons-png.flaticon.com/512/3466/3466611.png',
        scale: 0.07,
        displacement: [10, 15]
    },
    flag1: {
        src: 'https://cdn-icons-png.flaticon.com/512/2107/2107895.png',
        scale: 0.07,
        displacement: [10, 15]
    },
    battery_0: {
        src: 'https://cdn-icons-png.flaticon.com/512/3103/3103514.png',
        scale: 0.07,
    },
    battery_1: {
        src: 'https://cdn-icons-png.flaticon.com/512/3103/3103496.png',
        scale: 0.07,
    },
    battery_2: {
        src: 'https://cdn-icons-png.flaticon.com/512/3103/3103529.png',
        scale: 0.07,
    },
    battery_3: {
        src: 'https://cdn-icons-png.flaticon.com/512/3103/3103446.png',
        scale: 0.07,
    },
    // https://www.flaticon.com/free-icon/navigation_3138858?term=navigation&page=1&position=8&origin=search&related_id=3699532
    navigation_1: {
        src: 'https://cdn-icons-png.flaticon.com/512/3138/3138858.png',
        scale: 0.07,
    },
    navigation_green: {
        src: `./modulos/openLayerFunctions/imagenes/navigation_green.png`,
        scale: 0.05,
    },

    navigation_yellow: {
        src: `./modulos/openLayerFunctions/imagenes/navigation_yellow.png`,
        scale: 0.05,
    },
    navigation_orange: {
        src: `./modulos/openLayerFunctions/imagenes/navigation_orange.png`,
        scale: 0.05,
    },
    navigation_red: {
        src: `./modulos/openLayerFunctions/imagenes/navigation_red.png`,
        scale: 0.05,
    },
    sillaRuedas_1: {
        src: `https://cdn-icons-png.flaticon.com/512/3594/3594213.png`,
        scale: 0.05,
    },
    reparacion_1: {
        src: "https://cdn-icons-png.flaticon.com/512/427/427132.png",
        scale: 0.05,
    },
    noConection_1: {
        src: "https://cdn-icons-png.flaticon.com/512/6594/6594271.png ",
        scale: 0.05,
    },
    home_1: {
        src: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
        scale: 0.05,
    },



}


var overlayBottomInfo = {
    index: 0,
};

function crearOverlayBottomInfo({
    markerInfo,
    extraData
}) {
    let dataKey = `bottomInfo_${overlayBottomInfo.index}`

    overlayBottomInfo[dataKey] = "";
    overlayBottomInfo.index += 1;

    let bottomInfo = document.createElement("div")
    bottomInfo.setAttribute("id", dataKey)
    bottomInfo.classList.add("map_bottomInfo")

    if (extraData.data == "bicicletaInfo") {

        if (markerInfo.tipoVehiculo == "Bici Capacidad Dif") {
            let tipo = document.createElement("img")
            tipo.src = optionIcon.sillaRuedas_1.src;
            bottomInfo.appendChild(tipo)
        }

        if (markerInfo.bateria < 26) {
            let battery = document.createElement("img")
            battery.src = optionIcon.battery_1.src;
            bottomInfo.appendChild(battery)
        }


        let id = document.createElement("span")
        id.innerHTML = markerInfo.vehiculo.idVehiculo
        bottomInfo.appendChild(id)

        if (markerInfo.reparacion == "true") {
            let reparacion = document.createElement("img")
            reparacion.src = optionIcon.reparacion_1.src;
            bottomInfo.appendChild(reparacion)
        }

        // if (markerInfo.gpsEstado == "inactivo") {
        //     let signal = document.createElement("img")
        //     signal.src = optionIcon.noConection_1.src;
        //     signal.classList.add("iconSignal")
        //     bottomInfo.appendChild(signal)
        // }


        if (markerInfo.estado == 40) {

            let htmlEmergencia = `       
            <div class="divLottieEmergencia" onclick="abrirPopUpEmergencia(${markerInfo.idVehiculo})">
                <lottie-player class="lottieEmergencia" src="./modulos/openLayerFunctions/imagenes/atencionEmergencia.json" background="transparent"  speed="1" autoplay loop></lottie-player>            
            </div>`;
            bottomInfo.innerHTML += htmlEmergencia
        }

        if (markerInfo.estado == 18) {
            let htmlEmergencia = `       
            <div class="divLottieEmergencia" onclick="abrirPopUpEmergencia(${markerInfo.idVehiculo})">
                <lottie-player class="lottieEmergencia" src="./modulos/openLayerFunctions/imagenes/atencionMedica.json" background="transparent"  speed="1" autoplay loop></lottie-player>            
            </div>`;
            bottomInfo.innerHTML += htmlEmergencia
        }


        if (markerInfo.reparacion == "true" && markerInfo.inicioViajeFecha != null && markerInfo.estado == 3) {
            let htmlEmergencia = `       
            <div class="divLottieEmergenciaRotura" onclick="abrirPopUpEmergencia(${markerInfo.idVehiculo})">
                <lottie-player class="lottieEmergencia" src="./modulos/openLayerFunctions/imagenes/atencionRotura.json" background="transparent" style="width:50px"  speed="1" autoplay loop></lottie-player>            
            </div>`;
            bottomInfo.innerHTML += htmlEmergencia
        }




        // let reparacion = document.createElement("img")

    }

    let mapElement = map.targetElement_;
    let parentDiv = mapElement.parentNode;

    parentDiv.insertBefore(bottomInfo, undefined)

    overlayBottomInfo[dataKey] = new ol.Overlay({
        positioning: 'center-center',
        element: document.getElementById(dataKey),
        stopEvent: false
    });
    overlayBottomInfo[dataKey].setPosition(ol.proj.fromLonLat([markerInfo.longitud, markerInfo.latitud]));
    // overlayBottomInfo[dataKey].setPosition(map.getView().getCenter());


    map.addOverlay(overlayBottomInfo[dataKey]);

}

function eliminarOverlay(overlay) {
    Object.keys(overlay).forEach(data => {
        if (data != "index") {
            map.removeOverlay(overlay[data]);
            delete overlay[data]
        }
    })

    overlay.index = 0;
}


var overlayLabel = {
    index: 0,
};

function crearOverlayLabel({
    latitud,
    longitud,
    labelText
}) {
    let labelKey = `label_${overlayLabel.index}`

    overlayLabel[labelKey] = "";
    overlayLabel.index += 1;

    let label = document.createElement("div")
    label.setAttribute("id", labelKey)
    label.classList.add("map_addressLabel")
    label.innerHTML = labelText

    let mapElement = map.targetElement_;
    let parentDiv = mapElement.parentNode;

    parentDiv.insertBefore(label, undefined)

    // Crea el marcador en el centro del mapa
    overlayLabel[labelKey] = new ol.Overlay({
        positioning: 'center-center',
        element: document.getElementById(labelKey),
        stopEvent: false
    });
    overlayLabel[labelKey].setPosition(ol.proj.fromLonLat([longitud, latitud]));
    // overlayLabel[labelKey].setPosition(map.getView().getCenter());


    map.addOverlay(overlayLabel[labelKey]);

}

function eliminarOverlayLabel() {
    Object.keys(overlayLabel).forEach(labelKey => {
        if (labelKey != "index") {
            let label = document.getElementById(labelKey)

            if (label != null) {
                label.remove();
                map.removeOverlay(overlayLabel.labelKey);
                delete overlayLabel.labelKey
            }
        }
    })
}


function eliminarMarcadorTemporal() {
    let source = markerLayerTemporal.getSource();
    let features = source.getFeatures();

    // let lastFeature = features[features.length - 1];
    features.forEach(feature => {
        source.removeFeature(feature);
    });
}

// Añade la caracter
function añadirMarcadoresTemporales(arrJsonMarkerInfo, style) {

    if (!Array.isArray(arrJsonMarkerInfo)) arrJsonMarkerInfo = [arrJsonMarkerInfo];

    arrJsonMarkerInfo.forEach(markerInfo => {

        let {
            marker,
            markerStyle
        } = crearMarcador(style, markerInfo.latitud, markerInfo.longitud)

        // Asigna información al marcador
        marker.set('data', markerInfo);

        // Añade el marcador a la capa
        markerLayerTemporal.getSource().addFeature(marker);

        if (markerInfo.label != undefined) {
            crearOverlayLabel({
                latitud: markerInfo.latitud,
                longitud: markerInfo.longitud,
                labelText: markerInfo.label
            })
        }

        // let marker = document.getElementById("markerPin")

        // if (marker != null) {
        //     marker.remove();
        //     map.removeOverlay(markerPin);
        // }

    });
}

// Añade la caracter
function añadirMarcadores(arrJsonMarkerInfo, style, extraData = {}) {

    if (!Array.isArray(arrJsonMarkerInfo)) arrJsonMarkerInfo = [arrJsonMarkerInfo];

    arrJsonMarkerInfo.forEach(markerInfo => {

        let {
            marker,
            markerStyle
        } = crearMarcador(style, markerInfo.latitud, markerInfo.longitud)

        // Asigna información al marcador
        marker.set('data', markerInfo);

        // Añade el marcador a la capa
        markerLayer.getSource().addFeature(marker);


        if (Object.keys(extraData).length != 0) {
            if (extraData.vehiculo == "bicicleta") {
                if (extraData.data == "bicicletaInfo") {
                    crearOverlayBottomInfo({
                        markerInfo,
                        extraData
                    })
                }
            }
        }

    });
}

function crearMarcador(style, latitud, longitud) {
    // Crea un icono con la imagen que quieres utilizar como marcador

    let markerIcon = new ol.style.Icon(optionIcon[style]);

    // Crea un estilo para el marcador utilizando el icono que has creado
    let markerStyle = new ol.style.Style({
        image: markerIcon,
        cursor: 'pointer',
        text: new ol.style.Text({
            text: '',
            fill: new ol.style.Fill({
                color: '#000000'
            })
        })
    });

    // Crea un nuevo marcador en la coordenada donde se ha hecho clic
    let marker = new ol.Feature({
        // geometry: new ol.geom.Point(coordenadas)
        geometry: new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud]))
    });

    // Asigna el estilo al marcador
    marker.setStyle(markerStyle);

    return {
        marker,
        markerStyle
    };

}


// ************************************************************************************************************

const calcularDistanciaEntreDosCoordenadas = (lat1, lon1, lat2, lon2) => {
    // Convertir todas las coordenadas a radianes
    lat1 = gradosARadianes(lat1);
    lon1 = gradosARadianes(lon1);
    lat2 = gradosARadianes(lat2);
    lon2 = gradosARadianes(lon2);
    // Aplicar fórmula
    const RADIO_TIERRA_EN_KILOMETROS = 6371;
    let diferenciaEntreLongitudes = (lon2 - lon1);
    let diferenciaEntreLatitudes = (lat2 - lat1);
    let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math
        .pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let res = parseFloat(RADIO_TIERRA_EN_KILOMETROS * c).toFixed(2)
    return res;
};

const gradosARadianes = (grados) => {
    return grados * Math.PI / 180;
};

function ordenarPorDistancia(arrayCoordenadas, latInicial, lngInicial) {

    arrayCoordenadas.forEach(function (obj) {
        obj.distancia = calcularDistanciaEntreDosCoordenadas(obj.latitud, obj.longitud,
            latInicial, lngInicial)
    });

    // Ordena el array de objetos según la distancia menor a las coordenadas iniciales
    arrayCoordenadas.sort(function (a, b) {
        return a.distancia - b.distancia;
    });

    // Devuelve el array ordenado
    return arrayCoordenadas;
}



// COMIENZA LA PARTE DE AGRUPAMIENTOA ANIMADO DE ELEMENTOS *********************************************************************

// Crea una función para desagrupar los marcadores
function unClusterMarkers() {
    // Reemplaza la capa de cluster con la capa de marcadores original
    map.removeLayer(clusterLayer);
    map.addLayer(clusterSource);
}

var clusterLayer;
var clusterSource;

function clusterMarkers(arrJsonMarkerInfo, style, tipoAgrupamiento) {

    let features = [];

    let clusterMarkerStyle;

    arrJsonMarkerInfo.forEach(markerInfo => {

        let {
            marker,
            markerStyle
        } = crearMarcador(style, markerInfo.latitud, markerInfo.longitud)

        clusterMarkerStyle = markerStyle;

        // Asigna información al marcador
        marker.set('data', markerInfo);

        features.push(marker)

    });


    // Crea una capa de agrupamiento
    clusterSource = new ol.source.Cluster({
        distance: 40, // Distancia mínima entre los marcadores para agruparlos
        source: new ol.source.Vector({
            features: features
        })
    });


    var clusterLayerStyle = {
        "icono": () => {
            return clusterMarkerStyle
        },
        "porColores": (feature) => agruparPorColores(feature),
        "mostrarCantidad": (feature) => {
            let cantElementosAgrupados = feature.values_.features.length;
            let texto = "";
            if (cantElementosAgrupados != 1) texto = cantElementosAgrupados;

            clusterMarkerStyle.getText().setText(`${texto}`);
            return clusterMarkerStyle;
        },
    };

    clusterLayer = new ol.layer.AnimatedCluster({
        animationDuration: 500, // Duración de la animación en milisegundos
        name: 'Cluster',
        source: clusterSource,
        // Use a style function for cluster symbolisation
        style: function (feature) {
            return clusterLayerStyle[tipoAgrupamiento](feature)
        },
    });


    map.addLayer(clusterLayer);
}


// Animated Cluster Styling
var clusterStyleCache = {};

function agruparPorColores(feature, resolution) {
    var cantElemAgrupados = feature.get('features').length;
    var animatedClusterStyle = clusterStyleCache[cantElemAgrupados];
    if (!animatedClusterStyle) {
        var color = cantElemAgrupados > 10 ? "192,0,0" : cantElemAgrupados > 5 ? "255,128,0" : "0,128,0";
        var radius = Math.max(8, Math.min(cantElemAgrupados * 0.75, 20));
        var dash = 2 * Math.PI * radius / 6;
        var dash = [0, dash, dash, dash, dash, dash, dash];
        animatedClusterStyle = clusterStyleCache[cantElemAgrupados] = [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    stroke: new ol.style.Stroke({
                        color: "rgba(" + color + ",0.5)",
                        width: 15,
                        lineDash: dash
                    }),
                    fill: new ol.style.Fill({
                        color: "rgba(" + color + ",1)"
                    })
                }),
                text: new ol.style.Text({
                    text: cantElemAgrupados.toString(),
                    fill: new ol.style.Fill({
                        color: '#fff'
                    })
                })
            })
        ];
    }
    return animatedClusterStyle;
}


// ************************************************************************************

var sourceGeometry;
var layerGeometry;
var tipoGeometria;
var drawGeoemtry; // variable global para la interacción de dibujo
var currentPolygon; // variable para almacenar el polígono actual

function habilitarDibujarFiguras({
    idSelect,
    actions,
}) {

    sourceGeometry = new ol.source.Vector({
        wrapX: false
    });

    layerGeometry = new ol.layer.Vector({
        source: sourceGeometry,
        style: function (feature) {
            // Función de estilo que se ejecuta para cada característica en la capa

            let featureData = feature.get("data");
            let color = featureData !== undefined ? featureData.color : "#2196f3";
            let nombre = featureData !== undefined ? featureData.nombre : "";

            var styles = [
                // Un arreglo que contiene un único estilo para la característica

                new ol.style.Style({
                    // Crear un estilo con diferentes propiedades como fill, stroke, image, y text

                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    // Establecer el relleno del polígono con un color semitransparente

                    stroke: new ol.style.Stroke({
                        color,
                        width: 2
                    }),
                    // Establecer el contorno del polígono con un color y ancho específicos

                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color
                        })
                    }),
                    // Establecer un círculo como imagen en el caso de puntos

                    text: new ol.style.Text({
                        text: nombre, // Obtener el valor de la propiedad 'nombre' de la característica
                        offsetY: -15, // Ajustar la posición vertical del texto

                        fill: new ol.style.Fill({
                            color: '#ffffff'
                        }),
                        // Establecer el color de relleno del texto

                        stroke: new ol.style.Stroke({
                            color: '#000000',
                            width: 3
                        })
                        // Establecer el contorno del texto con un color y ancho específicos
                    })
                })
            ];

            return styles;
            // Devolver el arreglo de estilos
        }

    });


    // Crear el elemento div
    const divElement = document.getElementById(idSelect);
    // const divElement = document.createElement('div');
    // divElement.id = 'tipoGeometriasContainer';

    // Crear la etiqueta label
    const labelElement = document.createElement('label');
    labelElement.textContent = 'Tipo de Geometria';
    labelElement.setAttribute('for', 'type');

    // Crear el elemento select
    const selectElement = document.createElement('select');
    selectElement.id = 'tipoGeometria';

    // Crear las opciones del select
    const options = [{
            value: 'None',
            text: 'Cursor'
        },
        {
            value: 'Point',
            text: 'Punto'
        },
        {
            value: 'LineString',
            text: 'Linea Recta'
        },
        {
            value: 'Polygon',
            text: 'Poligono'
        },
        {
            value: 'Circle',
            text: 'Circular'
        },
        {
            value: 'Delete',
            text: 'Eliminar'
        },
        {
            value: 'Modify',
            text: 'Modificar'
        },
        {
            value: "Move",
            text: "Desplazar"
        }
    ];

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        selectElement.appendChild(optionElement);
    });

    // // Crear el botón
    // const buttonElement = document.createElement('button');
    // buttonElement.id = 'deshacerTipoGeometria';
    // buttonElement.textContent = 'Deshacer';

    // Agregar los elementos al div
    divElement.appendChild(labelElement);
    divElement.appendChild(selectElement);
    // divElement.appendChild(buttonElement);

    // Agregar el div al documento
    // document.body.appendChild(divElement);

    selectElement.value = "None";
    tipoGeometria = selectElement;

    map.addLayer(layerGeometry);

    addInteractionDrawGeometry({
        actions,
        layer: layerGeometry
    });

    tipoGeometria.addEventListener('change', function () {
        map.removeInteraction(drawGeoemtry);
        addInteractionDrawGeometry({
            actions,
            layer: layerGeometry
        });
    });

    // document.getElementById('deshacerTipoGeometria').addEventListener('click', function () {
    //     drawGeoemtry.removeLastPoint();
    // });

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'z') {
            drawGeoemtry.removeLastPoint();
        }
    });




}



function addInteractionDrawGeometry({
    actions,
    layer
}) {
    var value = tipoGeometria.value;
    let tipoInteraccionSeleccionada = value;
    let tipoInteraccionDibujar = ["Point", "LineString", "Polygon", "Circle"]

    map.un('click', eliminarFiguraDelMapa);
    map.un('click', eventoAlSeleccionarFeature);
    removeSelectInteraction()
    removeModifyInteraction()
    removeMoveInteraction()

    let tipoInteraccionFeatures = {
        "None": () => {
            // map.on('click', eventoAlSeleccionarFeature);

            addSelectInteraction({
                actionSelect: actions.actionSelect,
                actionSelectEnd: actions.actionSelectEnd,
                layer
            })

        },
        "Modify": () => {
            // map.on('click', eventoAlSeleccionarFeature);

            addModifyInteraction({
                layer,
                actionModifyEnd: actions.actionModifyEnd
            })

        },
        "Delete": () => {
            // Activar el modo de eliminación
            // map.getTargetElement().style.cursor = 'default';+

            // Agregar event listener al mapa para capturar eventos de clic
            map.on('click', (event) => {
                eliminarFiguraDelMapa({
                    event,
                    actionDelete: actions.actionDelete
                })
            });
        },
        "Move": () => {

            addMoveInteraction({
                layer,
                actionMoveEnd: actions.actionMoveEnd
            })
        },
        "DibujarFigura": () => {
            addDrawInteraction({
                actionDrawEnd: actions.actionDrawEnd
            })
        },

    }

    if (tipoInteraccionDibujar.includes(tipoInteraccionSeleccionada)) {
        tipoInteraccionSeleccionada = "DibujarFigura"
    }

    tipoInteraccionFeatures[tipoInteraccionSeleccionada]();

}

function eliminarFiguraDelMapa({
    event,
    actionDelete
}) {
    // Obtener la característica seleccionada
    const selectedFeature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
    });

    // Verificar si se seleccionó una característica
    if (selectedFeature) {

        let texto = "¿Desea eliminar esta característica?";
        let featureData = selectedFeature.get("data");

        if (featureData && featureData.nombre) texto = `¿Desea eliminar ${featureData.nombre}?`;

        const deleteGeometryDialog = app.dialog.create({
            title: "Atención",
            text: texto,
            cssClass: "custom-dialog",
            closeByBackdropClick: false,
            buttons: [{
                text: "Cancelar",
                onClick: async () => {
                    deleteGeometryDialog.close()
                },
            }, {
                text: "Aceptar",
                onClick: async () => {
                    await actionDelete(featureData)
                    sourceGeometry.removeFeature(selectedFeature);
                },
            }, ],
        });


        deleteGeometryDialog.open()



    }
}

function cargarFiguras(arrJsonGeoemtria) {

    if (!Array.isArray(arrJsonGeoemtria)) arrJsonGeoemtria = [arrJsonGeoemtria];

    // Limpiar la capa vectorial antes de agregar nuevas geometrías
    sourceGeometry.clear();

    // Iterar sobre las geometrías guardadas y agregarlas al mapa
    arrJsonGeoemtria.forEach(geometria => {
        if (geometria.tipoGeometria === 'Circle') {

            agregarAreaCircular({
                latitudCirculo: geometria.centro[1],
                longitudCirculo: geometria.centro[0],
                radioCirculo: geometria.radio / 1000,
                agregarCirculo: true,
                layer: layerGeometry,
                data: geometria
            })
        } else {
            // Dibujar otras geometrías
            var feature = new ol.Feature({
                geometry: new ol.geom[geometria.tipoGeometria](geometria.coordenadas),
            });

            feature.set('data', geometria);

            if (geometria.tipoGeometria == "Point") {
                let markerIcon = new ol.style.Icon(optionIcon["flag1"]);

                let featurerStyle = new ol.style.Style({
                    image: markerIcon,
                    text: new ol.style.Text({
                        text: geometria.nombre, // Obtener el valor de la propiedad 'nombre' de la característica
                        offsetY: -15, // Ajustar la posición vertical del texto

                        fill: new ol.style.Fill({
                            color: '#ffffff'
                        }),
                        // Establecer el color de relleno del texto

                        stroke: new ol.style.Stroke({
                            color: '#000000',
                            width: 3
                        })
                        // Establecer el contorno del texto con un color y ancho específicos
                    })
                });
                feature.setStyle(featurerStyle);

            }

            sourceGeometry.addFeature(feature);
        }

    });

}


// function cargarFiguras() {
//     // Cargar puntos del polígono
//     const storedPolygonData = localStorage.getItem('polygonData');


//     if (storedPolygonData) {
//         // Convertir los datos almacenados al formato de coordenadas
//         const storedCoordinates = JSON.parse(storedPolygonData);

//         // Crear una característica a partir de las coordenadas
//         const storedPolygon = new ol.Feature(new ol.geom.Polygon(storedCoordinates));

//         // Añadir la característica a la capa vectorial
//         vector.getSource().addFeature(storedPolygon);

//         // Ajustar la vista del mapa para mostrar el polígono cargado
//         // const extent = storedPolygon.getGeometry().getExtent();
//         // map.getView().fit(extent, {
//         //     padding: [20, 20, 20, 20]
//         // });
//     }
// }

function centerFeature({
    feature
}) {
    const extent = feature.getGeometry().getExtent();

    map.getView().fit(extent, {
        padding: [20, 20, 20, 20],
        duration: 1000
    });
}

function selectFeature({
    layerInteraction,
    selectedFeature,
    action = false
}) {

    // // Verificar si la feature es un círculo
    // if (selectedFeature.getGeometry() instanceof ol.geom.Circle) {
    //     // Mostrar información específica del círculo
    //     showCircleInfo(selectedFeature);
    // } else {
    //     // Mostrar información genérica para otras geometrías
    //     showFeatureInfo(selectedFeature);
    // }

    // Obtener la colección de características seleccionadas
    var previousSelectedFeatures = layerInteraction.getFeatures();

    // Limpiar la selección existente
    previousSelectedFeatures.clear();

    // Agregar la característica programática a la selección
    previousSelectedFeatures.push(selectedFeature);

    // Realizar acciones con la característica seleccionada
    // currentPolygon = selectedFeature

    // console.log('Feature selected:', selectedFeature);
    // console.log('Feature selected data:', selectedFeature.get("data"));
    // console.log('Feature selected geometry:', selectedFeature.getGeometry());

    // let geometria = getGeometryData({
    //     geometry: selectedFeature.getGeometry(),
    //     tipoGeometria: selectedFeature.get("data").tipoGeometria
    // })

    // ejecutar accion asociada al evento del mapa
    if (action) {
        action(selectedFeature.get("data"))
    }

    centerFeature({
        feature: selectedFeature
    })
}


function getFeatureData({
    feature
}) {
    let geometria = {
        tipoGeometria: null,
        centro: null,
        radio: null,
        coordenadas: null,
    }

    // Obtener la geometría de la característica
    var geometry = feature.getGeometry();

    if (geometry instanceof ol.geom.Circle) {
        // Es un círculo
        geometria.tipoGeometria = 'Circle';
        geometria.centro = geometry.getCenter();
        geometria.radio = geometry.getRadius();
    } else if (geometry instanceof ol.geom.Point) {
        // Es un punto
        geometria.tipoGeometria = 'Point';
        geometria.coordenadas = geometry.getCoordinates();
    } else if (geometry instanceof ol.geom.LineString) {
        // Es una línea
        geometria.tipoGeometria = 'LineString';
        geometria.coordenadas = geometry.getCoordinates();
    } else if (geometry instanceof ol.geom.Polygon) {
        // Es un polígono
        geometria.tipoGeometria = 'Polygon';
        geometria.coordenadas = geometry.getCoordinates();
    } else if (geometry instanceof ol.geom.GeometryCollection) {
        // Es una coleccion de geometrias

        // La geometría del círculo está en la primera parte de la colección
        var circleGeometry = geometry.getGeometries()[1];

        // Obtener el centro del círculo
        var center = circleGeometry.getCenter();

        // Obtener el radio del círculo
        var radius = circleGeometry.getRadius();

        geometria.tipoGeometria = 'Circle';
        geometria.centro = center;
        geometria.radio = radius;


    } else {
        // Otro tipo de geometría
        geometria.tipoGeometria = 'Unknown';
    }

    return geometria;
}


function getGeometryData({
    geometry,
    tipoGeometria
}) {

    let geometria = {
        tipoGeometria,
        centro: null,
        radio: null,
        coordenadas: null,
    }

    if (tipoGeometria === 'Circle') {
        const center = geometry.getCenter();
        const radius = geometry.getRadius();

        geometria.centro = center;
        geometria.radio = radius;

    } else {
        const coordinates = geometry.getCoordinates();
        geometria.coordenadas = coordinates;
    }

    return geometria;
}

function getFeaturesCoordinate({
    coordinate,
    layer
}) {
    // Obtener todas las características en la ubicación del clic
    var features = layer.getSource().getFeaturesAtCoordinate(coordinate);

    return features;
}


function addDrawInteraction({
    actionDrawEnd
}) {
    // Desactivar el modo de eliminación
    // map.getTargetElement().style.cursor = '';

    // Agregar la interacción de dibujo
    drawGeoemtry = new ol.interaction.Draw({
        source: sourceGeometry,
        type: tipoGeometria.value,
    });
    map.addInteraction(drawGeoemtry);
    drawGeoemtry.on('drawend', function (event) {
        currentPolygon = event.feature.getGeometry()

        let geometria = getGeometryData({
            geometry: currentPolygon,
            tipoGeometria: tipoGeometria.value
        })

        actionDrawEnd({
            geometria,
            accion: "nuevaGeometria"
        })

        // // Convertir las coordenadas a un formato de tu elección
        // const polygonData = JSON.stringify(currentPolygon);

        // // Guardar en localStorage
        // localStorage.setItem('polygonData', polygonData);
    });
}


function showCircleInfo(circleFeature) {
    // Obtener la geometría del círculo
    var circleGeometry = circleFeature.getGeometry();

    // Obtener el centro del círculo
    var centerCoordinates = circleGeometry.getCenter();

    // Obtener el radio del círculo
    var radius = circleGeometry.getRadius();

    // Mostrar información en la consola (o en la interfaz de usuario)
    console.log('Coordenadas del centro:', centerCoordinates);
    console.log('Radio:', radius);

    // Centrar la vista en el círculo seleccionado
    centerFeature({
        feature: circleFeature
    });
}


function showFeatureInfo(feature) {
    // Obtener las coordenadas del centro de la feature
    var centerCoordinates = ol.extent.getCenter(feature.getGeometry().getExtent());

    // Mostrar información en la consola (puedes adaptarlo para mostrarlo en la interfaz de usuario)
    console.log('Coordenadas del centro:', centerCoordinates);

    // Mostrar el radio si la feature tiene una propiedad 'radio'
    if (feature.get('radio')) {
        console.log('Radio:', feature.get('radio'));

    }

    // Mostrar otras propiedades o información según sea necesario
    // ...

}

function addSelectInteraction({
    layer,
    actionSelect,
    actionSelectEnd,
}) {
    // Crear una interacción de selección
    var selectInteraction = new ol.interaction.Select({
        layers: [layer], // Especifica la capa a la que se aplicará la interacción
        condition: ol.events.condition.click, // Define la condición del evento (en este caso, clic)
        hitTolerance: 5, // Ajusta este valor según tus necesidades
    });

    // Agregar la interacción al mapa
    map.addInteraction(selectInteraction);


    // Manejar el evento de clic en la selección
    selectInteraction.on('select', function (event) {

        if (event.selected.length > 0) {


            var selectedFeature = getFeaturesCoordinate({
                coordinate: event.mapBrowserEvent.coordinate,
                layer
            });

            if (selectedFeature.length == 0) selectedFeature = event.selected;

            selectFeature({
                layerInteraction: selectInteraction,
                selectedFeature: selectedFeature[selectedFeature.length - 1], //por defecto se selecciona la feature que esta mas por debajo de todas dentro del area seleccionada
                action: actionSelect
            })


            // // Seleccionar una característica
            // var selectedFeature = event.selected[0];


        } else {
            // // Desseleccionar la característica
            // var deselectedFeature = event.deselected[0];
            // // Realizar acciones con la característica desseleccionada
            // console.log('Feature deselected:', deselectedFeature);
            actionSelectEnd()
        }
    });


}


// function modifyFeature({
//     layerInteraction,
//     selectedFeature
// }) {

//     console.log("antes", layerInteraction.features_)

//     layerInteraction.features_ = null;

//     // Asignar las características seleccionadas directamente a la interacción de modificación
//     layerInteraction.features_ = new ol.Collection([selectedFeature]);

//     console.log("despues", layerInteraction.features_)

//     // Realizar acciones con la característica seleccionada
//     console.log('Feature selected to modify:', selectedFeature.ol_uid);

//     centerFeature({
//         feature: selectedFeature
//     })
// }



function addModifyInteraction({
    layer,
    actionModifyEnd
}) {
    // Crear una interacción de selección
    var selectInteraction = new ol.interaction.Select({
        layers: [layer], // Especifica la capa a la que se aplicará la interacción
        condition: ol.events.condition.click // Define la condición del evento (en este caso, clic)
    });
    map.addInteraction(selectInteraction);

    // Crear una interacción de modificación
    var modifyInteraction = new ol.interaction.Modify({
        features: selectInteraction.getFeatures() // Utiliza las características seleccionadas por la interacción de selección
    });
    map.addInteraction(modifyInteraction);

    // Manejar eventos cuando se termina la modificación
    modifyInteraction.on('modifyend', function (event) {
        var modifiedFeature = event.features.item(0);

        let newFeatureData = getFeatureData({
            feature: modifiedFeature
        })

        actionModifyEnd({
            featureData: modifiedFeature.get("data"),
            newFeatureData
        })
    });

    // Manejar el evento de clic en la selección
    selectInteraction.on('select', function (event) {
        if (event.selected.length > 0) {
            // Seleccionar una característica
            var selectedFeature = getFeaturesCoordinate({
                coordinate: event.mapBrowserEvent.coordinate,
                layer
            });

            if (selectedFeature.length == 0) selectedFeature = event.selected;


            selectFeature({
                layerInteraction: selectInteraction,
                selectedFeature: selectedFeature[selectedFeature.length - 1], //por defecto se selecciona la feature que esta mas por debajo de todas dentro del area seleccionada
            })

            // modifyFeature({
            //     layerInteraction: modifyInteraction,
            //     selectedFeature: selectedFeature[0] //por defecto se selecciona la feature que esta mas por debajo de todas dentro del area seleccionada
            // })

        } else {
            // Desseleccionar la característica
            modifyInteraction.features_ = null;
        }
    });
}

function addMoveInteraction({
    layer,
    actionMoveEnd,
}) {
    // Crear la interacción Translate y agregarla al mapa
    var translate = new ol.interaction.Translate({
        layers: [layer], // Especifica la capa a la que se aplicará la interacción
    });

    map.addInteraction(translate);

    // Manejar el evento translateend
    translate.on('translateend', function (event) {
        var movedFeature = event.features.item(0);

        let newFeatureData = getFeatureData({
            feature: movedFeature
        })

        actionMoveEnd({
            featureData: movedFeature.get("data"),
            newFeatureData
        })
    });

}

function removeDrawInteraction() {
    // Quitar la interacción de selección
    map.getInteractions().forEach(function (interaction) {
        if (interaction instanceof ol.interaction.Draw) {
            map.removeInteraction(interaction);
        }
    });
}

function removeMoveInteraction() {
    // Quitar la interacción de selección
    map.getInteractions().forEach(function (interaction) {
        if (interaction instanceof ol.interaction.Translate) {
            map.removeInteraction(interaction);
        }
    });
}

function removeSelectInteraction() {
    // Quitar la interacción de selección
    map.getInteractions().forEach(function (interaction) {
        if (interaction instanceof ol.interaction.Select) {
            map.removeInteraction(interaction);
        }
    });
}

function removeModifyInteraction() {
    // Quitar la interacción de modificación
    map.getInteractions().forEach(function (interaction) {
        if (interaction instanceof ol.interaction.Modify) {
            map.removeInteraction(interaction);
        }
    });
}



// *******************************************************************************
function agregarAreaCircular({
    latitudCirculo,
    longitudCirculo,
    radioCirculo,
    agregarCirculo = false,
    layer = false,
    data = {}

}) {

    return new Promise(resolve => {
        var center = ol.proj.fromLonLat([longitudCirculo, latitudCirculo], 'EPSG:4326', 'EPSG:3857'); // la coordenada del centro
        // var radioCirculo = 5; // radio del círculo en km

        // Crear un punto en el centro
        var point = new ol.geom.Point(center);

        // Crear un círculo con el radio en metros
        var circle = new ol.geom.Circle(center, radioCirculo * 1000);

        // Crear una característica que combine el punto y el círculo
        var feature = new ol.Feature({
            geometry: new ol.geom.GeometryCollection([point, circle])
        });

        // Nuevo: Agregar el título si está presente
        feature.set('data', data);

        if (!layer) {
            // Crear una capa para mostrar la característica
            layer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: []
                }),
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            });



        }


        layer.getSource().addFeature(feature);


        if (!layer && agregarCirculo) {
            map.addLayer(layer);
        }

        resolve(circle)

    })
}

async function estoyEnArea({
    latitudCirculo,
    longitudCirculo,
    radioCirculo,
    latitudDeterminar,
    longitudDeterminar,
    agregarCirculo = false
}) {

    return new Promise(async (resolve) => {
        let circle = await agregarAreaCircular({
            latitudCirculo,
            longitudCirculo,
            radioCirculo,
            agregarCirculo
        })

        var pointIn = ol.proj.fromLonLat([longitudDeterminar, latitudDeterminar]); // punto a verificar

        if (circle.intersectsCoordinate(pointIn)) {
            // alert('El punto está dentro del círculo.');
            resolve(true)
        } else {
            // alert('El punto está fuera del círculo.');
            resolve(false)
        }
    })

}


// ************************************************************************************************************



function puntoEnArea({
    latitudPunto,
    longitudPunto,
    areas
}) {
    // Crear una capa para mostrar la característica
    // let layer = new ol.layer.Vector({
    //     source: new ol.source.Vector({
    //         features: []
    //     }),
    //     style: new ol.style.Style({
    //         fill: new ol.style.Fill({
    //             color: 'rgba(255, 255, 255, 0.2)'
    //         }),
    //         stroke: new ol.style.Stroke({
    //             color: '#ffcc33',
    //             width: 2
    //         }),
    //         image: new ol.style.Circle({
    //             radius: 7,
    //             fill: new ol.style.Fill({
    //                 color: '#ffcc33'
    //             })
    //         })
    //     })
    // });
    // map.addLayer(layer);

    // Verificar si el punto está dentro de un polígono
    function puntoEnPoligono(punto, coordenadas) {
        const polygon = new ol.geom["Polygon"]([coordenadas]);

        // var feature = new ol.Feature({
        //     geometry: polygon,
        // });

        // // Añadir la característica a la capa vectorial
        // layer.getSource().addFeature(feature);

        return polygon.intersectsCoordinate(punto);
    }

    // Verificar si el punto está dentro de un círculo
    function puntoEnCirculo(punto, centro, radio) {
        const circle = new ol.geom.Circle(centro, radio);
        return circle.intersectsCoordinate(punto) || ol.sphere.getDistance(centro, punto) <= radio;
    }

    const puntoTransformado = ol.proj.transform([longitudPunto, latitudPunto], 'EPSG:4326', 'EPSG:3857');

    for (let i = 0; i < areas.length; i++) {
        const area = areas[i];

        if (area.tipo === 'Polygon') {
            // Es un polígono
            if (puntoEnPoligono(puntoTransformado, area.coordenadas)) {
                return area;
            }
        } else if (area.tipo === 'Circle') {
            // Es un círculo
            // const centroTransformado = ol.proj.transform(area.centro, 'EPSG:4326', 'EPSG:3857');
            if (puntoEnCirculo(puntoTransformado, area.centro, area.radio)) {
                return area;
            }
        }
    }

    return false;
}





// ************************************************************************************************************
// Para personalizar el mapa de google

function getEncodedStyles(styles) {
    var ret = "";
    var styleparse_types = {
        "all": "0",
        "administrative": "1",
        "administrative.country": "17",
        "administrative.land_parcel": "21",
        "administrative.locality": "19",
        "administrative.neighborhood": "20",
        "administrative.province": "18",
        "landscape": "5",
        "landscape.man_made": "81",
        "landscape.natural": "82",
        "poi": "2",
        "poi.attraction": "37",
        "poi.business": "33",
        "poi.government": "34",
        "poi.medical": "36",
        "poi.park": "40",
        "poi.place_of_worship": "38",
        "poi.school": "35",
        "poi.sports_complex": "39",
        "road": "3",
        "road.arterial": "50",
        "road.highway": "49",
        "road.local": "51",
        "transit": "4",
        "transit.line": "65",
        "transit.station": "66",
        "water": "6"
    };
    var styleparse_elements = {
        "all": "a",
        "geometry": "g",
        "geometry.fill": "g.f",
        "geometry.stroke": "g.s",
        "labels": "l",
        "labels.icon": "l.i",
        "labels.text": "l.t",
        "labels.text.fill": "l.t.f",
        "labels.text.stroke": "l.t.s"
    };
    var styleparse_stylers = {
        "color": "p.c",
        "gamma": "p.g",
        "hue": "p.h",
        "invert_lightness": "p.il",
        "lightness": "p.l",
        "saturation": "p.s",
        "visibility": "p.v",
        "weight": "p.w"
    };
    for (i = 0; i < styles.length; i++) {
        if (styles[i].featureType) {
            ret += "s.t:" + styleparse_types[styles[i].featureType] + "|";
        }
        if (styles[i].elementType) {
            if (!styleparse_elements[styles[i].elementType])
                console.log("style element transcription unkown:" + styles[i].elementType);
            ret += "s.e:" + styleparse_elements[styles[i].elementType] + "|";
        }
        if (styles[i].stylers) {
            for (u = 0; u < styles[i].stylers.length; u++) {
                var keys = [];
                var cstyler = styles[i].stylers[u]
                for (var k in cstyler) {
                    if (k == "color") {
                        if (cstyler[k].length == 7)
                            cstyler[k] = "#ff" + cstyler[k].slice(1);
                        else if (cstyler[k].length != 9)
                            console.log("malformed color:" + cstyler[k]);
                    }
                    ret += styleparse_stylers[k] + ":" + cstyler[k] + "|";
                }
            }
        }
        ret = ret.slice(0, ret.length - 1);
        ret += ","
    }

    return "https://mts0.google.com/vt/lyrs=m@221097413&hl=es_AR&src=app&x={x}&y={y}&z={z}&apistyle=" + encodeURIComponent(ret.slice(0, ret.length - 1));
}


function getEncodedStyles2(styles) {
    var ret = "";
    var styleparse_types = {
        "all": "0",
        "administrative": "1",
        "administrative.country": "17",
        "administrative.land_parcel": "21",
        "administrative.locality": "19",
        "administrative.neighborhood": "20",
        "administrative.province": "18",
        "landscape": "5",
        "landscape.man_made": "81",
        "landscape.natural": "82",
        "landscape.natural.landcover": "130",
        "landscape.natural.terrain": "131",
        "poi": "2",
        "poi.attraction": "37",
        "poi.business": "33",
        "poi.government": "34",
        "poi.medical": "36",
        "poi.park": "40",
        "poi.place_of_worship": "38",
        "poi.school": "35",
        "poi.sports_complex": "39",
        "road": "3",
        "road.arterial": "50",
        "road.highway": "49",
        "road.highway.controlled_access": "132",
        "road.local": "51",
        "transit": "4",
        "transit.line": "65",
        "transit.station": "66",
        "transit.station.airport": "133",
        "transit.station.bus": "134",
        "transit.station.rail": "135",
        "water": "6"
    };
    var styleparse_elements = {
        "all": "a",
        "geometry": "g",
        "geometry.fill": "g.f",
        "geometry.stroke": "g.s",
        "labels": "l",
        "labels.icon": "l.i",
        "labels.text": "l.t",
        "labels.text.fill": "l.t.f",
        "labels.text.stroke": "l.t.s"
    };
    var styleparse_stylers = {
        "color": "p.c",
        "gamma": "p.g",
        "hue": "p.h",
        "invert_lightness": "p.il",
        "lightness": "p.l",
        "saturation": "p.s",
        "visibility": "p.v",
        "weight": "p.w"
    };
    for (i = 0; i < styles.length; i++) {
        if (styles[i].featureType) {
            ret += "s.t:" + styleparse_types[styles[i].featureType] + "|";
        }
        if (styles[i].elementType) {
            if (!styleparse_elements[styles[i].elementType])
                console.log("style element transcription unkown:" + styles[i].elementType);
            ret += "s.e:" + styleparse_elements[styles[i].elementType] + "|";
        }
        if (styles[i].stylers) {
            for (u = 0; u < styles[i].stylers.length; u++) {
                var keys = [];
                var cstyler = styles[i].stylers[u]
                for (var k in cstyler) {
                    if (k == "color") {
                        if (cstyler[k].length == 7)
                            cstyler[k] = "#ff" + cstyler[k].slice(1);
                        else if (cstyler[k].length != 9)
                            console.log("malformed color:" + cstyler[k]);
                    }
                    ret += styleparse_stylers[k] + ":" + cstyler[k] + "|";
                }
            }
        }
        ret = ret.slice(0, ret.length - 1);
        ret += ","
    }

    return "https://mts0.google.com/vt/lyrs=m@221097413&hl=es_AR&src=app&x={x}&y={y}&z={z}&apistyle=" + encodeURIComponent(ret.slice(0, ret.length - 1));
}








function obtenerDireccion(latitud, longitud) {


    return new Promise(resolve => {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then(peticion => peticion.json())
            .then(res => {
                let data = res.display_name.split(',')

                let resultado = {
                    numeracion: data[0].trim(),
                    direccion: data[1].trim(),
                    barrio: data[2].trim(),
                    localidad: data[3].trim(),
                }

                resolve(resultado)
            })
            .catch(e => {
                console.log(e)
            })
    })

}


function buscarDireccionOS(direccion) {

    return new Promise(resolve => {

        fetch(`https://nominatim.openstreetmap.org/search?&q=${direccion},cordoba&viewbox=-64.057242%2C-31.307115%2C-64.310025%2C-31.560293&bounded=1&polygon=1&format=json&limit=5&addressdetails=1&countrycodes=AR&accept-language=es-AR`, {
                method: 'GET',
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => {

                let response = result.map(direccionData => {
                    let direccion = direccionData.display_name.split(
                        ",",
                        1)[0];

                    if (!!Number(direccion)) {
                        direccion = direccionData.display_name.split(
                                ",",
                                2)[
                                1] + " " + direccionData.display_name
                            .split(
                                ",",
                                2)[
                                0];
                    }
                    return {
                        display_name: direccion,
                        lat: direccionData.lat,
                        lon: direccionData.lon,
                    }
                })
                resolve(response)
            })
            .catch(error => console.log('error', error));
    })
}