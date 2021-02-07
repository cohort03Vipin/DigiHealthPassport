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
//Copied from Infura
//#region "Web3js"
const web3 = new Web3("https://ropsten.infura.io/v3/3acb18989f034c12b7674fc6b80e614a");

const account = "0x18913ae3D38b7CCb17d4458362AaCaED2D4C1b18";//metmask account(ethereum Compatible public key;
// This is bit important. Once you copied the account from metamask. You have to click on next to icon
var pkey ="57949ec7fb0e3eac593a978ec3e00999c200917ddd4276530552b28038dffd7e";//privatekey of your account;
//#endregion "Web3JS"

//#region "Traveller Module configuration"
const contractAddress ="0x9C727FC85E6Ab22A43C392dbE6604899dc8528E6";
const abi =[
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
var myContract = new web3.eth.Contract(abi, contractAddress);
//#endregion "Traveller Module configuration"
router.use((req,res, next)=>{

  console.log(req.url,'@',Date.now())
  next();
});
//travellerModule

router.get('/travellerModule', function(req, res, next) {  
	console.log('traveller Route 1');
	res.render('travellerModule');
  });
 //travellerModule 
 router.post('/addtravellerModule', function(req, res, next) {
	var selectedInput= req.body.rdbtnSelectInfo;
	switch(selectedInput){
		case "1":
			res.redirect('./basicDetails');
			break;
		case "2":
			res.redirect('./passportDetails');
			break;
		case "3":
			res.redirect('./travelHistory');
			break; //travellerQuaratineHistory
		case "4":
			res.redirect('./travellerQuaratineHistory');			
		}
  });
//#region 01 "Traveller Basic Module"
//01. A  Default Page for Basic Detail Forms
router.get('/basicDetails', function(req, res, next) {  
  console.log('traveller Route 1');
  res.render('travellerBasicDetails');
});
//01. B Insert Traveller Basic Detail Forms
 router.post('/addBasicDetails', function(req, res, next) {  
   var fName= req.body.tbxFName;
   var lName= req.body.tbxSName;
   var dob= req.body.tbxDob; 
   var age= req.body.tbxAge;
   var selectBloodGrp= req.body.selectBloodGrp;
   var persentAddress= req.body.txtAreaPersentAddress;
   var permanentAddress= req.body.txtAreaPermanentAddress;   
   var city= req.body.tbxCity;   
   var pincode= req.body.tbxPincode;
   var state= req.body.tbxState; 

   console.log('traveller Basic Route');
   console.log(fName,lName,dob,age,selectBloodGrp);

   /**Web3JS starts */
   var encodedData = myContract.methods.set01TravellerBasicDetails(fName,lName,dob,age,selectBloodGrp,persentAddress,permanentAddress,city,pincode,state).encodeABI();
   console.log(encodedData);
 let transactionObject = {
   gas: "1070000",
   data: encodedData,
   from: account,
   to: contractAddress
 };

 web3.eth.accounts.signTransaction(transactionObject, pkey,(err, trans)=> 
 {
   if (err) {
     console.log(err);
   }
   web3.eth
     .sendSignedTransaction(trans.rawTransaction)
     .on("receipt",function(result){
         console.log("Blockchain Hash :: ", result);
		const finalResult={
			"PageTitle":"Traveller Basic Details",
			"BlockHash":result.blockHash,
			"BackButton": "./travellerModule"
		}
		res.render("message",finalResult);
     });
 });//signTransaction

  /**Web3JS ends */
 });

//#region 02 Passport Apis Starts
//02. A Passport Default Page
router.get('/passportDetails', function(req, res, next) {  
  console.log('traveller Route 1');
  res.render('travellerPassport');
});

//02. B Insert Passport into Solidity and hashed into IPFS */
router.post('/addPassport', upload.single('uploadPassport'),function(req, res, next) {  
 
  console.log("Add Passport.. Starts");
   var passportNo= req.body.tbxPassportNo;
   var placeOfBirth= req.body.tbxPlaceOfBirth;
   var validityFrom= req.body.tbxValidityFrom;
   var validityTo= req.body.tbxValidityTo;  
   var selectNationality= req.body.selectNationality;  
   var authority= req.body.tbxAuthority; 
   var uploadPassport= req.file;
 
    
                              var data =  new Buffer.from(fs.readFileSync(req.file.path));
							
								   //#region "Fetch Blockchain Data Starts"
								   ipfs.add(data, async  (err,file)=>{
									if(err)   console.log(err);  
									const uploadedPassportedHashed=  await file[0].hash;
									var encodedData = myContract.methods.set02TravellerPassportDetails(passportNo,placeOfBirth,validityFrom ,validityTo,selectNationality, authority, uploadedPassportedHashed).encodeABI();                      
									let transactionObject = {
									  gas: "1070000",
									  data: encodedData,
									  from: account,
									  to: contractAddress
									};     
									                  
									web3.eth.accounts.signTransaction(transactionObject, pkey,(err, trans)=> 
													  {
													  if (err) reject(err);    
													  
													  web3.eth
														  .sendSignedTransaction(trans.rawTransaction)
														  .on("receipt",function(result){
															  try {
																console.log("Blockchain Hash :: ", result.blockHash);
																var hashBlock=result.blockHash;
																const finalResult={
																	"PageTitle":"Traveller Passport Details",
																	"BlockHash":result.blockHash,
																	"BackButton": "./travellerModule"													
																}
																res.render("message",finalResult);
	
																//console.log({passportNo,placeOfBirth,validityTo,validityFrom,authority, uploadedPassportedHashed, selectNationality,hashBlock});
														        //res.send({passportNo,placeOfBirth,validityTo,validityFrom,authority, uploadedPassportedHashed, selectNationality,hashBlock});
															  } catch (error) {
																  res.render("error",error);
															  }
															  
														  }); 
														});//signTransaction
													
									
								  });                                                      
								//#endregion "Fetch Blockchain Data Ends"
								 
							
							
 });

//01. A  Default Page for Travel History Detail Forms
router.get('/travelHistory', function(req, res, next) {  
  console.log('traveller History 1');
  res.render('travellerHistory');
});
router.get('/travellerQuaratineHistory', function(req, res, next) {  
  console.log('traveller History for Covid 1');
  //res.render('travellerHistoryForCovid');
  res.render('travellerQuaratineHistory');
});
//02. B Insert Passport into Solidity and hashed into IPFS */
router.post('/addTravellerHistory', upload.single('fileTravelTicket'),function(req, res, next) {  
 console.clear();
  console.log("Adding traveller History");
  //optTypeTravel,optModeTravel,txtTravelDateFrom,txtTravelDateFrom,txtOriginCity,txtDestinationCity,rdbtnCovidTestReqd,fileTravelTicket
  
   var typeTravel= req.body.optTypeTravel;
   var modeTravel= req.body.optModeTravel;
   var validityFrom= req.body.txtTravelDateFrom;
   var validityTo= req.body.txtTravelDateTo;  
   var originCity= req.body.txtOriginCity;  
   var destinationCity= req.body.txtDestinationCity;    
   var covidTestReqd= req.body.rdbtnCovidTestReqd;  
   var fileTravelTicket= req.body.fileTravelTicket;   
   
   var travellerId= req.body.txtTravellerId;  
   var travellerHistoryIdPK= req.body.txtTravellerHistoryIdPK;
     

                              var data =  new Buffer.from(fs.readFileSync(req.file.path));
                             
                                ipfs.add(data, async  (err,file)=>{
                                  if(err)   console.log(err);  
								  const uploadedfileTravelTicket=  await file[0].hash;
								  console.log("uploadedfileTravelTicket");
								  console.log(uploadedfileTravelTicket);
                                  var encodedData = myContract.methods.set03TravelHistoryBasicDetails(typeTravel,modeTravel,validityFrom ,validityTo,originCity, destinationCity, uploadedfileTravelTicket,covidTestReqd,travellerId, travellerHistoryIdPK).encodeABI();                      
                                  let transactionObject = {
                                    gas: "1070000",
                                    data: encodedData,
                                    from: account,
                                    to: contractAddress
                                  };                          
                                  web3.eth.accounts.signTransaction(transactionObject, pkey,(err, trans)=> 
                                                    {
                                                    if (err) reject(err);    
                                                    
                                                    web3.eth
                                                        .sendSignedTransaction(trans.rawTransaction)
                                                        .on("receipt",function(result){
															try {
																console.log("Blockchain Hash :: ", result.blockHash);
															var hashBlock=result.blockHash;
															const finalResult={
																"PageTitle":"Traveller History Details",
																"BlockHash":result.blockHash,															
																"TravellerIdentity":travellerId	,
																"BackButton": "./travellerModule"													
															}
															res.render("message",finalResult);

															} catch (error) {
																res.render("error",error);
															}
                                                            
                                                                              }); 
                                                      });//signTransaction

                                });                                                      
     
 });

 router.post('/addTravellerQuaratineHistory',function(req, res, next) {  
  
   console.log("Adding traveller Covid History");
   //optTypeTravel,optModeTravel,txtTravelDateFrom,txtTravelDateFrom,txtOriginCity,txtDestinationCity,rdbtnCovidTestReqd,fileTravelTicket
   
   var covidTestReqd=req.body.rdbtnCovidTestReqd; 
   var quaratineType=req.body.rdbtnQuaratineType;
    var quartineDuration= req.body.optQuaratineDuration;
    var placeOfStay= req.body.selectPlaceOfStay;  
    var addressStay= req.body.txtAddressStay;  
    var covidSymptoms= req.body.txtCovidSymptoms;  
    var travellerId= req.body.txtTravellerId;  
    var travellerHistoryIdPK= req.body.txtTravellerHistoryIdPK;
   console.log( 'calling to set04TravelHistoryBasicDetails..')
   console.log({covidTestReqd, quaratineType,quartineDuration,placeOfStay,addressStay,covidSymptoms,travellerId, travellerHistoryIdPK});
    var encodedData = myContract.methods.set04TravelHistoryBasicDetails(covidTestReqd, quaratineType,quartineDuration,placeOfStay,addressStay,covidSymptoms,travellerId, travellerHistoryIdPK).encodeABI();                      
    let transactionObject = {
      gas: "1070000",
      data: encodedData,
      from: account,
      to: contractAddress
    };                          
    web3.eth.accounts.signTransaction(transactionObject, pkey,(err, trans)=> 
                      {
                      if (err) reject(err);    
                      
                      web3.eth
                          .sendSignedTransaction(trans.rawTransaction)
                          .on("receipt",function(result){
							  try {
								console.log("Blockchain Hash :: ", result.blockHash);
								var hashBlock=result.blockHash;
								const finalResult={
								  "PageTitle":"Traveller Quaratine Details",
								  "BlockHash":result.blockHash,
								  "TravellerIdentity":travellerId,
								  "BackButton": "./travellerModule"														
							  }
							  res.render("message",finalResult);
							  } catch (error) {
								res.render("error",error);
							  }
                             
                            }); 
                        });//signTransaction                                                      
      
  });

module.exports = router;
