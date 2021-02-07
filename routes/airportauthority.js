const express = require('express');
const router = express.Router();
const fs =require('fs');
const multer  = require('multer')
const ipfsAPI = require('ipfs-api')

//promises
var Promise = require('promise');
const upload = multer({ dest: 'uploads/' })

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});

//Web3 Connectivity
const Web3 = require('web3');
const { Console } = require('console');
const { all } = require('./travellers');
//Copied from Infura
//#region "Web3js"
const web3 = new Web3("https://ropsten.infura.io/v3/3acb18989f034c12b7674fc6b80e614a");
const account = "0x18913ae3D38b7CCb17d4458362AaCaED2D4C1b18";//metmask account(ethereum Compatible public key;
// This is bit important. Once you copied the account from metamask. You have to click on next to icon
var pkey ="57949ec7fb0e3eac593a978ec3e00999c200917ddd4276530552b28038dffd7e";//privatekey of your account;
//#endregion "Web3JS"

//#region 01 ABI Region  "HealthCareAddress"
const contractHealthCareAddress ="0x9C727FC85E6Ab22A43C392dbE6604899dc8528E6";
const healthCareAbi =[
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_hospitalizedduetoCOVID",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_hospitalizeddocument",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hospitalName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hospitalAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fromDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_toDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_remarks",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dischargeSummary",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_keyObservations",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_diagnosticsTestsPerformed",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_hospHistoryIdPK",
				"type": "uint256"
			}
		],
		"name": "set05Hospitalization",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_iscovid",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_covidTestType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_covidTestDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_labName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_labAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_testOutcome",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_uploadedReport",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_covidResultId",
				"type": "uint256"
			}
		],
		"name": "set07CovidResults",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_vacineId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_vacineName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_vacineBrand",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_vacineDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nextDosageDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_coolingInfo",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_travellerVacineResult",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_medicalConditions",
				"type": "string"
			}
		],
		"name": "set07TravellerVacine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_hospHistoryIdPK",
				"type": "uint256"
			}
		],
		"name": "get05HospitalizationDetails",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_hospHistoryIdPK",
				"type": "uint256"
			}
		],
		"name": "get05HospitalizationRemarks",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_CovidTestResultId",
				"type": "uint256"
			}
		],
		"name": "get07CovidResults",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_vacineId",
				"type": "uint256"
			}
		],
		"name": "get07TravellerVacine",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var healthCareContract = new web3.eth.Contract(healthCareAbi, contractHealthCareAddress);
//#endregion ABI Region "HealthCareAddress"

//#region "Traveller Contract"

const contractTravelModuleAddress ="0x9C727FC85E6Ab22A43C392dbE6604899dc8528E6";
const travelModuleAbi =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "PassportMap",
		"outputs": [
			{
				"internalType": "string",
				"name": "passportNo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "placeofBirth",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "passportValidatyFrom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "passportValidatyTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nationality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issuingAuthority",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "passportCopy",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "initialized",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get01TravellerAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get01TravellerBasicDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get02TravellerPassportDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_travellerHistoryIdPK",
				"type": "uint256"
			}
		],
		"name": "get03TravelHistoryBasicDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_travellerHistoryIdPK",
				"type": "uint256"
			}
		],
		"name": "get04TravelHistoryBasicDetails",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllTravellers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_firstName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lastName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_bloodGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_presentAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_permanentAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_pinCode",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_state",
				"type": "string"
			}
		],
		"name": "set01TravellerBasicDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_passportNo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_placeofBirth",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_passportValidatyFrom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_passportValidatyTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nationality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuingAuthority",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_passportCopy",
				"type": "string"
			}
		],
		"name": "set02TravellerPassportDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_travelType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_travelMode",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fromDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_toDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_originCity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_destinationCity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_travelTicket",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isCovidTestRequired",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_travellerHistoryIdPK",
				"type": "uint256"
			}
		],
		"name": "set03TravelHistoryBasicDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_isCovidTestRequired",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_quarantineType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_quarantineDuration",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_placeofStay",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_addressOfStay",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_anyCovidSymtpom",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_travellerHistoryIdPK",
				"type": "uint256"
			}
		],
		"name": "set04TravelHistoryBasicDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "choice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isHospitalization",
				"type": "bool"
			}
		],
		"name": "setCovidOrIdVacine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_travellerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "choice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isHospitalization",
				"type": "bool"
			}
		],
		"name": "setHospitalizationMap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "travellerIds",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var travelModuleContract = new web3.eth.Contract(travelModuleAbi, contractTravelModuleAddress);
//#endregion "Traveller Contract"


router.use((req,res, next)=>{

  console.log(req.url,'@',Date.now())
  next();
});

//#region 01 "Airport Authority Module"
//01. A  Default Page for Basic Detail Forms
router.get('/airportAuthorityDetails', function(req, res, next) {  
  console.log('Airport Authority Form');
  res.render('authorityDetailsForTraveller');
});

router.post('/requestHealthcareAuthority', function(req, res, next) {  
    var selectedTravellerModule= req.body.rdbtnSelectInfo;
   var travellerIdentity= req.body.txtTravellerId;
   var travellerHistoryId= req.body.txtTravellerHistoryIdPK; 
   console.log('heellooo..', selectedTravellerModule)
        var urlRedirected ;
            if(selectedTravellerModule=="1")
            urlRedirected="/healthcare/getHospitalizationDetails/"+travellerIdentity+"/"+travellerHistoryId+"/1";  
            else if(selectedTravellerModule=="2")            
            urlRedirected="/airportAuth/getHospitalizationRemarks/"+travellerIdentity+"/"+travellerHistoryId+"/2";
          
          console.log("url Redirected ::", urlRedirected);  
        res.redirect(urlRedirected);
 });

//01. B Insert Traveller Basic Detail Forms
 router.post('/addAirportAuthorityDetails', function(req, res, next) {  
    var selectedTravellerModule= req.body.rdbtnSelectInfo;
   var travellerIdentity= req.body.txtTravellerId;
   console.log('heellooo..', selectedTravellerModule)
        var urlRedirected ;
        if(selectedTravellerModule=="1")
            urlRedirected="/airportAuth/getTravellerDetails/"+travellerIdentity;  
            else if(selectedTravellerModule=="4")
            urlRedirected="/airportAuth/get02TravellerDetails/"+travellerIdentity;  
            else if(selectedTravellerModule=="2")
            urlRedirected="/airportAuth/getPassportDetails/"+travellerIdentity;  
            
            else if(selectedTravellerModule=="3")
            {
                var travellerHistoryId= (selectedTravellerModule=="3")?req.body.txtTravellerHistoryIdPK:""; 
                urlRedirected="/airportAuth/get03TravelHistoryBasicDetails/"+travellerIdentity+"/"+travellerHistoryId;      
			}
			else if(selectedTravellerModule=="5")
            {
                var travellerHistoryId= (selectedTravellerModule=="5")?req.body.txtTravellerHistoryIdPK:""; 
                urlRedirected="/airportAuth/get04TravelQuaratineHistory/"+travellerIdentity+"/"+travellerHistoryId;      
			}
			else if(selectedTravellerModule=="6")// Hospitalization
            {
                var travellerHistoryId= (selectedTravellerModule=="6")?req.body.txtTravellerHistoryIdPK:""; 
                urlRedirected="/airportAuth/getHospitalizationDetails/"+travellerIdentity+"/"+travellerHistoryId;      
			}
			else if(selectedTravellerModule=="7")//Remarks
            {
                var travellerHistoryId= (selectedTravellerModule=="7")?req.body.txtTravellerHistoryIdPK:""; 
                urlRedirected="/airportAuth/getHospitalizationRemarks/"+travellerIdentity+"/"+travellerHistoryId;      
			}
			else if(selectedTravellerModule=="8")
            {
                var travellerHistoryId= (selectedTravellerModule=="8")?req.body.txtTravellerHistoryIdPK:""; 
                urlRedirected="/airportAuth/getCovidResultsDetails/"+travellerIdentity+"/"+travellerHistoryId;      
			}
			else if(selectedTravellerModule=="9")
            {
                var vaccineId= (selectedTravellerModule=="9")?req.body.txtTravellerHistoryIdPK:""; 
                urlRedirected="/airportAuth/get07TravellerVacine/"+travellerIdentity+"/"+vaccineId;      
            }

          console.log("url Redirected ::", urlRedirected);  
        res.redirect(urlRedirected);
 });
 //01. C Fetch Basic Details of Traveller
 router.get('/getTravellerDetails/:address', function(req, res, next) {  
  const _address=req.params.address; 
  
  travelModuleContract.methods.get01TravellerBasicDetails(_address).call({from:account}).then(async function(result)
  {
      console.log("result01 ::",result);
          const basicdetails=  {
                "firstName": result[0],
                "lastName":result[1],
                "dob":result[2],    
                "age": result[3],
				"bloodGroup":result[4] 
			};
                      res.format ({
                          'text/plain': function() {
                            res.render("travellerDetailsGet",basicdetails);
                          },
                      
                          'text/html': function() {
                            res.render("travellerDetailsGet",basicdetails);                
                          },                   
                          
                      });
                  }).catch(error=>    console.log("error ::" + error)); 
  
});
 //01. D Fetch Address Details of Traveller
router.get('/get02TravellerDetails/:address', function(req, res, next) {  
  const _address=req.params.address; 
  
  travelModuleContract.methods.get01TravellerAddress(_address).call({from:account}).then(async function(result)
  {
      console.log("result01 ::",result);
          const basicdetails=  {
                "presentAddress": result[0],
                "permanentAddress": result[1],
                "city": result[2],
                "pinCode": result[3], 
                "state": result[4]
				};
                      res.format ({
                          'text/plain': function() {
                            res.render("travellerAddressDetailsGet",basicdetails);
                          },
                      
                          'text/html': function() {
                            res.render("travellerAddressDetailsGet",basicdetails);                
                          },                   
                          
                      });
                  }).catch(error=>    console.log("error ::" + error)); 
  
});

router.get('/getPassportDetails/:address', function(req, res, next) {  
  const _address=req.params.address;
 

  travelModuleContract.methods.get02TravellerPassportDetails(_address).call({from:account}).then(function(result)
{
	   console.log("result ::",result);

        const passport= {
            "passportNo": result[0],
            "placeofBirth":result[1],
            "passportValidatyFrom":result[2],
            "passportValidatyTo": result[3],
            "nationality":result[4],
            "issuingAuthority":result[5],
            "passportCopy":(result[6]!=null)?result[6] :"#"

        };
          res.format ({
              'text/plain': function() {
                res.render("travellerPassportGet",passport);
                //res.send( passport);
              },
          
              'text/html': function() {
                res.render("travellerPassportGet",passport);
                //res.send( passport);
              },
            
              
          });
      }).catch(error=>    console.log("error ::" + error));
 
});

//Airport:: Fetch Passport Copy from IPFS
router.get('/getPassportCopy/:address', function(req, res, next) {  
  const _address=req.params.address;
  console.log("getPassport " , _address);
  
    const ipfsAddress= (_address!="#")? "https://ipfs.io/ipfs/" + _address: "#";
    res.redirect(ipfsAddress);
  
});


//Airport:: Fetch Travel History from Solidity
router.get('/get03TravelHistoryBasicDetails/:address/:travelHistoryId', function(req, res, next) {  
  const _address=req.params.address; 
  const _travelHistoryId= req.params.travelHistoryId;  
  travelModuleContract.methods.get03TravelHistoryBasicDetails(_address,_travelHistoryId).call({from:account}).then(async function(result)
  {
      console.log("result01 ::",result);
          const travelHistoryDetails=  {
                "travelTypeMode":result[0],
                "fromDate": result[1],
                "toDate":result[2],
                "originCity":result[3],    
                "destinationCity": result[4],
                "travelTicket":result[5]                
                };
                      res.format ({
                          'text/plain': function() {
                            res.render("travellerHistoryGet",travelHistoryDetails);
                          },
                      
                          'text/html': function() {
                            res.render("travellerHistoryGet",travelHistoryDetails);                
                          },                   
                          
                      });
                  }).catch(error=>    console.log("error ::" + error)); 
  
});


////Airport:: Fetch Travel History from Solidity
router.get('/get04TravelQuaratineHistory/:address/:travelHistoryId', function(req, res, next) {  
  const _address=req.params.address; 
  const _travelHistoryId= req.params.travelHistoryId;  
console.log("get04TravelQuaratineHistory Starts..");
  // get04TravelHistoryBasicDetails Can be change get04TravelQuaratineHistory
  travelModuleContract.methods.get04TravelHistoryBasicDetails(_address,_travelHistoryId).call({from:account}).then(async function(result)
  {
      console.log("result01 ::",result);
      
          const travelQuaratineHistory=  {
                "covidTestRequired": result[0],
                "quarantineType":result[1],
                "quarantineDuration":result[2],    
                "placeofStay": result[3],
                "addressOfStay":result[4], 
                "anyCovidSymtpom":result[5]
              
                };
                      res.format ({
                          'text/plain': function() {
                            res.render("travellerQuaratineHistoryGet",travelQuaratineHistory);
                          },
                      
                          'text/html': function() {
                            res.render("travellerQuaratineHistoryGet",travelQuaratineHistory);                
                          },                   
                          
                      });
                  }).catch(error=>    console.log("error ::" + error)); 
  
}); 


//GetAll Travellers
router.get('/getAllTravellers/', function(req, res, next) {  
	
	travelModuleContract.methods.getAllTravellers().call({from:account}).then(function(result)
  {
		 console.log("result ::",result);
  
		  const allTravellers= {
			  "travellerId":result[0]
  
		  };
		  console.log(allTravellers.travellerList);
			res.format ({
				'text/plain': function() {
				  //res.send("allTravellersGet",allTravellers);
				 res.send( allTravellers);
				},
			
				'text/html': function() {
				 // res.send("allTravellersGet",allTravellers);
				  res.send( allTravellers);
				},
			  
				
			});
		}).catch(error=>    console.log("error ::" + error));
   
  });

//#endregion

//#region "Hospitalization"
// router.get('/getHospitalizationDetails/:address/:hospitalization', function(req, res, next) {  
// 	console.log('GetHospilation...');
// 	const _address=req.params.address; 
// 	console.log('GetHospilation02...');
// 	const hospitalizationId= req.params.hospitalization;  
// 	console.log('getHospitalizationDetails....');
// 	//var HealthCareContract = new web3.eth.Contract(healthCareAbi, contractHealthCareAddress);
	
//    // myContract.methods.get05HospitalizationDetails(_address,_travelHistoryId).call({from:account}).then(function(result)
//    healthCareContract.methods.get05HospitalizationDetails(_address,hospitalizationId).call({from:account}).then(function(result)
// 	{
	 
// 		console.log("result01 ::",result);
// 			const hospitalizationDetails=  {
// 				  "hospitalizedduetoCOVID": (result[0]==true)?"Yes":"NO",
// 				  "hospitalizeddocument":result[1],
// 				  "hospitalName":result[2],    
// 				  "hospitalAddress": result[3],
// 				  "fromDate":result[4] ,
// 				  "toDate": result[5],
// 				  "hospitalization":"1",
// 				  "travellerId":_address, 
// 				  "travellerHistoryId":hospitalizationId
// 				  };
// 						res.format ({
// 							'text/plain': function() {
// 							  res.render("travellerHospitalizationGet",hospitalizationDetails);
// 							},
						
// 							'text/html': function() {
// 							  res.render("travellerHospitalizationGet",hospitalizationDetails);                
// 							},                   
							
// 						});
// 					}).catch(error=>    console.log("error ::" + error)); 
	
//   });
  
  //03. C Fetch Hosptal Remarks Details
//   router.get('/getHospitalizationRemarks/:address/:hospitalRemarksId', function(req, res, next) {  
// 	const _address=req.params.address; 
	
// 	const _hospitalRemarksId= req.params.hospitalRemarksId;
// 	console.log('getHospitalization Remarks....');
// 	healthCareContract.methods.get05HospitalizationRemarks(_address,_hospitalRemarksId).call({from:account}).then( function(result)
// 	{   
// 		console.log("result01 ::",result);
  
// 			const hospitalizationDetails=  {
// 				  "remarks": result[0],
// 				  "dischargeSummary":result[1],
// 				  "hospitalName":result[2],    
// 				  "keyObservations": result[3],
// 				  "diagnosticsTestsPerformed":result[4],
// 				  "hospitalization":"2"
				 
// 				  }; 
			
			
// 						res.format ({
// 							'text/plain': function() {
// 							  //res.render("travellerHospitalizationGet",hospitalizationDetails);
// 							  res.send("travellerHospitalizationGet",hospitalizationDetails);
  
// 						  },
						
// 							'text/html': function() {
// 							  res.render("travellerHospitalizationGet",hospitalizationDetails);          
// 							  //res.send(hospitalizationDetails);
		
// 							},                   
							
// 						});
// 					}).catch(error=>    console.log("error ::" + error)); 
	
//   });
//#region "Covid"
	router.get('/getCovidResultsDetails/:address/:covidTestResultId', function(req, res, next) {  
	const _address=req.params.address; 
	const _covidTestResultId= req.params.covidTestResultId;  
	console.log('CovidResultsDetailsGet....');
	
   // myContract.methods.get05HospitalizationDetails(_address,_travelHistoryId).call({from:account}).then(function(result)
   healthCareContract.methods.get07CovidResults(_address,_covidTestResultId).call({from:account}).then(function(result)
	{
	 
		console.log("result01 ::",result);
			const hospitalizationDetails=  {
						"hospitalizedduetoCOVID": (result[0]==true)?"Yes":"NO",
						"covidTestType":result[1],
						"covidTestDate":result[2],    
						"labNameAddress":result[3],
						"testOutcome":result[4] ,
						"uploadedReport":result[5]				 
				  };
				  console.log(hospitalizationDetails);
						res.format ({
							'text/plain': function() {
							  res.render("CovidResultsDetailsGet",hospitalizationDetails);
							},
							'text/html': function() {
							  res.render("CovidResultsDetailsGet",hospitalizationDetails);                
							},                   
							
						});
					}).catch(error=>    console.log("error ::" + error)); 
	
 	 });
////#endregion "Covid"
//#region "Vaccination"
router.get('/get07TravellerVacine/:address/:vacineId', function(req, res, next) {  
	const _address=req.params.address; 
	const _vacineId= req.params.vacineId;  
	console.log('CovidResultsDetailsGet....');
	
   // myContract.methods.get05HospitalizationDetails(_address,_travelHistoryId).call({from:account}).then(function(result)
   healthCareContract.methods.get07TravellerVacine(_address,_vacineId).call({from:account}).then(function(result)
	{
	 
		console.log("result01 ::",result);
			const hospitalizationDetails=  {
						"vacineName": result[0],
						"VacineBrand":result[1],
						"travellerVacinationInfo":result[2],    
						"coolingInfo":result[3],
						"travellerVacineResult":result[4] ,
						"MedicalConditions":result[5]				 
				  }; 
				  console.log(hospitalizationDetails);
						res.format ({
							'text/plain': function() {
							  res.render("VacineDetailsGet",hospitalizationDetails);
							},
							'text/html': function() {
							  res.render("VacineDetailsGet",hospitalizationDetails);                
							},                   
							
						});
					}).catch(error=>    console.log("error ::" + error)); 
	
 	 });
//#endregion "Vaccination"
module.exports = router;
