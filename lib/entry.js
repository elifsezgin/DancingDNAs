// import {dna} from './dna';

document.addEventListener('DOMContentLoaded', () => {

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  let canvas = document.getElementById('canvas')
  console.log(canvas);
  let renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } )

  let blue = 0x84D0F0;
  let yellow = 0xFED162;
  let purple = 0x651E59;


  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 20;



  let tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
  let ballGeometry = new THREE.SphereGeometry(0.8,32,32);
  let blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
  let yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
  let purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );

  let dna = new THREE.Object3D();
  let holder = new THREE.Object3D();


  for (let i = 0; i <= 40; i++) {
    let blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
    blueTube.rotation.z = 90 * Math.PI/180;
    blueTube.position.x = -3;

    let yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
    yellowTube.rotation.z = 90 * Math.PI/180;
    yellowTube.position.x = 3;

    let ballRight = new THREE.Mesh( ballGeometry, purpleMaterial );
    ballRight.position.x = 6;
    ballRight.name = 'asdas'
    // debugger;
    let ballLeft = new THREE.Mesh( ballGeometry, purpleMaterial );
    ballLeft.position.x = -6;



    let row = new THREE.Object3D();
    row.add(blueTube);
    row.add(yellowTube);
    row.add(ballRight);
    row.add(ballLeft);

    row.position.y = i*2;
    row.rotation.y = 30*i * Math.PI/180;

    dna.add(row);

  }

  dna.position.y = -40;

  scene.add(dna);

  dna.position.y = -40;
  holder.add(dna)
  scene.add(holder);

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

    holder.rotation.x += 0.00;
    holder.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  render();
});
