const DNA = require('./dna').default;


class Puzzle {
  constructor(totalDNACount, damagedDNACount, minStrandLength, maxStrandLength, scene) {
    this.totalDNACount = totalDNACount;
    this.damagedDNACount = damagedDNACount;
    this.minStrandLength = minStrandLength;
    this.maxStrandLength = maxStrandLength;
    this.scene = scene;
  }

  startGame() {
    let holder, strand, strandArray, tube, materials;
    let holders = [], tubes = [];
    let isDamaged = true, isMatch = true;
    let matchedStrands = [];
    for (let i = 1; i <= this.totalDNACount; i++) {
      if (i > this.damagedDNACount) {
        isDamaged = false;
      } else {
        isDamaged = true;
      }
      let dnaCreater = new DNA(-40, 15, this.scene, isDamaged, this.minStrandLength);
      [holder, this.scene, strandArray, tube] = dnaCreater.createDNA();
      matchedStrands.push(strandArray);
      tubes.push(tube);
      holders.push(holder);
    }
    return [holders, this.scene];
  }

}

export default Puzzle;
