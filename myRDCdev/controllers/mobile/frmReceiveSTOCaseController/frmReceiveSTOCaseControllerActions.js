define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ImageCaseBarcode **/
    AS_Image_i41ea1ff80da418b82d63de82811ff3a: function AS_Image_i41ea1ff80da418b82d63de82811ff3a(eventobject, x, y) {
        var self = this;
        this.launchBarcode();
    },
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_fa31827a5d3b49ea805db0a3a51a63e0: function AS_Label_fa31827a5d3b49ea805db0a3a51a63e0(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmReceiveSTOShip");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_eabc266686b84a46baf6523abdce781c: function AS_Image_eabc266686b84a46baf6523abdce781c(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onDone defined for TextCase **/
    AS_TextField_b09da9b0b94f4ad4b897016f56436a51: function AS_TextField_b09da9b0b94f4ad4b897016f56436a51(eventobject, changedtext) {
        var self = this;
        this.onDone();
    },
    /** preShow defined for frmReceiveSTOCase **/
    AS_Form_f524ccbcdb96473d9615d8c197a49b7d: function AS_Form_f524ccbcdb96473d9615d8c197a49b7d(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow(glb_ZWM_RECSTO_CONF_MAN);
    }
});