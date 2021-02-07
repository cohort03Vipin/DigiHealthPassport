var express = require('express');
var router = express.Router();

const fs =require('fs');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

router.use((req,res, next)=>{

  console.log(req.url,'@',Date.now())
  next();
});
/* GET home page. */

router.get('/basicDetails', function(req, res, next) {  
  console.log('traveller Route 1');
  res.render('travellerBasicDetails');
});
 router.post('/addBasicDetails', function(req, res, next) {  
   var fName= req.body.tbxFName;
   var lName= req.body.tbxSName;
   var dob= req.body.tbxDob; //tbxAge,selectBloodGrp
   var age= req.body.tbxAge;
   var selectBloodGrp= req.body.selectBloodGrp;
   console.log('traveller Basic Route');
   console.log(fName,lName,dob,age,selectBloodGrp);
   res.send(fName,lName,dob,age,selectBloodGrp);
 });
router.get('/address', function(req, res, next) {  
  console.log('traveller Route 23');
  res.render('travellerAddress');
});
router.post('/addAddress', function(req, res, next) {  
  //txtAreaPersentAddress,txtAreaPermanentAddress,tbxState,tbxCity,tbxPincode
  var persentAddress= req.body.txtAreaPersentAddress;
  var permanentAddress= req.body.txtAreaPermanentAddress;
  var state= req.body.tbxState; //tbxAge,selectBloodGrp
  var city= req.body.tbxCity;
  var pincode= req.body.tbxPincode;
  console.log('traveller Basic Route 344');
  console.log(persentAddress, permanentAddress, state, city, pincode);
  res.send({persentAddress, permanentAddress, state, city, pincode});
});

router.get('/passport', function(req, res, next) {  
  console.log('traveller Basic Route');
  res.render('travellerPassport');
});

router.post('/addPassport', upload.single('uploadPassport'),function(req, res, next) {  
 
   var passportNo= req.body.tbxPassportNo;
   var placeOfBirth= req.body.tbxPlaceOfBirth;
   var validityTo= req.body.tbxValidityTo; //tbxAge,selectBloodGrp
   var validityFrom= req.body.tbxValidityFrom;
   var authority= req.body.tbxAuthority; //tbxAge,selectBloodGrp
   var uploadPassport= req.body.uploadPassport;
   //uploadedPassportHash= uploadedPassportHash;
   var selectNationality= req.body.selectNationality;
   //Hash Code
  var data = new Buffer.alloc(10,fs.readFileSync(req.file.path));
  var uploadedPassportHash;
  ipfs.add(data, function (err,file){
      if(err){
          console.log(err);
      }
      //console.log("File is ::",file);
      console.log(file[0].hash);
      uploadedPassportHash= file[0].hash.toString('base64');
      console.log(uploadedPassportHash);
     
  })
  console.log(passportNo,placeOfBirth,validityTo,validityFrom,authority, uploadPassport, selectNationality);
  console.log("Uploaded Hash",uploadedPassportHash);
  res.send({passportNo,placeOfBirth,validityTo,validityFrom,authority, uploadPassport, selectNationality});

});
router.post('/addAddress', function(req, res, next) {  
  console.log('traveller address Post Route');
  res.send('traveller address');
});
router.post('/addPassport', function(req, res, next) {  
  console.log('traveller Passport Post Route');
  res.render('traveller passport');
});

/*
router.post('/addPassport', upload.single('uploadPassport'),function(req, res, next) {  
 
  console.log("Add Passport.. Starts");
   var passportNo= req.body.tbxPassportNo;
   var placeOfBirth= req.body.tbxPlaceOfBirth;
   var validityFrom= req.body.tbxValidityFrom;
   var validityTo= req.body.tbxValidityTo;  
   var selectNationality= req.body.selectNationality;  
   var authority= req.body.tbxAuthority; 
   var uploadPassport= req.file;
      
   console.log("uploadPassport :");
  console.log(uploadPassport);
  console.log("Req File");
  console.log(req.file);
 
  var uploadedPassportHash;

  var data =  new Buffer.from(fs.readFileSync(req.file.path));
  const promiseObj= new Promise((resolve,reject)=>{
                      setTimeout(()=>{
                            const ipfsadd=  ipfs.add(data,  (err,file)=>{
                                if(err){
                                    reject(err);
                                }      
                                //console.log(file[0].hash);
                                uploadedPassportHash=  file[0].hash;   
                                //resolve(uploadedPassportHash); 
                                return uploadedPassportHash; 
                              });                            
                                     },10000);
  }).then(uploadedPassportHash=>{
                      var encodedData = myContract.methods.set02TravellerPassportDetails(passportNo,placeOfBirth,validityFrom ,validityTo,selectNationality, authority, uploadPassport).encodeABI();                      
                      let transactionObject = {
                        gas: "470000",
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
                            console.log("Blockchain Hash :: ", result.blockHash);
                            var hashBlock=result.blockHash;
                            res.send({passportNo,placeOfBirth,validityTo,validityFrom,authority, uploadedPassportHash, selectNationality,hashBlock});
                        });
                    });//signTransaction
                }
          ).catch(err=>{
                  console.log("err is : ", err);
                       }
                  );
 
 });

*/


module.exports = router;
