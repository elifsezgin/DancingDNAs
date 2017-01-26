const Puzzle = require('./puzzle').default;
var shuffle = require('shuffle-array');

const levels = {
  1: {
    totalDNACount: 3,
    damagedDNACount: 2,
    matchedStrandCount: 2,
    minStrandLength: 5,
    maxStrandLength: 8
  },
  2: {
    totalDNACount: 4,
    damagedDNACount: 2,
    minStrandLength: 3,
    maxStrandLength: 8
  }
};

class PuzzleView {
  constructor($el) {
    this.$el = $el;
    this.canvas = document.getElementById('3d-canvas');
    this.level = 1;
    this.mouse = new THREE.Vector2();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(150, (window.innerWidth)/(window.innerHeight), 0.1, 1000);
    this.renderer = Detector.webgl ? (new THREE.WebGLRenderer( { canvas: this.canvas, antialias: true } ) ): (new THREE.CanvasRenderer());
    this.rotation = 0.01;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.createHeaderButtons = this.createHeaderButtons.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.drawBalls = this.drawBalls.bind(this);

    window.onload = this.drawBalls;

    this.createHeaderButtons();
    this.setStage();
  }

  setStage() {


    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.z = 30;

    let holders = [];

    let puzzle = new Puzzle(
      levels[this.level].totalDNACount,
      levels[this.level].damagedDNACount,
      levels[this.level].minStrandLength,
      levels[this.level].maxStrandLength,
      this.scene
    );
    [holders, this.scene] = puzzle.startGame();

    let CubeConfigData = function() {
      this.zoom = 20;
    };

    let view = new CubeConfigData();
    let gui = new dat.GUI();
    gui.close();

    gui.add( view, 'zoom', 0, 20 ).onChange( function(value) {
      this.camera.position.z = value;
    });

    holders = shuffle(holders);

    let that = this;

    let counter = levels[this.level].totalDNACount;
    let render = function () {
      window.addEventListener('mousemove', that.onMouseMove, false );
      window.addEventListener('mousedown', that.handleClick, false);
      window.addEventListener( 'resize', that.onWindowResize, false );

      that.$pause.on('click', that.handlePause);
      that.$hint.on('click', that.toggleModal);
      requestAnimationFrame(render);
      for (let i = 0; i < (counter); i++) {
        holders[i].position.x = 30*(i-(counter/2));
        holders[i].rotation.x += that.rotation;
        holders[i].rotation.y += that.rotation;
        holders[i].rotation.z += that.rotation;
        // debugger;
        // that.scene.children[0].children[0].children[0].visible = false;
        // that.scene.children[0].children[0].children[5].visible = false;
        // that.scene.children[0].children[0].children[10].visible = false;
        that.renderer.render(that.scene, that.camera);
      }
    };
    render();
  }

  drawBalls ( ) {

    let purple = 0xc0cbff;
    let orange = 0xffb38d;
    let green = 0xa1ff8d;
    let blue = 0x33eee0;

    let canvas = document.getElementById('2d-canvas');

    let context = canvas.getContext('2d');
    let centerX = canvas.width / 5;

    let centerY = 20;
    let radius = 15;

    context.beginPath();
    context.arc(centerX * 1, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#c0cbff';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#FFFFFF';
    context.stroke();

    context.beginPath();
    context.arc(centerX * 2, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#ffb38d';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#FFFFFF';
    context.stroke();

    context.beginPath();
    context.arc(centerX *3, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#a1ff8d';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#FFFFFF';
    context.stroke();

    context.beginPath();
    context.arc(centerX * 4, centerY , radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#33eee0';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#FFFFFF';
    context.stroke();
  }


  createHeaderButtons(){
    this.$pause = $('<input type="button" class="buttons" value="Pause" />');
    this.$pause.appendTo($(".dna-puzzle"));

    this.$hint = $('<input type="button" class="buttons" value="Hint" />');
    this.$hint.appendTo($(".dna-puzzle"));
  }

  handleClick (e) {
    e.preventDefault();

    this.raycaster = new THREE.Raycaster();

    this.raycaster.setFromCamera( this.mouse, this.camera );

    let intersects = this.raycaster.intersectObjects( this.scene.children );
    console.log(intersects);
    for ( let k = 0; k < intersects.length; k++ ) {
      intersects[ k ].object.material.color.set( 0xff0000 );
    }

  }

  handlePause (e) {
    e.preventDefault();
    if (this.rotation > 0) {
      this.rotation = 0;
    } else {
      this.rotation = 0.01;
    }
    e.stopImmediatePropagation();
  }

  toggleModal () {

  }

  onWindowResize( e ) {
    let containerWidth = window.innerWidth;
    let containerHeight = window.innerHeight;
    this.renderer.setSize( containerWidth, containerHeight );
    this.camera.aspect = containerWidth / containerHeight;
    this.camera.updateProjectionMatrix();
  }

  onMouseMove(e) {
    this.mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
    this.mouse.y = 1 - 2 * ( e.clientY / window.innerHeight );
  }

}

export default PuzzleView;
