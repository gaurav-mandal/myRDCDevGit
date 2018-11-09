define({ 

  //Type your controller code here 
  preShow:function(data)
  {
    this.view.LabelmyRDC.text = glbbuildname;
    
    //set all values from Manifest Scan
    printLog("Set all values="+data);  
    this.view.LabelShipNum.text = data.TKNUM.toString();
    this.view.LabelSendSite.text = data.TPLST.toString();
    this.view.LabelSendName.text = data.BEZEI;
    this.view.LabelDespatchDate.text = displaySAPDate(data.DTABF);
    dismissLoadingScreen();
  },
  
  integrationCall:function()
  {
    printLog("Calling Integration using glb_ZWM_RECSTO_CONF_MAN = "+JSON.stringify(glb_ZWM_RECSTO_CONF_MAN));          
    displayLoadingScreen("Unload Shipment ...");
    
    var data = {};
    data.TKNUM = padTheString(glb_ZWM_RECSTO_CONF_MAN.TKNUM,10);
    data.QNAME = glbSAPUNAME.toUpperCase();
    data.ACTIVITY = "";  //Activity is not being used anymore
    data.COMPLETEFLAG="";

    invokeMobileFabricService("getWMRECSTOUNLCOMP",data, this.successCallback.bind(this), function(err){
      dismissLoadingScreen();  
      alert("Error invoking integration call:"+JSON.stringify(err));        
    }); 
  },     

  successCallback:function(res){  
    var sapResponse;     
    var data = [];
    printLog("Receive STO Unload Complete Return");
    if(res.opstatus === 0 && res.WM_RECSTO_UNL_COMP!==null)      
    { 
      printLog("Receive STO Unload Complete Success");
      sapResponse = JSON.parse(res.WM_RECSTO_UNL_COMP);
      var ZWM_RECSTO_CONF_MAN  = sapResponse.ZWM_RECSTO_CONF_MAN;
      //List of All Cases not in correct state.
      gbl_ZWM_RECSTO_UNL_ITEMS = sapResponse.ZWM_RECSTO_UNL_ITEMS;
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
          if(gbl_ZWM_RECSTO_UNL_ITEMS !== undefined)
          {
            navigateToForm("frmReceiveSTOUnloadComplete");
          }
          else
          {
            alert("Unloading of Package is Completed.");
            navigateToForm("frmMenuReceiving");
          }
        }
      }
      else
      {
        printLog("Receive STO Unload Complete Returns Empty");
        alert("Unload Completion Failed and Error details are not available.");
        dismissLoadingScreen();
      }
    }
    else
    {
      printLog("Receive STO Unload Complete Returns Null");
      alert("Unload Completion Failed");
      dismissLoadingScreen();              
    }
  },
  

});