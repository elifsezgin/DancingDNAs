export const DNA = () => {
  let tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
  let ballGeometry = new THREE.SphereGeometry(0.8,32,32);
  // let blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
  let yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
  let purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );

  let dna = new THREE.Object3D();
  let holder = new THREE.Object3D();


  for (let i = 0; i <= 40; i++) {
    // let blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
    // blueTube.rotation.z = 90 * Math.PI/180;
    // blueTube.position.x = -3;

    let yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
    yellowTube.rotation.z = 90 * Math.PI/180;
    yellowTube.position.x = 3;


    let ballRight = new THREE.Mesh( ballGeometry, purpleMaterial );
    ballRight.position.x = 6;

    let ballLeft = new THREE.Mesh( ballGeometry, purpleMaterial );
    ballLeft.position.x = -6;

    let row = new THREE.Object3D();
    // row.add(blueTube);
    row.add(yellowTube);
    row.add(ballRight);
    row.add(ballLeft);

    row.position.y = i*2;
    row.rotation.y = 30*i * Math.PI/180;

    dna.add(row);

  }
  return dna;
};

//
//   }
//   render () {
//     return(
//       <div>
//       </div>
//     );
//   }
// }
//
// export default DNA;
