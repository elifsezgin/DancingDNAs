import Stage from './stage.js';

class StageView {
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
    this.isFirst = true;


    this.onMouseMove = this.onMouseMove.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.createHeaderButtons = this.createHeaderButtons.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);

    this.createHeaderButtons();
    this.setStage();
    this.$controls = $('.dg');
    this.$controls[1].style.display = 'none';
  }

  setStage() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.z = 30;

    let holders = [];
    let stage = new Stage(this.dnaCount, this.scene);
    [holders, this.scene] = stage.startGame();

    let CubeConfigData = function() {
      this.zoom = 20;
    };

    let view = new CubeConfigData();
    let gui = new dat.GUI();
    gui.close();

    gui.add( view, 'zoom', 0, 20 ).onChange( function(value) {
      this.camera.position.z = value;
    });


    window.addEventListener('mousemove', this.onMouseMove, false );
    window.addEventListener( 'resize', this.onWindowResize, false );

    this.$switch.on('click', this.handleSwitch);
    this.$hint.on('click', this.toggleHelp);
    this.$plus.on('click', this.handleIncrease);
    this.$minus.on('click', this.handleDecrease);

    let that = this;
    let counter = that.dnaCount;
    let render = function () {
      requestAnimationFrame(render);
      for (let i = 0; i < (counter); i++) {
        holders[i].position.x = that.mouse.x*30*(i-(counter/2));
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
    let $play = $('.play-pause');
    if (this.$audio[0].muted === false) {
      this.$audio[0].muted = true;
      this.factor = 0;
      this.$switch[0].children[0].remove();
      this.$switch.append(this.$play);
      $play[0].innerHTML = 'Play';
    } else {
      this.$audio[0].muted = false;
      this.factor = 0.5;
      this.$switch[0].children[0].remove();
      this.$switch.append(this.$pause);
      $play[0].innerHTML = 'Pause';
      if (this.isFirst) {
        this.toggleHelp(e);
        this.isFirst = false;
      }
    }
    e.stopImmediatePropagation();
  }



  toggleHelp (e) {
    let $help = $(".modal");
    for (let i = 0; i < $help.length; i++) {
      if ($help[i].style.display === 'none') {
        $help[i].style.display = 'block';
      } else {
        $help[i].style.display = 'none';
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

export default StageView;
