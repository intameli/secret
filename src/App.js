import React from 'react';
import './App.css';
//import test from './images/test.jpg';
//import uri from './images/uri.js';
import encrypted from './images/encrypted.js';
import CryptoJS from 'crypto-js';
import Konva from 'konva';
import undies from './images/undies.png';
import shirt from './images/shirt.png';
import pants from './images/pants.png';

class Game extends React.Component {
  componentDidMount() {
    var width = 2000;
    var height = 1000;
    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });
    var layer = new Konva.Layer();

    var rect = new Konva.Rect({
      x: 40,
      y: 700,
      stroke: '#555',
      strokeWidth: 5,
      fill: '#ddd',
      width: 450,
      height: 60,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.2,
      cornerRadius: 10,
    });
    layer.add(rect);
    layer.draw();

    var simpleText = new Konva.Text({
      x: 140,
      y: 720,
      text: 'Remove clothes as desired',
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: 'black',
    });
    layer.add(simpleText);
    layer.draw();

    var Pants = new Konva.Image({
      x: 169,
      y: 292,
      width: 380/2,
      height: 875/2,
      draggable: true,
    });
    layer.add(Pants);
    var imagePants = new Image();
    imagePants.onload = function () {
      Pants.image(imagePants);
      Pants.setZIndex(3);
      layer.draw();
    };
    imagePants.src = pants;

    var Undies = new Konva.Image({
      x: 184,
      y: 312,
      width: 345/2,
      height: 246/2,
      draggable: true,
    });
    layer.add(Undies);
    var imageUndies = new Image();
    imageUndies.onload = function () {
      Undies.image(imageUndies);
      Undies.setZIndex(1);
      layer.draw();
    };
    imageUndies.src = undies;

    var Base = new Konva.Image({
      x: 50,
      y: 50,
      width: 864/2,
      height: 1391/2,
    });
    layer.add(Base);
    var imageBase = new Image();
    imageBase.onload = function () {
      Base.image(imageBase);
      Base.setZIndex(0);
      layer.draw();
    };
    imageBase.src = this.props.uri;

    var Shirt = new Konva.Image({
      x: 119,
      y: 46,
      width: 585/2,
      height: 669/2,
      draggable: true,
    });
    layer.add(Shirt);
    var imageShirt = new Image();
    imageShirt.onload = function () {
      Shirt.image(imageShirt);
      Shirt.setZIndex(2);
      layer.draw();
    };
    imageShirt.src = shirt;

    stage.add(layer);
    rect.moveToTop();
    simpleText.moveToTop();
  }
  render() {
    return <div id="container"></div>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.decrypted = "";
    this.state = {
      text: "",
      open: false,
    };
  }
  
  handleClick(e) {
    if (e === 'Enter') {
      this.decrypted = CryptoJS.AES.decrypt(encrypted, this.state.text);
      this.setState({open: true});
    };
  }

  render() {
    var displayGame = null;
    if (this.state.open) {
      try{
        displayGame = <Game uri={this.decrypted.toString(CryptoJS.enc.Utf8)} />;
      } catch (error) {
        this.setState({open: false});
      }
    }

    return (
      <div>
        <form onSubmit={e => { e.preventDefault(); }}>
          <input type="text" onKeyDown={(e) => this.handleClick(e.key)} value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})} />
        </form>
        <button onClick={() => this.handleClick('Enter')}>Decrypt</button>
        {displayGame}
      </div>
    );
  }
}

export default App;
