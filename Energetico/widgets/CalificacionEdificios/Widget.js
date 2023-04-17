define([
  'dojo/_base/declare', 
  'dojo/dom',
  "dojo/on",
  "dojo/_base/lang",

  "esri/tasks/QueryTask",
  "esri/tasks/query",

  "esri/SpatialReference",
  "esri/graphic",
  "esri/geometry/Extent",

  "esri/symbols/SimpleLineSymbol",

  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/dijit/PopupTemplate",

  'jimu/BaseWidget'
],
  function(
    declare, 
    dom,
    on,
    lang,

    QueryTask,
    Query,

    SpatialReference,
    Graphic,
    Extent,

    SimpleLineSymbol,

    map,
    FeatureLayer,
    PopupTemplate,

    BaseWidget
    ) {
    return declare([BaseWidget], {

      baseClass: 'jimu-widget-customwidget',
      
      postCreate: function(){
        this.currentLayer = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[1].id)
        console.log("Map PTC",this.map);
        console.log("Layer PTC",this.currentLayer);
        
      },
      startup: function(){
        console.log("Layer STP",this.currentLayer);
      },
      
      filtrarInstaladores: function() {
        // Definir expresiones Emisiones
        var or = ` OR `;
        var and = ` AND `;
        var primaria = `CALIFICACION_E_PRIMARIA = `;
        var emisiones = `CALIFICACION_EMISIONES_CO2 = `;
        var calefaccion = `CALIFICACION_DEMANDA_CALEF_ = `;
        var refrigeracion = `CALIFICACION_DEMANDA_REFRIG_ = `;
        var aE = ``;
        var bE = ``;
        var cE = ``;
        var dE = ``;
        var eE = ``;
        var fE = ``;
        var gE = ``;

        var codDistrito= `DISTRITO = `;
        var expression = ``;

        // Obtener distrito de texto
        var distrito = this.selectDistrito.value;

        // Obtener valor del select
        var calificacion = this.selectCalificacion.value;
        console.log(calificacion)

        // Switch activados
        var a = dom.byId("inp-a").checked;
        var b = dom.byId("inp-b").checked;
        var c = dom.byId("inp-c").checked;
        var d = dom.byId("inp-d").checked;
        var e = dom.byId("inp-e").checked;
        var f = dom.byId("inp-f").checked;
        var g = dom.byId("inp-g").checked;

        if(calificacion=="CALIFICACION_E_PRIMARIA"){
          var aE = `${primaria} 'A'`;
          var bE = `${primaria} 'B'`;
          var cE = `${primaria} 'C'`;
          var dE = `${primaria} 'D'`;
          var eE = `${primaria} 'E'`;
          var fE = `${primaria} 'F'`;
          var gE = `${primaria} 'G'`;
        }else if(calificacion=="CALIFICACION_EMISIONES_CO2"){
          var aE = `${emisiones} 'A'`;
          var bE = `${emisiones} 'B'`;
          var cE = `${emisiones} 'C'`;
          var dE = `${emisiones} 'D'`;
          var eE = `${emisiones} 'E'`;
          var fE = `${emisiones} 'F'`;
          var gE = `${emisiones} 'G'`;
        }else if(calificacion=="CALIFICACION_DEMANDA_CALEF_"){
          var aE = `${calefaccion} 'A'`;
          var bE = `${calefaccion} 'B'`;
          var cE = `${calefaccion} 'C'`;
          var dE = `${calefaccion} 'D'`;
          var eE = `${calefaccion} 'E'`;
          var fE = `${calefaccion} 'F'`;
          var gE = `${calefaccion} 'G'`;
        }else if(calificacion=="CALIFICACION_DEMANDA_REFRIG_"){
          var aE = `${refrigeracion} 'A'`;
          var bE = `${refrigeracion} 'B'`;
          var cE = `${refrigeracion} 'C'`;
          var dE = `${refrigeracion} 'D'`;
          var eE = `${refrigeracion} 'E'`;
          var fE = `${refrigeracion} 'F'`;
          var gE = `${refrigeracion} 'G'`;
        }


        if (distrito== 0){

          var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[0].id)
          console.log("dist", dist)
          var queryTask =new QueryTask(dist.url);
  
          //Extent
          var query = new Query();
          query.where = "Cod_Distrito = '10'";
          query.outSpatialReference = new SpatialReference(102100);
          query.returnGeometry = true;
  
          queryTask.execute(query, lang.hitch(this, function(results){
            console.log(results)
  
            if (results.features.length > 0){
              var geometria = results.features[0].geometry
              this.map.graphics.clear();
              this.map.setExtent(geometria.getExtent(),true);
            }
          }));

          if(a == true){
            expression = expression + aE
            
            console.log("a",expression);
            if(b == true){
              expression = expression + or + bE;
            }
            if(c == true){
              expression = expression + or + cE;
            }
            if(d == true){
              expression = expression + or + dE;
            }
            if(e == true){
              expression = expression + or + eE;
            }
            if(f == true){
              expression = expression + or + fE;
            }
            if(g == true){
              expression = expression + or + gE;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer);
          }else if(b == true){
              expression = expression + bE;
              if(c == true){
                expression = expression + or + cE;
              }
              if(d == true){
                expression = expression + or + dE;
              }
              if(e == true){
                expression = expression + or + eE;
              }
              if(f == true){
                expression = expression + or + fE;
              }
              if(g == true){
                expression = expression + or + gE;
              }
              console.log("fin",expression);
              this.currentLayer.setDefinitionExpression(expression);
              this.map.addLayer(this.currentLayer)
            }else if(c == true){
              expression = expression + cE;
              if(d == true){
                expression = expression + or + dE;
              }
              if(e == true){
                expression = expression + or + eE;
              }
              if(f == true){
                expression = expression + or + fE;
              }
              if(g == true){
                expression = expression + or + gE;
              }
              console.log("fin",expression);
              this.currentLayer.setDefinitionExpression(expression);
              this.map.addLayer(this.currentLayer)
            }else if(d == true){
              expression = expression + dE;
              if(e == true){
                expression = expression + or + eE;
              }
              if(f == true){
                expression = expression + or + fE;
              }
              if(g == true){
                expression = expression + or + gE;
              }
              console.log("fin",expression);
              this.currentLayer.setDefinitionExpression(expression);
              this.map.addLayer(this.currentLayer)
            }else if(e == true){
              expression = expression + eE;
              if(f == true){
                expression = expression + or + fE;
              }
              if(g == true){
                expression = expression + or + gE;
              }
              console.log("fin",expression);
              this.currentLayer.setDefinitionExpression(expression);
              this.map.addLayer(this.currentLayer)
            }else if(f == true){
              expression = expression + fE;
              if(g == true){
                expression = expression + or + gE;
              }
              console.log("fin",expression);
              this.currentLayer.setDefinitionExpression(expression);
              this.map.addLayer(this.currentLayer)
            }else if(g == true){
              expression = expression + gE
              console.log("fin",expression);
              this.currentLayer.setDefinitionExpression(expression);
              this.map.addLayer(this.currentLayer)
            }else{
              alert("Elige al menos un producto")
            }
        }else if(a == true){
          expression = "("+ expression + aE + ")" + and + codDistrito + distrito; 
          console.log("a",expression);
          if(b == true){
            expression = "("+ expression + or + bE + ")" + and + codDistrito + distrito; 
          }
          if(c == true){
            expression = "("+ expression + or + cE + ")" + and + codDistrito + distrito; 
          }
          if(d == true){
            expression = "("+ expression + or + dE + ")" + and + codDistrito + distrito; 
          }
          if(e == true){
            expression = "("+ expression + or + eE + ")" + and + codDistrito + distrito; 
          }
          if(f == true){
            expression = "("+ expression + or + fE + ")" + and + codDistrito + distrito; 
          }
          if(g == true){
            expression = "("+ expression + or + gE + ")" + and + codDistrito + distrito; 
          }
          console.log("fin",expression);
          this.currentLayer.setDefinitionExpression(expression);
          this.map.addLayer(this.currentLayer);

          var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[0].id)
          console.log("dist", dist)
          var queryTask =new QueryTask(dist.url);
  
          //Extent
          var query = new Query();
          query.where = "Cod_Distrito = " + distrito;
          query.outSpatialReference = new SpatialReference(102100);
          query.returnGeometry = true;
  
          queryTask.execute(query, lang.hitch(this, function(results){
            console.log(results)
  
            if (results.features.length > 0){
              var geometria = results.features[0].geometry
              this.map.graphics.clear();
              this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
              this.map.setExtent(geometria.getExtent(),true);
            }
          }));

        }else if(b == true){
            expression = "("+ expression + bE + ")" + and + codDistrito + distrito; 
            if(c == true){
              expression = "("+ expression + or + cE + ")" + and + codDistrito + distrito; 
            }
            if(d == true){
              expression = "("+ expression + or + dE + ")" + and + codDistrito + distrito; 
            }
            if(e == true){
              expression = "("+ expression + or + eE + ")" + and + codDistrito + distrito; 
            }
            if(f == true){
              expression = "("+ expression + or + fE + ")" + and + codDistrito + distrito; 
            }
            if(g == true){
              expression = "("+ expression + or + gE + ")" + and + codDistrito + distrito; 
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)

            var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[0].id)
            console.log("dist", dist)
            var queryTask =new QueryTask(dist.url);
    
            //Extent
            var query = new Query();
            query.where = "Cod_Distrito = " + distrito;
            query.outSpatialReference = new SpatialReference(102100);
            query.returnGeometry = true;
    
            queryTask.execute(query, lang.hitch(this, function(results){
              console.log(results)
    
              if (results.features.length > 0){
                var geometria = results.features[0].geometry
                this.map.graphics.clear();
                this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
                this.map.setExtent(geometria.getExtent(),true);
              }
            }));

          }else if(c == true){
            expression = "("+ expression + cE + ")" + and + codDistrito + distrito; 
            if(d == true){
              expression = "("+ expression + or + dE + ")" + and + codDistrito + distrito; 
            }
            if(e == true){
              expression = "("+ expression + or + eE + ")" + and + codDistrito + distrito; 
            }
            if(f == true){
              expression = "("+ expression + or + fE + ")" + and + codDistrito + distrito; 
            }
            if(g == true){
              expression = "("+ expression + or + gE + ")" + and + codDistrito + distrito; 
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)

            var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[0].id)
            console.log("dist", dist)
            var queryTask =new QueryTask(dist.url);
    
            //Extent
            var query = new Query();
            query.where = "Cod_Distrito = " + distrito;
            query.outSpatialReference = new SpatialReference(102100);
            query.returnGeometry = true;
    
            queryTask.execute(query, lang.hitch(this, function(results){
              console.log(results)
    
              if (results.features.length > 0){
                var geometria = results.features[0].geometry
                this.map.graphics.clear();
                this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
                this.map.setExtent(geometria.getExtent(),true);
              }
            }));

          }else if(d == true){
            expression = "("+ expression + dE + ")" + and + codDistrito + distrito; 
            if(e == true){
              expression = "("+ expression + or + eE + ")" + and + codDistrito + distrito; 
            }
            if(f == true){
              expression = "("+ expression + or + fE + ")" + and + codDistrito + distrito; 
            }
            if(g == true){
              expression = "("+ expression + or + gE + ")" + and + codDistrito + distrito; 
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)

            var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[0].id)
            console.log("dist", dist)
            var queryTask =new QueryTask(dist.url);
    
            //Extent
            var query = new Query();
            query.where = "Cod_Distrito = " + distrito;
            query.outSpatialReference = new SpatialReference(102100);
            query.returnGeometry = true;
    
            queryTask.execute(query, lang.hitch(this, function(results){
              console.log(results)
    
              if (results.features.length > 0){
                var geometria = results.features[0].geometry
                this.map.graphics.clear();
                this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
                this.map.setExtent(geometria.getExtent(),true);
              }
            }));

          }else if(e == true){
            expression = "("+ expression + eE + ")" + and + codDistrito + distrito; 
            if(f == true){
              expression = "("+ expression + or + fE + ")" + and + codDistrito + distrito; 
            }
            if(g == true){
              expression = "("+ expression + or + gE + ")" + and + codDistrito + distrito; 
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)

            var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[0].id)
            console.log("dist", dist)
            var queryTask =new QueryTask(dist.url);
    
            //Extent
            var query = new Query();
            query.where = "Cod_Distrito = " + distrito;
            query.outSpatialReference = new SpatialReference(102100);
            query.returnGeometry = true;
    
            queryTask.execute(query, lang.hitch(this, function(results){
              console.log(results)
    
              if (results.features.length > 0){
                var geometria = results.features[0].geometry
                this.map.graphics.clear();
                this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
                this.map.setExtent(geometria.getExtent(),true);
              }
            }));

          }else if(f == true){
            expression = "("+ expression + fE + ")" + and + codDistrito + distrito; 
            if(g == true){
              expression = "("+ expression + or + gE + ")" + and + codDistrito + distrito; 
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)

            var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[0].id)
            console.log("dist", dist)
            var queryTask =new QueryTask(dist.url);
    
            //Extent
            var query = new Query();
            query.where = "Cod_Distrito = " + distrito;
            query.outSpatialReference = new SpatialReference(102100);
            query.returnGeometry = true;
    
            queryTask.execute(query, lang.hitch(this, function(results){
              console.log(results)
    
              if (results.features.length > 0){
                var geometria = results.features[0].geometry
                this.map.graphics.clear();
                this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
                this.map.setExtent(geometria.getExtent(),true);
              }
            }));

          }else if(g == true){
            expression = "("+ expression + gE + ")" + and + codDistrito + distrito; 
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)

            var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[0].id)
            console.log("dist", dist)
            var queryTask =new QueryTask(dist.url);
    
            //Extent
            var query = new Query();
            query.where = "Cod_Distrito = " + distrito;
            query.outSpatialReference = new SpatialReference(102100);
            query.returnGeometry = true;
    
            queryTask.execute(query, lang.hitch(this, function(results){
              console.log(results)
    
              if (results.features.length > 0){
                var geometria = results.features[0].geometry
                this.map.graphics.clear();
                this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
                this.map.setExtent(geometria.getExtent(),true);
              }
            }));

          }else{
            alert("Elige al menos un producto")
          }

        
      },

      refresh: function (){
        this.selectDistrito.value = "0";
        dom.byId("inp-a").checked = true;
        dom.byId("inp-b").checked = true;
        dom.byId("inp-c").checked = true;
        dom.byId("inp-d").checked = true;
        dom.byId("inp-e").checked = true;
        dom.byId("inp-f").checked = true;
        dom.byId("inp-g").checked = true;
        this.currentLayer.setDefinitionExpression(this.currentLayer.defaultDefinitionExpression);
      }

    });
  });