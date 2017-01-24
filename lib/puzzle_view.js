const Puzzle = require('./puzzle').default;
const DNA = require('./dna').default;

class PuzzleView {
  constructor($el, canvas) {
    this.$el = $el;
    this.canvas = canvas;
    this.puzzle = new Puzzle();
    this.setStage();
  }

  setStage() {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
    //
    // debugger;
    let renderer = new THREE.WebGLRenderer( { canvas: this.canvas, antialias: true } )

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 20;

    let dna, holder;
    let dnas = [], holders = [];

    for (let i = 1; i < 4; i++) {
      [dna, holder, scene] = new DNA(-(i*10), -(i*10), (i*10), scene);
      // debugger;
      dnas.push(dna);
      holders.push(holder);
    }

    // debugger;

    let CubeConfigData = function() {
      this.zoom = 20;
    };

    let view = new CubeConfigData();
    let gui = new dat.GUI();
    gui.close();

    gui.add( view, 'zoom', 0, 20 ).onChange( function(value) {
      camera.position.z = value;
    });


    let render = function () {

      requestAnimationFrame(render);
      for (let i = 0; i < 3; i++) {
        // debugger;
        holders[i].rotation.x += 0.00*(i+1);
        holders[i].rotation.y += 0.01*(i+1);
        renderer.render(scene, camera);
      }
    };
    render();
  }

}

export default PuzzleView;
