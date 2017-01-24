class DNA {
  constructor(positionX, positionY, length, scene) {
    let blue = 0x84D0F0;
    let yellow = 0xFED162;
    let purple = 0x651E59;
    let orange = 0xFFA500;
    let green = 0x008000;
    let gray = 0x808080;

    let tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
    let ballGeometry = new THREE.SphereGeometry(0.8,32,32);
    let blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
    let yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
    let purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );
    let orangeMaterial = new THREE.MeshBasicMaterial( { color: orange } );
    let greenMaterial = new THREE.MeshBasicMaterial( { color: green } );
    let grayMaterial = new THREE.MeshBasicMaterial( { color: gray } );

    // debugger;

    let dna = new THREE.Object3D();
    let holder = new THREE.Object3D();

    for (let i = 0; i <= length; i++) {
      let blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
      blueTube.rotation.z = 90 * Math.PI/180;
      blueTube.position.x = -3;

      let yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
      yellowTube.rotation.z = 90 * Math.PI/180;
      yellowTube.position.x = 3;

      let ballRight, ballLeft;
      const random = Math.floor(Math.random() * 40) % 4

      if (random === 0) {
        ballRight = new THREE.Mesh( ballGeometry, purpleMaterial );
        ballRight.position.x = 6;

        ballLeft = new THREE.Mesh( ballGeometry, grayMaterial );
        ballLeft.position.x = -6;
      } else if (random === 1) {
        ballRight = new THREE.Mesh( ballGeometry, orangeMaterial );
        ballRight.position.x = 6;

        ballLeft = new THREE.Mesh( ballGeometry, greenMaterial );
        ballLeft.position.x = -6;
      } else if (random === 2) {
        ballRight = new THREE.Mesh( ballGeometry, grayMaterial );
        ballRight.position.x = 6;

        ballLeft = new THREE.Mesh( ballGeometry, purpleMaterial );
        ballLeft.position.x = -6;
      } else {
        ballRight = new THREE.Mesh( ballGeometry, greenMaterial );
        ballRight.position.x = 6;

        ballLeft = new THREE.Mesh( ballGeometry, orangeMaterial );
        ballLeft.position.x = -6;
      }




      let row = new THREE.Object3D();
      row.add(blueTube);
      row.add(yellowTube);
      row.add(ballRight);
      row.add(ballLeft);

      row.position.y = i*2;
      row.rotation.y = 30*i * Math.PI/180;

      dna.add(row);

    }

    dna.position.x = positionX;

    scene.add(dna);

    dna.position.y = positionY;
    holder.add(dna);
    scene.add(holder);
    return [dna, holder, scene];
  }

}

export default DNA;
