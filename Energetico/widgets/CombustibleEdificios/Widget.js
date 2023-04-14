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
        var ensenanza = `TIPO_DE_CENTRO = '0'`;
        var deportivo = `TIPO_DE_CENTRO = '1`;
        var sanitario = `TIPO_DE_CENTRO = '2'`;
        var biblioteca = `TIPO_DE_CENTRO = '3'`;
        var administrativo = `TIPO_DE_CENTRO = '4'`;
        var autobuses = `TIPO_DE_CENTRO = '5'`;
        var ferrocarril = `TIPO_DE_CENTRO = '6'`;
        var mercado = `TIPO_DE_CENTRO = '7'`;
        var museo = `TIPO_DE_CENTRO = '8'`;
        var policia = `TIPO_DE_CENTRO = '9'`;
        var residencia = `TIPO_DE_CENTRO = '10'`;


        var aC = `ENERGIA_UTILIZADA_CALEFACCION = 'GASÓLEO / FUEL'`;
        var bC = `ENERGIA_UTILIZADA_CALEFACCION = 'GAS NATURAL'`;
        var cC = `ENERGIA_UTILIZADA_CALEFACCION = 'BIOMASA'`;

        var codDistrito= `DISTRITO = `;
        var tExpression = ``;
        var expression = ``;

        // Obtener distrito de texto
        var distrito = this.selectDistrito.value;

        // Obtener valor del select
        var tipoCentro = this.selectTipo.value;
        console.log(tipoCentro)

        if(tipoCentro=="0"){
          tExpression = tExpression + ensenanza;
        }else if(tipoCentro=="1"){
          expression = expression + deportivo;
        }else if(tipoCentro=="2"){
          tExpression = tExpression + sanitario;
        }else if(tipoCentro=="3"){
          tExpression = tExpression + biblioteca;
        }else if(tipoCentro=="4"){
          tExpression = tExpression + administrativo;
        }else if(tipoCentro=="5"){
          tExpression = tExpression + autobuses;
        }else if(tipoCentro=="6"){
          tExpression = tExpression + ferrocarril;
        }else if(tipoCentro=="7"){
          tExpression = tExpression + mercado;
        }else if(tipoCentro=="8"){
          tExpression = tExpression + museo;
        }else if(tipoCentro=="9"){
          tExpression = tExpression + policia;
        }else if(tipoCentro=="10"){
          tExpression = tExpression + residencia;
        }else if(tipoCentro=="11"){
          tExpression = ``;
        }

        // Switch activados
        var a = dom.byId("inp-a").checked;
        var b = dom.byId("inp-b").checked;
        var c = dom.byId("inp-c").checked;

        if (distrito== 0){
          if(a == true){
            expression = expression + aC;
            console.log("a",expression);
            if(b == true){
              expression = expression + or + bC;
            }
            if(c == true){
              expression = expression + or + cC;
            }
            if (tExpression !=``){
              expression = "(" + expression + ")"+ and + tExpression;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer);
          }else if(b == true){
              expression = expression + bC;
              if(c == true){
                expression = expression + or + cC;
              }
              if (tExpression !=``){
                expression = "(" + expression + ")"+ and + tExpression;
              }
              console.log("fin",expression);
              this.currentLayer.setDefinitionExpression(expression);
              this.map.addLayer(this.currentLayer)
            }else if(c == true){
              expression = expression + cC;
              if (tExpression !=``){
                expression = "(" + expression + ")"+ and + tExpression;
              }
              console.log("fin",expression);
              this.currentLayer.setDefinitionExpression(expression);
              this.map.addLayer(this.currentLayer)
            }
        }else if(a == true){
          expression = "("+ expression + aC + ")" + and + codDistrito + distrito; 
          console.log("a",expression);
          if(b == true){
            expression = "("+ expression + or + bC + ")" + and + codDistrito + distrito; 
          }
          if(c == true){
            expression = "("+ expression + or + cC + ")" + and + codDistrito + distrito; 
          }
          if (tExpression !=``){
            expression = "(" + expression + ")"+ and + tExpression;
          }
          console.log("fin",expression);
          this.currentLayer.setDefinitionExpression(expression);
          this.map.addLayer(this.currentLayer);
        }else if(b == true){
            expression = "("+ expression + bC + ")" + and + codDistrito + distrito; 
            if(c == true){
              expression = "("+ expression + or + cC + ")" + and + codDistrito + distrito; 
            }
            if (tExpression !=``){
              expression = "(" + expression + ")"+ and + tExpression;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }else if(c == true){
            expression = "("+ expression + cC + ")" + and + codDistrito + distrito; 
            if (tExpression !=``){
              expression = "(" + expression + ")"+ and + tExpression;
            }
            console.log("fin",expression);
            this.currentLayer.setDefinitionExpression(expression);
            this.map.addLayer(this.currentLayer)
          }

      },

      refresh: function (){
        this.selectDistrito.value = "0";
        this.selectTipo.value = "11"
        dom.byId("inp-a").checked = true;
        dom.byId("inp-b").checked = true;
        dom.byId("inp-c").checked = true;
        this.currentLayer.setDefinitionExpression(this.currentLayer.defaultDefinitionExpression);
      }

    });
  });