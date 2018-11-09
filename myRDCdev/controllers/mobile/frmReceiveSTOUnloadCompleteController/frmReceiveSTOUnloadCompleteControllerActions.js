define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_babcb91251ad40a58394cceba9f8e225: function AS_Label_babcb91251ad40a58394cceba9f8e225(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmReceiveSTOCase");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_f85106031fe5426db20eb3bdac925c45: function AS_Image_f85106031fe5426db20eb3bdac925c45(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonFinish **/
    AS_Button_b920c19ad19640039c133f71ec0b2aee: function AS_Button_b920c19ad19640039c133f71ec0b2aee(eventobject) {
        var self = this;
        this.onClickFinishReceiving();
    },
    /** onClick defined for ButtonScanMore **/
    AS_Button_i8a8124c2075480c9d317653627b84f8: function AS_Button_i8a8124c2075480c9d317653627b84f8(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmReceiveSTOCase");
        ntf.navigate();
    },
    /** preShow defined for frmReceiveSTOUnloadComplete **/
    AS_Form_e7c788eb444f42378d904fc774ebc735: function AS_Form_e7c788eb444f42378d904fc774ebc735(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow(glb_ZWM_RECSTO_CONF_MAN, gbl_ZWM_RECSTO_UNL_ITEMS);
    }
});