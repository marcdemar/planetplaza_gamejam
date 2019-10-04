// Custom component with data for bird flight

@Component('shipData')
export class ShipData {
  oldPos: Vector3 = Vector3.Zero()
  nextPos: Vector3 = Vector3.Zero()
  fraction: number = 0
  pause: number = 0
  random: number = 0
  constructor(oldPos: Vector3, nextPos: Vector3, fraction: number,  pause: number, random: number ){
    this.oldPos = oldPos
    this.nextPos = nextPos
    this.fraction = fraction
    this.pause = pause
      this.random = random
  }
}

// Component group holding all birds
export const ships = engine.getComponentGroup(ShipData)

///////////////
// Systems

// System that updates each bird on every frame

export class FlyShip implements ISystem  {
  update(dt: number) {
    for (let ship of ships.entities) {
      let transform = ship.getComponent(Transform)
      let lerp = ship.getComponent(ShipData)
      if (lerp.fraction < 1) {
        transform.position = Vector3.Lerp(lerp.oldPos, lerp.nextPos, lerp.fraction)
        lerp.fraction += 1/300
      } else if (lerp.pause > 0) {
        lerp.pause -= 3
      } else {
        log("new position")

        if (lerp.random > 0){

          lerp.oldPos = transform.position
     // new random position
     lerp.nextPos.x = (Math.random() * 50) + 6
    //  lerp.nextPos.y = (Math.random() * 0) + 1
      lerp.nextPos.y = 11.7
    lerp.nextPos.z = (Math.random() * 50) + 6


       //lerp.nextPos.y = (Math.random() * 2) + 2



     lerp.fraction = 0
     lerp.pause = Math.random() * 100
     // face new position
     transform.lookAt(lerp.nextPos)

        }

      }
    }
  }


}
