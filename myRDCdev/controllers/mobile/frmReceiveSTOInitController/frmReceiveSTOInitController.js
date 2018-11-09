var barcodeTrigger = false;
define({ 

  //Type your controller code here 
  preShow:function()
  {
    this.view.LabelmyRDC.text = glbbuildname; 
    //Clear all values

    this.view.TextShipNum.text = "";

    printLog("Preshow:Barcode trigger for Shipment:"+barcodeTrigger);
    if(!barcodeTrigger)
    {
      printLog("Preshow:Clear input values for Shipment");
      this.view.TextShipNum.text = "";
    }
    else
    {
      printLog("Skip clearing Shipment input values and reset barcode trigger");
      barcodeTrigger=false;
    }                  

  },

  launchBarcode:function(){
    printLog("launchBarcode for Shipment");
    barcodeTrigger = true; 
    printLog("launchBarcode for Shipment");
    controllerScope = this;
    barcode.captureBarcode(controllerScope.barcodeSuccess.bind(this));          
  },     

  barcodeSuccess:function(barcodedata, androidScannedText)
  {
    printLog("barcode success:barcodedata:"+JSON.stringify(barcodedata));
    printLog("barcode success:androidScannedText:"+JSON.stringify(androidScannedText));
    var platformName = kony.os.deviceInfo().name;
    printLog("barcode success:platform:"+platformName);
    if (barcodeTrigger === true) {       
      if(kony.string.startsWith(platformName, "iphone", true)){
        //          controllerScope.view.TextShipNum.text = (""+barcodedata.barcodestring).toUpperCase();
        this.view.TextShipNum.text = (""+barcodedata.barcodestring).toUpperCase();          
      }else if(kony.string.startsWith(platformName, "android", true)){
        //          controllerScope.view.TextShipNum.text = androidScannedText.toUpperCase();
        this.view.TextShipNum.text = androidScannedText.toUpperCase();          
      }
      this.integrationCall();
    }
  },


  // When the Shipment text field is manually changed
  onDone:function()
  {      

    var rawShipNumber = this.view.TextShipNum.text;
    var shipNumber = rawShipNumber.replace(/\s+/g, '');
    this.view.TextShipNum.text = shipNumber;
	if(shipNumber===null || shipNumber==="")
    {
      alert("Please enter a Shipment No.");
      return;
    }
    else
    {
      this.integrationCall();
    }  
  },

  integrationCall:function()
  {
    printLog("Case entered ="+this.view.TextShipNum.text);   

    if(this.view.TextShipNum.text ===null|| this.view.TextShipNum.text ==="" ||this.view.TextShipNum.text===0 )
    {
      alert("Please enter a Shipment No.");
      return;
    }
    else
    {            
      displayLoadingScreen("Read Shipment ...");
      //     controllerScope = this;
      var rawstr = this.view.TextShipNum.text;        
      var str = rawstr.replace(/\s+/g, '');                  
      var pad = "0000000000";
      var lenum = pad.substring(0, pad.length - str.length) + str;
      var data = {};
      data.TKNUM = lenum;
      data.QNAME = glbSAPUNAME.toUpperCase();
      data.ACTIVITY = "";  //Activity is not being used anymore

      invokeMobileFabricService("getWMRECSTOSCANMAN",data, this.successCallback.bind(this), function(err){
        dismissLoadingScreen();  
        alert("Error invoking integration call:"+JSON.stringify(err));        
      });
    }  
  },     

  successCallback:function(res){  
    var sapResponse;     
    var data = [];
    printLog("Receive STO Scan Manifest Return");
    if(res.opstatus === 0 && res.WM_RECSTO_SCAN_MAN!==null)      
    { 
      printLog("Receive STO Scan Manifest Success");
      sapResponse = JSON.parse(res.WM_RECSTO_SCAN_MAN);
      var ZWM_RECSTO_CONF_MAN  = sapResponse.ZWM_RECSTO_CONF_MAN;
      glb_ZWM_RECSTO_CONF_MAN = ZWM_RECSTO_CONF_MAN;
      //glb_WM_REPLAB_CASE = working.ZWM_BTB_MOVE;          
      if(ZWM_RECSTO_CONF_MAN!== undefined)
      {
        printLog("ZWM_RECSTO_CONF_MAN structure:"+JSON.stringify(ZWM_RECSTO_CONF_MAN));               
        var msgty = ZWM_RECSTO_CONF_MAN.MSGTY;
        var error = ZWM_RECSTO_CONF_MAN.ERROR;                             
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
          navigateToForm("frmReceiveSTOShip");
        }
      }
      else
      {
        printLog("Receive STO Scan Manifest Returns Empty");
        alert("Manifest Retrieval Failed and Error details are not available.");
        dismissLoadingScreen();
      }
    }
    else
    {
      printLog("Receive STO Scan Manifest Returns Null");
      alert("Manifest Retrieval Failed");
      dismissLoadingScreen();              
    }
  }, 
});