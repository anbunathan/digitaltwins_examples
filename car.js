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

const car = new BigchainDB.Ed25519Keypair(seed)
const sensorGPS = new BigchainDB.Ed25519Keypair(seed)

const userDID = new DID(alice.publicKey)
const carDID = new DID(car.publicKey)
const gpsDID = new DID(sensorGPS.publicKey)

const vehicle = {
  value: '6sd8f68sd67',
  newMileage: '0',
  power: {
    engine: '2.5',
    hp: '220 hp',
  },
  consumption: '10.8 l',
}

userDID.define("myModel3", "https://schema.org/v1/myModel")
carDID.define("myModel3", "https://schema.org/v1/myModel")
gpsDID.define("myModel3", "https://schema.org/v1/myModel")

//Create section
/* userDID.models.myModel3.create({
        keypair: alice,
        data: {
            name: 'Alice',
            bithday: '03/08/1910'
        }
    }).then(asset => {
        userDID.id = 'did:' + asset.id
        document.body.innerHTML +='<h3>Transaction created</h3>'
        document.body.innerHTML +=asset.id
		console.log(asset.id)
    })

carDID.models.myModel3.create({
        keypair: alice,
        data: {
            vehicle
        }
    }).then(asset => {
        carDID.id = 'did:' + asset.id
        document.body.innerHTML +='<h3>Transaction created</h3>'
        document.body.innerHTML +=txTelemetrySigned.id
		console.log(asset.id)
    })

gpsDID.models.myModel3.create({
        keypair: car,
        data: {
            gps_identifier: 'a32bc2440da012'
        }
    }).then(asset => {
        gpsDID.id =  'did:' + asset.id
        document.body.innerHTML +='<h3>Transaction created</h3>'
        document.body.innerHTML +=txTelemetrySigned.id
		console.log(asset.id)
    }) */
//END Create section

//Retrieve section
/* userDID.models.myModel3
    .retrieve()
    .then(assets => {
        // assets is an array of myModel
        console.log(assets.map(asset => asset.id))
    })

carDID.models.myModel3
    .retrieve()
    .then(assets => {
        // assets is an array of myModel
        console.log(assets.map(asset => asset.id))
    })
	
gpsDID.models.myModel3
    .retrieve()
    .then(assets => {
        // assets is an array of myModel
        console.log(assets.map(asset => asset.id))
    }) */
//END Retrieve section

const newMileage = '12'

//Append section
// create an asset with Alice as owner
carDID.models.myModel3
 .retrieve()
 .then(assets => {        
		
        return assets[0].append({
            toPublicKey: car.publicKey,
            keypair: car,
            data: { newMileage }
        })
    })
 .then(updatedAsset => {       
		console.log(updatedAsset)
        return updatedAsset
    })
//END Append section
