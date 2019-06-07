import { randomValue } from "../../../src/engine/rolls"
import { blacksmithData } from "./blacksmithData"
import { createBlacksmith } from "./createBlacksmith"
import { createSmithyName } from "./createSmithyName"

/**
 * @param {object} town
 * @param {object} [opts]
 */
export function createSmithy (town, opts = {}) {
  const smithy = (opts.newBuilding || setup.createBuilding)(town, `smithy`)
  console.groupCollapsed(`Smithy loading...`)
  smithy.blacksmith = createBlacksmith(town, smithy)
  createSmithyName(town, smithy)
  Object.assign(smithy, {
    wordNoun: randomValue([`smithy`, `blacksmith`, `smithery`, `farrier shop`]),
    passageName: `SmithyOutput`,
    initPassage: `InitSmithy`,
    BuildingType: `smithy`,
    associatedTown: town.name,
    weapons: [`dagger`, `long sword`, `short sword`, `morning star`, `mace`, `axe`, `greataxe`, `spear`, `falcheon`, `bastard sword`, `warhammer`, `iron crossbow`, `claymore`, `flail`, `broad sword`, `pike`, `scimitar`, `dart`, `rapier`, `trident`, `halberd`, `glaive`, `lance`, `war pick`],
    mundane: [`plows`, `rabbit traps`, `horseshoes`, `shovels`, `lamps`, `fire pokers`, `axes`, `hammers`, `pliers`, `steel couplings`, `trays`, `wheelbarrows`, `nails`, `pickaxes`, `hatchets`, `locks and keys`, `lockpicks`]
  })
  smithy.wealth = ``
  smithy.size = ``
  smithy.cleanliness = ``
  smithy.expertise = ``
  smithy.activity = ``

  const rollDataVariables = [`wealth`, `size`, `cleanliness`, `expertise`, `activity`]
  for (const propName of rollDataVariables) {
    setup.defineRollDataGetter(smithy, blacksmithData.rollData, propName)
  }

  smithy.notableFeature = `its ${smithy.expertise} weapons and armour`
  smithy.tippyDescription = `A ${smithy.size || smithy._size} ${smithy.wordNoun} that's ${smithy.cleanliness || smithy._cleanliness}, and is known for ${smithy.notableFeature}.`
  console.log(smithy)
  console.groupEnd()

  return smithy
}
