import { ships } from "./ship-flying";

let INTERVAL: number = 4

// component to regularly attempt a random animation
@Component('timer')
export class Timer {
    timeLeft: number = INTERVAL
}

// system to regularly attempt a random animation
export class MoveHead implements ISystem  {
    update(dt: number) {
      for (let ship of ships.entities) {
        let time = ship.getComponent(Timer)
        time.timeLeft -= dt
        if (time.timeLeft < 0){
            time.timeLeft = INTERVAL
            log("checked")
            randomHeadMovement(ship)
        }
      }
    }
}

// Randomly determine if any additional animations are played
export function randomHeadMovement(ship: IEntity){
    const anim = Math.random()
//apply different animations
}
