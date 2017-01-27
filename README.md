[dancingdnaslive]: https://elifsezgin.github.io/DancingDNAs/
# DancingDNAs

DancingDNAs is an extraordinary browser app in which DNA molecules are rotating with the mouse movements and the music in the background.

Technical details of the project are outlined in the **Functionality & MVP** and **Bonus Features** sections.

Feel free to browse at [DancingDNAs][dancingdnaslive]

<img src='http://res.cloudinary.com/datsbxfvs/image/upload/v1485510548/Screen_Shot_2017-01-27_at_1.18.15_AM_bipypb.png' width='30%' height='300px'/>
<img src='http://res.cloudinary.com/datsbxfvs/image/upload/v1485510544/Screen_Shot_2017-01-27_at_1.16.46_AM_gebzzx.png' width='30%' height='300px'/>
<img src='http://res.cloudinary.com/datsbxfvs/image/upload/v1485510544/Screen_Shot_2017-01-27_at_1.17.47_AM_zgnpxd.png' width='30%' height='300px'/>

### Functionality & MVP  

In DancingDNAs, users are able to;

- Start and pause the game anytime
- Discover the changes in the movements of the DNA's as they move the mouse
- Change the speed of DNA's with the buttons in the header

### Architecture and Technologies

DancingDNAs is implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `three.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there are three scripts involved in this project:

`dna.js`: this script will create and update the necessary `three.js` elements to draw a 'DNA' returning them to the stage class. Each `DNA` will require a `length`, `scene` and an `positionY` in the constructor. The bases of the DNA will be created randomly.

`stage_view.js`: this script will handle the logic behind the scenes. A stage object will require a `root` object and it will be responsible for rendering all the 3D DNA modals, constantly and all the logic behind header buttons.

`stage.js`: this lightweight script will house the constructor and startGame functions for creating all DNA objects, and returning the array of all the DNAs to the StageView.

### Bonus features

Some directions that the DancingDNAs may go are:

- Make DNA molecule movements synchronised with the rhythm of the music.
