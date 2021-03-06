## DNApuzzle

### Background

DNApuzzle is different than an ordinary puzzle in which the pieces are small one stranded **DNA molecules** that matches sequences on the damaged DNA that needs to be paired.

The game will be structured in an increasing difficulty levels, which will have one DNA molecule to be paired, and as the levels go higher, the molecules and their pairs will increase in number and in length.

Technical details of the project are outlined in the **Functionality & MVP** and **Bonus Features** sections.  

### Functionality & MVP  

In DNApuzzle game, users will be able to:

- [ ] Start, pause, and reset the game board
- [ ] Select DNA's and drag them to the corresponding pair
- [ ] Click hint button that will pop up as a modal
- [ ] See the timer and their scores according to the duration of their game

In addition, this project will include:

- [ ] An Hint modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn, and the Hint modal.  Game controls will include Start, Stop, and Reset buttons. The DNA molecules and their missing pieces will be randomly spread over the window. The DNA will have a double helix view with rotation.(3D view as a Bonus) Once a piece is approached to the matching DNA molecule, it will stop spinning and will stick if the sequences matches.

[Wireframes](wireframes)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `three.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`dna.js`: this script will create and update the necessary `three.js` elements to draw a 'DNA' and rendering them to the DOM. Each `DNA` will contain a `sequence` and an `isComplete` (`true` or `false`).

`puzzle.js`: this script will handle the logic behind the scenes.  A puzzle object will hold a `level` and a array of `damaged DNA`s along with an array of 'one stranded DNA's'.  It will be responsible for doing checks for each `match` upon dragging a 'one stranded DNA' to the corresponding `damaged DNA` and updating the 'damaged DNA' object appropriately.

`strand.js`: this lightweight script will house the constructor and update functions for the `one stranded DNA` objects.  Each `one stranded DNA` will contain a `sequence` and an `isMatched` (`true` or `false`).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `three.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `three.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `three.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `three.js` API.  First, build out the `DNA` object to connect to the `Puzzle` object.  Then, use `puzzle.js` to create and render at least the 'damaged DNA', and 'one standed DNA'.  Build in the ability to toggle the 'isMatched' state on dragging to right match for each 'one stranded DNA' and 'isComplete' state on match for each 'DNA'.  Goals for the day:

- Complete the `dna.js` and `strand.js` modules (constructor, update functions)
- Render a 'damaged DNA' and 'one stranded DNA' to the `Canvas` using `three.js`
- Make each 'one stranded DNA' draggable, toggling the state of the element and the 'damaged DNA' on match

**Day 3**: Create the puzzle logic-levels. Define different strategies for each level. Style the 'DNA' elements so that they stop spinning when hovered. Goals for the day:

- Create puzzle object that holds levels with an increasing difficulty
- Make 'DNA' elements responsive

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells


### Bonus features

Some directions that the DancingDNAs may go are:

- [ ] Add 3D effect to DNA molecules
- [ ] Add more levels
