//Type your code here
var glbIntegrationServiceName = null;
var glbObjectServiceName      = null;
var glbIdentityServiceName    = null;
var glbbuildname = null;
//*********************** Start of Code for Georg **********************
// pdf drawing as a global variable
var glbPdfDrawing = null;
// SAP user name as a global variable
var glbSAPUNAME = null;
// SAP long name as a global variable
var glbSAPLONGNAME = null;
// SAP warehouse as a global variable
var glbSAPLGNUM = null;
// bin-to-bin move structure
var glb_WM_BTB_MOVE = [];
// replenish structure
var glb_WM_BTB_REPLEN = {};
// replenish A-frame structure
var glb_WM_BTB_SCAN = [];
// scrap reason codes table
var glb_WM_BTB_DIFF = {};
// confirm replenish A-frame structure
var glb_WM_BTB_REPPUT_CONF = [];
// scrap reason code
var glbKZDIF = null;
// stock enquiry table (multiple entries)
var glb_WM_ENQ_STOCK = {};
// stock enquiry structure (single entry)
var glb_WM_ENQ_STOCK1 = [];
// stock enquiry single entry (no list)
var glb_WM_ENQ_STOCK_list = false;
// stock enquiry return form         
var glbStockEnqForm = null; 
// Reprint Label structure
var glb_WM_REPLAB_CASE = [];
// scrap return form                 //GWM20180903
var glbScrapForm = null;             //GWM20180903
//*********************** End of Code for Georg **********************
var glb_ZWM_RECSTO_CONF_MAN = {};
var glb_ZWM_RECSTO_CONF_HU = {};
var glb_ZWM_RECSTO_ITEMS = [];
var gbl_ZWM_RECSTO_UNL_ITEMS = [];
var glbCheckImageLoad=0;
/*
  buildmode 
  0 - Development
  1 - UAT
  2 - Prod
*/
var buildmode = 0;

if (buildmode ===0) //Dev
{
    // Dev setup
//    glbIntegrationServiceName = "WMServiceCOD";  
    glbObjectServiceName      = "WMObjectServiceCOD";
    glbIntegrationServiceName = "WMCOD";  
    glbIdentityServiceName    = "SAPCOD01";
    glbbuildname = "myRDCdev";     //development
}
else if (buildmode ===1) //UAT
{
        // Test setup
//    glbIntegrationServiceName = "WMServiceCOT";
    glbIntegrationServiceName = "WMCOT";   
    glbObjectServiceName      = "WMObjectServiceCOT";
    glbIdentityServiceName    = "SAPCOT01";
    glbbuildname = "myRDCtest";    //training  
}
else if (buildmode ===2) //Prod
{
        // Production setup
//    glbIntegrationServiceName = "WMServiceCOP";
    glbIntegrationServiceName = "WMCOP";   
    glbObjectServiceName      = "WMObjectServiceCOP";
    glbIdentityServiceName    = "SAPCOP01";
    glbbuildname = "myRDC";       //production  
}



function navigateToForm(formName)
{
  printLog("Navigate to form:"+formName);
  
  var ntf = new kony.mvc.Navigation(formName);
  ntf.navigate();
}

function displaySAPDate(sapDateInput)
{ 
  //sapDate has the format YYYYMMDD
  printLog("displaySAPDate:BEFORE:"+sapDateInput);
  var sapDate = "";
  sapDate = sapDateInput.toString();
  
  if(sapDate==="00000000")
  {
      return "";
  }
 
  var output = sapDate.substring(6,8) + "/" +
               sapDate.substring(4,6) + "/" +
               sapDate.substring(0,4);
  
  printLog("displaySAPDate:AFTER:"+output);
  
  return output;
}


function displayLoadingScreen(message)
{
  kony.application.showLoadingScreen(null, message, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
	
}

function dismissLoadingScreen()
{
  kony.application.dismissLoadingScreen();
}

function printLog(message)
{
  kony.print("XXXXX:"+message);
}

function setImageCache(imageName, imageBinary)
{
  kony.store.setItem("IMAGE_CACHE_"+imageName, imageBinary);
}

function getImageCache(imageName)
{
   return kony.store.getItem("IMAGE_CACHE_"+imageName);
}

function setWarehouseNumber(warehouseNumber)
{
  kony.store.setItem("DEFAULT_WAREHOUSE", warehouseNumber);
}

function getWarehouseNumber()
{
   return kony.store.getItem("DEFAULT_WAREHOUSE");
}

function padTheString(inputText,length)
{
  var paddedText = inputText.toString();
  if(undefined !== inputText && undefined !== length)
  {
    var loopLength = length-paddedText.length;
    for (var i=0;i<loopLength;i++)
    {
      paddedText = "0"+paddedText;
    }
  }
  return paddedText;
}

function invokeMobileFabricService(operationName, data, successCallback, errorCallback)
{
  printLog("In invokeMobileFabricService, calling service:"+glbIntegrationServiceName+" and operation:"+operationName);
  var integrationClient = null;
  var serviceName = glbIntegrationServiceName;
  var params = data;
  var headers = {"KonySAP-Request-Content-Type":"JSON", "KonySAP-Response-Content-Type":"JSON", "Content-Type":"application/json"}; 
  var sdkClient = new kony.sdk.getCurrentInstance(); 

  try
  {
    printLog("Inside invokeMobileFabricService Try");
    printLog("Params:"+JSON.stringify(params));
    printLog("sdkClient:"+sdkClient);    
    integrationClient = sdkClient.getIntegrationService(serviceName);
    integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         
  }catch(e)
  {
    printLog("Service has failed. Entered Catch block.");
    alert(JSON.stringify(e));
  }
}
