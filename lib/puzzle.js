const DNA = require('./dna').default;
const Strand = require('./strand').default;

class Puzzle {
  constructor(totalDNACount, damagedDNACount, totalStrandCount, matchedStrandCount, minStrandLength, maxStrandLength, scene) {
    this.totalDNACount = totalDNACount;
    this.damagedDNACount = damagedDNACount;
    this.totalStrandCount = totalStrandCount;
    this.matchedStrandCount = matchedStrandCount;
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
      let dnaCreater = new DNA(-40, 20, this.scene, isDamaged, this.minStrandLength);
      [holder, this.scene, strandArray, tube] = dnaCreater.createDNA();
      matchedStrands.push(strandArray);
      tubes.push(tube);
      holders.push(holder);
    }

    for (let k = 1; k <= (this.totalStrandCount); k++) {
      if (k > this.matchedStrandCount) {
        isMatch = false;
        tube = null;
        materials = null;
      } else {
        // debugger;
        tube = tubes[k-1];
        materials = matchedStrands[k-1];
        isMatch = true;
      }
      let strandCreater = new Strand(-20*(k-1), this.scene, this.minStrandLength, isMatch);

      [holder, this.scene] = strandCreater.createStrand(tube, materials);
      holders.push(holder);
    }
    return [holders, this.scene];
  }

}

export default Puzzle;
