class DNA {
  constructor(positionY, length, scene) {
    this.positionY = positionY;
    this.length = length;
    this.scene = scene;
  }

  createDNA() {
    let pink = 0xff8da1;
    let yellow = 0xfff5c0;
    let purple = 0xc0cbff;
    let orange = 0xffb38d;
    let green = 0xa1ff8d;
    let gray = 0x33eee0;

    let tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,12,32);
    let cubeGeometry = new THREE.CubeGeometry(6, 6, 32, 32);
    let ballGeometry = new THREE.SphereGeometry(1.5,32,32);
    let pinkMaterial = new THREE.MeshBasicMaterial( { color: pink } );
    let yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
    let purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );
    let orangeMaterial = new THREE.MeshBasicMaterial( { color: orange } );
    let greenMaterial = new THREE.MeshBasicMaterial( { color: green } );
    let grayMaterial = new THREE.MeshBasicMaterial( { color: gray } );

    let dna = new THREE.Object3D();
    let holder = new THREE.Object3D();

    let random;

    for (let i = 0; i <= this.length; i++) {
      let pinkTube = new THREE.Mesh(tubeGeometry, pinkMaterial);
      pinkTube.rotation.z = 90 * Math.PI/180;
      pinkTube.position.x = -3;

      let yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
      yellowTube.rotation.z = 90 * Math.PI/180;
      yellowTube.position.x = 3;

      let ballRight, ballLeft, rightBallMaterial, leftBallMaterial, cube;
      random = Math.floor(Math.random() * this.length) % 4

      if (random === 0) {
        rightBallMaterial = purpleMaterial;
        leftBallMaterial = grayMaterial;
      } else if (random === 1) {
        rightBallMaterial = orangeMaterial;
        leftBallMaterial = greenMaterial;
      } else if (random === 2) {
        rightBallMaterial = grayMaterial;
        leftBallMaterial = purpleMaterial;
      } else {
        rightBallMaterial = greenMaterial;
        leftBallMaterial = orangeMaterial;
      }

      ballRight = new THREE.Mesh(ballGeometry, rightBallMaterial);
      ballLeft = new THREE.Mesh(ballGeometry, leftBallMaterial);

      ballRight.position.x = 9;
      ballLeft.position.x = -9;

      let row = new THREE.Object3D();

      row.add(pinkTube);
      row.add(yellowTube);
      row.add(ballRight);
      row.add(ballLeft);

      row.position.y = i*6;
      row.rotation.y = 20*i * Math.PI/180;

      dna.add(row);

    }

    dna.position.y = this.positionY;

    this.scene.add(dna);

    dna.position.y = this.positionY;
    holder.add(dna);
    this.scene.add(holder);


    return [holder, this.scene];

  }

}

export default DNA;
