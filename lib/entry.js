const PuzzleView = require('./puzzle_view.js').default;

$(() => {
  const root = $('.dna-puzzle');
  const canvas = document.getElementById('canvas');
  let view = new PuzzleView(root, canvas);
});
