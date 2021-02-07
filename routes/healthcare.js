const express = require('express');
const router = express.Router();
const fs =require('fs');
const multer  = require('multer')
const ipfsAPI = require('ipfs-api')

//promises
var Promise = require('promise');
//#region "IPFS"
const upload = multer({ dest: 'uploads/' })

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});
//#endregion "IPFS"

//#region "Web3 JS Web3 Connectivity"

//Web3 Connectivity
const Web3 = require('web3');
const { Console } = require('console');
//Copied from Infura
const web3 = new Web3("https://ropsten.infura.io/v3/3acb18989f034c12b7674fc6b80e614a");
const account = "0x18913ae3D38b7CCb17d4458362AaCaED2D4C1b18";//metmask account(ethereum Compatible public key;
// This is bit important. Once you copied the account from metamask. You have to click on next to icon
var pkey ="57949ec7fb0e3eac593a978ec3e00999c200917ddd4276530552b28038dffd7e";//privatekey of your account;
//#endregion "Web3 JS"
const contractAddress ="0x033EA9B0b82f4652F0427F6177082A99bE1a006B";
const abi =[
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

var myContract = new web3.eth.Contract(abi, contractAddress);

router.use((req,res, next)=>{
  console.log(req.url,'@',Date.now())
  next();
});

//#region "Hospitalization Starts"
//01 A Hospitalization Details
router.get('/hospitalizationDetails', function(req, res, next) {  
  console.log('traveller Route 1');
  res.render('HealthCareAuthority');
});

router.post('/requestHealthcareAuthority', function(req, res, next) {  
    var selectedTravellerModule= req.body.rdbtnSelectInfo;
   
        var urlRedirected ;
            if(selectedTravellerModule=="1")
            urlRedirected="/healthcare/CovidTestLabDetails";  
            else if(selectedTravellerModule=="2")            
            urlRedirected="/healthcare/VaccineDetails";
          
          console.log("url Redirected ::", urlRedirected);  
        res.redirect(urlRedirected);
 });

//addtravellerHospitalization
//02. B Insert Hospitalization into Solidity and hashed into IPFS */
router.post('/addHospitalization', upload.single('uploadDischargeSummary'),function(req, res, next) {  
  // rdbtnHospitalizationReqd,txtHospitalName,tbxHospitalizedFrom,tbxHospitalizedTo,txtAddress,txtDiagnostics, txtHospitalRemarks;
  
  console.log("Add Hospitalization.. Starts");
  //#region "Variables"
   var hospitalizationReqd= req.body.rdbtnHospitalizationReqd;
   var hospitalName= req.body.txtHospitalName;
   var hospitalizedFrom= req.body.tbxHospitalizedFrom;
   var hospitalizedTo= req.body.tbxHospitalizedTo;  
   var hospitalizedAddress= req.body.txtAddress;  
   var diagnosticsTests= req.body.txtDiagnostics; 
   var uploadDischargeSummary= req.file;
 
   var keyObservations= req.body.txtKeyObservations;  
   var hospitalRemarks= req.body.txtHospitalRemarks;
   var travellerId= req.body.txtTravellerId;  
   var travellerHistoryIdPK= req.body.txtTravellerHistoryIdPK;
   //#endregion
   var data =  new Buffer.from(fs.readFileSync(req.file.path));
                             
                                ipfs.add(data, async  (err,file)=>{
                                  if(err)   console.log(err);  
                                  const uploadDischargeSummaryHashed=  await file[0].hash;
                                
      var hospitalizedDocument= hospitalName + "Hospital Document Reciepts.";               
     
                                  var encodedData = myContract.methods.set05Hospitalization( hospitalizationReqd,hospitalizedDocument,hospitalName,hospitalizedAddress,hospitalizedFrom,hospitalizedTo,hospitalRemarks, uploadDischargeSummaryHashed,keyObservations,diagnosticsTests,travellerId,travellerHistoryIdPK).encodeABI();                      
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
																	"PageTitle":"Traveller Hospitalization Details",
																	"BlockHash":result.blockHash,
																	"TravellerIdentity":travellerId,
																	"BackButton": "./hospitalizationDetails"													
																}
																res.render("message",finalResult);
															} catch (error) {
																res.render("error",error);
															}
                                                           
                                                        }); 
                                                      });//signTransaction

                                });                                                      
     
 });

 
//#region "Covid Test type"
router.get('/CovidTestLabDetails', function(req, res, next) {  
	console.log('CovidTestLabDetails');
	res.render('CovidResultsDetails');
  });
//addCovidTestResult
router.post('/addCovidTestLabDetails', upload.single('uploadCovidReport'),function(req, res, next) {  
	// rdbtnCovidTestReqd,selectCovidTestType,tbxCovidTestDate,txtLabName,txtLabAddress,txtCovidTestOutcome,uploadCovidReport
	
	console.log("Add Covid Test lab.. Starts");
	//#region "Variables"
	 var covidTestReqd= req.body.rdbtnCovidTestReqd;
	 var covidTestType= req.body.selectCovidTestType;
	 var covidTestDate= req.body.tbxCovidTestDate;
	 var labName= req.body.txtLabName;  
	 var labAddress= req.body.txtLabAddress;  
	 var covidTestOutcome= req.body.txtCovidTestOutcome; 
	 var uploadCovidReport= req.file;	 
	 var travellerId= req.body.txtTravellerId;  
	 var covidTestId= req.body.txtCovidTestId; 
	 if(covidTestReqd!="2")
	 {
		covidTestType="";
		covidTestOutcome="";
		covidTestDate="";
		labName="";
		labAddress="";
		covidTestOutcome="";
	 }
	 //#endregion
	 var data =  new Buffer.from(fs.readFileSync(req.file.path));
							   
								  ipfs.add(data, async  (err,file)=>{
									if(err)   console.log(err);  
									const uploadCovidReportHashed= await file[0].hash;
									var encodedData = myContract.methods.set07CovidResults( covidTestReqd,covidTestType,covidTestDate,
										labName,labAddress,covidTestOutcome,uploadCovidReportHashed, 
										travellerId,covidTestId).encodeABI();                      
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
																	"PageTitle":"Covid Result Details",
																	"BlockHash":result.blockHash,
																	"TravellerIdentity":travellerId,
																	
																	"BackButton": "./hospitalizationDetails"												
																}
																res.render("message",finalResult);
																  
															  } catch (error) {
																res.render("error",error);
															  }
															
																													  }); 
														});//signTransaction  
								  });                                                     
   });


//#endregion "Covid Test Type"

router.get('/VaccineDetails', function(req, res, next) {  
	console.log('VacineDetails');
	res.render('VacineDetails');
  });
//addVaccineDetails
router.post('/addVaccineDetails', function(req, res, next) {  
 
	console.log("Add Vaccine.. Starts");
	 var vaccineName= req.body.tbxVaccineName;
	 var vaccineBrand= req.body.tbxVaccineBrand;
	 var vaccineDate= req.body.tbxVaccineDate;
	 var nextDosageDate= req.body.tbxNextDosageDate;  
	 var coolingInfo= req.body.txtCoolingInfo;  
	 var travellerId= req.body.txtTravellerId; 
	 var vaccineID= req.body.txtVacineId;
	 var vaccineResult= req.body.tbxVaccineResult;
	 var medicleConditions= req.body.tbxMedicleConditions;
   					  
								var encodedData = myContract.methods.set07TravellerVacine( vaccineID,vaccineName,vaccineBrand,vaccineDate ,nextDosageDate,
									coolingInfo, travellerId,vaccineResult,medicleConditions).encodeABI();                      
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
																"PageTitle":"Vaccination Details",
																"BlockHash":result.blockHash,
																"TravellerIdentity":travellerId,
																"BackButton": "./hospitalizationDetails"												
															}
															res.render("message",finalResult);														

														  } catch (error) {
															  res.render("error",error);
														  }
														  
													  }); 
													});//signTransaction											
							
							  
   });
module.exports = router;



