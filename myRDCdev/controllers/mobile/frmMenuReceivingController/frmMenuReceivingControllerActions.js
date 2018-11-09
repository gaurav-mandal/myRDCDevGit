define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_e1f3942bda5d478c9182dcbefe1cfc17: function AS_Label_e1f3942bda5d478c9182dcbefe1cfc17(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_b8a308d75e2e4bd9be1f7236c67c75c6: function AS_Image_b8a308d75e2e4bd9be1f7236c67c75c6(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonLogout **/
    AS_Button_d0350f666d1e4d2695967174745a8c30: function AS_Button_d0350f666d1e4d2695967174745a8c30(eventobject) {
        var self = this;
        kony.application.exit();
    },
    /** onClick defined for ButtonReceiveSTO **/
    AS_Button_feb3f9d808ce43bd9a0b060f780a3866: function AS_Button_feb3f9d808ce43bd9a0b060f780a3866(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmReceiveSTOInit");
        ntf.navigate();
    },
    /** onClick defined for ButtonReceivePO **/
    AS_Button_a20782703eca4ae582d1f55212610713: function AS_Button_a20782703eca4ae582d1f55212610713(eventobject) {
        var self = this;

        function SHOW_ALERT__ddfc25f5b83a443697345f209d333c40_True() {}
        function SHOW_ALERT__ddfc25f5b83a443697345f209d333c40_Callback() {
            SHOW_ALERT__ddfc25f5b83a443697345f209d333c40_True();
        }
        kony.ui.Alert({
            "alertType": constants.ALERT_TYPE_ERROR,
            "alertTitle": "Function Under Development",
            "message": undefined,
            "alertHandler": SHOW_ALERT__ddfc25f5b83a443697345f209d333c40_Callback
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });
    },
    /** preShow defined for frmMenuReceiving **/
    AS_Form_a2c44a0200684ef6a41e26ee643b5d53: function AS_Form_a2c44a0200684ef6a41e26ee643b5d53(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});