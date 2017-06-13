
    $(document).click(function () {
        //Hide the suggestion DIV when user click else where
        $("#SuggestionDiv").hide();       
    });

    $(document).ready(function () {
    
    });


    //************************************
    //Clear Content of Popup Divs Function
    //************************************
    function ClearContent() {
        $("#result").empty();
    }

    //***********************************
    //Show Waiting to Load Popup Function
    //***********************************

    function WaitToLoad() {

        $("#page-cover").css({ "display": "block", opacity: 0.7, "width": $(document).width(), "height": $(document).height() });
        $("#page-cover").show();
        $("#DivWaitingForm").show();
    }

    //***********************************
    //Hide Waiting to Load Popup Function
    //***********************************

    function HideWaitToLoad() {
        $("#page-cover").hide();
        $("#DivWaitingForm").hide();
    }

    function HideWaitToLoad1() {
        $("#DivWaitingForm").hide();
    }
    //********************************
    //Show Popup with Content Function
    //********************************

    function ShowContent() {

        //center lightbox
        var w = $(window).width();
        var h = $(window).height();

        var lw = $("#DivForm").width();
        var lh = $("#DivForm").height();

        $("#DivForm").css({ 'margin-top': ((-lh/2)-50) +'px', 'margin-left': (-lw/2) + 'px' });

        $("#DivWaitingForm").hide();
        //$("#DivForm").show();
        $("#DivForm").fadeIn('fast');
    }


    function HideEditForm() {
        $("#DivEditForm").hide();
    }

    function ShowEditContent() {

        //center lightbox
        var w = $(window).width();
        var h = $(window).height();

        var lw = $("#DivEditForm").width();
        var lh = $("#DivEditForm").height();

        if (lh < h) { ptop = (h - lh) / 2; }
        else { ptop = 10; }
        left = (w - lw) / 2;

        if (lw > 601) {
            left = left - 50;
        }
        else {
            left = left;
        }

        $("#DivEditForm").css({ 'top': '50%', 'left': '50%', 'margin-left': +(-lw / 2) + 'px', 'margin-top': +(-lh / 2) + 'px', 'overflow-x': 'hidden', 'overflow-y': 'hidden' });


        //$("#DivEditForm").css({ 'top': (ptop - 50), 'left': (left) + 'px' });    
        $("#DivEditForm").fadeIn('fast');
    }

    //****************
    //Show Error Popup 
    //****************

    function ShowError() {

        $("#result").empty();

        var content = "";
        content += "<table align='center' cellpadding='2' cellspacing='5' style='width: 350px'>";
        content += "<tr>";
        content += "<td style='color: #FF3300; font-size: large; border-bottom-style: solid; border-width: 1px; border-color: #CCCCCC'><strong>Error!!!</strong></td>";
        content += "</tr>";
        content += "<tr>";
        content += "<td style='text-align: center'>An unexpected error has occurred. Please try again!";
        content += " <br />";
        content += "Web admin has been notified.";
        content += "</td>";
        content += "</tr>";
        content += "<tr>";
        content += "<td style='text-align: center'>";
        content += "<input id='Button1' type='button' value='Close' onclick='CloseDiv();' class='ShowPointer'/>";
        content += "</td>";
        content += "</tr>";
        content += "</table>";
        $("#result").append(content);
        //center lightbox    

        $("#DivForm").css({ 'top': 50 + '%', 'left': 50 + '%', 'width': 380 + 'px', 'height': 130 + 'px', 'margin-top': -65 + 'px', 'margin-left': -175 + 'px' });
        $("#DivWaitingForm").hide();
        //$("#DivForm").show();
        $("#DivForm").fadeIn('fast');
    }



    //********************
    //Close Popup Function
    //********************

    function CloseDiv() {

        $("#DivForm").css({ 'top': '%', 'left': '%', 'width': 'px', 'height': 'px', 'margin-top': 'px', 'margin-left': 'px' });
        $("#result").empty();
        $("#DivForm").hide();
        $("#DivWaitingForm").hide();
        $("#page-cover").hide();

        $("#AllOtherForms").hide();
        $("#OtherFormsResultDiv").empty();

    }


    //*******************************
    //Remove Classes
    //*******************************

    function RemoveClasses() {
        $("#GetIssueOverviewdiv").removeClass("selected");
        $("#Todolistdiv").removeClass("selected");
        $("#Lotlistdiv").removeClass("selected");
        $("#Analysisdiv").removeClass("selected");
        $("#Notediv").removeClass("selected");

    }

    

    //******************
    // Quick Add Lot
    //******************

    function QuickAddLot(IssueID, username) {
    
        IsANewIssue = "No";
        var t = new Date().getTime();
        WaitToLoad();

        $("#result").load("Forms/AddLot.aspx #GeneralAddLotForm",
                {
                    id: IssueID,
                    username: username,                
                    IsANewIssue: IsANewIssue,
                    time: t
                },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert("Error");
                        ShowError();
                    }
                    else {
                        ShowContent();
                    }
                }
           );
    }

    //******************
    //Get Home Data
    //******************

    function GetGeneralHomeData(families, username) {

        var array = families.split(",");

        $.each(array, function (index, family) {
            //alert(index + ": " + value);
            //ShowCompareResult(value, index);
            GetHomeData(family, username);

        });

    }


    function GetHomeData(family, username) {

        if (username == null | username == "") {
            alert("Unable to get logged in username or your session has ended. Please reload the page!");
            location.reload();
        }

        //WaitToLoad();

        var t = new Date().getTime();
    
        $("#" + family + "Div").empty();

        var imglink = "<span style='text-align: center; align-content:center'>Getting " + family + " data, please wait!<br><br><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#" + family + "Div").append(imglink);

        $("#" + family + "Div").load("DisplayForms/DisplayHomeData.aspx #AllHomeData",
                    {
                        family: family,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    //**********************
    // Get Latest Activities
    //**********************

    function GetActivities(family, request_hours, username) {

        //WaitToLoad();
        var request_activities = "Yes";
        var t = new Date().getTime();

        //alert(family + "," + request_hours + ", " + username);
        $("#" + family + "LatestActivitiesDiv").empty();

        var imglink = "<span style='text-align: center; align-content:center'><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#" + family + "LatestActivitiesDiv").append(imglink);

        $("#" + family + "LatestActivitiesDiv").load("DisplayForms/DisplayActivitiesData.aspx #LatestActivitiesDataDiv",
                    {
                        family: family,
                        request_activities: request_activities,
                        request_hours: request_hours,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    //******************
    //Get Passdown Data
    //******************

    function GetGeneralPassdownData(families, username, startdate, enddate) {

        $("#DRAMPassdown").empty();
        $("#NANDPassdown").empty();
        $("#NORPassdown").empty();
        $("#ExtralinksDiv").empty();

        var array = families.split(",");   

            $.each(array, function (index, family) {
            
                GetPassdownData(family, username, startdate, enddate);

            });   

    }

    

    function GetPassdownData(family, username, startdate, enddate) {
        //alert(family + ", " + username + ", " + startdate + ", " + enddate);

        // WaitToLoad();
        // var request_activities = "Yes";
        var t = new Date().getTime();

        $("#" + family + "Passdown").empty();

        var imglink = "<span style='text-align: center; align-content:center'>Getting " + family + " data, please wait!<br><br><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#" + family + "Passdown").append(imglink);

        $("#" + family + "Passdown").load("DisplayForms/DisplayPassdownData.aspx",
                    {
                        family: family,
                        username: username,
                        startdate: startdate,
                        enddate: enddate,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    //******************
    //Get Issue Overview
    //******************


    function GetIssueOverview(IssueID, username) {

        if (username == null | username == "")
        {
            alert("Unable to get logged in username or your session has ended. Please reload the page!");
            location.reload();
        }

        //WaitToLoad();
        $("#containtbdiv").empty();
   
        RemoveClasses();
        $("#GetIssueOverviewdiv").addClass("selected");

        var t = new Date().getTime();
        //WaitToLoad();

        var imglink = "<span style='text-align: center; align-content:center'><br><br><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#containtbdiv").append(imglink);

        $("#containtbdiv").load("DisplayForms/DisplayOverview.aspx",
                    {
                        id: IssueID,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    //*******************************
    //Get Action Item Form
    //*******************************

    function GetActionItemForm(IssueID, username) {
        //WaitToLoad();
        $("#containtbdiv").empty();

        RemoveClasses();
        $("#Todolistdiv").addClass("selected");

        var t = new Date().getTime();

        var imglink = "<span style='text-align: center; align-content:center'><br><br><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#containtbdiv").append(imglink);

        $("#containtbdiv").load("DisplayForms/DisplayActionItems.aspx #GetActionsByIssueIDDiv",
                    {
                        id: IssueID,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    //*******************************
    //Get Lot list Form
    //*******************************

    function GetLotListForm(IssueID, username) {

        //WaitToLoad();
        $("#containtbdiv").empty();

        RemoveClasses();
        $("#Lotlistdiv").addClass("selected");

        var t = new Date().getTime();

        var imglink = "<span style='text-align: center; align-content:center'><br><br><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#containtbdiv").append(imglink);

        $("#containtbdiv").load("DisplayForms/DisplayLotList.aspx",
                    {
                        id: IssueID,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    //*******************************
    //Get Issue Notes Function
    //*******************************

    function GetIssueNotes(IssueID, username) {

        GetNoteForm(IssueID, username);
    }

    //*******************************
    //Get Note Form
    //*******************************

    function GetNoteForm(IssueID, username) {
        //WaitToLoad();
        $("#containtbdiv").empty();

        RemoveClasses();
        $("#Notediv").addClass("selected");

        var t = new Date().getTime();

        var imglink = "<span style='text-align: center; align-content:center'><br><br><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#containtbdiv").append(imglink);

        $("#containtbdiv").load("DisplayForms/DisplayNoteForm.aspx",
                    {
                        id: IssueID,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }


    //*******************************
    //Add New Issue Function
    //Step1: Get LotID Form
    //*******************************

    function AddNewIssue(username) {
        //alert(username);
        ClearContent();
        WaitToLoad();

        var Request = "GetLotIDForm";
        var t = new Date().getTime();

        $("#result").load("Forms/AddEditIssue.aspx #Step1_GetLotIDDiv",
                {
                    Request: Request,
                    username: username,
                    time: t
                },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert("Error");
                        ShowError();
                    }
                    else {

                        ShowContent();

                    }
                }
           );
    }

    //*******************************
    //Add New Issue Function
    //Step2: Get Defect
    //*******************************

    function GetDefects(IssueID, username) {
        //alert(IssueID + ", " + username);

        $("#GetDefectDiv").empty();
        $("#GetIssueDescriptionDiv").empty();
        $("#NewIssueUploadThumbnailDiv").hide();
    
        var Request = "GetDefects";
        var t = new Date().getTime();
        var lotid = $("#NewIssueLotID").val();

        if (lotid == "")
        {
            alert("Lot ID is required!");
            $("#NewIssueLotID").focus();
            return false;
        }

        //ClearContent();
        WaitToLoad();   

        $("#GetDefectDiv").load("Forms/AddEditIssue.aspx #Step2_GetDefectsDDiv",
                   {
                       IssueID: IssueID,
                       Request: Request,
                       lotid: lotid,
                       time: t
                   },
               function (xhr, textStatus, req) {
                   if (textStatus == "error") {
                       //alert(xhr + textStatus + req);
                       ShowError();

                   }
                   else {
                       //alert(xhr + textStatus + req);
                       HideWaitToLoad();
                   }
               }
          ).hide().fadeIn(1000);
    }

    //*******************************
    //Add New Issue Function
    //Step2: Get Blank Form
    //*******************************

    function GetBlankForm(IssueID, username) {
        //alert(IssueID + ", " + username);

        $("#GetDefectDiv").empty();
        $("#GetIssueDescriptionDiv").empty();
        $("#NewIssueUploadThumbnailDiv").hide();

    
        var t = new Date().getTime();
        var lotid = $("#NewIssueLotID").val();
        var BlankForm = "Yes";

        if (lotid == "") {
            alert("Lot ID is required!");
            $("#NewIssueLotID").focus();
            return false;
        }

        else {
            var IsANewIssue = "Yes";
            ClearContent();
            WaitToLoad();
       
            var t = new Date().getTime();
            $("#result").load("Forms/AddLot.aspx #ManualAddLotForm",
                    {
                        id: IssueID,
                        username: username,
                        lotid: lotid,
                        IsANewIssue: IsANewIssue,
                        time: t
                    },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            //alert("Error");
                            ShowError();
                        }
                        else {
                            ShowContent();
                        }
                    }
               );        
        }    

    }

    //*******************************
    //Add New Issue Function
    //Add a new Temp into the database
    //*******************************

    function AddTempIssue(IssueID, username, family, maskinglevel, defect, macro, lotshade, wafershade, bins, ecat, lotid)
    {
    
        //alert("IssueID: " + IssueID + ", Username: " + username + ", family: " + family + ", maskinglevel: " + maskinglevel + ", defect: " + defect + ", macro: " + macro +", lotshade: "+lotshade +", wafershade: "+wafershade+", bins: "+bins+", ecat: "+ecat);
        var t = new Date().getTime();
        var IsANewIssue = "Yes";
        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +
                '","username": "' + username +
                '","family": "' + family +
                '","maskinglevel": "' + maskinglevel+
                '","defect": "' + defect+
                '","macro": "' + macro +
                '","lotshade": "' + lotshade +
                '","wafershade": "' + wafershade +
                '","bins": "' + bins +
                '","ecat": "' + ecat +
                '","lotid": "' + lotid +
                '","time": "' + t +
                '" }';

        WaitToLoad();

        $.ajax({
            type: "POST",
            url: "Process.asmx/AddNewTempIssue",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;               
                if (data == "Success") {
                    GetIssueDescriptionForm(IssueID, username, IsANewIssue);
                    $("#GetDefectDiv").empty();
                    HideWaitToLoad();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                   
                    ShowError();
                }
            },
            error: function (response) {
               
                ShowError();
            }
        });
      
   
    }

    //*******************************
    //Add New Issue Function
    //Step3: Edit Issue
    //*******************************

    function QuickEditIssue(IssueID, username, IsANewIssue)
    {
        ClearContent();
        WaitToLoad();
        var Request = "GetDescription";   
        var t = new Date().getTime();               
        //alert(IssueID + ", " + username + ", " + IsANewIssue);
        $("#result").load("Forms/AddEditIssue.aspx #Step3_GetDescriptionDiv",
                  {
                      IssueID: IssueID,
                      Request: Request,
                      username: username,
                      IsANewIssue: IsANewIssue,
                      time: t
                  },
              function (xhr, textStatus, req) {
                  //alert(xhr + textStatus + req);
                  if (textStatus == "error") {
                      
                      ShowError();
                  }
                  else {
                      ShowContent();                     
                  }
              }
         );
    }

    function GetIssueDescriptionForm(IssueID, username, IsANewIssue)
    {
        //alert(IssueID);
        var Request = "GetDescription";
        var t = new Date().getTime();

        //ClearContent();
        WaitToLoad();  

        $("#GetIssueDescriptionDiv").load("Forms/AddEditIssue.aspx #Step3_GetDescriptionDiv",
                  {
                      IssueID: IssueID,
                      Request: Request,
                      IsANewIssue: IsANewIssue,
                      time: t
                  },
              function (xhr, textStatus, req) {
                  if (textStatus == "error") {
                      //alert(xhr + textStatus + req);
                      ShowError();

                  }
                  else {

                      HideWaitToLoad();
                  }
              }
         ).hide().fadeIn(1000);
    }


    //*******************************
    //Save Issue Description
    //*******************************
    
    function SaveIssueDescription(IssueID, username, IsANewIssue) {

        var t = new Date().getTime();
    
        var issueStatement = $("#IssueStatementTxt").val();
        var maskinglevel = $("#MaskingLevelDropDown option:selected").val();
        var defect = $("#DefectDropDown option:selected").val();
        var macro = $("#MacroCategoryDropDown option:selected").val();
        var lotshade = $("#LotShadingDropDown option:selected").val();
        var wafershade = $("#WaferShadingTxt").val();
        var bins = $("#BinsTxt").val();
        var ecat = $("#ECATTxt").val();
        var thumbnail = $("#ThumbnailLink").val();

        var SearchMetric = $("#SearchMetricTxt").val();
        var RelatedIssue = $("#RelatedIssueTxt").val();
        //alert(SearchMetric);

        if (lotshade == "0")
        {
            lotshade = "";
        }
        if (maskinglevel == "0")
        {
            alert("Masking Level is required!");
            $("#MaskingLevelDropDown").focus();
            return false;
        }
        else if (defect == "0")
        {
            alert("Defect is required!");
            $("#DefectDropDown").focus();
            return false;
        }
   
        if (ecat == "")
        {
            alert("ECAT is required!");
            $("#ECATTxt").focus();
            return false;
        }

        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +
                    '","username": "' + username +
                    '","issueStatement": "' + issueStatement +
                    '","maskinglevel": "' + maskinglevel +
                    '","defect": "' + defect +
                    '","macro": "' + macro +
                    '","lotshade": "' + lotshade +
                    '","wafershade": "' + wafershade +
                    '","bins": "' + bins +
                    '","ecat": "' + ecat +
                    '","SearchMetric": "' + SearchMetric +
                    '","RelatedIssue": "' + RelatedIssue +
                    '","IsANewIssue": "' + IsANewIssue +
                    '","time": "' + t +
                    '" }';

        //alert(obj);
        WaitToLoad();
        
        $.ajax({
            type: "POST",
            url: "Process.asmx/UpdateIssue",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Success") {

                    if (IsANewIssue == "No") {

                        location.reload();
                        CloseDiv();
                    }
                    else {
                        HideWaitToLoad();

                        //Show Upload Thumbnail DIV if it is new issue
                        $("#NewIssueUploadThumbnailDiv").show();
                    }
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    ShowError();
                }
            },
            error: function (response) {

                ShowError();
            }
        });    

    }


    //*******************************
    //Get Masking Level Suggestion
    //*******************************

    function GetMaskingSuggestion(value) {
        var t = new Date().getTime();
        $('ul.resultul').empty();
        if (value == "") {
            $("#SuggestionDiv").hide();
            return false;
        }
        else {
            $.ajax({
                //Json Return
                url: 'Process.asmx/GetMaskingLevel',
                method: 'post',
                data:
                    {
                        maskinglevel: value,
                        time: t
                    },
                dataType: 'json',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    ShowError();
                },
                //complete: function (jqXHR, status) {
                success: function (data) {
                    $('ul.resultul').empty();

                    $(data).each(function (index, masking) {

                        //alert(masking.maskinglevel); 
                        if (masking.maskinglevel != "")
                        {
                            $('ul.resultul').append("<li>" + masking.maskinglevel + "</li>");
                        }
                    });

                    //Get location of the textbox
                    var textbox = jQuery("#MaskingLevelTxt");
                    var offset = textbox.offset();
                    //alert("Left: " + offset.left + ", Top: " + offset.top);              

                    $("#SuggestionDiv").css({ "margin-left": "" + offset.left + "px", "margin-top": "" + (offset.top + 21) + "px" });
                    $("#SuggestionDiv").css("width", textbox.width());
                    $("#SuggestionDiv").show();

                    $('ul.resultul li').click(function (e) {
                        // alert($(this).text());
                        e.preventDefault();
                        var value = $(this).text();
                        $("#MaskingLevelTxt").val(value);
                        $("#SuggestionDiv").hide();
                    });
                }
            });
        }
    }

    //*********************
    //Get Defect Suggestion
    //*********************

    function GetDefectSuggstion(value) {
        var t = new Date().getTime();
        $('ul.resultul').empty();
        if (value == "") {
            $("#SuggestionDiv").hide();
            return false;
        }
        else {
            $.ajax({
                //Json Return
                url: 'Process.asmx/GetDefect',
                method: 'post',
                data:
                    {
                        defect: value,
                        time: t
                    },
                dataType: 'json',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    ShowError();
                },
                //complete: function (jqXHR, status) {
                success: function (data) {
                    $('ul.resultul').empty();

                    $(data).each(function (index, defect) {

                        //alert(masking.maskinglevel); 
                        if (defect.defectname != "") {
                            $('ul.resultul').append("<li>" + defect.defectname + "</li>");
                        }
                    });

                    //Get location of the textbox
                    var textbox = jQuery("#DefectTxt");
                    var offset = textbox.offset();
                    //alert("Left: " + offset.left + ", Top: " + offset.top);              

                    $("#SuggestionDiv").css({ "margin-left": "" + offset.left + "px", "margin-top": "" + (offset.top + 21) + "px" });
                    $("#SuggestionDiv").css("width", textbox.width());
                    $("#SuggestionDiv").show();

                    $('ul.resultul li').click(function (e) {
                        // alert($(this).text());
                        e.preventDefault();
                        var value = $(this).text();
                        $("#DefectTxt").val(value);
                        $("#SuggestionDiv").hide();
                    });
                }
            });
        }
    
    }


    //****************************
    //Get Uncompleted Action Items
    //****************************


    function GetUncompletedActionItems(family, divtarget, divtohide) {
        //alert(family + ", " + divtarget +", "+divtohide);
        $("#" + divtohide).hide();
        $("#" + divtarget).empty();

        var imglink = "<span style='text-align: center; align-content:center'><br><br><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#" + divtarget).append(imglink);
        //WaitToLoad();    

        var t = new Date().getTime();
  
        $("#" + divtarget).load("DisplayForms/DisplayActionItems.aspx #GetActionsByFamilyDiv",
                    {
                        family: family,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {
                        //alert(xhr + textStatus + req);
                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(500);
       
    }

    //****************************
    //Get Recent Data
    //****************************


    function GetRecentData(family, divtarget, divtohide, StateID, Days) {
        //alert(family + ", " + divtarget +", "+divtohide+ ", "+StateID);
        $("#" + divtohide).hide();
        $("#" + divtarget).empty();

        var imglink = "<span style='text-align: center; align-content:center'><br><br><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#" + divtarget).append(imglink);

        //WaitToLoad();

        var t = new Date().getTime();
        var url = "";
        
        $("#" + divtarget).load("DisplayForms/DisplayRecentData.aspx",
                    {
                        family: family,
                        StateID: StateID,
                        Days: Days,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {
                        //alert(xhr + textStatus + req);
                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(500);

    }

    //****************************
    //Show/Hide Home Page Pareto
    //****************************

    function GetIssuePareto(family, divtarget, divtoshow) {
        WaitToLoad();    

        $("#" + divtarget).empty();
        $("#" + divtoshow).show();

        HideWaitToLoad();
    }

    

      //*********************
      //Add New Note Function
      //*********************

     function AddNewNote(IssueID, username) {
            //GetIssueNotes(IssueID, username);
            ClearContent();
            WaitToLoad();
        
            var t = new Date().getTime();
            var action = "addnew";

            $("#result").load("Forms/NoteForm.aspx",           
                            {
                                id: IssueID,
                                username: username,
                                action: action,
                                time: t
                            },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            //alert(xhr + ","+req);
                            ShowError();
                        }
                        else {
                        
                            CKEDITOR.disableAutoInline = true;
                       
                            $('.ckeditor').each(function () {                           

                                CKEDITOR.inline(this.id, {

                                });

                            });
                        
                            ShowContent();

                        }
                    }
               );
    }

     //**********************
     //Save New Note Function
     //**********************

     function SaveNewNote(IssueID, username) {       
        
            var note = CKEDITOR.instances["NoteTxt"].getData();
            SaveNote(note, IssueID, username);
     }

     function SaveNote(note, IssueID, username) {
        
            if (note != "") {

                WaitToLoad();                
                var t = new Date().getTime();

                var obj = '{"IssueID": "' + IssueID +
                            '","note": "' + note +               
                            '","username": "' + username +                
                            '","time": "' + t +
                            '" }';

                $.ajax({
                    type: "POST",
                    url: "Process.asmx/SaveNewNote",
                    data: obj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        var data = response.d;
                        //alert(data);
                        if (data == "Success") {

                            GetIssueNotes(IssueID, username);
                            CloseDiv();
                            HideWaitToLoad();
                        }
                        else if (data == "Username") {
                            alert("Unable to get logged in username! Please refresh the page and try again!");
                        }
                        else {
                            //alert("Error");
                            ShowError();
                        }
                    },
                    error: function (response) {
                        //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                        //alert(response);
                        ShowError();
                    }
                });              
            }
            else {
                CloseDiv();
            }
    }

    //******************
    //Edit Note Function
    //******************

    function EditNote(NoteID, IssueID, username) {
        
        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();
        var action = "editnote";
        $("#result").load("Forms/NoteForm.aspx",
                        {                            
                            id: IssueID,
                            noteid: NoteID,
                            username: username,
                            action: action,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {
                        
                        CKEDITOR.disableAutoInline = true;
                        
                        $('.ckeditor').each(function () {

                            CKEDITOR.inline(this.id, {

                            });

                        });
                       
                        ShowContent();

                    }
                }
           );        
    }

    //**********************
    //Update Note Function
    //**********************    

    function UpdateNote(NoteID, IssueID, username) {

        WaitToLoad();
        var note = CKEDITOR.instances["NoteTxt"].getData();
        if (note != "") {
            var t = new Date().getTime();

            var obj = '{"NoteID": "' + NoteID +
                        '","IssueID": "' + IssueID +
                        '","note": "' + note +
                        '","username": "' + username +
                        '","time": "' + t +
                        '" }';

            $.ajax({
                type: "POST",
                url: "Process.asmx/UpdateNote",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    //alert(data);
                    if (data == "Success") {

                        GetIssueNotes(IssueID, username);
                        CloseDiv();
                        HideWaitToLoad();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {
                        //alert("Error");
                        ShowError();
                    }
                },
                error: function (response) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    //alert(response);
                    ShowError();
                }
            });            
        }
        else {
            CloseDiv();
        }
    }

    //**********************
    //Update Note Function
    //**********************

    function DeleteNote(NoteID, IssueID, username) {

        if (confirm('You are about to delete this note. Are you sure?')) {

            var t = new Date().getTime();

            var obj = '{"NoteID": "' + NoteID +
                        '","IssueID": "' + IssueID +                       
                        '","username": "' + username +
                        '","time": "' + t +
                        '" }';

            $.ajax({
                type: "POST",
                url: "Process.asmx/DeleteNote",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    //alert(data);
                    if (data == "Success") {

                        GetIssueNotes(IssueID, username);
                        CloseDiv();
                        HideWaitToLoad();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {
                        //alert("Error");
                        ShowError();
                    }
                },
                error: function (response) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    //alert(response);
                    ShowError();
                }
            });           
        }
        else {
            //Do nothing
            CloseDiv();
        }
    }

    //***********************
    //Change Status Function
    //***********************

    function Notify(IssueID, username) {

        WaitToLoad();

        var t = new Date().getTime();

        $("#result").load("Forms/NotifyForm.aspx #NotifyFormDiv",
                        {
                            id: IssueID,
                            username: username,                           
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {

                        CKEDITOR.disableAutoInline = true;

                        $('.ckeditor').each(function () {

                            CKEDITOR.inline(this.id, {

                            });

                        });

                        ShowContent();
                    }
                }
          );

    }

    //***********************
    //Send Notification
    //***********************

    function SendNotification(IssueID, username) {

        //alert(ClientID);
        

        var message = CKEDITOR.instances["MessageTxt"].getData();
        var t = new Date().getTime();

        var notify = [];

        $("input[name='notify_who']:checked").each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {
                notify.push($(this).val());
            }
        });

        if ($("#Notify_Others").val() != "") {

            notify.push($("#Notify_Others").val());
        }

        if (notify.length == 0)
        {
            alert("No receiver found!");
            return false;
        }
        
        if (message == "")
        {
            alert("Message is empty!");
            $("#MessageTxts").focus();
            return false;
        }

        if ($("input[name='AddtoNote']").attr('checked')) {

            if (message != "") {
                SaveNote(message, IssueID, username);
            }
        }
        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +                
                '","username": "' + username +
                '","message": "' + message +
                '","Notify": "' + notify.toString() +
                '","time": "' + t +
                '" }';        

        $.ajax({
            type: "POST",
            url: "Process.asmx/SendNotification",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {                    

                    HideWaitToLoad();
                    CloseDiv();
                }
            },
            error: function (response) {

                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });       
    }

    //******************
    //Change Status Function
    //******************

    function ChangeStatus(IssueID, username, ClientID) {
        
        WaitToLoad();

        var t = new Date().getTime();

        //$("#" + ClientID).text("CHANGED");
        
        $("#result").load("Forms/ChangeStatus.aspx #ChangeStatusFormDiv",
                        {
                            id: IssueID,                            
                            username: username,
                            ClientID: ClientID,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();                        
                    }
                    else {
                        
                        ShowContent();
                        var orginState = $("#IssueStatusDropDown option:selected").val();

                        //alert(orginState);
                        $("#IssueStatusDropDown").change(
                            function () {

                                var StateID = this.value;
                                if (orginState == 1 && StateID != 1)
                                {
                                    //alert("Change");
                                    GetNewIssueCount();
                                }

                                //alert(StateID);
                                if(StateID == 6)
                                {                                   
                                    CheckActiveActionItems(IssueID, username, ClientID);
                                }
                                else if(StateID == 8)
                                {
                                    GetYEReaction(IssueID, username, "REJECTED", ClientID);
                                }
                            }
                        );
                        
                        $("#UsernameDropDown").change(
                            function () {

                                var thisusername = this.value;
                                //alert(thisusername);
                                $("#Notify_Others").val(thisusername);
                            }
                        );
                       
                    }
                }
          );
           
    }

    function SaveStatus(IssueID, username, ClientID) {

        var issue_state = $("#IssueStatusDropDown option:selected").val();        
        var assigned_username = $("#UsernameDropDown option:selected").val();
        var message = $("#MessageTxt").val();

        if (issue_state == "3")
        {
            if(assigned_username == "")
            {
                alert("Please assign this to someone!");
                $("#UsernameDropDown").focus();
                return false;                
            }
        }

        var notify = [];        
        
        $("input[name='notify_who']:checked").each(function ()
        {
            var sThisVal = (this.checked ? "1" : "0");
            if(sThisVal == 1) {						
                notify.push($(this).val());						
            }						
        });

        if ($("input[name='AddtoNote']").attr('checked')) {
            
            if (message != "") {
                SaveNote(message, IssueID, username);
            }
        }

        if ($("#Notify_Others").val() != "")
        {            
            notify.push($("#Notify_Others").val());
        }              

        var t = new Date().getTime();
        WaitToLoad();
        
        var obj = '{"IssueID": "' + IssueID +
                 '","username": "' + username +
                 '","StateID": "' + issue_state +
                 '","AssignedUsername": "' + assigned_username +
                 '","Notify": "' + notify.toString() +
                 '","Message": "' + message +
                 '","time": "' + t +
                 '" }';
       
        
        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveStatus",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    GetUpdatedStatus(IssueID, username);
                    GetNewIssueCount();
                    HideWaitToLoad();
                    CloseDiv();
                }
            },
            error: function (response) {
                alert("Error");
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });        
    }

    //***********************
    //Get Updated Status
    //***********************

    function GetUpdatedStatus(IssueID, username)
    {
        WaitToLoad();
        $("#StatusDIV" + IssueID).empty();
        
        var imglink = "<img src='Images/ajax-loader.gif'>";
        $("#StatusDIV" + IssueID).append(imglink);

        var t = new Date().getTime();
        
        $("#StatusDIV" + IssueID).load("Forms/ChangeStatus.aspx #UpdatedStatusDiv",
                    {
                        id: IssueID,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    //***********************
    //Check Active Action Items
    //***********************

    function CheckActiveActionItems(IssueID, username, ClientID) {

        var t = new Date().getTime();
        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +                   
                    '","time": "' + t +
                    '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/CheckActiveActionItems",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    if (data == "Yes") {
                        alert("You can not complete this Issue because there are active actions items!");
                        HideWaitToLoad();
                        CloseDiv();
                    }
                    else {
                        GetYEReaction(IssueID, username, "Yes", ClientID);
                    }
                }
            },
            error: function (response) {
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });
        
    }

    //***********************
    //Save Quick Status Function
    //***********************

    function SaveQuickStatus(IssueID, username, ClientID, QuickMonitorClientID) {

        var issue_state = 2;
        var assigned_username = "";
        var message = "";
        var notify = "";
        var t = new Date().getTime();
        //alert(IssueID + "," + username + "," + ClientID + "," + QuickMonitorClientID);       
       
        var obj = '{"IssueID": "' + IssueID +
              '","username": "' + username +
              '","StateID": "' + issue_state +
              '","AssignedUsername": "' + assigned_username +
              '","Notify": "' + notify +
              '","Message": "' + message +             
              '","time": "' + t +
              '" }';     
      
        //alert(obj);
        
        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveStatus",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
              
                var data = response.d;
                
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    GetUpdatedStatus(IssueID, username);
                    GetNewIssueCount();
                    HideWaitToLoad();
                    CloseDiv();
                }
            },
            error: function (response) {

                //alert("Error");
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        }); 
        
    }

    //***********************
    //Complete Issue Function
    //***********************
    function CompleteIssue(IssueID, username) {

        var issue_state = 6;        
        var t = new Date().getTime();
        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +
                    '","username": "' + username +
                    '","StateID": "' + issue_state +                   
                    '","time": "' + t +
                    '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/CompleteIssue",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {                    
                    HideWaitToLoad();
                    CloseDiv();
                }
            },
            error: function (response) {
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });       
    }

    //*********************
    //Get YE reaction Form
    //*********************

    function GetYEReaction(IssueID, username, CompleteThisIssue, ClientID) {
        //GetIssueNotes(IssueID, username);
        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();        

        $("#result").load("Forms/YEReactionForm.aspx",
                        {
                            id: IssueID,
                            username: username,
                            CompleteThisIssue: CompleteThisIssue,
                            ClientID: ClientID,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {

                        CKEDITOR.disableAutoInline = true;

                        $('.ckeditor').each(function () {

                            CKEDITOR.inline(this.id, {

                            });

                        });

                        ShowContent();

                    }
                }
           );

    }

    //*********************
    //Save YE reaction 
    //*********************

    function SaveYEReaction(IssueID, username, action, CompleteThisIssue, ClientID) {

        //alert(ClientID);
        WaitToLoad();

        var yeraction = CKEDITOR.instances["ReactionTxt"].getData();
        var t = new Date().getTime();

        var notify = [];

        $("input[name='notify_who']:checked").each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {
                notify.push($(this).val());
            }
        });      

        if ($("#Notify_Others").val() != "") {
            
            notify.push($("#Notify_Others").val());
        }
       
        //alert("Nofity : " + notify);
        /*
        if (CompleteThisIssue == "Yes")
        {
            CompleteIssue(IssueID, username);
        }
        */

        var obj = '{"IssueID": "' + IssueID+
                    '","username": "' + username+
                    '","YEReaction": "' + yeraction+
                    '","Notify": "' + notify.toString()+
                    '","action": "' + action+
                    '","CompleteThisIssue": "' + CompleteThisIssue+
                    '","time": "' + t +
                    '" }';
       
        WaitToLoad();

        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveYEReaction",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Success") {
                    GetUpdatedStatus(IssueID, username);
                    GetUpdatedYEReaction(IssueID, username);
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                    
                }

                HideWaitToLoad();
                CloseDiv();
            },
            error: function (response) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                //alert(response);
                ShowError();
            }
        });

       
    }
    
    //*********************
    //Get YE Reaction
    //*********************

    function GetUpdatedYEReaction(IssueID, username) {
        
        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();

        $("#Overview_YEReactionDIV").load("DisplayForms/DisplayYEReaction.aspx",
                {
                    id: IssueID,
                    username: username,
                    time: t
                },
            function (xhr, textStatus, req) {
                if (textStatus == "error") {
                    //alert(xhr + textStatus + req);
                    ShowError();

                }
                else {

                    HideWaitToLoad();
                }
            }
       ).hide().fadeIn(1000);       

    }

    //******************************
    //Mark/Unmark Issue as Important
    //******************************

    function MarkIssue(IssueID, username, ClientID) {
       
        //$("#" + ClientID).text("CHANGED");

        var t = new Date().getTime();
        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +
                   '","username": "' + username +                  
                   '","time": "' + t +
                   '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/MarkIssue",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                    $("#" + ClientID).text(data);
                    HideWaitToLoad();
                    CloseDiv();
                }
            },
            error: function (response) {
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });       
    }

    //******************
    //Delete lot Function
    //******************

    function DeleteLot(IssueID, username) {
        //alert("Delete Lot");
        var lotids = [];      
        var t = new Date().getTime();

        $("#GridView1 input:checkbox").each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {

                var lotid = $(this).val();
                //lotid = lotid.trim();
                lotids.push(lotid);
            }
        });
        //alert(lotids);
        if (lotids.length == 0) {
            alert("Please select at least 1 lot to delete!");
            return false;
        }
        else
        {
            if (confirm("You are about to delete these lots: " + lotids + ". Are you sure?")) {
                var lotdata = $.toJSON(lotids);
                //alert(lotdata);
                WaitToLoad();

                var obj = '{"IssueID": "' + IssueID +
                          '","username": "' + username +
                          '","lotdata": "' + lotids.toString() +
                          '","time": "' + t +
                          '" }';

                $.ajax({
                    type: "POST",
                    url: "Process.asmx/DeleteLots",
                    data: obj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        var data = response.d;
                        if (data == "Error") {
                            ShowError();
                        }
                        else if (data == "Username") {
                            alert("Unable to get logged in username! Please refresh the page and try again!");
                        }
                        else {
                            GetLotListForm(IssueID, username);
                            HideWaitToLoad();
                            CloseDiv();
                        }
                    },
                    error: function (response) {
                        HideWaitToLoad();
                        CloseDiv();
                        ShowError();
                    }
                });                
            }
            else
            {
                CloseDiv();
            }
        }
    }

    function DeleteSingLot(IssueID, lotid, username) {
        //alert("Delete Lot");
        var t = new Date().getTime();
        if (confirm("You are about to delete this lot: " + lotid + ". Are you sure?")) {
                
            WaitToLoad();

                var obj = '{"IssueID": "' + IssueID +
                              '","username": "' + username +
                              '","lotid": "' + lotid +
                              '","time": "' + t +
                              '" }';

                $.ajax({
                    type: "POST",
                    url: "Process.asmx/DeleteSingleLot",
                    data: obj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        var data = response.d;
                        if (data == "Error") {
                            ShowError();
                        }
                        else if (data == "Username") {
                            alert("Unable to get logged in username! Please refresh the page and try again!");
                        }
                        else {
                            GetLotListForm(IssueID, username);
                            HideWaitToLoad();
                            CloseDiv();
                        }
                    },
                    error: function (response) {
                        HideWaitToLoad();
                        CloseDiv();
                        ShowError();
                    }
                });
               
            }
            else {
                CloseDiv();
            }       
    }

    //*************************
    //Add new lot Form Function
    //*************************

    function QuickAutoAddLot(IssueID, username) {

        var lotid = $("#QuickLotIDTxt").val();

        if (lotid != "") {

            SaveAutoAddLot(IssueID, username, lotid);
        }
        else {
            alert("Please enter lotid!")
            $("#QuickLotIDTxt").focus();
            return false;
        }
    }

    

    function QuickManualAddLot(IssueID, username) {

        var lotid = $("#QuickLotIDTxt").val();
        var IsANewIssue = "No";

        if (lotid != "") {
            ClearContent();
            WaitToLoad();
            var t = new Date().getTime();
            $("#result").load("Forms/AddLot.aspx #ManualAddLotForm",
                    {
                        id: IssueID,
                        username: username,
                        lotid: lotid,
                        IsANewIssue: IsANewIssue,
                        time: t
                    },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            //alert("Error");
                            ShowError();
                        }
                        else {

                            ShowContent();

                        }
                    }
               );
        }
        else {
            alert("Please enter lotid!")
            $("#QuickLotIDTxt").focus();
            return false;
        }
    }

    function AutoAddLot(IssueID, username) {            
        
        var lotid = $("#LotidTxt0").val();

        if (lotid != "") {

            SaveAutoAddLot(IssueID, username, lotid);           
        }
        else {
            alert("Please enter lotid!")
            $("#LotidTxt0").focus();
            return false;
        }
    }

    function SaveAutoAddLot(IssueID, username, lotid)
    {
        WaitToLoad();
        var t = new Date().getTime();
        
        var obj = '{"IssueID": "' + IssueID +
                    '","username": "' + username +
                    '","lotid": "' + lotid +
                    '","time": "' + t +
                    '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/AutoAddLot",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                    GetLotListForm(IssueID, username);
                    HideWaitToLoad();
                    CloseDiv();
                }
            },
            error: function (response) {
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });
    }

    function ManualAddLotForm(IssueID, username, IsANewIssue) {
        //alert("Add Lot");      

        var lotid = $("#LotidTxt0").val();
        if (lotid != "") {
            ClearContent();
            WaitToLoad();
            var t = new Date().getTime();
            $("#result").load("Forms/AddLot.aspx #ManualAddLotForm",
                    {
                        id: IssueID,
                        username: username,
                        lotid: lotid,
                        IsANewIssue: IsANewIssue,
                        time: t
                    },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            //alert("Error");
                            ShowError();
                        }
                        else {

                            ShowContent();

                        }
                    }
               );
        }
        else
        {
            alert("Please enter lotid!")
            $("#LotidTxt0").focus();
            return false;
        }
    }

    function ReloadLot(IssueID, lotid, ProcessID, username) {
        //alert("IssueID: "+IssueID +", lotid: "+ lotid+", Username: "+ username);
        var t = new Date().getTime();

        var obj = '{"IssueID": "' + IssueID +                   
                    '","lotid": "' + lotid +
                    '","ProcessID": "' + ProcessID +
                    '","username": "' + username +
                    '","time": "' + t +
                    '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/CheckDielossDetail",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    if (data == "Exist") {
                        // alert("Exist");
                        if (confirm("You are about to reload this lot: " + lotid + ". Please confirm!")) {
                            // SaveAutoAddLot(IssueID, username, lotid);
                            SaveReloadLot(IssueID, username, lotid);
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        alert("This lot can not be reloaded because the dieloss is no longer exist!");
                    }
                    //SaveAutoAddLot(IssueID, username, lotid);
                }
            },
            error: function (response) {
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });    
    }

    function SaveReloadLot(IssueID, username, lotid) {
       
        WaitToLoad();
        var t = new Date().getTime();

        var obj = '{"IssueID": "' + IssueID +
                    '","lotid": "' + lotid +                    
                    '","username": "' + username +
                    '","time": "' + t +
                    '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveReloadLot",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    GetLotListForm(IssueID, username);
                    HideWaitToLoad();
                }
            },
            error: function (response) {
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });        
    }

    function SelectAllWafers(){
        //$("[id*=WaferList] input:checkbox").prop('checked', false);
        var lotid = $("#LotidTxt").val();
        
        if (lotid == "") {
            alert("Lot id is missing!");
            $("#LotidTxt").focus();
            return false;
        }
        else {
            var $waferlist = $("[id*=WaferList]");
            $waferlist.prop('checked', false);
            for (var i = 0; i < 26; i++) {
                if (i < 10) {
                    $waferlist.find('label:contains("0' + i + '")').prev().prop('checked', true);
                }
                else {
                    $waferlist.find('label:contains("' + i + '")').prev().prop('checked', true);
                }
            }
        }
    }
    function SelectEvenWafers() {
        //$("[id*=WaferList] input:checkbox").prop('checked', false);
        var lotid = $("#LotidTxt").val();
        
        if (lotid == "") {
            alert("Lot id is missing!");
            $("#LotidTxt").focus();
            return false;
        }
        else {
            var $waferlist = $("[id*=WaferList]");
            $waferlist.prop('checked', false);

            for (var i = 2; i < 26; i += 2) {
                if (i < 10) {
                    $waferlist.find('label:contains("0' + i + '")').prev().prop('checked', true);
                }
                else {
                    $waferlist.find('label:contains("' + i + '")').prev().prop('checked', true);
                }
            }
        }
    }
    function SelectOddsWafers() {
        //$("[id*=WaferList] input:checkbox").prop('checked', false);
        var lotid = $("#LotidTxt").val();
        
        if (lotid == "") {
            alert("Lot id is missing!");
            $("#LotidTxt").focus();
            return false;
        }
        else {
            var $waferlist = $("[id*=WaferList]");
            $waferlist.prop('checked', false);

            for (var i = 1; i < 26; i += 2) {
                if (i < 10) {
                    $waferlist.find('label:contains("0' + i + '")').prev().prop('checked', true);
                }
                else {
                    $waferlist.find('label:contains("' + i + '")').prev().prop('checked', true);
                }
            }
        }
    }
    function ClearSelection() {
        var $waferlist = $("[id*=WaferList]");
        $waferlist.prop('checked', false);
    }  

    function ManualSaveLot(IssueID, username, IsANewIssue) {

        var t = new Date().getTime();
        var lotid = $("#LotidTxt1").val();        
        var family = $("#FamilyList option:selected").text();
        var designid = $("#PartTypeTxt").val();
        var ldl = $("#WaferDLTxt").val();

        var wafersid = [];
        var processes = [];

        var $processlist = $("[id*=ProcessList]");
        $processlist.each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {

                var process = $(this).closest("td").find("label").html();
                //process = process.trim();
                processes.push(process);

            }
        });

        var $waferlist = $("[id*=WaferList]");

        $waferlist.each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {
                
                var wafer = $(this).closest("td").find("label").html();
                //wafer = wafer.trim();
                wafersid.push(wafer);
               
            }
        });  

        if (family == "Select Family") {

            alert("Please select family!");
            $("#FamilyList").focus();
            return false;
        }

        if (designid == "")
        {
            alert("Please enter designid!");
            $("#PartTypeTxt").focus();
            return false;
        }

        if (ldl == "") {
            alert("Please enter Lot Dieloss!");
            $("#WaferDLTxt").focus();
            return false;
        }

        if (processes.length == 0) {
            alert("Please select at least 1 process!");
            return false;
        }

        if (wafersid.length == 0) {
            alert("Please select at least 1 wafer!");
            return false;
        }

        //var wafersdata = JSON.stringify(wafersid);
        //var processdata = JSON.stringify(processes);

        var wafersdata = $.toJSON(wafersid);
        var processdata = $.toJSON(processes);
        //alert(wafersdata + processdata);
      
        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +                  
                    '","username": "' + username +
                    '","lotid": "' + lotid +
                    '","family": "' + family +
                    '","designid": "' + designid +
                    '","ldl": "' + ldl +
                    '","wafers": "' + wafersid.toString() +
                    '","process": "' + processes.toString() +
                    '","IsANewIssue": "' + IsANewIssue +                    
                    '","time": "' + t +
                    '" }';

        alert(obj);
        $.ajax({
            type: "POST",
            url: "Process.asmx/ManualAddLot",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    if (IsANewIssue == "Yes") {

                        HideWaitToLoad();
                        CloseDiv();
                        GetIssueDescriptionForm(IssueID, username, IsANewIssue);
                    }
                    else {

                        GetLotListForm(IssueID, username);
                        HideWaitToLoad();
                        CloseDiv();
                    }
                }
            },
            error: function (response) {
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });     
    }
    
    //********************
    //Add/Edit Lot Comment
    //********************

    function EditLotComment(IssueID, lotid, username)
    {
        //alert("IssueID: "+IssueID +", lotid: "+ lotid+", Username: "+ username);
        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();

        $("#result").load("Forms/AddEditLotComment.aspx",
                        {
                            id: IssueID,
                            lotid: lotid,
                            username: username,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {                        

                        ShowContent();
                        
                        //Count lot comment chars
                        //Max char is set at 255
                        var input = $("#ThisLotCommentTxt");
                        var count = $("#TotalCharTxt");
                        var limit = 255;

                        input.keyup(function () {
                            var n = this.value.replace(/{.*?}/g, '').length;
                            if (n > limit) {
                                this.value = this.value.substr(0, this.value.length + limit - n);
                                n = 255;
                            }
                            count.val(n);
                        }).triggerHandler("keyup");
                        
                    }
                }
           );
    }

    function SaveThisLotComment(IssueID, lotid, username) {

        WaitToLoad();
        var lotcomment = $("#ThisLotCommentTxt").val();
        var t = new Date().getTime();

        var obj = '{"IssueID": "' + IssueID +
                   '","username": "' + username +
                   '","lotid": "' + lotid +
                   '","lotcomment": "' + lotcomment +                   
                   '","time": "' + t +
                   '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveLotComment",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Error") {
                    HideWaitToLoad();
                    CloseDiv();
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    GetLotListForm(IssueID, username);
                    HideWaitToLoad();
                    CloseDiv();
                }
            },
            error: function (response) {
                HideWaitToLoad();
                CloseDiv();
                ShowError();
            }
        });       
    }
    
    //*************************
    //Add New Support Document
    //*************************

    function AddSupportDocumentForm(IssueID, username) {
        
        var DetailID = 0;
        var link = "Forms/AddSupportDocsForm.aspx #AddSupportDocFormDiv";
        ShowForm(IssueID, username, link, DetailID);

    }
    
    function SaveDocs(IssueID, DocID, username) {

        var t = new Date().getTime();        
        var doctypeid = $("#DocTypeList input:radio:checked").val();
        var link = $("#DocLinkTxt").val();
        var description = $("#SupportInfoTxt").val();
        
        var cnt = $("#DocTypeList input:radio:checked").length;
       
        if (cnt == 0 )
        {  
            alert("Please select Document Type!");
            $("#DocTypeList").focus();
            return false;
        }       
        else if (link == "")
        {
            alert("Link is missing!");
            $("#DocLinkTxt").focus();
            return false;
        }       
        
        WaitToLoad();      

        var obj = '{"IssueID": "' + IssueID +
                '","DocID": "' + DocID +
                '","DocTypeID": "' + doctypeid +
                '","description": "' + description +
                '","link": "' + link +
                '","username": "' + username +                
                '","time": "' + t +
                '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveNewDoc",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Success") {
                    var link = "Forms/AddSupportDocsForm.aspx #ShowDocsDiv";
                    var divtarget = "Overview_DocsDiv";
                    ShowOverViewDivForm(IssueID, username, divtarget, link);
                    HideWaitToLoad();
                    CloseDiv();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                    //alert("Error");
                    ShowError();
                }
            },
            error: function (response) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                //alert(response);
                ShowError();
            }
        });      
       
    }
        

    function EditDoc(IssueID, DocID, username) {
        
        var DetailID = DocID;
        var link = "Forms/AddSupportDocsForm.aspx #AddSupportDocFormDiv";
        ShowForm(IssueID, username, link, DetailID);
    }
   
    function DeleteDoc(IssueID, DocID, username) {
        
        var t = new Date().getTime();

        if (confirm("You are about to delete this document. Are you sure?")) {

            WaitToLoad();

            var obj = '{"IssueID": "' + IssueID +
                        '","DocID": "' + DocID +                
                        '","username": "' + username +
                        '","time": "' + t +
                        '" }';

            $.ajax({
                type: "POST",
                url: "Process.asmx/DeleteDoc",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    //alert(data);
                    if (data == "Success") {
                        var link = "Forms/AddSupportDocsForm.aspx #ShowDocsDiv";
                        var divtarget = "Overview_DocsDiv";
                        ShowOverViewDivForm(IssueID, username, divtarget, link);
                        HideWaitToLoad();
                        CloseDiv();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {
                        //alert("Error");
                        ShowError();
                    }
                },
                error: function (response) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    //alert(response);
                    ShowError();
                }
            });           
        }
        else {
            CloseDiv();
        }
    }
    
    
    //*************************
    //Add New Action Item
    //*************************

    function AddActionItem(IssueID, username) {       

        var DetailID = 0;
        
        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();

        $("#result").load("Forms/ActionItemForm.aspx #AddActionItemFormDiv",
                        {
                            id: IssueID,
                            DetailID: DetailID,
                            username: username,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {
                        //alert("ss");
                        ShowContent();

                        CKEDITOR.disableAutoInline = true;

                        $('.ckeditor').each(function () {

                            CKEDITOR.inline(this.id, {

                            });

                        });
                        
                        $(function () {

                            $("#DueDateTxt").datepicker();
                            $("#DueDateTxt1").datepicker();                            
                            $(".DueDate").datepicker();
                        });

                        $("#ActionItemDropDown").change(
                           function () {

                               var ActID = this.value;
                               if (ActID == "19") {
                                   //alert(ActID);
                                   //If user select pull wafer as action item
                                   //Show them the pull wafer dialog
                                   PullWaferForm(IssueID, username);
                               }

                               else if(ActID == "1")
                               {
                                   
                                  // GetActionItemDetailsForm(ActID, IssueID, username);
                               }
                               
                           }
                       );
                    }
                }
           );
            
    }
        
    //**********************
    //Get Action Item Detail 
    //**********************

    function GetActionItemDetailsForm(ActID, IssueID, username)
    {
        
        var t = new Date().getTime();

        $("#editresult").load("Forms/ActionItemDetailForm.aspx #ActionItemDetailFormDiv",
                        {
                            id: IssueID,
                            ActionControlID: ActID,
                            username: username,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        alert(xhr + ","+req);
                        ShowError();
                    }
                    else {
                        //alert("ss");
                        ShowEditContent();
                    }
                }
           );
    }

    //**********************
    //Get Action Item Detail 
    //**********************

    function GetActionItemDetail() {
        var actionitems = [];
        $("#ActionDetailGrid input:checkbox").each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {

                var itemdetail = $(this).val();
                actionitems.push(itemdetail);
            }
        });

        if (actionitems.length > 0) {
            //alert(actionitems);

            var detail = "<ul>";
            $.each(actionitems, function (key, value) {

                detail += "<li>" + value + "</li>";

            });

            detail += "</ul>";

            // $("#ActionDescriptionTxt").val(detail);
            //CKEDITOR.instances["#ActionDescriptionTxt"].setData(detail);
            CKEDITOR.instances.ActionDescriptionTxt.setData(detail);
        }

        HideEditForm();
    }

    //*******************************
    //Save Action Item Function
    //*******************************

    function SaveActionItem(IssueID, username, Action, ActID) {

        var t = new Date().getTime();
        var actionid = $("#ActionItemDropDown option:selected").val();
        //var description = $("#ActionDescriptionTxt").val();
        var description = CKEDITOR.instances["ActionDescriptionTxt"].getData();
        var assignedto = $("#UsernameDropDown option:selected").text();
        var duedate = $("#DueDateTxt").val();
        var resource = $("#ResourceTxt").val();
        //alert(actionid + ", " + assignedto + ", " + description+", "+duedate +","+resource);

        if (actionid == 0) {
            alert("Please select action!");
            $("#ActionItemDropDown").focus();
            return false;
        }
        else if (assignedto == "None") {
            alert("Please assign to someone!");
            $("#UsernameDropDown").focus();
            return false;
        }
        else if (duedate == "") {
            alert("Due date is missing!");
            $("#DueDateTxt").focus();
            return false;
        }

        var link = "";
        if (Action == "Update") {
            link = "Process.asmx/UpdateActionItem";
        }
        else {
            link = "Process.asmx/SaveNewActionItem";
        }

        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +
                '","ActionID": "' + actionid +
                '","Description": "' + description +
                '","AssignedToUser": "' + assignedto +
                '","DueDateString": "' + duedate +
                '","ResourceUser": "' + resource +
                '","username": "' + username +
                '","ActID": "' + ActID +
                '","time": "' + t +
                '" }';
        //alert(obj);
        $.ajax({
            type: "POST",
            url: link,
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Success") {

                    var link = "Forms/ActionItemForm.aspx #ViewAllActionItemsDiv";
                    var divtarget = "Overview_ActionItemsDiv";
                    ShowOverViewDivForm(IssueID, username, divtarget, link);
                    GetActionItemForm(IssueID, username);
                    CloseDiv();
                    HideWaitToLoad();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                    //alert("Error");
                    ShowError();
                }
            },
            error: function (response) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                //alert(response);
                ShowError();
            }
        });
    }

    //*******************************
    //Edit Action Item Function
    //*******************************

    function EditActionItem(IssueID, ActionID, username) {        

        var DetailID = ActionID;
        var link = "Forms/ActionItemForm.aspx #AddActionItemFormDiv";
               
        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();

        $("#result").load(link,
                        {
                            id: IssueID,
                            DetailID: DetailID,
                            username: username,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {
                        //alert("ss");
                        ShowContent();

                        CKEDITOR.disableAutoInline = true;

                        $('.ckeditor').each(function () {

                            CKEDITOR.inline(this.id, {

                            });

                        });

                        $(function () {

                            $("#DueDateTxt").datepicker();
                            $("#DueDateTxt1").datepicker();
                            $(".DueDate").datepicker();
                        });

                        $("#ActionItemDropDown").change(
                           function () {

                               var ActID = this.value;
                               if (ActID == "19") {

                                   PullWaferForm(IssueID, username);
                               }

                               else if (ActID == "1") {

                                   GetActionItemDetailsForm(ActID, IssueID, username);
                               }

                           }
                       );
                    }
                }
           );
        
    }

    //*******************************
    //Edit Action Item Function
    //*******************************

    function ViewActionItem(IssueID, ActionID, username) {

        var DetailID = ActionID;
        var link = "Forms/ActionItemForm.aspx #ViewSingleActionItemDiv";
        ShowForm(IssueID, username, link, DetailID);
    }

    //*******************************
    //Complete Action Item Function
    //*******************************

    function CompleteActionItem(IssueID, ActionID, username) {
        var t = new Date().getTime();
        var DetailID = ActionID;
        //var link = "Forms/ActionItemForm.aspx #CompleteActionItemFormDiv";
        //ShowForm(IssueID, username, link, DetailID);
       
        $("#result").load("Forms/ActionItemForm.aspx #CompleteActionItemFormDiv",
                        {
                            id: IssueID,
                            DetailID: DetailID,
                            username: username,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {
                        
                        ShowContent();

                        CKEDITOR.disableAutoInline = true;
                        CKEDITOR.inline('ResultTxt');

                       
                        
                    }
                }
           );
          
    }


    //*******************************
    //Complete Action Item Function
    //*******************************

    function SaveConpleteActionItem(IssueID, username, ActID, Action) {
        var t = new Date().getTime();
        //var result = $("#ResultTxt").val();
        var result = CKEDITOR.instances["ResultTxt"].getData();
        var link = $("#LinkTxt").val();

        if (result == "") {
            alert("Result is required!");
            $("#ResultTxt").focus();
            return false;
        }

        if ($("input[name='AddResultToNoteCheckBox']").attr('checked')) {

            if (result != "") {
                SaveNote(result, IssueID, username);
            }
        }
       
        var obj = '{"IssueID": "' + IssueID +
                   '","Result": "' + result +
                   '","Link": "' + link +
                   '","username": "' + username +
                   '","ActID": "' + ActID +
                   '","Action": "' + Action +
                   '","time": "' + t +
                   '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/CompleteActionItem",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Success") {

                    var link = "Forms/ActionItemForm.aspx #ViewAllActionItemsDiv";
                    var divtarget = "Overview_ActionItemsDiv";
                    ShowOverViewDivForm(IssueID, username, divtarget, link);
                    GetActionItemForm(IssueID, username);
                    CloseDiv();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                    //alert("Error");
                    ShowError();
                }
            },
            error: function (response) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                //alert(response);
                ShowError();
            }
        });      

    }

    //*******************************
    //Delete Action Item Function
    //*******************************

    function DeleteActionItem(IssueID, ActionID, username) {
        //alert("Delete" + IssueID + ", " + ActionID);
        var t = new Date().getTime();

        if (confirm("You are about to delete this action item. Are you sure?")) {

            WaitToLoad();

            var obj = '{"IssueID": "' + IssueID +
                       '","username": "' + username +
                       '","ActID": "' + ActionID +
                       '","time": "' + t +
                       '" }';
            WaitToLoad();

            $.ajax({
                type: "POST",
                url: "Process.asmx/DeleteActionItem",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    //alert(data);
                    if (data == "Success") {

                        var link = "Forms/ActionItemForm.aspx #ViewAllActionItemsDiv";
                        var divtarget = "Overview_ActionItemsDiv";
                        ShowOverViewDivForm(IssueID, username, divtarget, link);
                        GetActionItemForm(IssueID, username);
                        CloseDiv();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {
                        //alert("Error");
                        ShowError();
                    }
                },
                error: function (response) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    //alert(response);
                    ShowError();
                }
            });           
        }
        else {
            CloseDiv();
        }
    }

    //***********
    //Add New FPS 
    //***********
    
    function AddFPSForm(IssueID, username) {

        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();
        $("#result").load("Forms/WaferPullRequest.aspx #AddFPSDiv",
                    {
                        id: IssueID,
                        username: username,                       
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        alert(req);
                        //ShowError();
                    }
                    else {

                        ShowContent();                        
                    }
                }
           );

    }

    function SaveFPS(IssueID, username) 
    {
        var t = new Date().getTime();
        var FPSTxt = $("#FPSTxt").val();

        if (FPSTxt == "") {
            alert("FPS is missing!")
            $("#FPSTxt").focus();
            return false;
        }

        WaitToLoad();

        $.ajax({
            //XML return
            url: 'Process.asmx/SaveFPS',
            method: 'post',
            data: {
                IssueID: IssueID,
                FPSTxt: FPSTxt,
                username: username,
                time: t
            },
            dataType: 'xml',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                ShowError();
            },
            success: function (data) {

                var jqueryXml = $(data);

                if (jqueryXml.text() == "Success") {

                    var link = "Forms/WaferPullRequest.aspx #loadwaferpullgrid";
                    var divtarget = "Overview_Waferpulldiv";
                    ShowOverViewDivForm(IssueID, username, divtarget, link);

                    HideWaitToLoad();
                    CloseDiv();
                }
                else {
                    HideWaitToLoad();
                    CloseDiv();
                    ShowError();
                }
            }
        });
    }

    //******************
    //Add FPS/Pull Wafer 
    //******************

    function PullWaferForm(IssueID, username) {

        WaitToLoad();
        var t = new Date().getTime();
        var link = "Forms/WaferPullRequest.aspx #UpdateWaferPullDiv";
        
        //ShowForm(IssueID, username, link, DetailID);
        $("#result").load(link,
                   {
                       id: IssueID,
                       username: username,                       
                       time: t
                   },
               function (xhr, textStatus, req) {
                   if (textStatus == "error") {
                       alert(req);
                       //ShowError();
                   }
                   else {

                       ShowContent();                      
                   }
               }
          );


    }

    
    function SaveWaferPullRequest(IssueID, username) {

        //alert(username);
        var t = new Date().getTime();

        var lotno = $("#PullWaferLotNoTxt").val();
        var waferno = $("#SelectWaferList option:selected").val();  
        if (waferno == "00") waferno = "";
        var fpsno = $("#FPSTxt1").val();
        var description = $("#PullWaferSupportInfoTxt").val();

        if (description == "") {
            alert("Description is missing!")
            $("#PullWaferSupportInfoTxt").focus();
            return false;
        }

        WaitToLoad();

        var obj = '{"IssueID": "' + IssueID +
                    '","lotid": "' + lotno +
                    '","waferid": "' + waferno +
                    '","fpsno": "' + fpsno +
                    '","description": "' + description +
                    '","username": "' + username +
                    '","time": "' + t +
                    '" }';   

        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveWaferPullRequest",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Success") {
                    var link = "Forms/WaferPullRequest.aspx #loadwaferpullgrid";
                    var divtarget = "Overview_Waferpulldiv";
                    ShowOverViewDivForm(IssueID, username, divtarget, link);
                    
                    HideWaitToLoad();
                    CloseDiv();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    HideWaitToLoad();
                    CloseDiv();
                    ShowError();
                }
            },
            error: function (response) {

                ShowError();
            }
        });

    }

    
    function UpdatePullWaferForm(IssueID, PullID, username) {

        var DetailID = PullID;
        var link = "Forms/WaferPullRequest.aspx #UpdateWaferPullDiv";
        ShowForm(IssueID, username, link, DetailID);

    }
    
    function DeletePullRequest(IssueID, PullID, username) {
        var t = new Date().getTime();

        if (confirm("You are about to delete this pull request. Are you sure?")) {

            WaitToLoad();
          
            var obj = '{"IssueID": "' + IssueID +
                    '","PullID": "' + PullID +                    
                    '","username": "' + username +
                    '","time": "' + t +
                    '" }';

            $.ajax({
                type: "POST",
                url: "Process.asmx/DeletePullRequest",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    if (data == "Success") {
                        var link = "Forms/WaferPullRequest.aspx #loadwaferpullgrid";
                        var divtarget = "Overview_Waferpulldiv";
                        ShowOverViewDivForm(IssueID, username, divtarget, link);

                        CloseDiv();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {

                        HideWaitToLoad();
                        CloseDiv();
                        ShowError();
                    }
                },
                error: function (response) {
                    HideWaitToLoad();
                    CloseDiv();
                    ShowError();
                }
            });          
        }
        else {
            CloseDiv();
        }
    }

    function SaveUpdateWaferPull(IssueID, PullID, username) {

        var t = new Date().getTime();
        var lotno = $("#PullWaferLotNoTxt").val();
        var waferno = $("#SelectWaferList option:selected").val();
        var fpsno = $("#FPSTxt1").val();
        var additionalinfo = $("#PullWaferSupportInfoTxt").val();               

        if (waferno == "00") waferno = "";

        WaitToLoad(); 
       
        var obj = '{"IssueID": "' + IssueID +
                    '","PullID": "' + PullID +                   
                    '","fps": "' + fpsno +
                    '","lotno": "' + lotno +
                    '","waferno": "' + waferno +
                    '","description": "' + additionalinfo +
                    '","username": "' + username +
                    '","time": "' + t +
                    '" }';      

        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveWaferPull",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Success") {
                    var link = "Forms/WaferPullRequest.aspx #loadwaferpullgrid";
                    var divtarget = "Overview_Waferpulldiv";
                    ShowOverViewDivForm(IssueID, username, divtarget, link);

                    HideWaitToLoad();
                    CloseDiv();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    HideWaitToLoad();
                    CloseDiv();
                    ShowError();
                }
            },
            error: function (response) {
                alert("Error");
                ShowError();
            }
        });      

    }
   
    function ShowForm(IssueID, username, link, DetailID) {

        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();
        $("#result").load(link,
                    {
                        id: IssueID,
                        username: username,
                        DetailID: DetailID,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        alert(req);
                        //ShowError();
                    }
                    else {

                        ShowContent();

                        $(function () {

                            $("#DueDateTxt").datepicker();
                            $("#DueDateTxt1").datepicker();
                            //$("#DueDateTxt").datepicker();
                            $(".DueDate").datepicker();
                        });
                    }
                }
           );
    }
   
    
    function ShowOverViewDivForm(IssueID, username, divtarget, link) {

        WaitToLoad(); 
        $("#" + divtarget).empty();

        var t = new Date().getTime();

        $("#"+divtarget).load(link,
                    {
                        id: IssueID,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }
  
  

    //**********************
    //Display Image Function
    //**********************
    /*
    function DisplayImage(IssueID, ImageType, ImageID, username) {
       
        //ClearContent();
        WaitToLoad();
        
        ImageType == "Main";
        var t = new Date().getTime();        
       
        $("#ImageresultDiv").empty();
        var imglink = "<img src='Images/loading1.gif'>";
        $("#ImageresultDiv").append(imglink);


        $.ajax({
            //XML return
            url: 'Process.asmx/ShowQuickImage',
            method: 'post',
            data: {
                IssueID: IssueID,
                time: t
            },
            dataType: 'xml',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                ShowError();
            },
            success: function (data) {


                $("#ImageresultDiv").empty();

                var jqueryXml = $(data);
                var ImgLink = jqueryXml.text();
                //alert(jqueryXml.text());

                
                var regex = /\\/g;
                var newUrl = ImgLink.replace(regex, "\\\\");

                var newImg = new Image();

                newImg.onload = function () {

                    var height = newImg.height;
                    var width = newImg.width;                   
                    
                    HideWaitToLoad();
                    ShowImage(height, width, newUrl);   
                }

                newImg.src = ImgLink; // this must be done AFTER setting onload
               
            }
        });

    }
    */

    function DisplayImage(IssueID, ImageGUID) {

        //alert(IssueID +", "+ ImageGUID);
        WaitToLoad();
        $("#AllImagesResults").empty();
        var imglink = "<span style='text-align: center; align-content:center'><img src='Images/ajax-loader2.gif'></span>";
        $("#AllImagesResults").append(imglink);

        var t = new Date().getTime();

        var link = "DisplayForms/ShowImage.aspx #SingleImageDiv";

        $("#AllImagesResults").load(link,
                    {
                        IssueID: IssueID,
                        ImageGUID: ImageGUID,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    //alert(xhr + textStatus + req);
                    if (textStatus == "error") {
                        //
                        ShowError();                        
                    }
                    else {                       
                       /*
                        var windowswidth = $(document).width();
                        var windowsheight = $(document).height();
                        var marginleft = -windowswidth / 2;
                        var margintop = -windowsheight / 2;

                        $("#page-cover1").css({ "display": "block", opacity: 0.7, "width": $(document).width(), "height": $(document).height() });
                        $("#page-cover1").show();
                        $("#ImageresultDiv").css({ 'width': '1200px', 'margin': '0 auto' });
                        $("#DivImageForm").css({ 'width': '1200px', 'height': '820px', 'background-color': 'transparent', 'border': 'none' });
                        $("#DivImageForm").css({ 'top': '50%', 'left': '50%', 'margin-left': '-600px', 'margin-top': '-410px', 'overflow-x': 'hidden', 'overflow-y': 'hidden'});
                        $("#DivImageForm").show();
                        */
                        var lw = $("#AllImagesContentDiv").width();
                        var lh = $("#AllImagesContentDiv").height();

                        HideWaitToLoad();
                        ShowImageContent(lw, lh);
                    }
                }
           ).hide().fadeIn(500);
    }
    
    function DisplayMultipleImages(IssueID, ImageType, ImageGUID) {

        //alert("Called");
        WaitToLoad();
        $("#AllImagesResults").empty();
        var imglink = "<span style='text-align: center; align-content:center'><img src='Images/ajax-loader2.gif'></span>";
        $("#AllImagesResults").append(imglink);

        var t = new Date().getTime();

        var link = "DisplayForms/ShowMultipleImages.aspx #MultipleImagesDiv";

        $("#AllImagesResults").load(link,
                    {
                        IssueID: IssueID,
                        ImageGUID: ImageGUID,
                        ImageType: ImageType,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    //alert(xhr + textStatus + req);
                    if (textStatus == "error") {
                        //
                        ShowError();
                    }
                    else {
                        
                        //$("#ImageresultDiv").css({ 'width': '1200px', 'margin': '0 auto' });
                        //$("#DivImageForm").css({ 'width': '1200px', 'height': '820px', 'background-color': 'transparent', 'border': 'none' });
                        //$("#DivImageForm").css({ 'top': '50%', 'left': '50%', 'margin-left': '-600px', 'margin-top': '-410px', 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
                        //$("#DivImageForm").show();

                        //$("#AllOtherForms").css({ 'margin-top': ((-lh / 2)) + 'px', 'margin-left': (-lw / 2) + 'px' });
                       
                        //$("#AllOtherForms").fadeIn('fast');

                        var lw = $("#AllImagesContentDiv").width();
                        var lh = $("#AllImagesContentDiv").height();
                        
                        HideWaitToLoad();
                        ShowImageContent(lw, lh);

                       
                    }
                }
           ).hide().fadeIn(500);
    }

    function GetSingleExtraImage(ImageGUID)
    {
        //alert("Called");
        WaitToLoad();
        $("#SingleImageDiv").empty();
        var imglink = "<span style='text-align: center; align-content:center'><img src='Images/ajax-loader2.gif'></span>";
        $("#SingleImageDiv").append(imglink);

        var t = new Date().getTime();
        var ImageType = "SingleImage";
        var link = "DisplayForms/ShowImage.aspx #SingleExtraImageDiv";

        $("#SingleImageDiv").load(link,
                    {                        
                        ImageGUID: ImageGUID,                      
                        time: t
                    },
                function (xhr, textStatus, req) {
                    //alert(xhr + textStatus + req);
                    if (textStatus == "error") {
                        //
                        ShowError();
                    }
                    else {

                        HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(500);
    }

    function ShowImageContent(lw, lh)
    {
        //alert(lh + ", " + lw);
        $("#page-cover1").css({ "display": "block", opacity: 0.7, "width": $(document).width(), "height": $(document).height() });
        $("#page-cover1").show();
        $("#AllImagesContentDiv").css({ 'margin-top': ((-lh / 2)) + 'px', 'margin-left': (-lw / 2) + 'px' });
        
        $("#AllImagesContentDiv").fadeIn('fast');
    }

    function HideImageContent()
    {
        $("#page-cover").hide();
        $("#page-cover1").hide();
        $("#AllImagesContentDiv").hide();
    }

    function DisplayLogImage(ImgLink) {
        
     
        WaitToLoad();

        //var regex = /\\/g;
        //var newUrl = ImgLink.replace(regex, "\\\\");
        
        var newImg = new Image();

        newImg.onload = function () {

            var height = newImg.height;
            var width = newImg.width;

            HideWaitToLoad();
            ShowImage(height, width, ImgLink);   
        }

        newImg.src = ImgLink; // this must be done AFTER setting onload
        
    }

    function CloseImage()
    {
        $("#DivImageForm").hide();
        $("#page-cover1").hide();       
        $("#AllImagesContentDiv").hide();

    }

    function ShowImage(imageheight, imagewidth, ImgUrl) {

        //alert(ImgUrl);
        var windowswidth = $(window).width();
        var windowsheight = $(window).height();

        $("#page-cover1").css({ "display": "block", opacity: 0.7, "width": $(document).width(), "height": $(document).height() });
        $("#page-cover1").show();
               
        var maxWidth = windowswidth * 0.9;
        var maxHeight = windowsheight * 0.9;
       
        var ratio = Math.min(maxWidth / imagewidth, maxHeight / imageheight);

        imagewidth = imagewidth * ratio;
        imageheight = imageheight * ratio;              

        var marginleft = -imagewidth / 2;
        var margintop = -imageheight / 2;        
        
        var imagelink = "<img src='" + ImgUrl + "' style='height: " + imageheight + "px; '>";
        $("#DivImageForm").empty();
        $("#DivImageForm").append(imagelink);
        
        $("#DivImageForm").css({ 'width': +imagewidth + 'px', 'height': +imageheight + 'px' });
        $("#DivImageForm").css({ 'top': '50%', 'left': '50%', 'margin-left': +marginleft + 'px', 'margin-top': + margintop + 'px', 'overflow-x': 'auto', 'overflow-y': 'hidden' });
        $("#DivImageForm").show();
        
    }

    
    function GetImageLink(ImageID) {
        
        $('.DisplayThumbnailImageDiv').empty();
        var imglink = "<img src='Images/LoadingImg.png' style='width:900px;'>";        
        $('.DisplayThumbnailImageDiv').append(imglink);
        
        $('#WaitToLoadImage').show();

        var widthofpage = $(window).width();
        var heightofpage = $(window).height();
        var widthofdivimage = ($(window).width() * 0.9) - 300;
        var heightofdivimage = $(window).height() * 0.9;

        $.ajax({
            //XML return
            url: 'Process.asmx/GetImageLink',
            method: 'post',
            data: {
                ImageID: ImageID
            },
            dataType: 'xml',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                ShowError();
            },
            success: function (data) {
                               
                $('#WaitToLoadImage').hide();

                $('.DisplayThumbnailImageDiv').empty();

                var jqueryXml = $(data);

                var url = jqueryXml.find('ImageLink').text();

                var imglink = "<img src='" + url + "' style='width:900px;'>";
                $('.DisplayThumbnailImageDiv').append(imglink); 
            }
        });
    }
    

    //*********************
    //Show YEPN Calculation
    //*********************

    function ShowYEPNCalculationPage(IssueID, username, ClientID) {

        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();
      

        $("#result").load("DisplayForms/DisplayYEPNCalculation.aspx",
                        {
                            id: IssueID,
                            username: username,
                            ClientID: ClientID,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {

                        ShowContent();
                    }
                }
          );

    }   

    //************
    //Delete Issue
    //************

    function DeleteIssue(IssueID, family, username) {

        var t = new Date().getTime();

        if (confirm("You are about to delete this Issue. This action can not be undone. Are you sure?")) {
            //alert(IssueID);
            
           
            WaitToLoad();

            var obj = '{"IssueID": "' + IssueID +               
                        '","username": "' + username +
                        '","time": "' + t +
                        '" }';         

            $.ajax({
                type: "POST",
                url: "Process.asmx/DeleteIssue",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    if (data == "Success") {
                        alert("Issue Deleted!");
                        window.location.href = "queue.aspx?family=" + family + "&state=0";
                        CloseDiv();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {

                        ShowError();
                    }
                },
                error: function (response) {
                    HideWaitToLoad();
                    CloseDiv();
                    ShowError();
                }
            });
           
        }
        else {
            CloseDiv();
        }
    }

    
    //****************************
    //Get EFA/PFA observation form
    //****************************

    function GetObservationForm(IssueID, Type, username, ClientID) {
        
        //GetIssueNotes(IssueID, username);

        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();
        
        $("#result").load("Forms/AnalysisSummaryForm.aspx",

                        {
                            id: IssueID,
                            Type: Type,
                            username: username,
                            ClientID: ClientID,
                            time: t

                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        alert(xhr + "," + req);
                        //ShowError();
                    }
                    else {
                       
                        CKEDITOR.disableAutoInline = true;
                        CKEDITOR.inline('ObservationTxt');

                        ShowContent();
                    }                        
                }
           );

    }

    //*********************
    //Save New Observation
    //*********************

    function SaveNewObservation(IssueID, Type, username, ClientID) {
        
        WaitToLoad();
        var t = new Date().getTime();

        var observation = CKEDITOR.instances["ObservationTxt"].getData();
        if (observation != "") {

            $.ajax({
                //XML return
                url: 'Process.asmx/SaveNewAnalysisObservation',
                method: 'post',
                data: {
                    IssueID: IssueID,
                    AType: Type,
                    Observation: observation,
                    username: username,
                    time: t
                },
                dataType: 'xml',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    ShowError();
                },
                success: function (data) {

                    var jqueryXml = $(data);
                    //alert(jqueryXml.text());
                    if (jqueryXml.text() == "Success") {
                        RefreshObservationDIV(IssueID, Type);
                        CloseDiv();
                    }
                    else {
                        ShowError();
                    }
                }
            });
        }
        else {
            CloseDiv();
        }
    }

    function UpdateObservation(IssueID, AnalysisID, Type, username, ClientID) {
        
        WaitToLoad();
        var t = new Date().getTime();

        var observation = CKEDITOR.instances["ObservationTxt"].getData();
        if (observation != "") {

            $.ajax({
                //XML return
                url: 'Process.asmx/UpdateAnalysisObservation',
                method: 'post',
                data: {
                    IssueID: IssueID,
                    AnalysisID: AnalysisID,
                    AType: Type,
                    Observation: observation,
                    username: username,
                    time: t
                },
                dataType: 'xml',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    ShowError();
                },
                success: function (data) {

                    var jqueryXml = $(data);
                    //alert(jqueryXml.text());
                    if (jqueryXml.text() == "Success") {
                        RefreshObservationDIV(IssueID, Type);
                        CloseDiv();
                    }
                    else {
                        ShowError();
                    }
                }
            });
        }
        else {
            CloseDiv();
        }
    }
    
    function RefreshObservationDIV(IssueID, Type) {

        //GetIssueNotes(IssueID, username);
        var divtarget = "";
        if (Type == 'EFA')
        {
            divtarget = "EFAObservationDIV";
        }
        else
        {
            divtarget = "DataObservationDIV";
        }

        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();
        $("#" + divtarget).empty();

        $("#" + divtarget).load("DisplayForms/DisplayAnalysisForm.aspx",

                        {
                            id: IssueID,
                            Type: Type,                                                      
                            time: t

                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        alert(xhr + "," + req);
                        //ShowError();
                    }
                    else {

                       
                    }
                }
           );

    }


///Preferences

    //*********************
    //Get Preferences Form
    //*********************

    function GetPreferences(username) {
        //GetIssueNotes(IssueID, username);
        ClearContent();
        WaitToLoad();

        var t = new Date().getTime();        

        $("#result").load("Preferences.aspx",
                        {                           
                            username: username,                           
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {                        

                        ShowContent();

                    }
                }
           );

    }
    
    //*********************
    //Save Preferences
    //*********************

    function SavePreferences(Request, username) {
        WaitToLoad();
        var t = new Date().getTime();

        var homeview = [];
        var passdownview = [];

        var $homeviewcheckbox = $("[id*=DisplayHomePageCheckboxes]");
        $homeviewcheckbox.each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {

                var select = $(this).closest("td").find("label").html();
                
                homeview.push(select);

            }
        });

        var $passdownviewcheckbox = $("[id*=DisplayPassdownPageCheckboxes]");
        $passdownviewcheckbox.each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {

                var select = $(this).closest("td").find("label").html();

                passdownview.push(select);

            }
        });       
      

        var obj = '{"Request": "' + Request +
                '","homeview": "' + homeview.toString() +
                '","passdownview": "' + passdownview.toString() +              
                '","username": "' + username +
                '","time": "' + t +
                '" }';
       
        $.ajax({
            type: "POST",
            url: "Process.asmx/SavePreferences",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                if (data == "Success") {
                    CloseDiv();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {

                    ShowError();
                }
            },
            error: function (response) {

                ShowError();
            }
        });
          
           
    }

    //*********************
    //Get Log Form
    //*********************

    function GetLogsForm(IssueID, username) {
        //alert(IssueID);        
        var t = new Date().getTime();

        ClearContent();
        WaitToLoad();

        $("#result").load("DisplayForms/DisplayLog.aspx",
                {
                    id: IssueID,
                    username: username,
                    time: t
                },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert("Error");
                        ShowError();
                    }
                    else {

                        ShowContent();

                    }
                }
           );
    }

    //*********************
    //Get History Form
    //*********************

    function GetHistoryForm(IssueID, username) {
        //alert(IssueID);        
        var t = new Date().getTime();

        ClearContent();
        WaitToLoad();

        $("#result").load("DisplayForms/DisplayHistory.aspx",
                {
                    id: IssueID,
                    username: username,
                    time: t
                },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert("Error");
                        ShowError();
                    }
                    else {

                        ShowContent();

                    }
                }
           );
    }


    //******************************
    //Add New Issue Description Date
    //******************************

    function AddNewIssueDate(IssueID, IssueDateID, username) {
        //alert(IssueID);        
        var t = new Date().getTime();

        ClearContent();
        WaitToLoad();

        $("#result").load("Forms/AddDateForm.aspx #AddEditDateForm",
                {
                    id: IssueID,
                    IssueDateID: IssueDateID,
                    username: username,
                    time: t
                },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert("Error");
                        ShowError();
                    }
                    else {

                        ShowContent();
                        $(function () {
                            $("#StartDateTxt").datepicker();
                            $("#EndDateTxt").datepicker();
                        });
                    }
                }
           );
    }

    function SaveIssueDate(IssueID, IssueDateID, username, action) {
        WaitToLoad();
        var t = new Date().getTime();

        var StartDate = $("#StartDateTxt").val();
        var EndDate = $("#EndDateTxt").val();
        var Note = $("#NoteTxt").val();

        //alert(passdownview);       

        $.ajax({
            //XML return
            url: 'Process.asmx/SaveIssueDate',
            method: 'post',
            data: {
                IssueID: IssueID,
                IssueDateID: IssueDateID,
                StartDate: StartDate,
                EndDate: EndDate,
                Note: Note,
                username: username,
                action: action,
                time: t
            },
            dataType: 'xml',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                ShowError();
            },
            success: function (data) {

                var jqueryXml = $(data);
                //alert(jqueryXml.text());
                if (jqueryXml.text() == "Success") {
                    
                    GetIssueDates(IssueID, username);
                    CloseDiv();
                }
                else {
                    
                    GetIssueDates(IssueID, username);
                }
            }
        });

    }

    function DeleteIssueDate(IssueID, IssueDateID, username) {

        if (confirm('You are about to delete this date. Are you sure?')) {

            $.ajax({
                //XML return
                url: 'Process.asmx/DeleteIssueDate',
                method: 'post',
                data: {                    
                    IssueID: IssueID,
                    IssueDateID: IssueDateID,
                    username: username
                },
                dataType: 'xml',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    ShowError();
                },
                success: function (data) {

                    var jqueryXml = $(data);
                    //alert(jqueryXml.text());
                    if (jqueryXml.text() == "Success") {

                        GetIssueDates(IssueID, username);
                        CloseDiv();
                    }
                    else {
                        ShowError();
                    }
                }
            });
        }
        else {
            //Do nothing
            CloseDiv();
        }
    }

    function GetIssueDates(IssueID, username) {
        
        WaitToLoad();
        
        $("#Overview_IssueDatesDiv").empty();

        var t = new Date().getTime();

        $("#Overview_IssueDatesDiv").load("Forms/AddDateForm.aspx #DisplayIssueDatesDiv",
                    {
                        id: IssueID,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();
                    }
                    else {
                        //alert(xhr + textStatus + req);
                        HideWaitToLoad();
                        //alert("Trigger");
                    }
                }
           ).hide().fadeIn(1000);
    }


    //********************************
    //Add Issue Description Where/When
    //********************************

    function AddNewWhereData(IssueID, WhereID, Type, username) {
        //alert(IssueID +", "+WhereID +", "+Type+", "+username);        
        var t = new Date().getTime();

        ClearContent();
        WaitToLoad();

        var link = "";
        if (Type == "StepTool")
        {
            link = "Forms/AddStepTool.aspx #AddEditStepToolForm";
        }
        else
        {
            link = "Forms/AddStepTool.aspx #AddEditBracketForm";
        }
        $("#result").load(link,
                {
                    id: IssueID,
                    WhereID: WhereID,
                    Type: Type,
                    username: username,
                    time: t
                },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert("Error");
                        ShowError();
                    }
                    else {

                        ShowContent();
                        $(function () {
                            $("#StartDateTxt").datepicker();
                            $("#EndDateTxt").datepicker();
                        });
                    }
                }
           );
    }

    function SaveWhereData(IssueID, WhereID, username , action, WhereType) {       

        var t = new Date().getTime();

        var StartStep = "";
        var EndStep = "";
        var Tool = "";
        var DataType = "";
        var DataTypeID = 0;
        var Note = "";
        var StartDate = "";
        var EndDate = "";
        var RefLink = "";

        if (WhereType == "StepTool") {

            StartStep = $("#StepTxt").val();
            RefLink = $("#RefLinkTxt").val();
            EndStep = "";
            Tool = $("#ToolTxt").val();
            DataType = $("#DataTypeList input:checked").parent().find('label').text();
            DataTypeID = $("#DataTypeList input:checked").val();

            StartDate = $("#StartDateTxt").val();
            EndDate = $("#EndDateTxt").val();

            //alert(DataTypeID);
            Note = $("#NoteTxt").val();

            if (StartStep == "" && Tool == "")
            {
                alert("Both Step and Tool data is missing, at least one must contain value!");
                $("#StepTxt").focus();
                return false;
            }

            if (!$("input[name='DataTypeList']:checked").val()) {
                alert("Type must be selected!");
                $("#DataTypeList").focus();
                return false;
            }
            else {
                //alert('');
            }

            
        }
        else
        {
            StartStep = $("#StartStepTxt").val();
            EndStep = $("#EndStepTxt").val();
            Tool = "";            
            Note = $("#NoteTxt1").val();

            if(StartStep == "")
            {
                alert("Start Step is missing!");
                $("#StartStepTxt").focus();
                return false;
            }

            if(EndStep == "")
            {
                alert("End Step is missing!");
                $("#EndStepTxt").focus();
                return false;
            }
        }

        WaitToLoad();
        //alert(IssueID + ", " + action + ", " + WhereType);     
        
        var obj = '{"IssueID": "' + IssueID +
                '","WhereID": "' + WhereID +
                '","StartStep": "' + StartStep +
                '","EndStep": "' + EndStep +
                '","Tool": "' + Tool +
                '","WhereType": "' + WhereType +
                '","DataType": "' + DataType +
                '","DataTypeID": "' + DataTypeID +
                '","RefLink": "' + RefLink +
                '","Note": "' + Note +
                '","username": "' + username +
                '","action": "' + action +
                '","StartDate": "' + StartDate +
                '","EndDate": "' + EndDate +
                '","time": "' + t +
                '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/SaveWhereData",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Success") {
                    GetIssueWhereData(IssueID, username);
                    CloseDiv();                    
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                    //alert("Error");
                    ShowError();
                }
            },
            error: function (response) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                //alert(response);
                ShowError();
            }
        });          
        
    }

    function GetIssueWhereData(IssueID, username) {

        WaitToLoad();
        $("#Overview_IssueWhereDataDiv").empty();

        var t = new Date().getTime();

        $("#Overview_IssueWhereDataDiv").load("Forms/AddStepTool.aspx #DisplayIssueWhereDiv",
                    {
                        id: IssueID,
                        username: username,
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();
                    }
                    else {
                        //alert(xhr + textStatus + req);
                        HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    function DeleteWhereData(IssueID, WhereID, username) {

        if (confirm('You are about to delete this data. Are you sure?')) {

            var t = new Date().getTime();

            var obj = '{"IssueID": "' + IssueID +
                       '","WhereID": "' + WhereID +
                       '","username": "' + username +
                       '","time": "' + t +
                       '" }';

            WaitToLoad();
            //alert(obj);
            $.ajax({
                type: "POST",
                url: "Process.asmx/DeleteWhereData",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    //alert(data);
                    if (data == "Success") {
                        GetIssueWhereData(IssueID, username);
                        CloseDiv();                    
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {
                        //alert("Error");
                        ShowError();
                    }
                },
                error: function (response) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    //alert(response);
                    ShowError();
                }
            });            
        }
        else {
            //Do nothing
            CloseDiv();
        }
    }


    //*********************
    //Export To Excel
    //*********************

    function ExportToExcel(IssueID, username) {

        WaitToLoad();
        //var popup = window.open("about:blank", "myPopup");

        var t = new Date().getTime();
        var obj = '{"IssueID": "' + IssueID +                
                '","username": "' + username +
                '","time": "' + t +
                '" }';       

        $.ajax({
            type: "POST",
            url: "Process.asmx/ExportToExcel",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Error") {
                    ShowError();
                }
                else if (data == "Username") {
                    alert("Unable to get logged in username! Please refresh the page and try again!");
                }
                else {
                    //alert(data);
                    
                    //var path = "\\\\webdata.mava.micron.com\\mtvapps\\mfg\\fab6\\YE\\yeissues\\Logs\\5747_hduong_Rev_28_report.csv";
                    var path = "\\\\webdata\\webdata\\mtvapps\\mfg\\fab6\\YE\\yeissues\\Logs\\";
                    window.open(path + data);

                    HideWaitToLoad();
                    CloseDiv();
                }
            },
            error: function (response) {
                //alert("error");
                ShowError();
            }
        });       
    }

    //************
    //Archive Lots
    //************

    function ArchiveLots(IssueID, username) {

        var lotids = [];
        var t = new Date().getTime();

        $("#GridView1 input:checkbox").each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {
                var lotid = $(this).val();
                //lotid = lotid.trim();
                lotids.push(lotid);
            }
        });
        //alert(lotids);
        if (lotids.length == 0) {
            alert("Please select at least 1 lot to archive!");
            return false;
        }
        else
        {
            var IsArchive = "Yes";
            AddArchiveLotComment(IssueID, lotids.toString(), IsArchive, username);            
        }        
    }  

    function AddArchiveLotComment(IssueID, lotids, IsArchive, username) {
        
        ClearContent();
        WaitToLoad();

        //alert("called");
        var t = new Date().getTime();

        $("#result").load("Forms/AddEditLotComment.aspx",
                        {
                            id: IssueID,
                            lotid: lotids,
                            IsArchive: IsArchive,
                            username: username,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {

                        ShowContent();

                        //Count lot comment chars
                        //Max char is set at 255
                        var input = $("#ThisLotCommentTxt");
                        var count = $("#TotalCharTxt");
                        var limit = 255;

                        input.keyup(function () {
                            var n = this.value.replace(/{.*?}/g, '').length;
                            if (n > limit) {
                                this.value = this.value.substr(0, this.value.length + limit - n);
                                n = 255;
                            }
                            count.val(n);
                        }).triggerHandler("keyup");

                    }
                }
           );
    }

    function SaveArchiveLot(IssueID, username)
    {
        var lotids = [];
        var t = new Date().getTime();

        $("#GridView1 input:checkbox").each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {

                var lotid = "'" + $(this).val() + "'";                
                lotids.push(lotid);
            }
        });
        
        if (lotids.length == 0) {
            alert("Please select at least 1 lot to archive!");
            return false;
        }
        else {
            
            var lotcomment = $("#ThisLotCommentTxt").val();
            if (lotcomment == "") {
                alert("Please add archive reason!");
                $("#ThisLotCommentTxt").focus();
                return false;
            }
            else {
                var t = new Date().getTime();

                WaitToLoad();             

                var obj = '{"IssueID": "' + IssueID +
                            '","lotids": "' + lotids.toString() +
                            '","lotcomment": "' + lotcomment +               
                            '","username": "' + username +
                            '","time": "' + t +
                            '" }';               

                $.ajax({
                    type: "POST",
                    url: "Process.asmx/ArchiveLots",
                    data: obj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        var data = response.d;
                        if (data == "Error") {
                            ShowError();
                        }
                        else if (data == "Username") {
                            alert("Unable to get logged in username! Please refresh the page and try again!");
                        }
                        else {

                            GetLotListForm(IssueID, username);
                            HideWaitToLoad();
                            CloseDiv();
                        }
                    },
                    error: function (response) {

                        ShowError();
                    }
                });                
                
            }
        }
               
    }

    //Get User Access Form
    function GetUserAccessForm(UserID, Type, username) {

        ClearContent();
        WaitToLoad();

        //alert("called");
        var t = new Date().getTime();

        $("#result").load("Forms/UserAccessForm.aspx #AddEditUserForm",
                        {
                            UserID: UserID,
                            Type: Type,                            
                            username: username,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {

                        ShowContent();
                        
                        //Check if username/MTGroup valid as user type
                        var input = $("#NameTxt");                        
                        var UserTypeInput = $("#UserTypeDropdown");

                        input.keyup(function () {                           

                            CheckValue();

                        }).triggerHandler("keyup");

                        UserTypeInput.change(function () {

                            CheckValue();

                        });

                    }
                }
           );
    }

    

    function CheckValue()
    {
        var t = new Date().getTime();
        var checkimg = "<img src='Images/checkicon.png' style='width:20px;'>";
        var crossimg = "<img src='Images/crossicon.png' style='width:20px;'>";
        var waitingimg = "<img src='Images/ajax-loader.gif'>";
        $("#CheckValidDiv").empty();

        var UserType = $("#UserTypeDropdown option:selected").val();
        var value = $("#NameTxt").val();

        
        var n = $("#NameTxt").val().replace(/{.*?}/g, '').length;
        if (n > 3) {

            $("#CheckValidDiv").empty();
            var waitingimg = "<img src='Images/ajax-loader.gif'>";
            $("#CheckValidDiv").append(waitingimg);

            if (value != "") {
                //alert(value);

                var obj = '{"UserType": "' + UserType +
                            '","Value": "' + value +               
                            '","time": "' + t +
                            '" }';
                

                $.ajax({
                    type: "POST",
                    url: "Process.asmx/CheckValidUser",
                    data: obj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        var data = response.d;
                        if (data == "Error") {
                            ShowError();
                        }
                        else if (data == "Username") {
                            alert("Unable to get logged in username! Please refresh the page and try again!");
                        }
                        else {

                            if (data == "Valid") {
                                $("#CheckValidDiv").empty();
                                $("#CheckValidDiv").append(checkimg);
                                $("#SaveBtn").prop("disabled", false);
                            }
                            else {
                                $("#SaveBtn").prop("disabled", true);
                                $("#CheckValidDiv").empty();
                                $("#CheckValidDiv").append(crossimg);
                            }
                        }
                    },
                    error: function (response) {

                        ShowError();
                    }
                });               
            }
            else {
                $("#SaveBtn").prop("disabled", true);
                $("#CheckValidDiv").empty();
            }
        }
        else {
            $("#SaveBtn").prop("disabled", true);
            $("#CheckValidDiv").empty();
        }       
    }

    function SaveUserAccessForm(UserID, Type, username) 
    {
        var t = new Date().getTime();
        var UserType = $("#UserTypeDropdown option:selected").val();
        var DRAMaccess = $("#DRAMAccessDropdown option:selected").val();
        var NANDaccess = $("#NANDAccessDropdown option:selected").val();
        var NORaccess = $("#NORAccessDropdown option:selected").val();
        var NameTxt = $("#NameTxt").val();

        if (NameTxt == "") {
            alert("Name is required!");
            $("#NameTxt").focus();
            return false;
        }

            //alert(UserID + ", " + Type + "," + username + "," + UserType + "," + DRAMaccess + "," + NANDaccess + "," + NORaccess+","+NameTxt);
        else {

            WaitToLoad();
            if (Type == "SaveEdit") {
            }
            else {
                UserID = 0;
            }

            var obj = '{"UserID": "' + UserID +
                        '","User": "' + NameTxt +
                        '","UserType": "' + UserType +
                        '","DRAMaccess": "' + DRAMaccess +
                        '","NANDaccess": "' + NANDaccess +
                        '","NORaccess": "' + NORaccess +
                        '","Type": "' + Type +
                        '","username": "' + username +
                        '","time": "' + t +
                        '" }';

            $.ajax({
                type: "POST",
                url: "Process.asmx/UpdateAccessUser",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    if (data == "Error") {
                        ShowError();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {

                        HideWaitToLoad();
                        CloseDiv();
                        GetAuthorizationForm();
                    }
                },
                error: function (response) {

                    ShowError();
                }
            });            
        }
    }

    function DeleteUserAccessForm(UserID, username)
    {
        if (confirm('You are about to delete this user. Are you sure?')) {
            var t = new Date().getTime();

            var obj = '{"UserID": "' + UserID +               
                        '","username": "' + username +
                        '","time": "' + t +
                        '" }';           

            $.ajax({
                type: "POST",
                url: "Process.asmx/DeleteAccessUser",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    if (data == "Success") {
                        alert("User deleted!");
                        CloseDiv();
                        GetAuthorizationForm();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {

                        ShowError();
                    }
                },
                error: function (response) {

                    ShowError();
                }
            });
            
        }
        else {
            //Do nothing
            CloseDiv();
        }
    }

    function GetSiteAccessForm(SiteID, Type, username) 
    {
        ClearContent();
        WaitToLoad();

        //alert(SiteID +", "+Type +", "+username);
        var t = new Date().getTime();

        $("#result").load("Forms/UserAccessForm.aspx #AddEditSitesForm",
                        {
                            SiteID: SiteID,
                            Type: Type,
                            username: username,
                            time: t
                        },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + ","+req);
                        ShowError();
                    }
                    else {

                        ShowContent();

                    }
                }
           );
    }

    function SaveSiteAccessForm(SiteID, Type, username) {

        var t = new Date().getTime();
       
        var DRAMaccess = $("#DRAMSiteAccessDropdown option:selected").val();
        var NANDaccess = $("#NANDSiteAccessDropdown option:selected").val();
        var NORaccess = $("#NORSiteAccessDropdown option:selected").val();
        var SiteNo = $("#SiteNoTxt").val();
        var SiteLocation = $("#SiteLocationTxt").val();
        var FabNo = $("#FABTxt").val();

        if (SiteNo == "") {
            alert("Site# is required!");
            $("#SiteNoTxt").focus();
            return false;
        }
        else if(SiteLocation == "")
        {
            alert("Site location is required!");
            $("#SiteLocationTxt").focus();
            return false;
        }
        else if(FabNo == "")
        {
            alert("FAB is required!");
            $("#FABTxt").focus();
            return false;
        }

            
        else {

            WaitToLoad();

            if (Type == "SaveEdit") {
               
            }
            else {               
                SiteID = 0;
            }
            //alert(UserID + ", " + Type + "," + username + "," + UserType + "," + DRAMaccess + "," + NANDaccess + "," + NORaccess + "," + NameTxt);
            var obj = '{"SiteID": "' + SiteID +
                        '","SiteNo": "' + SiteNo +
                        '","SiteLocation": "' + SiteLocation +
                        '","FabNo": "' + FabNo +
                        '","DRAMaccess": "' + DRAMaccess +
                        '","NANDaccess": "' + NANDaccess +
                        '","NORaccess": "' + NORaccess +
                        '","Type": "' + Type +
                        '","username": "' + username +
                        '","t": "' + t +
                        '" }'; 
           
            //alert(obj);
            $.ajax({
                type: "POST",
                url: "Process.asmx/UpdateSiteAccess",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    if (data == "Error") {
                        ShowError();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {

                        HideWaitToLoad();
                        CloseDiv();
                        GetAuthorizationForm();
                    }
                },
                error: function (response) {

                    ShowError();
                }
            });                      

        }
    }

    function DeleteSiteAccessForm(SiteID, username) {

        if (confirm('You are about to delete this site. Are you sure?')) {

            var t = new Date().getTime();

            var obj = '{"SiteID": "' + SiteID +               
                        '","username": "' + username +
                        '","time": "' + t +
                        '" }';
           
            $.ajax({
                type: "POST",
                url: "Process.asmx/DeleteSiteAccess",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    if (data == "Success") {
                        alert("Site deleted!");
                        CloseDiv();
                        GetAuthorizationForm();
                    }
                    else if (data == "Username") {
                        alert("Unable to get logged in username! Please refresh the page and try again!");
                    }
                    else {

                        ShowError();
                    }
                },
                error: function (response) {

                    ShowError();
                }
            });
           
        }
        else {
            //Do nothing
            CloseDiv();
        }
    }

    function GetAuthorizationForm()
    {   
        ClearContent();       

        var t = new Date().getTime();

        $("#DisplayDiv").empty();

        var imglink = "<span style='text-align: center; align-content:center'><img src='Images/ajax-loader2.gif'><br><br></span>";
        $("#DisplayDiv").append(imglink);

        $("#DisplayDiv").load("DisplayForms/DisplayAuthorization.aspx",
                    {                        
                        time: t
                    },
                function (xhr, textStatus, req) {
                    if (textStatus == "error") {
                        //alert(xhr + textStatus + req);
                        ShowError();

                    }
                    else {

                        //HideWaitToLoad();
                    }
                }
           ).hide().fadeIn(1000);
    }

    function FlagIssue(IssueID, username, TargetPage)
    {
        //alert(IssueID +", "+username +", "+TargetPage);
        var t = new Date().getTime();
        $("#FlagForm").empty();

        var imglink = "<span style='text-align: center; align-content:center'><img src='Images/ajax-loader.gif'></span>";
        $("#FlagForm").append(imglink);
       

        $("#result").load("Forms/FlagIssue.aspx #FlagIssueForm",
                    {
                        IssueID: IssueID,
                        username: username,
                        time: t
                    },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            //alert("Error");
                            ShowError();
                        }
                        else {
                            

                        }
                    }
               );
        
       
        var textbox = jQuery("#FlagDIV"+IssueID);
        var offset = textbox.offset();

        var offset_left = 0;
        var offset_top = 0;

        if (TargetPage == "DetailPage")
        {
            offset_left = offset.left + 100;
            offset_top = offset.top + 32;
        }
        else if (TargetPage == "PassdownPage")
        {
            offset_left = offset.left + 140;
            offset_top = offset.top + 25;
        }
        else if (TargetPage == "QueuePage")
        {
            offset_left = offset.left + 90;
            offset_top = offset.top + 25;
        }
        //alert(offset_left + ", " + offset_top);
        $("#FlagSelectionDiv").css({ "margin-left": "" + (offset_left) + "px", "margin-top": "" + offset_top + "px" });
        $("#FlagSelectionDiv").show();
       

        
    }

    function LinkToReportForm(IssueID, family, username) {
        //alert(IssueID);
        var t = new Date().getTime();
        //$("#FlagForm").empty();

        //var imglink = "<span style='text-align: center; align-content:center'><img src='Images/ajax-loader.gif'></span>";
        //$("#FlagForm").append(imglink);

        //alert(IssueID + ", " + family + "," + username);
        WaitToLoad();

        $("#result").load("Forms/FlagIssue.aspx #LinkToReportDiv",
                    {
                        IssueID: IssueID,
                        family: family,
                        username: username,
                        time: t
                    },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            alert(xhr +", "+textStatus +", "+req);
                            ShowError();
                        }
                        else {
                            //alert(xhr + ", " + textStatus + ", " + req);
                            ShowContent();

                        }
                    }
               );

    }

    function AddNewReportWithReference(IssueID, family, username)
    {
        //alert("Call");
        var t = new Date().getTime();
        WaitToLoad();
        //GetTimeFrame(24, "Reports");

        var obj = '{"username": "' + username +
                    '","time": "' + t +
                    '" }';

        $.ajax({
            type: "POST",
            url: "Process.asmx/AddAllReports",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Success") {

                    CloseDiv();
                    HideWaitToLoad();
                    LinkToReportForm(IssueID, family, username);

                }
                else if (data == "Exist") {
                    //Do nothing
                    alert("Reports already exist!");
                    HideWaitToLoad();
                }
                else {
                    ShowError();
                }

            },
            error: function (response) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                alert(response);
                ShowError();
            }
        });

        
    }

    function LinkToReportForm1(IssueID, family, username) {
       
        var t = new Date().getTime();
       
        WaitToLoad();

        $("#result").load("Forms/FlagIssue.aspx #LinkToReportDiv1",
                    {
                        IssueID: IssueID,
                        family: family,
                        username: username,
                        time: t
                    },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            //alert("Error");
                            ShowError();
                        }
                        else {

                            ShowContent();

                        }
                    }
               );

    }

    function AddNewReportWithReference1(IssueID, family, username) {
        var ReferenceID = $("#ReferencesDropDown1 option:selected").val();
        var ReferenceText = $("#ReferencesDropDown1 option:selected").text();

        var t = new Date().getTime();
        WaitToLoad();

        var obj = '{"ReferenceID": "' + ReferenceID +
                     '","ReferenceText": "' + ReferenceText +
                    '","family": "' + family +
                    '","username": "' + username +
                    '","time": "' + t +
                    '" }';


        $.ajax({
            type: "POST",
            url: "Process.asmx/AddNewSummaryReport",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Success") {

                    var startdate = $("#ReportStartDateTxt").val();
                    var enddate = $("#ReportEndDateTxt").val();

                    var familieslist = [];

                    var families = $("[id*=ReportFamilyCheckboxes]");

                    families.each(function () {
                        var sThisVal = (this.checked ? "1" : "0");
                        if (sThisVal == 1) {

                            var value = $(this).closest("td").find("label").html();
                            familieslist.push(value);

                        }
                    });


                    $.each(familieslist, function (key, family) {

                        ShowAllReports(family, startdate, enddate, username);

                    });
                    

                    CloseDiv();
                    HideWaitToLoad();
                   
                    //alert("Saved");
                }
                else if (data == "Nothing") {
                    //Do nothing
                    HideWaitToLoad();
                }
                else {
                    ShowError();
                }

            },
            error: function (response) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                alert(response);
                ShowError();
            }
        });
        //alert(IssueID + ", " + family + ", " + username + ", " + ReferenceID);
    }

    function LinkToReport(IssueID, family, username)
    {
        if (username == "") {
            alert("Unable to get username");
            location.reload()
        }
        else {
            var t = new Date().getTime();
            var Flags = [];

            $("input[name='CurrentReportsCheckboxes']:checked").each(function () {
                var sThisVal = (this.checked ? "1" : "0");
                if (sThisVal == 1) {

                    var value = $(this).val();
                    Flags.push(value);

                }
            });

            if (Flags.length > 0) {
                //Do nothing
            }
            else {
                alert("At least one report must be selected!");
                return false;
            }

            var obj = '{"IssueID": "' + IssueID + '","Flags": "' + Flags + '","username": "' + username + '","time": "' + t + '" }';
            WaitToLoad();

            //alert(obj);
            $.ajax({
                type: "POST",
                url: 'Process.asmx/LinkIssueToReport',
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    //alert(data);
                    if (data == "Success") {

                        GetAllFlaggedReports(IssueID, username);
                        HideWaitToLoad();
                        CloseDiv();
                    }
                    else {
                        ShowError();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    ShowError();
                }
            });
        }
    }
    function SaveFlaggedIssue(IssueID, username)
    {
       
        var t = new Date().getTime();
        var Flags = [];       

        $("input[name='FlagCheckboxes']:checked").each(function () {
            var sThisVal = (this.checked ? "1" : "0");
            if (sThisVal == 1) {

                var value = $(this).val();
                Flags.push(value);

            }
        });
       
       
            
        var obj = '{"IssueID": "' + IssueID + '","Flags": "' + Flags + '","username": "' + username + '","time": "' + t + '" }';

        //alert(obj);
        $.ajax({
            type: "POST",
            url: 'Process.asmx/SaveFlags',
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var data = response.d;
                //alert(data);
                if (data == "Success") {

                    GetAllFlaggedReports(IssueID, username);
                    HideFlagDiv();

                }
                else {
                    ShowError();
                }     
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                ShowError();
            }
        });
           
       
       // alert(Flags);
       
    }

    function GetAllFlaggedReports(IssueID, username)
    {
        var t = new Date().getTime();

        $("#FlagDIV" + IssueID).empty();
        var imglink = "<span style='text-align: center; align-content:center'><img src='Images/ajax-loader.gif'></span>";
        $("#FlagDIV" + IssueID).append(imglink);

        $("#FlagDIV" + IssueID).load("Forms/FlagIssue.aspx #AllFlaggedReportsDiv",
                    {
                        IssueID: IssueID,
                        username: username,
                        time: t
                    },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            //alert("Error");
                            ShowError();
                        }
                        else {

                        }
                    }
               ).hide().fadeIn(1000);
    }

    function HideFlagDiv()
    {       
        $("#FlagForm").empty();
        $("#FlagSelectionDiv").hide();       
    }

    function LinkToReportForm1(IssueID, family, username) {

        var t = new Date().getTime();
        WaitToLoad();

        $("#OtherFormsResultDiv").load("Forms/FlagIssue.aspx #LinkToReportDiv",
                    {
                        IssueID: IssueID,
                        family: family,
                        username: username,
                        time: t
                    },
                    function (xhr, textStatus, req) {
                        if (textStatus == "error") {
                            alert(xhr + ", " + textStatus + ", " + req);
                            ShowError();
                        }
                        else {

                            HideWaitToLoad2();
                            var lw = $("#AllOtherForms").width();
                            var lh = $("#AllOtherForms").height();
                            ShowAllOtherForms(lw, lh);
                        }
                    }
               );

    }

/**********************************************************
/* Unlick issues from reports.
/*********************************************************/

    function UnlinkReport1(SequenceID, IssueID, username) {

        //alert(SequenceID + ", " + ReportID + ", " + username);
        if (confirm('You are about to unlink this issue. Are you sure?')) {

            var t = new Date().getTime();
            //WaitToLoad();
            var obj = '{"SequenceID": "' + SequenceID + '","username": "' + username + '","time": "' + t + '" }';
            //alert(obj);
            $.ajax({
                type: "POST",
                url: "Process.asmx/UnlinkReport",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = response.d;
                    //alert(data);
                    if (data == "Success") {

                        GetAllFlaggedReports(IssueID, username);
                        HideWaitToLoad();
                    }
                    else {
                        ShowError();
                        HideWaitToLoad();
                    }
                }
            });
        }
        else {

        }
    }

   