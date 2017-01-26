class Strand {
  constructor(positionY, scene, length = 6, isMatch) {
    this.positionY = positionY;
    this.length = length;
    this.scene = scene;
    this.isMatch = isMatch;
  }

  createStrand(tubeMaterial = null, materials = null) {
    let blue = 0x84D0F0;
    let yellow = 0xFED162;
    let purple = 0x651E59;
    let orange = 0xFFA500;
    let green = 0x008000;
    let gray = 0x808080;

    this.ballGeometry = new THREE.SphereGeometry(0.8,32,32);
    this.purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );
    this.orangeMaterial = new THREE.MeshBasicMaterial( { color: orange } );
    this.greenMaterial = new THREE.MeshBasicMaterial( { color: green } );
    this.grayMaterial = new THREE.MeshBasicMaterial( { color: gray } );

    let tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
    let blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
    let yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );

    let strand = new THREE.Object3D();
    let holder = new THREE.Object3D();

    let randomMaterial = Math.floor(Math.random()*2) === 1 ? yellowMaterial : blueMaterial;
    for (let i = 0; i <= this.length; i++) {
      let ball;
      let tube;
      if (this.isMatch) {
        tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        ball = this.generateBase(materials[i]);
      } else {
        tube = new THREE.Mesh(tubeGeometry, randomMaterial);
        ball = this.generateBase();
      }
      tube.rotation.z = 90 * Math.PI/180;
      tube.position.x = -3;

      ball.position.x = -6;


      let row = new THREE.Object3D();
      row.add(tube);
      row.add(ball);

      row.position.y = i*2;
      row.rotation.y = 20*i * Math.PI/180;

      strand.add(row);

    }

    strand.position.y = this.positionY;
    this.scene.add(strand);

    strand.position.y = this.positionY;
    holder.add(strand);
    this.scene.add(holder);
    // debugger;
    return [holder, this.scene];
  }

  generateBase(material) {
    let ball;
    if (typeof material === 'object') {
      ball = new THREE.Mesh( this.ballGeometry, material );
    } else {
      const random = Math.floor(Math.random() * this.length) % 4

      if (random === 0) {
        ball = new THREE.Mesh( this.ballGeometry, this.grayMaterial );
      } else if (random === 1) {
        ball = new THREE.Mesh( this.ballGeometry, this.greenMaterial );
      } else if (random === 2) {
        ball = new THREE.Mesh( this.ballGeometry, this.purpleMaterial );
      } else {
        ball = new THREE.Mesh( this.ballGeometry, this.orangeMaterial );
      }
    }
    return ball;
  }
}

export default Strand;
