const Puzzle = require('./puzzle').default;
var shuffle = require('shuffle-array');

class PuzzleView {
  constructor($root) {
    this.$root = $root;
    this.canvas = document.getElementById('3d-canvas');
    this.dnaCount = 8;
    this.mouse = new THREE.Vector2();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(150, (window.innerWidth)/(window.innerHeight), 0.1, 1000);
    this.renderer = Detector.webgl ? (new THREE.WebGLRenderer( { canvas: this.canvas, antialias: true } ) ): (new THREE.CanvasRenderer());
    this.factor = 0;
    this.$audio = $("audio");
    this.$pause = $("<i class='fa fa-pause-circle' aria-hidden='true'></i>");


    this.onMouseMove = this.onMouseMove.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.createHeaderButtons = this.createHeaderButtons.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.createHeaderButtons();
    this.setStage();
  }

  setStage() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.z = 30;

    let holders = [];
    let puzzle = new Puzzle(this.dnaCount, this.scene);
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

    window.addEventListener('mousemove', this.onMouseMove, false );
    window.addEventListener( 'resize', this.onWindowResize, false );

    this.$switch.on('click', this.handleSwitch);
    this.$hint.on('click', this.toggleModal);
    this.$plus.on('click', this.handleIncrease);
    this.$minus.on('click', this.handleDecrease);

    let that = this;
    let counter = that.dnaCount;
    let render = function () {
      requestAnimationFrame(render);
      for (let i = 0; i < (counter); i++) {
        holders[i].position.x = that.mouse.x*30*(i-(counter/2))*that.factor;
        holders[i].position.y = that.mouse.y*that.factor;
        holders[i].rotation.y += that.mouse.y*that.factor;
        that.renderer.render(that.scene, that.camera);
      }
    };
    render();
  }

  createHeaderButtons(){
    this.$switch = $('#music-circle');
    this.$play = $('.fa-play-circle');
    this.$hint = $('#question-circle');
    this.$plus = $('#plus-circle');
    this.$minus = $('#minus-circle');
  }

  handleIncrease (e) {
    if (this.$audio[0].muted === false) {
      this.factor += 0.1;
    }
    e.stopImmediatePropagation();
  }

  handleDecrease (e) {
    if (this.factor !== 0) {
      this.factor -= 0.1;
    }
    e.stopImmediatePropagation();
  }

  handleSwitch (e) {
    if (this.$audio[0].muted === false) {
      this.$audio[0].muted = true;
      this.factor = 0;
      this.$switch[0].children[0].remove();
      this.$switch.append(this.$play);
    } else {
      this.$audio[0].muted = false;
      this.factor = 0.5;
      this.$switch[0].children[0].remove();
      this.$switch.append(this.$pause);
    }
    e.stopImmediatePropagation();
  }



  toggleModal (e) {
    let $modal = $(".modal");
    for (let i = 0; i < $modal.length; i++) {
      if ($modal[i].style.display === 'none') {
        $modal[i].style.display = 'block';
      } else {
        $modal[i].style.display = 'none';
      }
    }
    e.stopImmediatePropagation();
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
