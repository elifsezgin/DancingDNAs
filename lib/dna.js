class DNA {
  constructor(positionY, length, scene, isDamaged, strandLength = 6, baseMaterials = []) {
    this.positionY = positionY;
    this.length = length;
    this.scene = scene;
    this.isDamaged = isDamaged;
    this.strandLength = strandLength;
    this.baseMaterials = baseMaterials;
  }

  createDNA() {
    let blue = 0x84D0F0;
    let yellow = 0xFED162;
    let purple = 0x651E59;
    let orange = 0xFFA500;
    let green = 0x008000;
    let gray = 0x808080;

    let tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
    let ballGeometry = new THREE.SphereGeometry(1.5,32,32);
    let blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
    let yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
    let purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );
    let orangeMaterial = new THREE.MeshBasicMaterial( { color: orange } );
    let greenMaterial = new THREE.MeshBasicMaterial( { color: green } );
    let grayMaterial = new THREE.MeshBasicMaterial( { color: gray } );

    let dna = new THREE.Group();
    let holder = new THREE.Group();

    let strandArray = [], random;
    let tubeMaterial;

    if (this.isDamaged) {
      random = Math.floor(Math.random()*2)
      tubeMaterial = random === 1 ? yellowMaterial : blueMaterial;
    }

    for (let i = 0; i <= this.length; i++) {
      let blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
      blueTube.rotation.z = 90 * Math.PI/180;
      blueTube.position.x = -3;

      let yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
      yellowTube.rotation.z = 90 * Math.PI/180;
      yellowTube.position.x = 3;

      let ballRight, ballLeft, rightBallMaterial, leftBallMaterial;
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

      ballRight.position.x = 6;
      ballLeft.position.x = -6;

      let row = new THREE.Object3D();

      if (this.isDamaged && (10 < i) && (i <= 10+this.strandLength)) {
        if (tubeMaterial === blueMaterial) {
          row.add(yellowTube);
          row.add(ballRight);
          strandArray.push(leftBallMaterial);
        } else {
          row.add(blueTube);
          row.add(ballLeft);
          strandArray.push(rightBallMaterial);
        }

      } else {
        row.add(blueTube);
        row.add(yellowTube);
        row.add(ballRight);
        row.add(ballLeft);
      }

      row.position.y = i*4;
      row.rotation.y = 20*i * Math.PI/180;

      dna.add(row);

    }

    dna.position.y = this.positionY;

    this.scene.add(dna);

    dna.position.y = this.positionY;
    holder.add(dna);
    this.scene.add(holder);
    this.strandArray = strandArray;

    return [holder, this.scene, strandArray, tubeMaterial];

  }

  isPairStrand (strandArray) {
    return (strandArray === this.strandArray);
  }
}

export default DNA;
