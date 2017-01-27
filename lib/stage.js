import DNA from './dna.js';

class Stage {
  
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

export default Stage;
