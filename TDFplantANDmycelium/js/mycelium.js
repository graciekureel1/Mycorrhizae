
class Mycelium {
  constructor(surfaceW, growthFactor) {
    this.dies = true;

    this.x = 0;
    this.y = surfaceWidth / 2 - 30;
    this.z = 0;
    this.id, this.mID;

    //age..before it dies and start
    this.age = 0;
    this.ageDeath = random(1.2, 2.2);
    this.ageGrowthStops = 0.8;
    this.bloomAge = 0.5;
    this.dies = true;
    this.alive = true;
    this.respawns = true;

    this.col = color(0, random(150, 255), 0);

    //add some noise
  }
}
