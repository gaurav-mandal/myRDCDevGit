define({ 

  //Type your controller code here 
  preShow:function(data,tableData)
  {
    this.view.LabelmyRDC.text = glbbuildname;
    printLog("Set all values="+JSON.stringify(data));
    printLog("Table Data="+JSON.stringify(tableData));

    this.view.LabelShipNum.text = data.TKNUM.toString();      
    this.view.SegmentCaseNotScanned.removeAll();
    this.view.SegmentCaseAdditionalScan.removeAll();
    this.view.SegmentCaseCrossDock.removeAll();
    this.view.FlexContainerCasePendingScan.isVisible=false;
    this.view.FlexContainerCaseAdditionalScan.isVisible=false;
    this.view.FlexContainerCaseCrossDock.isVisible=false;
    this.view.ButtonScanMore.isVisible=false;
    
    var totalTableDataUnscanned = [];
    var totalTableDataNotManifest = [];
    var totoalTableDatatCrossDock = [];
    //Handles case when only item is present in a CASE
    if(tableData!== undefined && tableData.length === undefined)
    {
      var rowData = {
        LabelCaseNumber:tableData["EXIDV"].toString()
      };
      
      if(tableData["TYPE"]=="A")
      {
        totalTableDataUnscanned.push(rowData);
      }
      else if(tableData["TYPE"]=="B")
      {
        totalTableDataNotManifest.push(rowData);
      }
      else if((tableData["TYPE"]=="C"))
      {
        totoalTableDatatCrossDock.push(rowData);
      }
    }
    else
    {
      for(var i=0;i<tableData.length;i++)
      {
        var rowData = {
          LabelCaseNumber:tableData[i]["EXIDV"].toString()
        };

        if(tableData[i]["TYPE"]=="A")
        {
          totalTableDataUnscanned.push(rowData);
        }
        else if(tableData[i]["TYPE"]=="B")
        {
          totalTableDataNotManifest.push(rowData);
        }
        else if((tableData[i]["TYPE"]=="C"))
        {
          totoalTableDatatCrossDock.push(rowData);
        }
      }
    }
    if(totalTableDataUnscanned.length>0)
    {
      this.view.SegmentCaseNotScanned.setData(totalTableDataUnscanned);
      this.view.FlexContainerCasePendingScan.isVisible=true;
      this.view.ButtonScanMore.isVisible=true;
    }
    if(totalTableDataNotManifest.length>0)
    {
      this.view.SegmentCaseAdditionalScan.setData(totalTableDataNotManifest);
      this.view.FlexContainerCaseAdditionalScan.isVisible=true;
    }
    if(totoalTableDatatCrossDock.length>0)
    {
      this.view.SegmentCaseCrossDock.setData(totoalTableDatatCrossDock);
      this.view.FlexContainerCaseCrossDock.isVisible=true;
    }
    dismissLoadingScreen();                    
  },



  onClickFinishReceiving:function()
  {
    displayLoadingScreen("Finish Receiving case ..."); 

    var data = {};
    data.TKNUM = padTheString(glb_ZWM_RECSTO_CONF_MAN.TKNUM, 10);
    data.QNAME = glbSAPUNAME.toUpperCase();
    data.ACTIVITY = "";  //Activity is not being used anymore
    data.COMPLETEFLAG="X";

    invokeMobileFabricService("getWMRECSTOUNLCOMP",data, this.successCallback.bind(this), function(err){
      dismissLoadingScreen();  
      alert("Error invoking integration call:"+JSON.stringify(err));        
    });
  },


  successCallback:function(res){  
    var sapResponse;     
    var data = [];
    printLog("Receive STO Unload Finish Return");
    if(res.opstatus === 0 && res.WM_RECSTO_UNL_COMP!==null)      
    { 
      printLog("Receive STO Unload Finish Success");
      sapResponse = JSON.parse(res.WM_RECSTO_UNL_COMP);
      var ZWM_RECSTO_CONF_MAN  = sapResponse.ZWM_RECSTO_CONF_MAN;
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
          {
            alert("Unloading of Package is Finished.");
            navigateToForm("frmMenuReceiving");
          }
        }
      }
      else
      {
        printLog("Receive STO Unload Finish Returns Empty");
        alert("Unload Completion Failed and Error details are not available.");
        dismissLoadingScreen();
      }
    }
    else
    {
      printLog("Receive STO Unload Finish Returns Null");
      alert("Unload Completion Failed");
      dismissLoadingScreen();              
    }
  },  

});