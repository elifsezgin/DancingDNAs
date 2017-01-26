const Puzzle = require('./puzzle').default;
const DNA = require('./dna').default;
const Strand = require('./strand').default;
var shuffle = require('shuffle-array');

const levels = {
  1: {
    totalDNACount: 2,
    damagedDNACount: 1,
    totalStrandCount: 3,
    matchedStrandCount: 1,
    minStrandLength: 5,
    maxStrandLength: 8
  },
  2: {
    totalDNACount: 4,
    damagedDNACount: 2,
    totalStrandCount: 4,
    matchedStrandCount: 2,
    minStrandLength: 3,
    maxStrandLength: 8
  }
};

class PuzzleView {
  constructor($el, canvas) {
    this.$el = $el;
    this.canvas = canvas;
    this.puzzle = new Puzzle();
    this.level = 1;
    this.mouse = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(150, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas, antialias: true } )
    this.rotation = 0.01;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.createHeaderButtons = this.createHeaderButtons.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleClick = this.handleClick.bind(this);

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
      levels[this.level].totalStrandCount,
      levels[this.level].matchedStrandCount,
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


    let isDragging = false;
      let that = this;


//     $(this.renderer.domElement).on('mousedown', function(e) {
//       isDragging = true;
//       // Get mouse position
//       var mouseX = (e.clientX / window.innerWidth) * 2 - 1;
//       var mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
//       // Get 3D vector from 3D mouse position using 'unproject' function
//       let vector = new THREE.Vector3(mouseX, mouseY, 1);
//       vector.unproject(that.camera);
//       // Set the raycaster position
//       that.raycaster.set(that.camera.position, vector.sub(that.camera.position ).normalize() );
//
//     //   // Find all intersected objects
//       let intersects = that.raycaster.intersectObjects(that.scene.children , true);
//     //
//
//       if (intersects.length > 0) {
//         alert("yo");
//     //     selection = intersects[0].object;
//     //     // Calculate the offset
//     //     var intersects = raycaster.intersectObject(plane);
//     //     offset.copy(intersects[0].point).sub(plane.position);
//       }
// //
//     });





    let counter = levels[this.level].totalDNACount + levels[this.level].totalStrandCount
    let render = function () {

      window.addEventListener('mousemove', that.onMouseMove, false );
      window.addEventListener('mousedown', that.handleClick, false)
      that.$pause.on('click', that.handlePause);
      that.$hint.on('click', that.toggleModal);

      requestAnimationFrame(render);
      for (let i = 0; i < (counter); i++) {
        holders[i].position.x = 30*(i-(counter/2));
        // holders[i].rotation.x += 0.00*(i+1);
        holders[i].rotation.y += that.rotation;
        // holders[i].rotation.z += 0.00*(i+1);
        that.renderer.render(that.scene, that.camera);
      }
    };
    render();
  }

  createHeaderButtons(){
    this.$pause = $('<input type="button" class="buttons" value="Pause" />');
    this.$pause.appendTo($(".dna-puzzle"));

    this.$hint = $('<input type="button" class="buttons" value="Hint" />');
    this.$hint.appendTo($(".dna-puzzle"));
  }



  handleClick (e) {
    let position = [this.mouse.x, this.mouse.y]
    // let direction = new THREE.Vector3(0,0,1);

    let vector = new THREE.Vector3(position[0], position[1], 1);
    vector.unproject(this.camera);
    this.raycaster.setFromCamera( this.mouse, this.camera );

    // this.raycaster.far = 10;

    let intersects = this.raycaster.intersectObjects( this.scene.children, true );

    if (intersects.length > 0) {

      let selection = intersects[0].object;
      debugger;
    //     //     // Calculate the offset
      // let intersects = this.raycaster.intersectObject(plane);
      // offset.copy(intersects[0].point).sub(plane.position);
    // debugger;
    // for ( let k = 0; k < intersects.length; k++ ) {
    //   intersects[ k ].object.material.color.set( 0xff0000 );
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

  onMouseMove(e) {
    this.mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
    this.mouse.y = 1 - 2 * ( e.clientY / window.innerHeight );
  }



}

export default PuzzleView;
