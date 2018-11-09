define({ 

  //Type your controller code here 
  preShow:function(data,tableData)
  {
    this.view.LabelmyRDC.text = glbbuildname;
    printLog("Set all values="+JSON.stringify(data));
    printLog("Table Data="+JSON.stringify(tableData));

    this.view.LabelShipNum.text = data.TKNUM.toString();      
    this.view.LabelCaseNum.text = data.CASE_NO.toString();
    this.view.LabelMessage.text = data.DEST_MSG;
    
    var totalTableData = [];
    //Handles case when only item is present in a CASE
    if(tableData!== undefined && tableData.length === undefined)
    {
      var rowData = {
        LabelInbound:"Inbound Delivery",
        LabelVBELNPOSNR:tableData["VBELN"]+"/"+tableData["POSNR"],
        LabelMaterial:"Material",
        LabelMATNR:tableData["MATNR"],
        LabelARKTX:tableData["ARKTX"],
        LabelQty:"Qty:",
        LabelLFIMG:tableData["LFIMG"],
        LabelMEINS:tableData["VRKME"],
      };
      totalTableData.push(rowData);
    }
    else
    {
      for(var i=0;i<tableData.length;i++)
      {
        var rowData = {
          LabelInbound:"Inbound Delivery",
          LabelVBELNPOSNR:tableData[i]["VBELN"]+"/"+tableData[i]["POSNR"],
          LabelMaterial:"Material",
          LabelMATNR:tableData[i]["MATNR"],
          LabelARKTX:tableData[i]["ARKTX"],
          LabelQty:"Qty:",
          LabelLFIMG:tableData[i]["LFIMG"],
          LabelMEINS:tableData[i]["VRKME"],
        };
        totalTableData.push(rowData);
      }
    }  
    this.view.SegmentCase.setData(totalTableData);
    dismissLoadingScreen();                    
  },



  onClickReceive:function()
  {
    displayLoadingScreen("Receiving case ..."); 

    var ZWM_RECSTO_SCAN_HU = {};
    ZWM_RECSTO_SCAN_HU.TKNUM = padTheString(glb_ZWM_RECSTO_CONF_HU.TKNUM,10);
    ZWM_RECSTO_SCAN_HU.CASE_NO = padTheString(glb_ZWM_RECSTO_CONF_HU.CASE_NO,10);
    ZWM_RECSTO_SCAN_HU.QNAME = glbSAPUNAME.toUpperCase();
    ZWM_RECSTO_SCAN_HU.ACTIVITY = "";  //Activity is not being used anymore

    var ZWM_RECSTO_ITEMS = glb_ZWM_RECSTO_ITEMS;

    var WM_RECSTO_PUT_CASE = {};
    WM_RECSTO_PUT_CASE.ZWM_RECSTO_SCAN_HU = ZWM_RECSTO_SCAN_HU;
    WM_RECSTO_PUT_CASE.ZWM_RECSTO_ITEMS = ZWM_RECSTO_ITEMS;
    
    var data={};
    data.WM_RECSTO_PUT_CASE=WM_RECSTO_PUT_CASE;

    invokeMobileFabricService("postWMRECSTOPUTCASE",data, this.successCallback.bind(this), function(err){
      dismissLoadingScreen();  
      alert("Error invoking integration call:"+JSON.stringify(err));        
    });
  },


  successCallback:function(res)
  {  
    var sapResponse;     
    var data = [];
    printLog("Receive STO Scan Put Return");
    if(res.opstatus === 0 && res.WM_RECSTO_PUT_CASE!==null)      
    { 
      printLog("Receive STO Scan Put Success");
      sapResponse = JSON.parse(res.WM_RECSTO_PUT_CASE);
      var ZWM_RECSTO_CONF_HU  = sapResponse.ZWM_RECSTO_CONF_HU;
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
          alert("Case was received successfully.");
          dismissLoadingScreen();          
          navigateToForm("frmReceiveSTOCase");
        }
      }
      else
      {
        printLog("Receive STO Scan Put Returns Empty");
        alert("SCAN PUT Failed and Error details are not available.");
        dismissLoadingScreen();
      }
    }
    else
    {
      printLog("Receive STO Scan Put Returns Null");
      alert("SCAN PUT Failed");
      dismissLoadingScreen();              
    }
  },   

});