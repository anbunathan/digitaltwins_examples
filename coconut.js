const BigchainDB = require('bigchaindb-driver')
const Orm = require('bigchaindb-orm').default

class DID extends Orm {
    constructor(entity) {
        super(API_PATH)
        this.entity = entity
    }
}

const API_PATH = 'https://test.ipdb.io/api/v1/'
/* const API_PATH = 'https://test.bigchaindb.com/api/v1/' */
const conn = new BigchainDB.Connection(API_PATH)

const bip39 = require('bip39')

const seed = bip39.mnemonicToSeed("yourString").slice(0, 32)
const alice = new BigchainDB.Ed25519Keypair(seed)

const car = new BigchainDB.Ed25519Keypair()
const sensorGPS = new BigchainDB.Ed25519Keypair()

const userDID = new DID(alice.publicKey)
const carDID = new DID(car.publicKey)
const gpsDID = new DID(sensorGPS.publicKey)
const bdbOrm = new DID(alice.publicKey)


const vehicle = {
  value: '6sd8f68sd67',
  power: {
    engine: '2.5',
    hp: '220 hp',
  },
  consumption: '10.8 l',
}

bdbOrm.define("crabModel", "https://schema.org/v1/myModel")

userDID.define("myModel1", "https://schema.org/v1/myModel")
carDID.define("myModel1", "https://schema.org/v1/myModel")
gpsDID.define("myModel1", "https://schema.org/v1/myModel")

/* bdbOrm.models.crabModel
 .create({
  keypair: alice,
  data: {
   breed: 'coconut crab',
   color: 'blue'
  }
 })
 .then(crab => {
  // crab is an object with all data & functions
  // crab.id equals the id of the asset
  // crab.data is latest data version
  // crab.transactionHistory gives the full history
 }) */

/* bdbOrm.models.crabModel
 .retrieve()
 .then(assets => {
  // assets is an array of myModel
  console.log(assets.map(asset => asset.id))
 }) */

// create an asset with Alice as owner
/* bdbOrm.models.crabModel
 .create({
  keypair: alice,
  data: { key: 'dataValue' }
 })
 .then(asset => {
  // lets append update the data of our asset
  // since we use a blockchain, we can only append
  return asset.append({
   toPublicKey: alice.publicKey,
   keypair: alice,
   data: { key: 'updatedValue' }
  })
 }) 
 .then(updatedAsset => {
  // updatedAsset contains the last (unspent) state
  // of our asset so any actions
  // need to be done to updatedAsset
  console.log(updatedAsset.data)
 }) */
 
 // create an asset with Alice as owner
bdbOrm.models.crabModel
 .create({
  keypair: alice,
  data: { key: 'dataValue' }
 })
 .then(asset => {
  // lets burn the asset by transferring it to the
  // burn address. Since we don't know the private key,
  // it's infeasible to redeem the asset
  return asset.burn({
   keypair: alice
  })
 })
 .then(burnedAsset => {
  // asset is now tagged as "burned"
  console.log(burnedAsset.data)
 })