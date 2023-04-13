define([
  'dojo/_base/declare', 
  'dojo/dom',
  "dojo/on",
  "dojo/_base/lang",

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

    map,
    FeatureLayer,
    PopupTemplate,

    BaseWidget
    ) {
    return declare([BaseWidget], {

      baseClass: 'jimu-widget-customwidget',
      
      postCreate: function(){
        // this.currentLayer = this.map.getLayer("ProveedoresBiomasaValladolid")
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
        var pellets = `PELLETS = 'SI' OR PELLETS = '1'`;
        var lena = `LEÑA = 'SI' OR LEÑA = '1'`;
        var astillas = `ASTILLAS = 'SI' OR ASTILLAS = '1'`;
        var hueso = `HUESO_ACEITUNA = 'SI' OR HUESO_ACEITUNA = '1'`;
        var briquetas = `BRIQUETAS = 'SI' OR BRIQUETAS = '1'`;
        var expression= ``;
        var codDistrito= `Cod_Distrito = `;


        // Obtener distrito de texto
        var distrito = this.selectDistrito.value;


        // Switch activados
        var a = dom.byId("inp-pellets").checked;
        var b = dom.byId("inp-lena").checked;
        var c = dom.byId("inp-astillas").checked;
        var d = dom.byId("inp-hueso").checked;
        var e = dom.byId("inp-briquetas").checked;

        if (distrito== 0){
          // Identificar los productos seleccionados
        if(a == true){
          expression = expression + pellets
          
          console.log("a",expression);
          if(b == true){
            expression = expression + or + lena;
          }
          if(c == true){
            expression = expression + or + astillas;
          }
          if(d == true){
            expression = expression + or + hueso;
          }
          if(e == true){
            expression = expression + or + briquetas;
          }
          console.log("fin",expression);
          this.currentLayer.setDefinitionExpression(expression);
          this.map.addLayer(this.currentLayer);
        }else if(b == true){
            expression = expression + lena;
            if(c == true){
              expression = expression + or + astillas;
            }
            if(d == true){
              expression = expression + or + hueso;
            }
            if(e == true){
              expression = expression + or + briquetas;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else if(c == true){
            expression = expression + astillas;
            if(d == true){
              expression = expression + or + hueso;
            }
            if(e == true){
              expression = expression + or + briquetas;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else if(d == true){
            expression = expression + hueso;
            if(e == true){
              expression = expression + or + briquetas;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else if(e == true){
            expression = expression + briquetas;
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
            expression = "("+ expression + or + lena + ")" + and + codDistrito + distrito;
          }
          if(c == true){
            expression = "("+ expression + or + astillas+ ")" + and + codDistrito + distrito;
          }
          if(d == true){
            expression = "("+ expression + or + hueso+ ")" + and + codDistrito + distrito;
          }
          if(e == true){
            expression = "("+ expression + or + briquetas+ ")" + and + codDistrito + distrito;
          }
          console.log("fin",expression);
          this.currentLayer.setDefinitionExpression(expression);
          this.map.addLayer(this.currentLayer);
        }else if(b == true){
            expression = "("+ expression + lena+ ")" + and + codDistrito + distrito;
            if(c == true){
              expression = "("+ expression + or + astillas+ ")" + and + codDistrito + distrito;
            }
            if(d == true){
              expression = "("+ expression + or + hueso+ ")" + and + codDistrito + distrito;
            }
            if(e == true){
              expression = "("+ expression + or + briquetas+ ")" + and + codDistrito + distrito;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else if(c == true){
            expression = "("+ expression + astillas+ ")" + and + codDistrito + distrito;
            if(d == true){
              expression = "("+ expression + or + hueso+ ")" + and + codDistrito + distrito;
            }
            if(e == true){
              expression = "("+ expression + or + briquetas+ ")" + and + codDistrito + distrito;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else if(d == true){
            expression = "("+ expression + hueso+ ")" + and + codDistrito + distrito;
            if(e == true){
              expression = "("+ expression + or + briquetas+ ")" + and + codDistrito + distrito;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else if(e == true){
            expression = "("+ expression + briquetas+ ")" + and + codDistrito + distrito;
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else{
            alert("Elige al menos un producto")
          }
        

      },

      refresh: function (){
        dom.byId("inp-pellets").checked = true;
        dom.byId("inp-lena").checked = true;
        dom.byId("inp-astillas").checked = true;
        dom.byId("inp-hueso").checked = true;
        dom.byId("inp-briquetas").checked = true;
        this.currentLayer.setDefinitionExpression(this.currentLayer.defaultDefinitionExpression);
      }

    });
  });