const Puzzle = require('./puzzle').default;
const DNA = require('./dna').default;
const Strand = require('./strand').default;
var shuffle = require('shuffle-array');

class PuzzleView {
  constructor($el, canvas) {
    this.$el = $el;
    this.canvas = canvas;
    this.puzzle = new Puzzle();
    this.rotation = 0.001;
    this.setStage();
    this.pause = false;
    // this.pause = this.pause.bind(this);
  }

  setStage() {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(150, window.innerWidth/window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer( { canvas: this.canvas, antialias: true } )

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 30;

    // let dna, holder, strand;
    let dnas = [], holders = [], strands = [];
    //
    // for (let i = 1; i < 3; i++) {
    //   let dnaCreater = new DNA((i * -7), (i*10), scene);
    //   [dna, holder, scene] = dnaCreater.createDNA();
    //   dnas.push(dna);
    //   holders.push(holder);
    //   let strandCreater = new Strand((i * -13), scene, (i*3));
    //   [strand, holder, scene] = strandCreater.createStrand();
    //   strands.push(strand);
    //   holders.push(holder);
    // }

    let puzzle = new Puzzle(2, 2, 4, 2, 6, 8, scene);
    [holders, scene] = puzzle.startGame();

    let CubeConfigData = function() {
      this.zoom = 20;
    };

    let view = new CubeConfigData();
    let gui = new dat.GUI();
    gui.close();

    gui.add( view, 'zoom', 0, 20 ).onChange( function(value) {
      camera.position.z = value;
    });

    holders = shuffle(holders);
    let counter = 0;
    let rotation = this.rotation;
    let render = ()  => {
      if (this.pause) {
        this.rotation = 0;
      } else {
        this.rotation = 0.01;
        if (counter > 500) {
          this.rotation = 0;
        }
      }
      counter ++;
        requestAnimationFrame(render);
        // debugger;
        let that = this;
        for (let i = 0; i < 4; i++) {
          debugger;
          holders[i].position.x = 30*(i-1.5);
          // holders[i].rotation.x += 0.00*(i+1);
          holders[i].rotation.y += that.rotation * (i+1);
          // holders[i].rotation.z += 0.00*(i+1);
          renderer.render(scene, camera);
      }
    };
    render();
  }

}

export default PuzzleView;
