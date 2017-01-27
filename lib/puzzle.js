const DNA = require('./dna').default;


class Puzzle {
  constructor(totalDNACount, scene) {
    this.totalDNACount = totalDNACount;
    this.scene = scene;
  }

  startGame() {
    let holder;
    let holders = [];
    for (let i = 1; i <= this.totalDNACount; i++) {
      let dnaCreater = new DNA(-40, 15, this.scene);
      [holder, this.scene] = dnaCreater.createDNA();
      holders.push(holder);
    }
    return [holders, this.scene];
  }

}

export default Puzzle;
