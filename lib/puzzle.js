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
    let dna, holder, strand, strandArray, tube, materials;
    let dnas = [], holders = [], strands = [];
    let isDamaged = true, isMatch = true;
    let matchedStrands = [];
    for (let i = 1; i <= this.totalDNACount; i++) {
      if (i > this.damagedDNACount) {
        isDamaged = false;
      }
      let dnaCreater = new DNA(-40, 20, this.scene, isDamaged, this.minStrandLength);
      [dna, holder, this.scene, strandArray, tube] = dnaCreater.createDNA();
      matchedStrands.push(strandArray);
      dnas.push(dna);
      holders.push(holder);
    }

    for (let i = 1; i <= (this.totalStrandCount); i++) {
      if (i > this.matchedStrandCount) {
        isMatch = false;
      } else {
        materials = matchedStrands[i-1];
      }
      let strandCreater = new Strand(-40, this.scene, this.minStrandLength, isMatch);
      [strand, holder, this.scene] = strandCreater.createStrand(tube, materials);
      strands.push(strand);
      holders.push(holder);
    }
    return [holders, this.scene];
  }

}

export default Puzzle;
