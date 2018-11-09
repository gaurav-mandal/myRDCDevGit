var barcodeTrigger = false;
define({ 

  //Type your controller code here 
  preShow:function(data)
  {
    this.view.LabelmyRDC.text = glbbuildname;
    // reset barcode 
    printLog("Preshow:Barcode trigger for Case Number:"+barcodeTrigger);
    if(!barcodeTrigger)
    {
      printLog("Preshow:Clear input values for Case Number");
      this.view.TextCase.text = "";
    }
    else
    {
      printLog("Skip clearing Case number input values and reset barcode trigger");
      barcodeTrigger=false;
    }        
   
    printLog("preshow data="+JSON.stringify(data));
    this.view.LabelShipNum.text = data.TKNUM.toString();
  },


  launchBarcode:function(){
    printLog("launchBarcode for case");
    barcodeTrigger = true; 
    printLog("launchBarcode for case");
    controllerScope = this;
    barcode.captureBarcode(controllerScope.barcodeSuccess.bind(this));          
  },     

  barcodeSuccess:function(barcodedata, androidScannedText)
  {
    printLog("barcode success:barcodedata:"+JSON.stringify(barcodedata));
    printLog("barcode success:androidScannedText:"+JSON.stringify(androidScannedText));
    var platformName = kony.os.deviceInfo().name;
    printLog("barcode success:platform:"+platformName);
    if (barcodeTrigger === true) 
    {       
      if(kony.string.startsWith(platformName, "iphone", true)){
        this.view.TextCase.text = (""+barcodedata.barcodestring).toUpperCase();          
      }else if(kony.string.startsWith(platformName, "android", true)){
        this.view.TextCase.text = androidScannedText.toUpperCase();          
      }
	  this.integrationCall();
    }
  },  



  // When the Case text field is manually changed
  onDone:function()
  {      

    var rawCaseNumber = this.view.TextCase.text;
    var caseNumber = rawCaseNumber.replace(/\s+/g, '');
    this.view.TextCase.text = caseNumber;
    if(caseNumber===null || caseNumber==="")
    {
      alert("Please enter a Case No.");
      return;
    }
    else
    {
      this.integrationCall();
    }  
  },
  
  integrationCall:function()
  {
    printLog("Case entered ="+this.view.TextCase.text);   
	barcodeTrigger=false;
    if(this.view.TextCase.text ===null|| this.view.TextCase.text ==="" ||this.view.TextCase.text===0 )
    {
      alert("Please enter a Case No.");
      return;
    }
    else
    {            
      displayLoadingScreen("Read Case ...");
      //     controllerScope = this;
      var rawstr = this.view.TextCase.text;        
      var str = rawstr.replace(/\s+/g, '');                  
      var pad = "0000000000";
      var caseNo = pad.substring(0, pad.length - str.length) + str;
      var lblShipNo = this.view.LabelShipNum.text;
      var shipmentNum = pad.substring(0, pad.length - lblShipNo.length) + lblShipNo;
      var data = {};
      data.TKNUM = shipmentNum;
      data.CASE_NO = caseNo;
      data.QNAME = glbSAPUNAME.toUpperCase();
      data.ACTIVITY = "";  //Activity is not being used anymore
      

      invokeMobileFabricService("getWMRECSTOSCANCASE",data, this.successCallback.bind(this), function(err){
        dismissLoadingScreen();  
        alert("Error invoking integration call:"+JSON.stringify(err));        
      });
    }  
  },
  
  successCallback:function(res){  
    var sapResponse;     
    var data = [];
    printLog("Receive STO Scan CASE Return");
    if(res.opstatus === 0 && res.WM_RECSTO_SCAN_CASE!==null)      
    { 
      printLog("Receive STO Scan CASE Success");
      sapResponse = JSON.parse(res.WM_RECSTO_SCAN_CASE);
      var ZWM_RECSTO_CONF_HU  = sapResponse.ZWM_RECSTO_CONF_HU;
      glb_ZWM_RECSTO_CONF_HU = ZWM_RECSTO_CONF_HU;
      // Table Data received after scanning
      var ZWM_RECSTO_ITEMS = sapResponse.ZWM_RECSTO_ITEMS;
      glb_ZWM_RECSTO_ITEMS = ZWM_RECSTO_ITEMS;
      
      
      if(ZWM_RECSTO_CONF_HU!== undefined)
      {
        printLog("ZWM_RECSTO_CONF_HU structure:"+JSON.stringify(ZWM_RECSTO_CONF_HU));               
        var msgty = ZWM_RECSTO_CONF_HU.MSGTY;
        var error = ZWM_RECSTO_CONF_HU.ERROR;                             
        printLog("msgty ="+msgty);
        printLog("error ="+error);
        if (msgty == "E")
        {
          alert(error); 
          dismissLoadingScreen();                  
        } 
        else
        {                  
          printLog("No Error Scenario");
          dismissLoadingScreen();
          if(ZWM_RECSTO_ITEMS!== undefined)
          {
          	navigateToForm("frmReceiveSTOCaseRec");
          }
          else
          {
            alert("SCAN returned no ITEMS.");           
          }
        }
      }
      else
      {
        printLog("Receive STO Scan CASE Returns Empty");
        alert("CASE Retrieval Failed and Error details are not available.");
        dismissLoadingScreen();
      }
    }
    else
    {
      printLog("Receive STO Scan CASE Returns Null");
      alert("CASE Data Retrieval Failed");
      dismissLoadingScreen();              
    }
  }, 


     

});