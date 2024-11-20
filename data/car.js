class Car {
  #brand;
  #model;
  speed = 0;
  topSpeed = 200;
  isTrunkOpen = false;

  constructor(carDets) {
    this.#brand = carDets.brand;
    this.#model = carDets.model;
  }

  displayInfo() {
    let trunk = '';
    if (this.isTrunkOpen === false) {
      trunk = 'closed';
    } else {
      trunk = 'opened';
    }
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} KM/h. Trunk: ${trunk}.`);
  }

  go() {
    if (this.speed >= 0 && this.speed <= this.topSpeed && !this.isTrunkOpen) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed >= 5 && this.speed <= this.topSpeed) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

};


class RaceCar extends Car{
  acceleration;
  isTrunkOpen;
  topSpeed = 300;

  constructor(carDets) {
    super(carDets);
    this.acceleration = carDets.acceleration;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} KM/h. Acceleration: ${this.acceleration}.`);
  }

  go() {
    if (this.speed >= 0 && this.speed <= (this.topSpeed - this.acceleration)) {
      this.speed += this.acceleration;
    }
  }

  brake() {
    if (this.speed >= this.acceleration && (this.speed <= this.topSpeed)) {
      this.speed -= this.acceleration;
    }
  }

  openTrunk() {
    return;
  }

  closeTrunk() {
    return;
  }
};


const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
})

// car1.displayInfo();
// raceCar.displayInfo();