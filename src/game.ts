
//imports

import { FlyShip, ships, ShipData } from "./modules/ship-flying";
import { Timer, MoveHead } from "./modules/move-head";



// add systems to the engine

engine.addSystem(new FlyShip())

engine.addSystem(new MoveHead())


///--------------
///--- scenes ---
///--------------
const scene = new Entity()
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)
engine.addEntity(scene)

const sceneSolarSystem = new Entity()
const transformSolarSystem = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
sceneSolarSystem.addComponentOrReplace(transformSolarSystem)
engine.addEntity(sceneSolarSystem)


const gltfShapeLandscape = new GLTFShape('models/landscape.glb')
const landscape = new Entity()
landscape.setParent(scene)
landscape.addComponentOrReplace(gltfShapeLandscape)
const transformLandscape = new Transform({
  position: new Vector3(32, 0.0, 32),
  scale: new Vector3(0.99, 0.99, 0.99)
})
landscape.addComponentOrReplace(transformLandscape)

// Create and add animator component for door open movement
landscape.addComponent(new Animator())
// Instance and add a clip
landscape.getComponent(Animator).addClip(new AnimationState("SpaceRoverAction.001"))
landscape.getComponent(Animator).addClip(new AnimationState("SpaceShuttleAction"))
// Set loop to false
landscape.getComponent(Animator).getClip("SpaceRoverAction.001").looping = true

engine.addEntity(landscape)

landscape.getComponent(Animator).getClip("SpaceRoverAction.001").play()
landscape.getComponent(Animator).getClip("SpaceShuttleAction").play()


//
// Global sounds
const globalSoundBox = new Entity()
globalSoundBox.setParent(scene)
globalSoundBox.addComponent(new Transform({
  position: new Vector3(32, 0, 32),
  scale: new Vector3(0.1, 0.1, 0.1)
}))
globalSoundBox.addComponent(new BoxShape())

// Create AudioClip object, holding audio file
const globalSoundBoxClip = new AudioClip('sounds/toplanet.wav')

// Create AudioSource component, referencing `clip`
const globalSoundBoxSource = new AudioSource(globalSoundBoxClip)

// Add AudioSource component to entity
globalSoundBox.addComponent(globalSoundBoxSource)
//doorOpenSwitch.addComponent(museumsource)
engine.addEntity(globalSoundBox)

const globalSoundBox2 = new Entity()
globalSoundBox2.setParent(scene)
globalSoundBox2.addComponent(new Transform({
  position: new Vector3(32, 0, 32),
  scale: new Vector3(0.1, 0.1, 0.1)
}))
globalSoundBox2.addComponent(new BoxShape())

// Create AudioClip object, holding audio file
const globalSoundBox2Clip = new AudioClip('sounds/explosion.wav')

// Create AudioSource component, referencing `clip`
const globalSoundBox2Source = new AudioSource(globalSoundBox2Clip)

// Add AudioSource component to entity
globalSoundBox2.addComponent(globalSoundBox2Source)
//doorOpenSwitch.addComponent(museumsource)
engine.addEntity(globalSoundBox2)


// Museum
const gltfShapeMuseum = new GLTFShape('models/museum5.glb')
const museum = new Entity()
museum.setParent(scene)
museum.addComponentOrReplace(gltfShapeMuseum)
const transformMuseum = new Transform({
  position: new Vector3(20, 9, 47),
  scale: new Vector3(1, 1, 1),
  rotation: Quaternion.Euler(0,45,0)
})
museum.addComponentOrReplace(transformMuseum)

// Create and add animator component for door open movement
museum.addComponent(new Animator())
// Instance and add a clip
museum.getComponent(Animator).addClip(new AnimationState("Cube.001Action.005"))
// Set loop to false
museum.getComponent(Animator).getClip("Cube.001Action.005").looping = false

//museum.getComponent(Animator).addClip(new AnimationState("ElevatorAction"))
//museum.getComponent(Animator).getClip("ElevatorAction").play()

engine.addEntity(museum)

// Open door
const doorOpenSwitch = new Entity()
doorOpenSwitch.setParent(museum)
doorOpenSwitch.addComponent(new Transform({
  position: new Vector3(-8, 0, 3),
  scale: new Vector3(0.5, 0.5, 0.5)
}))
doorOpenSwitch.addComponent(new BoxShape())

// Create AudioClip object, holding audio file
const switchclip = new AudioClip('sounds/door.mp3')

// Create AudioSource component, referencing `clip`
const switchsource = new AudioSource(switchclip)

// Add AudioSource component to entity
doorOpenSwitch.addComponent(switchsource)
//doorOpenSwitch.addComponent(museumsource)

//onclick
doorOpenSwitch.addComponent(
  new OnClick(() => {
      // Fetch the clip
      let a = museum.getComponent(Animator).getClip("Cube.001Action.005")
      a.reset()
      a.play()
      switchsource.playOnce()
    }
  )
)

engine.addEntity(doorOpenSwitch)


// Music
const musicMuseum = new Entity()
musicMuseum.setParent(museum)
musicMuseum.addComponent(new Transform({
  position: new Vector3(0, -1, 0),
  scale: new Vector3(0.5, 0.5, 0.5)
}))
musicMuseum.addComponent(new BoxShape())

const museumclip = new AudioClip('sounds/museum-background.mp3')
const museumsource = new AudioSource(museumclip)
musicMuseum.addComponent(museumsource)

museumsource.playing = true
museumsource.loop = true
museumsource.volume = 0.2

// Help
const helpMuseum = new Entity()
helpMuseum.setParent(museum)
helpMuseum.addComponent(new Transform({
  position: new Vector3(6.9, 0, 6.46),
  scale: new Vector3(1, 0.75, 0.075)
}))
helpMuseum.addComponent(new BoxShape())

const museumhelpclip = new AudioClip('sounds/help4.wav')
const museumhelpsource = new AudioSource(museumhelpclip)
helpMuseum.addComponent(museumhelpsource)

helpMuseum.addComponent(
  new OnClick(() => {
      // Fetch the clip
      museumhelpsource.playOnce()
    }
  )
)

engine.addEntity(helpMuseum)

// spaceship
// Museum
/*
const gltfplayOnce = new GLTFShape('models/spaceship.glb')
const spaceship = new Entity()
spaceship.setParent(landscape)
spaceship.addComponentOrReplace(gltfSpaceship)
const transformSpaceship = new Transform({
  position: new Vector3(10, 3, 0),
  scale: new Vector3(1, 1, 1)
})
spaceship.addComponentOrReplace(transformSpaceship)
// Create and add animator component for door open movement
spaceship.addComponent(new Animator())
// Instance and add a clip
spaceship.getComponent(Animator).addClip(new AnimationState("SpaceShip_01Action"))
// Set loop to false
spaceship.getComponent(Animator).getClip("SpaceShip_01Action").looping = true
spaceship.getComponent(Animator).getClip("SpaceShip_01Action").play()

*/
// ---------------------
// Solar Mass
// ---------------------
// Indicator
const solarMassIndicator = new Entity()
solarMassIndicator.setParent(museum)
solarMassIndicator.addComponent(new Transform({
  position: new Vector3(9.5, -1.2, 1.3),
  scale: new Vector3(0.1, 0.1, 0.1)
}))
solarMassIndicator.addComponent(new BoxShape())

//assign material
const solarMassIndicatorSurface = new Material()
solarMassIndicatorSurface.albedoColor = Color3.Red()
solarMassIndicatorSurface.emissiveColor = Color3.Red()
solarMassIndicatorSurface.ambientColor = Color3.Red()

solarMassIndicator.addComponent(solarMassIndicatorSurface)
engine.addEntity(solarMassIndicator)

// Up
const solarMassUp = new Entity()
solarMassUp.setParent(museum)
solarMassUp.addComponent(new Transform({
  position: new Vector3(9.5, -1.0, 1.5),
  scale: new Vector3(0.1, 0.5, 0.3)
}))
solarMassUp.addComponent(new BoxShape())

//assign material
const solarMassUpSurface = new Material()
solarMassUpSurface.albedoColor = Color3.Yellow()
solarMassUpSurface.emissiveColor = Color3.Yellow()
solarMassUpSurface.ambientColor = Color3.Yellow()

solarMassUp.addComponent(solarMassUpSurface)

const beepclip = new AudioClip('sounds/beep1.wav')
const beepsource = new AudioSource(beepclip)
solarMassUp.addComponent(beepsource)

//onclick
solarMassUp.addComponent(
  new OnClick(() => {
      beepsource.playOnce()
      let message = new UIText(textContainer)
      massOfTheSunUnits *= 1.1
      message.value = "Mass of the Sun: " + massOfTheSunUnits.toString().substring(0,4) + " times our Sun's mass"
      message.height = 30
      message.paddingLeft = 10
      message.paddingBottom = 10
      message.fontSize = 12
      solarMassIndicator.getComponent(Transform).position.y = solarMassIndicator.getComponent(Transform).position.y + 0.02
      for (let earth of earths.entities){
            earth.getComponent(EarthPosition).massOfTheSunKg *= 1.1
            sun.getComponent(Material).albedoColor = Color3.Red()
      }
    }
  )
)

engine.addEntity(solarMassUp)

// Down
const solarMassDown = new Entity()
solarMassDown.setParent(museum)
solarMassDown.addComponent(new Transform({
  position: new Vector3(9.5, -1.5, 1.5),
  scale: new Vector3(0.1, 0.5, 0.3)
}))
solarMassDown.addComponent(new BoxShape())

//assign material
const solarMassDownSurface = new Material()
solarMassDownSurface.albedoColor = Color3.Blue()
solarMassDownSurface.emissiveColor = Color3.Blue()
solarMassDownSurface.ambientColor = Color3.Blue()

solarMassDown.addComponent(solarMassDownSurface)

solarMassDown.addComponent(beepsource)

//onclick
solarMassDown.addComponent(
  new OnClick(() => {
      beepsource.playOnce()
      let message = new UIText(textContainer)
      massOfTheSunUnits /= 1.1
      message.value = "Mass of the Sun: " + massOfTheSunUnits.toString().substring(0,4) + " times our Sun's mass"
      message.height = 30
      message.paddingLeft = 10
      message.paddingBottom = 10
      message.fontSize = 12
      solarMassIndicator.getComponent(Transform).position.y = solarMassIndicator.getComponent(Transform).position.y - 0.02
      for (let earth of earths.entities){
            earth.getComponent(EarthPosition).massOfTheSunKg /= 1.1
            sun.getComponent(Material).albedoColor = Color3.Red()
      }
    }
  )
)

engine.addEntity(solarMassDown)

// ---------------------
// Orbital Speed
// ---------------------
// Indicator
const orbitalSpeedIndicator = new Entity()
orbitalSpeedIndicator.setParent(museum)
orbitalSpeedIndicator.addComponent(new Transform({
  position: new Vector3(9.5, -1.2, -0.7),
  scale: new Vector3(0.1, 0.1, 0.1)
}))
orbitalSpeedIndicator.addComponent(new BoxShape())

//assign material
const orbitalSpeedIndicatorSurface = new Material()
orbitalSpeedIndicatorSurface.albedoColor = Color3.Red()
orbitalSpeedIndicatorSurface.emissiveColor = Color3.Red()
orbitalSpeedIndicatorSurface.ambientColor = Color3.Red()

orbitalSpeedIndicator.addComponent(orbitalSpeedIndicatorSurface)
engine.addEntity(orbitalSpeedIndicator)

// Up
const orbitalSpeedUp = new Entity()
orbitalSpeedUp.setParent(museum)
orbitalSpeedUp.addComponent(new Transform({
  position: new Vector3(9.5, -1.0, -0.9),
  scale: new Vector3(0.1, 0.5, 0.3)
}))
orbitalSpeedUp.addComponent(new BoxShape())

//assign material
const orbitalSpeedUpSurface = new Material()
orbitalSpeedUpSurface.albedoColor = Color3.Yellow()
orbitalSpeedUpSurface.emissiveColor = Color3.Yellow()
orbitalSpeedUpSurface.ambientColor = Color3.Yellow()

orbitalSpeedUp.addComponent(orbitalSpeedUpSurface)

orbitalSpeedUp.addComponent(beepsource)

//onclick
orbitalSpeedUp.addComponent(
  new OnClick(() => {
      beepsource.playOnce()
      if (numberOfCalculationsPerFrame > 1) {
        orbitalSpeedIndicator.getComponent(Transform).position.y = orbitalSpeedIndicator.getComponent(Transform).position.y + 0.02
        numberOfCalculationsPerFrame -= 1
        deltaT = 3600 * 24 * 1 / numberOfCalculationsPerFrame;
        deltaRotation = (deltaT / (3600*24)) * 360
        currentRotation = 0
      }
    }
  )
)

engine.addEntity(solarMassUp)

// Down
const orbitalSpeedDown = new Entity()
orbitalSpeedDown.setParent(museum)
orbitalSpeedDown.addComponent(new Transform({
  position: new Vector3(9.5, -1.5, -0.9),
  scale: new Vector3(0.1, 0.5, 0.3)
}))
orbitalSpeedDown.addComponent(new BoxShape())

//assign material
const orbitalSpeedDownSurface = new Material()
orbitalSpeedDownSurface.albedoColor = Color3.Blue()
orbitalSpeedDownSurface.emissiveColor = Color3.Blue()
orbitalSpeedDownSurface.ambientColor = Color3.Blue()

orbitalSpeedDown.addComponent(orbitalSpeedDownSurface)

orbitalSpeedDown.addComponent(beepsource)

//onclick
orbitalSpeedDown.addComponent(
  new OnClick(() => {
      beepsource.playOnce()
      if (numberOfCalculationsPerFrame < 20) {
        orbitalSpeedIndicator.getComponent(Transform).position.y = orbitalSpeedIndicator.getComponent(Transform).position.y - 0.02
        numberOfCalculationsPerFrame += 1
        deltaT = 3600 * 24 * 1 / numberOfCalculationsPerFrame;
        deltaRotation = (deltaT / (3600*24)) * 360
        currentRotation = 0
      }
    }
  )
)

engine.addEntity(solarMassUp)

// Reset
const orbitalReset = new Entity()
orbitalReset.setParent(museum)
orbitalReset.addComponent(new Transform({
  position: new Vector3(9.5, -1.7, 0.3),
  scale: new Vector3(0.2, 0.1, 1.3)
}))
orbitalReset.addComponent(new BoxShape())

//assign material
const orbitalResetSurface = new Material()
orbitalResetSurface.albedoColor = Color3.Red()
orbitalResetSurface.emissiveColor = Color3.Red()
orbitalResetSurface.ambientColor = Color3.Red()

orbitalReset.addComponent(orbitalResetSurface)

orbitalReset.addComponent(beepsource)

//onclick
orbitalReset.addComponent(
  new OnClick(() => {

      beepsource.playOnce()
      orbitalSpeedIndicator.getComponent(Transform).position.y = -1.2
      solarMassIndicator.getComponent(Transform).position.y = -1.2

      // remove all planets
      let planets = engine.getComponentGroup(EarthPosition)
      while (planets.entities.length) {
      engine.removeEntity(planets.entities[0])
      }

      // reset sun position and mass
      sun.getComponent(Transform).position.set(32,12,32)
      massOfTheSunUnits = 1

      numberOfCalculationsPerFrame = 10
      deltaT = 3600 * 24 * 1 / numberOfCalculationsPerFrame;
      deltaRotation = (deltaT / (3600*24)) * 360
      currentRotation = 0

      // spawn
      spawnSolarSystem()

    }
  )
)

engine.addEntity(solarMassUp)



/// --------------------
/// --- solar system ---
/// --------------------

// physics constants
const gravitationalConstant = 6.67408 * Math.pow(10, -11)
const massOfTheSunKg = (1.98855 * Math.pow(10, 30)) * 1
let massOfTheSunUnits = 1
const massEarthKg = 5.972 * Math.pow(10,24)

// earth
const earthSunDistanceMeters = 1.496 * Math.pow(10, 11)
const earthAngularVelocityMetersPerSecond = 1.990986 *  Math.pow(10, -7) // (2 * PI) / <number of seconds in earth year>
// Moon
const moonEarthDistanceMeters = 384400 * Math.pow(10, 3)
const earthMoonAngularVelocityMetersPerSecond = 2.69 *  Math.pow(10, -6) // (2 * PI) / <number of seconds in earth year>

// venus
const venusSunDistanceMeters = 108.2 * Math.pow(10, 9)
const venusAngularVelocityMetersPerSecond =  3.23 *  Math.pow(10, -7) // (2 * PI) / <number of seconds in venus year = 225 days>

// mars
const marsSunDistanceMeters = 227.9 * Math.pow(10, 9)
const marsAngularVelocityMetersPerSecond =  1.05 *  Math.pow(10, -7) // (2 * PI) / <number of seconds in mars year = 687 days>

// jupiter
const jupiterSunDistanceMeters = 778.5 * Math.pow(10, 9)
const jupiterAngularVelocityMetersPerSecond =  1.659 *  Math.pow(10, -8) // (2 * PI) / <number of seconds in jupiter year = 12 years>

// saturn
const saturnSunDistanceMeters = 1434 * Math.pow(10, 9)
const saturnAngularVelocityMetersPerSecond =  6.76 *  Math.pow(10, -9) // (2 * PI) / <number of seconds in jupiter year = 12 years>

// mercury
const mercSunDistanceMeters = 57.91 * Math.pow(10, 9)
const mercAngularVelocityMetersPerSecond =  8.259 *  Math.pow(10, -7) // (2 * PI) / <number of seconds in mars year = 88 days>

// meteor
const meteorSunDistanceMeters =  3000 * Math.pow(10, 9) // this should preferably a random distance
const meteorAngularVelocityMetersPerSecond =  0.1 *  Math.pow(10, -8) // this should be low.. the lower the more 'falling' speed towards the sun

var pixelsInOneEarthSunDistancePerPixel = 6;

// A factor by which I scale the distance between the Sun and the Earth
// in order to properly map it to the grid size and show it on screen
var scaleFactor = earthSunDistanceMeters / pixelsInOneEarthSunDistancePerPixel;

var numberOfCalculationsPerFrame = 10; //25;

var numberOfRotations = 0

// The length of the time increment, in seconds.
var deltaT = 3600 * 24 * 1 / numberOfCalculationsPerFrame;
var deltaRotation = (deltaT / (3600*24)) * 360
var currentRotation = 0

@Component("earthPosition")
export class EarthPosition {
  distance_value: number
  scaled_distance: number
  original_distance: number
  distance_speed: number
  angle_value: number
  angle_speed: number
  massOfTheSunKg: number
  planetName: string
  distanceFactor: number
  center: boolean = false
  normal_scale: number
  max_scale: number
  constructor(dv: number,ds: number,av: number,as: number, m: number, p: string,i: number,sc: number, msc: number) {
    this.distance_value = dv
    this.original_distance = dv
    this.distance_speed = ds
    this.angle_value = av
    this.angle_speed = as
    this.massOfTheSunKg = m
    this.planetName = p
    this.distanceFactor = i
    this.normal_scale = sc
    this.max_scale = msc
  }
}

@Component("earthFlag")
export class EarthFlag {
}

@Component("sunFlag")
export class SunFlag {
}

@Component("lerpData")
export class LerpData {
  originX: number = 32
  originZ: number = 32
  fraction: number = 0.01
}

export const earths = engine.getComponentGroup(EarthPosition)

// Orbits
export class EarthPath {
  update() {
    for (let earth of earths.entities){
      let c = earth.getComponent(EarthPosition)

      // remove object if 'swallowed' by the sun
      if (c.distance_value < (1.391 * Math.pow(10,8))) { // 1.391 million km's (diameter of the sun)
          engine.removeEntity(earth)
          globalSoundBox2Source.playOnce()
          let message = new UIText(textContainer)
          message.value = "Oh no! " + c.planetName + " has been swallowed by the sun"
          message.height = 30
          message.paddingLeft = 10
          message.paddingBottom = 10
          message.fontSize = 12
      } else {

        var distanceAcceleration = calculateDistanceAcceleration(c);
        c.distance_speed = newValue(c.distance_speed, deltaT, distanceAcceleration);
        c.distance_value = newValue(c.distance_value, deltaT, c.distance_speed);

        c.scaled_distance = c.distance_value / scaleFactor;

        var angleAcceleration = calculateAngleAcceleration(c);
        c.angle_speed = newValue(c.angle_speed, deltaT, angleAcceleration);
        c.angle_value = newValue(c.angle_value, deltaT, c.angle_speed);

        if (c.angle_value > 2 * Math.PI) {
          c.angle_value = c.angle_value % (2 * Math.PI);
        }

        // 2d position
        var middleX = Math.floor(64 / 2);
        var middleZ = Math.floor(64 / 2);

        var centerX = (Math.cos(c.angle_value) * -c.scaled_distance) * c.distanceFactor
        var centerZ = (Math.sin(-c.angle_value) * c.scaled_distance) * c.distanceFactor

        //var centerX = Math.cos(c.angle_value) * -c.scaled_distance + middleX;
        //var centerZ = Math.sin(-c.angle_value) * c.scaled_distance + middleZ;

        // set invisible if off the grid
        /*
        var distance = middleX - Math.abs(centerX)
        if (distance >= 32) {
          earth.getComponent(SphereShape).visible = false
        } else {
          earth.getComponent(SphereShape).visible = true
        }
        */

        // let's say earth should be at the center of the land (32,32)
        // Then all 2d coordinates must be calculated relative to earth rather than the sun
        // maybe call setParent for all objects
        // another method would be to simply adjust the position of the sun, so earth always appears
        // in the middle.
        // let's say earth-sun distance is -8,-8
        // That means the sun needs to be move 8,8 for th earth to appear at the center

        // set position
        let t = earth.getComponent(Transform)
        t.position.x = centerX
        t.position.z = centerZ

        // check whether a planet should be centered (instead of sun)
        if (c.center == true) {
          // planet at center, so lerp sun to offset position
          // as all solar objects are children to the sun the whole solar system lerps
          let st = sun.getComponent(Transform)
          st.position.x = (sun.getComponent(LerpData).originX * (1-sun.getComponent(LerpData).fraction)) + ((middleX-t.position.x) * sun.getComponent(LerpData).fraction)
          st.position.z = (sun.getComponent(LerpData).originZ * (1-sun.getComponent(LerpData).fraction)) + ((middleZ-t.position.z) * sun.getComponent(LerpData).fraction)
          if (sun.getComponent(LerpData).fraction < 1) {
            sun.getComponent(LerpData).fraction += 0.01
          }

          // also scale planet at the center
          t.scale.setAll((c.normal_scale * (1-sun.getComponent(LerpData).fraction)) + ((c.max_scale) * sun.getComponent(LerpData).fraction))
        }

        // rotate earth only (nice addition would be to rotate every planet with correct speed)

        if (earth.hasComponent(EarthFlag)) {
          t.rotation.setEuler(0, -currentRotation, 180)
          currentRotation += deltaRotation
          if (currentRotation >= 360) {
            currentRotation = 0
            numberOfRotations += 1  // for debug reasons only
            if (numberOfRotations >= 365) {
              numberOfRotations = 0
            }
            //log(numberOfRotations)
          }
        }

      }
    }
  }
}

engine.addSystem(new EarthPath())

function calculateDistanceAcceleration(state: EarthPosition) {
  return (state.distance_value * Math.pow(state.angle_speed, 2)) - ((gravitationalConstant * state.massOfTheSunKg) / Math.pow(state.distance_value, 2));
}
function calculateAngleAcceleration(state: EarthPosition) {
  return (-2.0 * state.distance_speed * state.angle_speed) / state.distance_value;
}
function newValue(currentValue, deltaT, derivative) {
  return currentValue + (deltaT * derivative);
}

///---------------------
///--- Event manager ---
///---------------------
const events = new EventManager()

@EventConstructor()
class planetClickEvent {
  constructor(public entity: Entity) {}
}

@EventConstructor()
class sunClickEvent {
  constructor() {}
}

events.addListener(planetClickEvent, null, ({ entity }) => {
  let e = entity.getComponent(EarthPosition)
  globalSoundBoxSource.playOnce()


/*
  // reset planet center and scale
  for (let earth of earths.entities){
    earth.getComponent(EarthPosition).center = false
    earth.getComponent(Transform).scale.setAll(earth.getComponent(EarthPosition).normal_scale)
  }

  // put the clicked planet at the center
  e.center = true

  // init/reset sun lerp data
  sun.getComponent(LerpData).originX = sun.getComponent(Transform).position.x
  sun.getComponent(LerpData).originZ = sun.getComponent(Transform).position.z
  sun.getComponent(LerpData).fraction = 0.01
  */

//------------------- Ship code start
let transform = ship.getComponent(Transform)
let lerp = ship.getComponent(ShipData)
 lerp.oldPos = transform.position

let x =  32 + entity.getComponent(Transform).position.x
let z =  32 + entity.getComponent(Transform).position.z

if(x<6 )
{
  x = 6
}
if(z<6 )
{
  z = 6
}

if(x>62 )
{
  x = x-6
}
if(z>62 )
{
  z =z-6
}

  lerp.nextPos.x  = x //(Math.cos(c.angle_value) * -c.scaled_distance) * c.distanceFactor
  lerp.nextPos.z  = z
  lerp.nextPos.y = 11 //earth.getComponent(Transform).position.z
  lerp.fraction = 0
  lerp.random = 0
 lerp.pause = Math.random() * 500
// face new position
transform.lookAt(lerp.nextPos)

//----------------  Ship code end


  let message = new UIText(textContainer)
  message.value = "You clicked " + e.planetName + "\nCurrent distance to the Sun: " + Math.round(e.distance_value/1000) + " km's"
  message.height = 50
  message.paddingLeft = 10
  message.paddingBottom = 10
  message.fontSize = 12
})

events.addListener(sunClickEvent, null, () => {

  // reset planet center and scale
  for (let earth of earths.entities){
    earth.getComponent(EarthPosition).center = false
    earth.getComponent(Transform).scale.setAll(earth.getComponent(EarthPosition).normal_scale)
  }

  // reset sun position and lerp data
  sun.getComponent(Transform).position.x = 32
  sun.getComponent(Transform).position.z = 32
  sun.getComponent(LerpData).originX = 32
  sun.getComponent(LerpData).originZ = 32
  sun.getComponent(LerpData).fraction = 0.01



  //------------------- Ship code start
  let transform = ship.getComponent(Transform)
  let lerp = ship.getComponent(ShipData)
   lerp.oldPos = transform.position
    lerp.nextPos.x  = 32
    lerp.nextPos.z  = 32
    lerp.nextPos.y = 11 //earth.getComponent(Transform).position.z
    lerp.fraction = 0
    lerp.random = 0
   lerp.pause = Math.random() * 500
  // face new position
  transform.lookAt(lerp.nextPos)

  //----------------  Ship code end



  let message = new UIText(textContainer)
  message.value = "You clicked the sun"
  message.height = 50
  message.paddingLeft = 10
  message.paddingBottom = 10
  message.fontSize = 12

})

///--------------------------
///--- Spawn solar system ---
///--------------------------

let sun = spawnSun()
spawnSolarSystem()

function spawnSun() {
  // ad sun
  let sun = new Entity()
  sun.setParent(sceneSolarSystem)
  sun.addComponent(new Transform({
    position: new Vector3(32, 12, 32),
    scale: new Vector3(0.7, 0.7, 0.7)
  }))
  sun.addComponent(new SphereShape())
  //assign material
  const sunSurface = new Material()
  sunSurface.albedoColor = Color3.Yellow()
  sunSurface.emissiveColor = Color3.Yellow()
  sunSurface.ambientColor = Color3.Yellow()

  sun.addComponent(sunSurface)

  sun.addComponent(new LerpData())

  //onclick
  sun.addComponent(
    new OnClick(() => {
        events.fireEvent(new sunClickEvent())
      }
    )
  )

  engine.addEntity(sun)

  return sun
}

function spawnSolarSystem() {

  // add earth
  let planetEarth = spawnPlanet(sun,earthSunDistanceMeters,Math.PI / 6,earthAngularVelocityMetersPerSecond,massOfTheSunKg,"earth",0.5,3,"models/earth_clouds.jpg",Color3.Blue(),"",1)
  planetEarth.addComponent(new EarthFlag())
  planetEarth.getComponent(Transform).position.y = 0

  // add earth's moon
  //let planetEarthMoon = spawnPlanet(planetEarth,moonEarthDistanceMeters,Math.PI / 6,earthMoonAngularVelocityMetersPerSecond,massEarthKg,"moon",0.5,"",Color3.Gray(),"",100)
  //planetEarthMoon.getComponent(Transform).position.y = 0

  // spawn mercury
  let mercury = spawnPlanet(sun,mercSunDistanceMeters,Math.PI / 6,mercAngularVelocityMetersPerSecond,massOfTheSunKg,"mercury",0.25,3,"",Color3.Yellow(),"",1)
  mercury.getComponent(Transform).position.y = 0

  // spawn venus
  let venus = spawnPlanet(sun,venusSunDistanceMeters,Math.PI / 6,venusAngularVelocityMetersPerSecond,massOfTheSunKg,"venus",0.5,3,"",Color3.White(),"",1)
  venus.getComponent(Transform).position.y = 0

  // spawn mars
  //let mars = spawnPlanet(sun,marsSunDistanceMeters,Math.PI / 6,marsAngularVelocityMetersPerSecond,massOfTheSunKg,"mars",0.004,0.024,"",Color3.Red(),"models/Mars/1239 Mars.gltf",1)
  let mars = spawnPlanet(sun,marsSunDistanceMeters,Math.PI / 6,marsAngularVelocityMetersPerSecond,massOfTheSunKg,"mars",0.4,0.024,"",Color3.Red(),"",1)
  mars.getComponent(Transform).position.y = 0

  // spawn jupiter
  let jupiter = spawnPlanet(sun,jupiterSunDistanceMeters,Math.PI / 6,jupiterAngularVelocityMetersPerSecond,massOfTheSunKg,"jupiter",0.10,0.3,"",Color3.Teal(),"models/Jupiter/CHAHIN_JUPITER.gltf",1)
  jupiter.getComponent(Transform).position.y = 0

  // spawn saturn
  let saturn = spawnPlanet(sun,saturnSunDistanceMeters,Math.PI / 6,saturnAngularVelocityMetersPerSecond,massOfTheSunKg,"saturn",0.01,0.04,"",Color3.Teal(),"models/Saturn/scene.gltf",1)
  saturn.getComponent(Transform).position.y = 0

  // comet
  /*
  const cometSunDistanceMeters =  3000 * Math.pow(10, 9) // this should preferably a random distance
  const cometAngularVelocityMetersPerSecond =  0.1 *  Math.pow(10, -8) // this should be low.. the lower the more 'falling' speed towards the sun
  // spawn a comet
  let comet = spawnPlanet(sun,cometSunDistanceMeters,Math.PI / 6,cometAngularVelocityMetersPerSecond,massOfTheSunKg,"comet #1",1,1,"",Color3.Black(),"",1)
  comet.getComponent(Transform).position.y = 0
  */
  const asteroidSunDistanceMeters = 4.1 * Math.pow(10,11)
  const asteroidAngularVelocityMetersPerSecond = 4.326 *  Math.pow(10, -8) // (2 * PI) / <number of seconds in asteroid year = 1680 days>
  var i
  for (i=0;i < 50;i++) { // spawn lots of asteroids
    let asteroid = spawnPlanet(sun,asteroidSunDistanceMeters,(Math.floor(Math.random() * 360)),asteroidAngularVelocityMetersPerSecond,massOfTheSunKg,"asteroid #"+i.toString(),(Math.random() * 0.1),0.5,"",Color3.Gray(),'models/asteroid.glb',1)
    asteroid.getComponent(Transform).position.y = 0
  }

  return sun
}

// spawn planet function
function spawnPlanet(scene,earthSunDistanceMeters: number, angle_value: number, earthAngularVelocityMetersPerSecond: number,massOfTheSunKg: number, planetName: string, scale: number, max_scale: number, texture: string, color: Color3, gltf: string,distanceFactor: number) {
  let p = new Entity()
  p.setParent(scene)
  p.addComponent(new EarthPosition(earthSunDistanceMeters, 0,angle_value,earthAngularVelocityMetersPerSecond,massOfTheSunKg,planetName,distanceFactor,scale,max_scale))
  p.addComponent(new Transform({
    position: new Vector3(1, 12, 1),
    scale: new Vector3(scale, scale, scale)
  }))

  if (gltf != '') {
    let gltfShape = new GLTFShape(gltf)
    p.addComponent(gltfShape)
  } else {

    p.addComponent(new SphereShape())

    let planetMaterial = new Material()
    if (texture != "") {
      let planetTexture = new Texture(texture,{hasAlpha: false, wrap: 1})
      planetMaterial.albedoTexture = planetTexture
    } else {
      planetMaterial.albedoColor = color
    }
    p.addComponent(planetMaterial)

  }

  //onclick
  p.addComponent(
    new OnClick(() => {
        events.fireEvent(new planetClickEvent(p))
      }
    )
  )


  engine.addEntity(p)

  return p
}

/*
// ad sun
let sun = new Entity()
sun.addComponent(new Transform({
  position: new Vector3(32, 8, 32),
  scale: new Vector3(1, 1, 1)
}))
sun.addComponent(new SphereShape())
//assign material
const sunSurface = new Material()
sunSurface.albedoColor = Color3.Yellow()
sunSurface.emissiveColor = Color3.Yellow()
sunSurface.ambientColor = Color3.Yellow()

sun.addComponent(sunSurface)

engine.addEntity(sun)
*/

///----------------
///--- SETUP UI ---
///----------------

const canvas = new UICanvas()

// Text container
const textContainer = new UIContainerStack(canvas)
textContainer.adaptWidth = false
textContainer.width = '20%'
textContainer.height = '30%'
textContainer.positionY = 0
textContainer.positionX = 0
textContainer.color = Color4.Gray()
textContainer.opacity = 0.5
textContainer.hAlign = 'right'
textContainer.vAlign = 'bottom'
textContainer.stackOrientation = UIStackOrientation.VERTICAL

// Welcome
const welcomeMsg = new UIText(textContainer)
welcomeMsg.paddingLeft = 10
welcomeMsg.paddingTop = 10
welcomeMsg.paddingBottom = 10
welcomeMsg.value = "Welcome to Planet Plaza!"
welcomeMsg.hAlign = "center"
welcomeMsg.vAlign = "center"
welcomeMsg.fontSize = 18

// Explanation
const descrMsg = new UIText(textContainer)
descrMsg.height = 220
descrMsg.paddingLeft = 10
descrMsg.paddingBottom = 10
descrMsg.value = "Planet Plaza is an awesome place where \nyou can study our solar system and the \nmovement of the planets. The planets follow \nNewton's universal law of gravity, their orbits \nhave not been preprogrammed. The closer the \nplanets are to the Sun, the faster they move. \nAnd the bigger the sun's mass....well...try \nincreasing the mass of the sun for yourself \nin the museum and watch the catastrophy \nunfold! \n\nHave fun!"
descrMsg.hAlign = "center"
descrMsg.fontSize = 14

/*

// Menu container
const menuContainer = new UIContainerStack(canvas)
menuContainer.adaptWidth = true
menuContainer.width = '100%'
menuContainer.positionY = 0
menuContainer.positionX = 0
menuContainer.color = Color4.Gray()
menuContainer.opacity = 0.7
menuContainer.hAlign = 'center'
menuContainer.vAlign = 'bottom'
menuContainer.stackOrientation = UIStackOrientation.HORIZONTAL

let imageAtlas = "images/UI-map-v2.jpg"
let imageTexture = new Texture(imageAtlas)

const scaleUpButton = new UIImage(menuContainer, imageTexture)
scaleUpButton.opacity = 0.5
scaleUpButton.sourceLeft = 0
scaleUpButton.sourceTop = 0
scaleUpButton.sourceWidth = 99
scaleUpButton.sourceHeight = 100
scaleUpButton.height = 72
scaleUpButton.width = 72
scaleUpButton.onClick = new OnClick(() => {
  if (pixelsInOneEarthSunDistancePerPixel < 20) {
    pixelsInOneEarthSunDistancePerPixel += 1
    scaleFactor = earthSunDistanceMeters / pixelsInOneEarthSunDistancePerPixel;
  }
})
const scaleDownButton = new UIImage(menuContainer, imageTexture)
scaleDownButton.opacity = 0.5
scaleDownButton.sourceLeft = 109
scaleDownButton.sourceTop = 0
scaleDownButton.sourceWidth = 100
scaleDownButton.sourceHeight = 100
scaleDownButton.height = 72
scaleDownButton.width = 72
scaleDownButton.onClick = new OnClick(() => {
  if (pixelsInOneEarthSunDistancePerPixel > 2) {
    pixelsInOneEarthSunDistancePerPixel -= 1
    scaleFactor = earthSunDistanceMeters / pixelsInOneEarthSunDistancePerPixel;
  }
})
const speedUpButton = new UIImage(menuContainer, imageTexture)
speedUpButton.opacity = 0.5
speedUpButton.sourceLeft = 218
speedUpButton.sourceTop = 0
speedUpButton.sourceWidth = 99
speedUpButton.sourceHeight = 100
speedUpButton.height = 72
speedUpButton.width = 72
speedUpButton.onClick = new OnClick(() => {
  if (numberOfCalculationsPerFrame > 1) {
    numberOfCalculationsPerFrame -= 1
    deltaT = 3600 * 24 * 1 / numberOfCalculationsPerFrame;
    deltaRotation = (deltaT / (3600*24)) * 360
    currentRotation = 0
  }
})

const speedDownButton = new UIImage(menuContainer, imageTexture)
speedDownButton.opacity = 0.5
speedDownButton.sourceLeft = 326
speedDownButton.sourceTop = 0
speedDownButton.sourceWidth = 99
speedDownButton.sourceHeight = 100
speedDownButton.height = 72
speedDownButton.width = 72
speedDownButton.onClick = new OnClick(() => {
  if (numberOfCalculationsPerFrame < 300) {
    numberOfCalculationsPerFrame += 1
    deltaT = 3600 * 24 * 1 / numberOfCalculationsPerFrame;
    deltaRotation = (deltaT / (3600*24)) * 360
    currentRotation = 0
  }
})

const sunMassUpButton = new UIImage(menuContainer, imageTexture)
sunMassUpButton.opacity = 0.5
sunMassUpButton.sourceLeft = 436
sunMassUpButton.sourceTop = 0
sunMassUpButton.sourceWidth = 100
sunMassUpButton.sourceHeight = 100
sunMassUpButton.height = 72
sunMassUpButton.width = 72
sunMassUpButton.onClick = new OnClick(() => {
  let message = new UIText(textContainer)
  massOfTheSunUnits *= 1.1
  message.value = "Mass of the Sun: " + massOfTheSunUnits.toString().substring(0,4) + " times our Sun's mass"
  message.height = 30
  message.paddingLeft = 10
  message.paddingBottom = 10
  message.fontSize = 12

  for (let earth of earths.entities){
        earth.getComponent(EarthPosition).massOfTheSunKg *= 1.1
        sun.getComponent(Material).albedoColor = Color3.Red()
  }
})

const sunMassDownButton = new UIImage(menuContainer, imageTexture)
sunMassDownButton.opacity = 0.5
sunMassDownButton.sourceLeft = 545
sunMassDownButton.sourceTop = 0
sunMassDownButton.sourceWidth = 100
sunMassDownButton.sourceHeight = 100
sunMassDownButton.height = 72
sunMassDownButton.width = 72
sunMassDownButton.onClick = new OnClick(() => {
  let message = new UIText(textContainer)
  massOfTheSunUnits /= 1.1
  message.value = "Mass of the Sun: " + massOfTheSunUnits.toString().substring(0,4) + " times our Sun's mass"
  message.height = 30
  message.paddingLeft = 10
  message.paddingBottom = 10
  message.fontSize = 12

  for (let earth of earths.entities){
        earth.getComponent(EarthPosition).massOfTheSunKg /= 1.1
        sun.getComponent(Material).albedoColor = Color3.Red()
  }

})

const resetButton = new UIImage(menuContainer, imageTexture)
resetButton.opacity = 0.3
resetButton.sourceLeft = 654
resetButton.sourceTop = 0
resetButton.sourceWidth = 100
resetButton.sourceHeight = 100
resetButton.height = 72
resetButton.width = 72
resetButton.onClick = new OnClick(() => {

  // remove all planets
  let planets = engine.getComponentGroup(EarthPosition)
  while (planets.entities.length) {
  engine.removeEntity(planets.entities[0])
  }

  // reset sun position and mass
  sun.getComponent(Transform).position.set(32,12,32)
  massOfTheSunUnits = 1

  // spawn
  spawnSolarSystem()

})

*/

// add shipship to engine

const startPosition = new Vector3(6,11.7, 55)
const shipScale = new Vector3( 1, 1,1)

// Create a new bird

let shipShape = new GLTFShape("models/spaceship3.glb")

  //  const rover = new Entity()
const ship = new Entity()
    ship.addComponent(new Transform({
      position: startPosition,
      scale: shipScale
    }))

    ship.addComponent(shipShape)

  //  const nextPos = new Vector3((0.5 * 12) + 2 ,0 ,(0.5 * 12) + 2)
   //const nextPos = new Vector3(6 , 11.7 ,6)
   const nextPos = new Vector3(14, 11.7, 47)
    ship.addComponent(new ShipData(startPosition, nextPos, 0, 200,0))
    ship.addComponent(new Timer())
    ship.getComponent(Transform).lookAt(nextPos)

    // Create AudioClip object, holding audio file
    const homeClick = new AudioClip('sounds/gohome.wav')

    // Create AudioSource component, referencing `clip`
    const homeClickSource = new AudioSource(homeClick)

    // Add AudioSource component to entity
    ship.addComponent(homeClickSource)

    ship.addComponent(
      new OnClick(() => {
          // Fetch the clip
          homeClickSource.playOnce()

          let transform = ship.getComponent(Transform)
          let lerp = ship.getComponent(ShipData)

          lerp.oldPos = transform.position
          // new random position
          lerp.nextPos.x = 14
          lerp.nextPos.y = 11.7
          lerp.nextPos.z = 47
        //  const nextPos = new Vector3(20, 11, 45)20, 9, 47
         //ship.addComponent(new ShipData(lerp.oldPos,lerp.nextPos, 0, 200))
         //ship.addComponent(new Timer())
         //ship.getComponent(Transform).lookAt(lerp.nextPos)

         /*
         let message2 = new UIText(textContainer)
         message2.value = "Random x : " +  lerp.nextPos.x + " z : " +  lerp.nextPos.z
         message2.height = 30
         message2.paddingLeft = 10
         message2.paddingBottom = 10
         message2.fontSize = 12
         */

          lerp.fraction = 0
          lerp.random = 0
          lerp.pause = Math.random() * 10
          // face new position
          transform.lookAt(lerp.nextPos)



        }
      )
    )

    engine.addEntity(ship)

    // Open door
    const tourSwitch = new Entity()
    tourSwitch.setParent(ship)
    tourSwitch.addComponent(new Transform({
      position: new Vector3(-0.8, 0.7, 1.9),
      scale: new Vector3(0.5, 0.3, 0.1),
      rotation: Quaternion.Euler(70,-20,0)
    }))
    tourSwitch.addComponent(new BoxShape())

    // Create AudioClip object, holding audio file
    const tourClick = new AudioClip('sounds/letsgo.wav')

    // Create AudioSource component, referencing `clip`
    const tourClickSource = new AudioSource(tourClick)

    // Add AudioSource component to entity
    tourSwitch.addComponent(tourClickSource)
    //doorOpenSwitch.addComponent(museumsource)

    //onclick
    tourSwitch.addComponent(
      new OnClick(() => {
          // Fetch the clip
          tourClickSource.playOnce()

          let transform = ship.getComponent(Transform)
          let lerp = ship.getComponent(ShipData)

          lerp.oldPos = transform.position
          // new random position
          lerp.nextPos.x = 14
          lerp.nextPos.y = 11.7
          lerp.nextPos.z = 47
        //  const nextPos = new Vector3(20, 11, 45)20, 9, 47
         //ship.addComponent(new ShipData(lerp.oldPos,lerp.nextPos, 0, 200))
         //ship.addComponent(new Timer())
         //ship.getComponent(Transform).lookAt(lerp.nextPos)
         /*
         let message2 = new UIText(textContainer)
         message2.value = "Random x : " +  lerp.nextPos.x + " z : " +  lerp.nextPos.z
         message2.height = 30
         message2.paddingLeft = 10
         message2.paddingBottom = 10
         message2.fontSize = 12
         */
          lerp.fraction = 0
          lerp.random = 1
          lerp.pause = Math.random() * 10
          // face new position
          transform.lookAt(lerp.nextPos)

        }
      )
    )

    engine.addEntity(tourSwitch)
