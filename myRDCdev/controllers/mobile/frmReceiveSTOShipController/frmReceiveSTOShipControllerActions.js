define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_f2572ac9b8cd4d13891d0277502d40d7: function AS_Label_f2572ac9b8cd4d13891d0277502d40d7(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmReceiveSTOInit");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_e52e8cd9928f4a0f82a5c7aedd668f0a: function AS_Image_e52e8cd9928f4a0f82a5c7aedd668f0a(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonUnloadComplete **/
    AS_Button_cf50a30de33b4cd18afbd77f0daafc7b: function AS_Button_cf50a30de33b4cd18afbd77f0daafc7b(eventobject) {
        var self = this;
        this.integrationCall();
    },
    /** onClick defined for ButtonUnload **/
    AS_Button_h28fba02de984372981e886ffb53030a: function AS_Button_h28fba02de984372981e886ffb53030a(eventobject) {
        var self = this;
        navigateToForm("frmReceiveSTOCase");
    },
    /** preShow defined for frmReceiveSTOShip **/
    AS_Form_df13f5e3a8d64f308a36970d963b5a1d: function AS_Form_df13f5e3a8d64f308a36970d963b5a1d(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow(glb_ZWM_RECSTO_CONF_MAN);
    }
});