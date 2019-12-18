import React, { Component } from "react";
import * as Survey from "survey-react";


// Survey.StylesManager.applyTheme("darkblue");

class view extends Component {

  onValueChanged(result) {
    console.log("value changed!");
  }

  onComplete(result) {
    console.log("Complete! " + result);
  }


  render() {
  
console.log("entro 2");
    let Json = {
      "pages": [
       {
        "name": "página1",
        "elements": [
         {
          "type": "text",
          "name": "pregunta1",
          "title": "Carga de Vehículos"
         },
         {
          "type": "boolean",
          "name": "pregunta2",
          "title": "¿Todos los vehículos se encuentran listos para viajar?"
         },
         {
          "type": "text",
          "name": "pregunta3",
          "visibleIf": "{pregunta2} = false",
          "title": "Vehículos que no viajan"
         },
         {
          "type": "radiogroup",
          "name": "pregunta4",
          "visibleIf": "{pregunta2} = false",
          "title": "Motivo",
          "choices": [
           {
            "value": "motivo1",
            "text": "Falta de pedimento"
           },
           {
            "value": "motivo2",
            "text": "Vehículo faltante"
           }
          ]
         },
         {
          "type": "text",
          "name": "pregunta5",
          "visibleIf": "{pregunta2} = true",
          "title": "Hora estimada de salida",
          "inputType": "time"
         },
         {
          "type": "text",
          "name": "pregunta6",
          "visibleIf": "{pregunta2} = true",
          "title": "Capture la fecha del viaje",
          "inputType": "date"
         },
         {
          "type": "text",
          "name": "pregunta7",
          "title": "Fecha y hora de captura",
          "inputType": "datetime-local"
         },
         {
          "type": "checkbox",
          "name": "pregunta8",
          "title": "Seleccione los instrumentos a utilizar",
          "choices": [
           {
            "value": "item1",
            "text": "Multimetro"
           },
           {
            "value": "item2",
            "text": "Osciloscopio"
           },
           {
            "value": "item3",
            "text": "Pinzas"
           },
           {
            "value": "item4",
            "text": "Cautín"
           }
          ]
         },
         {
          "type": "boolean",
          "name": "pregunta9",
          "visibleIf": "{pregunta1} contains \\\"peso\\\"",
          "title": "¿Desea calcular el peso?"
         },
         {
          "type": "text",
          "name": "height",
          "visibleIf": "{pregunta2} = true and {pregunta9} = true",
          "title": "Estatura",
          "inputType": "number"
         },
         {
          "type": "text",
          "name": "shoes",
          "visibleIf": "{pregunta2} = true and {pregunta9} = true and {pregunta8} = [\"item1\",\"item3\"]",
          "title": "Altura de zapatos",
          "inputType": "number"
         },
         {
          "type": "text",
          "name": "clothes",
          "visibleIf": "{pregunta2} = true and {pregunta9} = true",
          "title": "Peso de la ropa",
          "inputType": "number"
         },
         {
          "type": "text",
          "name": "weight",
          "visibleIf": "{pregunta2} = true and {pregunta9} = true",
          "title": "Peso",
          "inputType": "number"
         },
         {
          "type": "boolean",
          "name": "pregunta12",
          "visibleIf": "(({weight} - {clothes}) / (({height} - {shoes}) * ({height} - {shoes}))) > 24",
          "title": "Esta seguro que usted pesa mas de 70 KG?"
         }
        ]
       }
      ]
     };
  

    var model = new Survey.Model(Json);
    return (
      <div className="App">
      
        <div className="surveyjs">
         
          <div id="surveyElement"></div>
          <Survey.Survey

            model={model}
            onComplete={this.onComplete}
            onValueChanged={this.onValueChanged}
          />
          
        </div>
     
      </div>
    );
  }
}

export default view;
