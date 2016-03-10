// Esta librería tiene funciones para presentar una secuencia de diapositivas en una página. Funciona con capas o "div".
// ESTE JAVASCRIPT TIENE FALLOS Y TODAVÍA NO TIRA EL POBRE XDDD
// VARIABLES GLOBALES
// Definimos unas variables para las layers o capas (<div>)
var dWidLyr = 450;
var dHgtLyr = 450;
var layerActual = 0;
var zIdx = -1;

// Reajustamos las variables de las layers a la resolución de pantalla del usuario
var sWidPos = screen.availWidth / 2 - dWidLyr / 2;
var sHgtPos = screen.availHeight / 2 - dHgtLyr / 2;
var ocultarDIV = 'hidden';
var mostrarDIV = 'visible';
var cuenta, temporiz, diaposelec = 0;

//=====================================================================================

// Función que genera layers o capas
function genLayer(sName, sLeft, sTop, sWdh, sHgt, sVis, chica) {
  document.writeln('<div id="' + sName + '" style= "position: absolute; overflow: none; left: ' + sLeft + 
  'px; top: ' + sTop + 'px; width: ' + sWdh + 'px; height: ' + sHgt + 'px; visibility: ' + sVis + 
  '; z-Index = ' + (++ zIdx) + '">' + chica + '</div>');
} 
//=====================================================================================
// Función que genera diapositivas (como un constructor o así)
function diapositiva(chica) {
  this.name = chica;
  this.chica = chica;
  //this.personaje = personaje;
  this.contenido =
    '<table width="500" cellpadding="10">' + '<tr>' + 
    '<td width="100%" valign="top" align = "center">' + 
    '<a href="' + chica + '.html" onMouseOver="clearTimeout(temporiz); clearInterval(cuenta);" ' + 
    'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);"><img src="chicas/' + chica + '.jpg" ' + 'style="heigth:250px; width:500px;"></a>' +
    '<h3><i>' + chica + '</i></h3>' +
    '</td>' +
    '</tr>' +
    '</table>'
  //window.alert('<img src="../chicas/' + nombreImagen + '.jpg" ' + 'heigth="200" width="400">');
  return this;
}
//============================================================================================
// Creamos un array con objetos "diapositiva" que se irán viendo en la página
var juegoDiap = new Array(
  new diapositiva('Juanita'),
  new diapositiva('Pepona'),
  new diapositiva('Santa Mariaaaa'),
  new diapositiva('Vanessa'),
  new diapositiva('Monica'),
  new diapositiva('mikupuerro'),
  new diapositiva('tomoyaxtomoyo'),
  new diapositiva('taigaroskilla'),
  new diapositiva('saberburbujas')
);
//============================================================================================
// Función que convierte un texto en mayúsculas
function mayusculas(str) {return str.toUpperCase();}
//===============================================================================================


// Función que crea todas las layers y el menú
function generarPantalla() {
  var menuStr = '';
  menuStr += '<ul style="list-style-type:none; text-align: center;"><br />';
  menuStr += '<li style="font-size: 20px;">Nuestras Chicas<br /><br /></li>';
  for(var i = 0; i < juegoDiap.length; i ++) {
    // Creamos los layers para cada personaje
    genLayer('diapositiva' + i, sWidPos, 45, dWidLyr, dHgtLyr, (i == 0 ? mostrarDIV : ocultarDIV), juegoDiap[i].contenido);
    /*window.alert('<img src="chicas/' + juegoDiap[i].chlca + '.jpg" ' + 
    'style="heigth:50px; width:100px;">' + juegoDiap[i].chica + '</a></li><br />');*/
    // Creamos el menú para navegar por los layers
    // recordar: esto era para ponerles un marco a las imagenes, se ponia en <li>:  y en style: padding-top: 10px;" 
    menuStr += '<li class="imagenConNombre" style="width: 120px; margin-left: auto; margin-right: auto;"><a href="' + juegoDiap[i].chica + '.html" ' + 
      'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta); selectDIV(' + i + '); diaposelec = i;"' 
      + 'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);">' + '<img src="chicas/' + juegoDiap[i].chica + '.jpg" ' + 
    'style="heigth:50px; width:100px;">' + '<br />' + juegoDiap[i].chica + '</a></li><br />';
  }
  menuStr += '</ul><br />';
  // Creamos el layer del menú
  document.write(
    '<div style= "position: absolute; width: 40%; top: 0; text-align: center;">'//+ '<span style="text-align: center; margin-left: 50px; margin-right: 50px;">Nuestras Chicas</span><br />'
    + menuStr + '<div>'
  );
  //genLayer('menu_guia', sWidPos - 204, 43, 200, 200, mostrarDIV, '<div id="menu_guia" style="tetx-align: center;">' + '<b>Nuestras chicas</b><br />' + menuStr + '</div>');
  imgAuto();
}
//================================================================================================================
function imgAuto() {
  cuenta = setInterval(function(){if(diaposelec == juegoDiap.length) {diaposelec = 0;} selectDIV(diaposelec ++)}, 2000);
}
// Función para ocultar las layers
function ocultarLayer(name) {
  refLayer(name).visibility = ocultarDIV;
}
//==================================================================================================================
// Función para mostrar las layers
function mostrarLayer(name) {
  refLayer(name).visibility = mostrarDIV;
}
//=====================================================================================================================
// Función que referencia las layers
function refLayer(name) {
  return eval('document.getElementById("' + name + '").style');
}
//====================================================================================================================
// Función para seleccionar una diapositiva cuando el usuario navega por el menú
function selectDIV(ref) {
  ocultarLayer('diapositiva' + layerActual);
  layerActual = ref;
  mostrarLayer('diapositiva' + layerActual);
}
//=======================================================================================================================
// Colocamos un mensaje de estado en la parte inferior del navegador
function statusInf() {
  window.status = 'Personajes de anime';
}