    // var timestamps = ['06_13', '06_21', '07_13', '07_21'];
    // var options = ['lista', 'LT', 'LS', 'LP', 'UM', 'dead', 'ghost'];

    // var markers = L.markerClusterGroup();
    var geojsonLayer = new L.GeoJSON.AJAX("data/generated/sectii.json", {
      style: layerStyle,

      onEachFeature: onEachFeature,
      pointToLayer: function(feature, latlng) { return L.circleMarker(latlng) }
    });

    // markers.addLayer(geojsonLayer);

    // var romaniaShape= new L.GeoJSON.AJAX("data/gis/romania-borders.json", { style: stilGranita}).addTo(map);

    // var stilGranita = {
    //    "color": "SteelBlue",
    //    "weight": 1,
    //    "opacity": 1,
    //      "fillColor": "PaleTurquoise",
    //   // "fillOpacity": 1
    //    // "dashArray": "5, 5"
    // }
    //   var romaniaShape = new L.GeoJSON.AJAX("data/gis/romania-borders.json", { style: stilGranita} );

    var stilJudete = {
      "color": "LightSteelBlue",
      "weight": 2,
      "opacity": .6,
      "fillColor": "rgba(213, 239, 255, .85)",
      "fillOpacity": .5
      // "dashArray": "2, 6"
    }
    var judeteShape = new L.GeoJSON.AJAX("data/gis/ro_judete_poligon.json", { style: stilJudete });


    var map = L.map('map', {
      center: [46, 25],
      zoom: 7,
      zoomControl: false, // so we move zoom to the top right corner, see below
      minZoom: 6,
      maxZoom: 15,
      zoomDelta: 0.15, //not working in leaflet 0.7?
      // fullscreenControl: true,
      maxBounds: [
        [43, 18],
        [49.7, 31]
      ],
      // zoomControl:false ,
      // scrollWheelZoom: false,
      // layers: [romaniaShape, geojsonLayer]
      layers: [judeteShape, geojsonLayer]
    });
    judeteShape.setZIndex(1);
    geojsonLayer.setZIndex(2);


    // map.addLayer(markers);
    map.attributionControl.addAttribution("<b>Sursă date</b>: <a target='_blank' href='https://prezenta.bec.ro'>Biroul Electoral Central</a>");
    new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);
    // L.tileLayer.provider('Esri.WorldTopoMap').addTo(map);
    // L.tileLayer.provider('Esri.WorldTerrain').addTo(map);
    L.tileLayer.provider('CartoDB.Positron').addTo(map);
    // L.tileLayer.provider('Hydda.Full').addTo(map);
    // L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
    // L.tileLayer.provider('Stamen.Watercolor').addTo(map);
    // L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);
    // L.tileLayer.provider('Stamen.TonerLite').addTo(map);

    selectedLayer = document.getElementById('controlInfo').getAttribute("ts");
    selectedVar = document.getElementById('controlInfo').getAttribute("xvar");
    scaleLevel = document.getElementById('controlInfo').getAttribute("range");

    var titleBox = L.control({ position: 'topleft' });
    titleBox.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'mapTitle');
      this._div.innerHTML = "<h1>Prezența la vot la referendumul pentru modificarea Constituției.</h1> <span> &larr; <a href='https://votcorect.ro'>votcorect.ro</a> / sursă date : <a target='_blank' href='https://prezenta.bec.ro'>BEC</a> </span>";
      // this.update();
      return this._div;
    };
    titleBox.addTo(map);

    /* info box
    - - - - - - - - - - - - - - - - - - - - -  */

    var controlBox = L.control({ position: 'topright' });
    controlBox.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'controlBoxBox mapControl');
      this.update();
      return this._div;
    };
    controlBox.update = function(props) {
      this._div.innerHTML =
        '<div id="topControl">' +
        '<div id="timestamp" class="formControl"><span class="title">Timestamps</span>' +
        '<div class="controlItem"><span id="06_10" data-target="ts" class="button btn-toggle">S @10</span></div>' +
        '<div class="controlItem"><span id="06_13" data-target="ts" class="button btn-toggle">S @13</span></div>' +
        '<div class="controlItem"><span id="06_16" data-target="ts" class="button btn-toggle">S @16</span></div>' +
        '<div class="controlItem"><span id="06_19" data-target="ts" class="button btn-toggle">S @19</span></div>' +
        '<div class="controlItem"><span id="06_21" data-target="ts" class="button btn-toggle">S @21</span></div>' +
        '<div class="controlItem"><span id="07_10" data-target="ts" class="button btn-toggle">D @10</span></div>' +
        '<div class="controlItem"><span id="07_13" data-target="ts" class="button btn-toggle">D @13</span></div>' +
        '<div class="controlItem"><span id="07_16" data-target="ts" class="button btn-toggle">D @16</span></div>' +
        '<div class="controlItem"><span id="07_19" data-target="ts" class="button btn-toggle">D @19</span></div>' +
        '<div class="controlItem"><span id="07_21" data-target="ts" class="button btn-toggle clicked">D @21</span></div>' +
        '</div>' +
        '<div id="varSwitch"  class="formControl"><span class="title">Vars</span>' +
        '<div class="controlItem"><span id="prezenta" data-target="xvar" class="button btn-toggle">prezență</span></div>' +
        '<div class="controlItem"><span id="LS" data-target="xvar" class="button btn-toggle clicked">liste speciale</span></div>' +
        '<div class="controlItem"><span id="LP" data-target="xvar" class="button btn-toggle">liste permanente</span></div>' +
        '<div class="controlItem"><span id="UM" data-target="xvar" class="button btn-toggle">urne mobile</span></div>' +
        '<div class="controlItem"><span id="LT" data-target="xvar" class="button btn-toggle">total voturi</span></div>' +
        '<div class="controlItem"><span id="ghost" data-target="xvar" class="button btn-toggle">&lt; 5 voturi</span></div>' +
        '<div class="controlItem"><span id="dead" data-target="xvar" class="button btn-toggle">niciun vot</span></div>' +
        '<div class="controlItem"><span id="observatori" data-target="xvar" class="button btn-toggle">observatori</span></div>' +
        '</div><div class="formControl">' +
        '<div id="xzoom" class="controlItem"><span class="title">Scale</span><span class="button btn-toggle" id="zoomin">+</span><span class="button btn-toggle" id="zoomout">-</span>  </div>' +
        '<!--<div id="scaleWrapper"><input type="range" min="0.25" max="2" value="1" step=".25" class="slider" id="scale" onchange="scaleBubbles(this.value)"></div>-->' +
        '</div>' +
        '<!--<div class="controlItem legenda"><small><span><b>LS</b>: listă specială,</span><span><b>LP</b>: listă permanentă,</span><span><b>UM</b>: urnă mobilă, </span><span><b>LT</b>: total voturi</span><span><b>MV</b>: monitorizare vot</span></small></div></div>-->';
    };
    controlBox.addTo(map);
    /*end info bpx*/

    document.querySelector('#xzoom #zoomin').addEventListener("click", function() {
      currScaleLevel = Number(document.getElementById('controlInfo').getAttribute("range"));
      document.getElementById('controlInfo').setAttribute("range", Number(currScaleLevel) + .25);
      document.querySelector('#controlInfo .range').innerHTML = Number(currScaleLevel) + .25;
      scaleBubbles(Number(currScaleLevel) + .25)
    });

    document.querySelector('#xzoom #zoomout').addEventListener("click", function() {
      currScaleLevel = Number(document.getElementById('controlInfo').getAttribute("range"));
      document.getElementById('controlInfo').setAttribute("range", Number(currScaleLevel) - .25);
      document.querySelector('#controlInfo .range').innerHTML = Number(currScaleLevel) - .25;
      scaleBubbles(Number(currScaleLevel) - .25)
    });

    /*
        switches selected var / timestamp
     */
    var toggles = document.querySelectorAll('.controlItem .btn-toggle')
    for (i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", function() {
        document.querySelector('#controlInfo .' + this.getAttribute("data-target")).innerHTML = this.id;
        document.getElementById('controlInfo').setAttribute(this.getAttribute("data-target"), this.id);
        geojsonLayer.setStyle(layerStyle);

        // remove class='clicked' from all siblings
        let zzx = this.parentElement.parentElement.childNodes;
        for (i = 1; i < zzx.length; i++) {
          zzx[i].querySelector('.btn-toggle').classList.remove('clicked');
        }
        this.classList.add('clicked');
      });
    }

    function layerStyle(feature) {
      const max_radius = 50

      selectedLayer = document.getElementById('controlInfo').getAttribute("ts");
      selectedVar = document.getElementById('controlInfo').getAttribute("xvar");
      scaleLevel = document.getElementById('controlInfo').getAttribute("range");

      var xStyle = {
        // weight: 2,
        fillOpacity: 0.85,
        stroke: true
      };
      xStyle.color = "White";
      // xStyle.fillColor = "MediumSlateBlue";

      xStyle.radius = 0;
      switch (selectedVar) {
        case 'prezenta':
          value = feature.props.ts[selectedLayer]['LT'] / feature.props.pe_lista * 33;
          max = 330;
          break;
        case 'muchextra':
          value = feature.props.ts[selectedLayer]['LT'] - feature.props.ts[selectedLayer]['LP'] - feature.props.ts[selectedLayer]['LS'] - feature.props.ts[selectedLayer]['UM'] + 0;
          max = 50;
          break;
        case 'dead':
          value = feature.props.ts[selectedLayer]['LT'] == 0 ? 5 : 0;
          max = 50;
          break;
        case 'lista':
          value = feature.props.pe_lista;
          max = 5600;
          break;
        case 'ghost':
          value = (feature.props.ts[selectedLayer]['LT'] <= 5) && (feature.props.ts[selectedLayer]['LT'] >= 0) ? 5 : 0;
          max = 50;
          break;
        case 'LP':
          value = feature.props.ts[selectedLayer][selectedVar] / 3;
          max = 1527;
          break;
        case 'LS':
          value = feature.props.ts[selectedLayer][selectedVar];
          max = 1000;
          break;
        case 'UM':
          value = feature.props.ts[selectedLayer][selectedVar] / 2;
          max = 500;
          break;
        case 'LT':
          value = feature.props.ts[selectedLayer][selectedVar] / 3;
          max = 1600;
          break;
        case 'observatori':
          value = feature.props.observatori ? 5 : 0;
          max = 50;
          break;
        case 'extremes':
          // here we should record the biggest change
          break;
        default:
          value = feature.props.ts[selectedLayer][selectedVar];
          max = 1000;
      }

      xStyle.radius = Math.round(value * max_radius / max, 0) * scaleLevel;
      xStyle.fillColor = getColor(value, max);
      xStyle.weight = value >> 0 ? 2 : 0;
      return xStyle;
    }


    // Add custom popups to each using our custom feature properties
    geojsonLayer.on("layeradd", function(e) {
      var marker = e.layer,
        feature = marker.feature;

      // Create custom popup content
      var out = "<header><strong>" + feature.props.nume + "</strong>, ";
      out += "" + feature.props.localitate + " – " + feature.props.jud + feature.props.nr + "<br/>Înscriși pe lista: <b>" + feature.props.pe_lista + "</b></header>";
      // out += JSON.stringify(feature.props.ts, null, 2)
      out += locationProfie(feature.props.ts, feature.props.pe_lista);
      var popupContent = out;

      marker.bindPopup(popupContent, {
        closeButton: true,
        minWidth: 200
      });
    });


    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        click: highlightFeature,
        mouseout: resetHighlight,
        // mousedown: window.alert("sometext")
        // click: openUrl
      });
    }

    function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
        weight: 7,
        color: 'Red',
        fillColor: 'Yellow',
        // "fillOpacity": 1
      });

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }

      // info.update(layer.feature.props);
    }


    function resetHighlight(e) {
      geojsonLayer.resetStyle(e.target);
      // info.update();
    }


    function scaleBubbles(xvalue) {
      // document.querySelector('#controlInfo .range').innerHTML=value;
      // document.getElementById('scale').innerHTML = xvalue;
      // document.getElementById('scale').value = xvalue;
      document.getElementById('controlInfo').setAttribute("range", xvalue);
      document.querySelector('#controlInfo .range').innerHTML = xvalue;
      geojsonLayer.setStyle(layerStyle);
    }

    function locationProfie(xjson, prezenta) {
      // return JSON.stringify(xjson);
      let xout = '<div class="locBadge">';
      xout += '<table ><thead><tr> <th>tstamp</th><th>LP</th><th>LS</th><th>UM</th><th>LT</th><th>prezență</th></tr></thead><tbody>';

      let svgplotLS = '';
      let svgplotLT = '';
      let svgdataLS = [];
      let svgdataPrez = [];
      let last = '';
      for (var timestamp in xjson) {
        if (xjson.hasOwnProperty(timestamp)) {
          xout += '<tr>';
          xout += "<td>" + timestamp + "</td>";
          xout += " <td class=x" + xjson[timestamp]['LP'] + ">" + xjson[timestamp]['LP'] + '</td>';
          xout += " <td class=x" + xjson[timestamp]['LS'] + ">" + xjson[timestamp]['LS'] + '</td>';
          xout += " <td class=x" + xjson[timestamp]['UM'] + ">" + xjson[timestamp]['UM'] + '</td>';
          xout += " <td class=x" + xjson[timestamp]['LT'] + ">" + xjson[timestamp]['LT'] + '</td>';
          xout += " <td class='prezenta x" + xjson[timestamp]['LT'] + "'>" + (xjson[timestamp]['LT'] * 100 / prezenta).toFixed(1) + '<small>&#37;</small></td>';
          xout += '</tr>';
          svgdataLS[timestamp] = xjson[timestamp]['LS'];
          svgdataPrez[timestamp] =(xjson[timestamp]['LT'] * 1000 / prezenta).toFixed(0)
          last = timestamp;
          // svgplot += ii*20 + ',' + xjson[timestamp]['LS']/10 + ' ';

        }
      }
/*   sparkline = '<svg class="sparkline x' + timestamp + xjson[timestamp]['LP'] + xjson[timestamp]['LT'] +'" width="100" height="30" stroke-width="3"></svg>';
      xout += '</table>' + sparkline + '</div>';
      sparkline(document.querySelector('x' + timestamp + xjson[timestamp]['LP'] + xjson[timestamp]['LT'] + ''), ['      + svgplot +']);*/
      let ii = 0;
      let beforeLS = 0;
      for (oneTs in svgdataLS) {
        // console.log(oneTs);
        svgplotLS += ii * 30 + ',' + (Number(svgdataLS[last]) - Number(svgdataLS[oneTs])) / 5 + ' ' +
          (ii * 30 + 15) + ',' + (Number(svgdataLS[last]) - Number(svgdataLS[oneTs])) / 5 + ' ';
        // svgplot += ii*30 + ',' + (Number(svgdataLS[oneTs]) - beforeLS )+ ' ';
        beforeLS = Number(svgdataLS[oneTs]);
        ii++;
      }
      svgplotLS = '<svg viewBox="0 0 300 140"  width="140" height="100" class="xchart"><g class="labels x-labels"><text x="5" y="5" class="label-title">Liste speciale</text></g><polyline fill="none" stroke="red" stroke-width="4" points=" ' + svgplotLS + '"/></svg>';

      ii = 0;
      let beforeLT = 0;
      for (oneTs in svgdataPrez) {
        // console.log(oneTs);
        svgplotLT += ii * 30 + ',' + (Number(svgdataPrez[last]) - Number(svgdataPrez[oneTs])) / 5 + ' ' +
          (ii * 30 + 15) + ',' + (Number(svgdataPrez[last]) - Number(svgdataPrez[oneTs])) / 5 + ' ';
        // svgplot += ii*30 + ',' + (Number(svgdataPrez[oneTs]) - beforeLT )+ ' ';
        beforeLT = Number(svgdataPrez[oneTs]);
        ii++;
      }
      svgplotLT = '<svg viewBox="0 0 300 140"  width="140" height="100" class="xchart"><g class="labels x-labels"><text x="5" y="5" class="label-title">Prezență</text></g><polyline fill="none" stroke="blue" stroke-width="4" points=" ' + svgplotLT + '"/></svg>';

      xout += '</table>' + svgplotLS + svgplotLT + '</div>';
      return xout;
    }


    function getColor(d, max) {
      // x = Math.round(d / 2, 0);

      /*  COLOR
      H:  0/360° reds, 120° greens, 240° blues */

      /* SATURATION
      S: 0-100%
      0 → 50
      max → 100
      */
      // sat = d - max + 100;
      sat = Math.round(d * 50 / max) + 50;
      if (sat >> 100) sat == 100;
      if (sat << 50) sat == 50;
      /* LIGTNESS
      L: 0 - 100%  0 = white, 100 = black
      0 → 0
      max → 50
      */
      // light = Math.round(d/max, 0) + 49
      light = Math.round(d * 50 / max);
      /* ALPHA
      A: 0 - 1
      0 → 0
      1 → 1
      */
      // alpha = Math.round(d/max)

      // return 'hsla(350,' + sat + '%,' + light + '%,' + alpha + ')';
      return 'hsla(350,' + sat + '%,' + light + '%)';

    }