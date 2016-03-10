// Esta librería tiene funciones para presentar una secuencia de diapositivas en una página. Funciona con capas o "div".

// VARIABLES GLOBALES
// ==================
// 
// MEDIDAS DE LA VENTANA
// ÉSTAS NO SE PUEDEN USAR PORQUE NO SON UNIVERSALES, NO FUNCIONAN EN IE.
//var anchoVentana = window.innerWidth; // el ancho de la ventana del navegador
//var altoVentana = window.innerHeight; // el alto de idem
// ÉSTAS PARECE QUE SÍ...
var anchoVentana = screen.availWidth * 0.88; // el ancho de la ventana del navegador
var altoVentana = screen.availHeight * 0.88; // el alto de idem
var altoancho = altoVentana / anchoVentana;

// MEDIDAS Y POSICIONES DE LAS DIVISIONES O CAPAS
var anchoDiap = anchoVentana * 0.5; // el ancho de la <div> de la diapositiva
var altoDiap = anchoDiap * altoancho; //el alto de idem
//var anchoDivThumbnails = anchoVentana * 0.2; // el alto de la <div> de las thumbnails
var anchoDivThumbnails = (anchoVentana - anchoDiap) / 2;
//var anchoDivThumbnails = anchoVentana - anchoDiap;
//var izdaDiap = anchoDivThumbnails; // posición izquierda (left) de la diapositiva
//var izdaDiap = anchoVentana - anchoDiap;
var izdaDiap = (anchoVentana - anchoDiap) / 2;
var arribaDiap = altoVentana * 0.05; // posición arriba (top) de idem
var altoDivThumbnails = altoDiap + arribaDiap; // el alto de la <div> de las thumbnails; hacemos que coincida su parte de abajo con la de la otra div.
var arribaDivThumbnails = 0;

// MEDIDAS Y POSICIONES DE LAS THUMBNAILS
var anchoThumbnail = anchoDivThumbnails * 0.3; // el ancho para las thumbnails
var altoThumbnail = anchoThumbnail * altoancho; // el alto para idem.

// VARIABLES PARA LAS CAPAS
var divActual = 0;
var coordenadaZ = -1; // profundidad de una capa o <div>, para que esté por encima o por debajo de otra.
var oculta = 'hidden';
var visible = 'visible';

// VARIABLES PARA EL TEMPORIZADOR
var cuenta, temporiz;

// PARA LA TABLA DE LA DIAPOSITIVA
var paddingTabla = anchoVentana * 0.02; // padding para la tabla que contiene la diapositiva

//=====================================================================================

// Función que genera layers o capas
function creaDiv(idDiv, izda, arriba, ancho, alto, visibilidad, contenido) {
  document.writeln('<div id="' + idDiv + '" style="position: absolute; overflow: none; left: ' + izda + 
  'px; top: ' + arriba + 'px; width: ' + ancho + 'px; height: ' + alto + 'px; visibility: ' + visibilidad + 
  '; z-Index = ' + (++ coordenadaZ) + '">' + contenido + '</div>');
} 
//=====================================================================================
// Función que genera diapositivas (como un constructor o así)
function diapositiva(nombreChica) {
  this.chica = nombreChica;
  //this.personaje = personaje;
  this.contenido =
    '<table width="' + anchoDiap + '" cellpadding="' + paddingTabla + 'px">' + '<tr>' + 
    '<td width="100%" valign="top" align = "center">' + 
    '<a href="' + nombreChica + '.html" onMouseOver="clearTimeout(temporiz); clearInterval(cuenta);" ' + 
    'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);"><img src="chicas/' + nombreChica + '.jpg" ' + 'style="heigth:' + (altoDiap - 2 * paddingTabla) + 
    'px; width:' + (anchoDiap - 2 * paddingTabla) + 'px;"></a>' +
    '<h3><i>' + nombreChica + '</i></h3>' +
    '</td>' +
    '</tr>' +
    '</table>'
  //window.alert('<img src="../chicas/' + nombreImagen + '.jpg" ' + 'heigth="200" width="400">');
  return this;
}
//============================================================================================
// Creamos un array con objetos "diapositiva" que se irán viendo en la página. Esto en una futura versión hay que hacerlo tomando los nombres de los .jpg's
// o algo así, que sea automático.
var juegoDiap = new Array(
  new diapositiva('Juanita'),
  new diapositiva('Mónica'),
  new diapositiva('Pepona'),
  new diapositiva('Vanessa')/*,
  new diapositiva('Monica'),
  new diapositiva('mikupuerro'),
  new diapositiva('tomoyaxtomoyo'),
  new diapositiva('taigaroskilla'),
  new diapositiva('saberburbujas')*/
);
//============================================================================================
// Función que convierte un texto en mayúsculas
function mayusculas(str) {return str.toUpperCase();}
//===============================================================================================


// Función que crea todas las layers y el menú
function generarPantalla() {
  //window.alert(anchoVentana + ', ' + altoVentana + '; ' + screen.availWidth + ', ' + screen.availHeight);
  var menuStr = '';
  menuStr += '<ul style="list-style-type:none; text-align: center;"><br />';
  menuStr += '<li style="font-size: 20px;">Nuestras Chicas<br /><br /></li>';
  // aquí en un futuro hay que automatizarlo con el directorio y tal...
  for(var i = 0; i < juegoDiap.length; i ++) {
    // Creamos los layers para cada personaje
    creaDiv('diapositiva' + i, izdaDiap, arribaDiap, anchoDiap, altoDiap, (i == 0 ? visible : oculta), juegoDiap[i].contenido);
    /*window.alert('<img src="chicas/' + juegoDiap[i].chlca + '.jpg" ' + 
    'style="heigth:50px; width:100px;">' + juegoDiap[i].chica + '</a></li><br />');*/
    // Creamos el menú para navegar por los layers
    // recordar: esto era para ponerles un marco a las imagenes, se ponia en <li>:  y en style: padding-top: 10px;" 
    menuStr += '<li class="imagenConNombre" style="width: ' + (anchoThumbnail + 20) + 'px; margin-left: auto; margin-right: auto;">\n\
    <a href="' + juegoDiap[i].chica + '.html" ' + 'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta); selectDIV(' + i + ');"' 
      + 'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);">' + '<img src="chicas/' + juegoDiap[i].chica + '.jpg" ' + 
    'style="heigth:' + altoThumbnail + 'px; width:' + anchoThumbnail + 'px;">' + '<br />' + juegoDiap[i].chica + '</a></li><br />';
  }
  menuStr += '</ul><br />';
  // Creamos el layer del menú
  //document.writeln(
  creaDiv('menuThumbnails', 0, arribaDivThumbnails, anchoDivThumbnails, altoDivThumbnails, visible, menuStr);
    //'<div style= "position: absolute; width: 40%; top: 0; text-align: center;">'//+ '<span style="text-align: center; margin-left: 50px; margin-right: 50px;">Nuestras Chicas</span><br />'
    //+ menuStr + '<div>'
  //);
  //genLayer('menu_guia', sWidPos - 204, 43, 200, 200, mostrarDIV, '<div id="menu_guia" style="tetx-align: center;">' + '<b>Nuestras chicas</b><br />' + menuStr + '</div>');
  imgAuto();
}
//================================================================================================================
function imgAuto() {
  cuenta = setInterval(function(){if(divActual == juegoDiap.length - 1) {selectDIV(0);} else {selectDIV(divActual + 1);}}, 2000);
}
// Función para ocultar las layers
function ocultarDiv(id) {
  refDiv(id).visibility = oculta;
}
//==================================================================================================================
// Función para mostrar las layers
function mostrarDiv(id) {
  refDiv(id).visibility = visible;
}
//=====================================================================================================================
// Función que referencia las divs
function refDiv(id) {
  return eval('document.getElementById("' + id + '").style');
}
//====================================================================================================================
// Función para seleccionar una diapositiva cuando el usuario navega por el menú
function selectDIV(nuevadiv) {
  ocultarDiv('diapositiva' + divActual);
  divActual = nuevadiv;
  mostrarDiv('diapositiva' + divActual);
}
//=======================================================================================================================
// Colocamos un mensaje de estado en la parte inferior del navegador
function statusInf() {
  window.status = 'Mensaajeeeeeeeeeeee';
}