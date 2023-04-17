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
        // Definir expresiones
        var or = ` OR `;
        var and = ` AND `;
        var where = ` WHERE `;
        var pellets = `	CALDERA_PELLETS = 'SI' OR 	CALDERA_PELLETS = '1'`;
        var astillas = `CALDERA_ASTILLAS = 'SI' OR CALDERA_ASTILLAS = '1'`;
        var estufa = `ESTUFA_PELLETS = 'SI' OR ESTUFA_PELLETS = '1'`;
        
        var expression= ``;
        var codDistrito= `Cod_Distrito = `;


        // Obtener distrito de texto
        var distrito = this.selectDistrito.value;


        // Switch activados
        var a = dom.byId("inp-pellets").checked;
        console.log("a", a)
        var b = dom.byId("inp-astillas").checked;
        var c = dom.byId("inp-estufa").checked;

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
              this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
              this.map.setExtent(geometria.getExtent(),true);
            }
          }));
          // Identificar los productos seleccionados
        if(a == true){
          expression = expression + pellets
          
          console.log("a",expression);
          if(b == true){
            expression = expression + or + astillas;
          }
          if(c == true){
            expression = expression + or + estufa;
          }
          console.log("fin",expression);
          this.currentLayer.setDefinitionExpression(expression);
          this.map.addLayer(this.currentLayer);
        }else if(b == true){
            expression = expression + astillas;
            if(c == true){
              expression = expression + or + estufa;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else if(c == true){
            expression = expression + estufa;
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else{
            alert("Elige al menos un producto")
          }
        }else if(a == true){
          expression = "("+ expression + pellets + ")" + and + codDistrito + distrito 
          console.log("a",expression);
          if(b == true){
            expression = "("+ expression + or + astillas + ")" + and + codDistrito + distrito;
          }
          if(c == true){
            expression = "("+ expression + or + estufa+ ")" + and + codDistrito + distrito;
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
            expression = "("+ expression + astillas+ ")" + and + codDistrito + distrito;
            if(c == true){
              expression = "("+ expression + or + estufa+ ")" + and + codDistrito + distrito;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)

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
                this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
                this.map.setExtent(geometria.getExtent(),true);
              }
            }));
          }else if(c == true){
            expression = "("+ expression + estufa+ ")" + and + codDistrito + distrito;
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)

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
                this.map.graphics.add(new Graphic(geometria, new SimpleLineSymbol()));
                this.map.setExtent(geometria.getExtent(),true);
              }
            }));
          }else{
            alert("Elige al menos un producto")
          }

          
      },

      refresh: function (){
        this.selectDistrito.value = '0',
        dom.byId("inp-pellets").checked = true;
        dom.byId("inp-astillas").checked = true;
        dom.byId("inp-estufa").checked = true;
        this.currentLayer.setDefinitionExpression(this.currentLayer.defaultDefinitionExpression);
      }

    });
  });