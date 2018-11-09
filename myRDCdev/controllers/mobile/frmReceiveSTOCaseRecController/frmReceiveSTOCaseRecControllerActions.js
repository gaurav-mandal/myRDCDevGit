define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_ecf6e238791c4facbe55a8e84795f373: function AS_Label_ecf6e238791c4facbe55a8e84795f373(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmReceiveSTOCase");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_dd6c80d90db84f7a9e9aad3030a48766: function AS_Image_dd6c80d90db84f7a9e9aad3030a48766(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonReceive **/
    AS_Button_f9f61ecfccad45eb8643b91d70653881: function AS_Button_f9f61ecfccad45eb8643b91d70653881(eventobject) {
        var self = this;
        this.onClickReceive();
    },
    /** preShow defined for frmReceiveSTOCaseRec **/
    AS_Form_fd8054e944624cd3b5ffd18fc8a578de: function AS_Form_fd8054e944624cd3b5ffd18fc8a578de(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow(glb_ZWM_RECSTO_CONF_HU, glb_ZWM_RECSTO_ITEMS);
    }
});