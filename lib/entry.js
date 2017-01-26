const PuzzleView = require('./puzzle_view.js').default;

$(() => {
  const root = $('.dna-puzzle');
  let view = new PuzzleView(root);
});
