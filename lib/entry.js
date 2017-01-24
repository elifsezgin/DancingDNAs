const PuzzleView = require('./puzzle_view.js').default;

$(() => {
  const root = $('.dna-puzzle');
  const canvas = document.getElementById('canvas');
  new PuzzleView(root, canvas);
});
