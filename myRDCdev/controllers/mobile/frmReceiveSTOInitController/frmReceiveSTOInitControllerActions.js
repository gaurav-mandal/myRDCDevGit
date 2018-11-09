define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ImageHome **/
    AS_Image_a2cd16a000344569bf48eec4053b26fa: function AS_Image_a2cd16a000344569bf48eec4053b26fa(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onTouchStart defined for LabelBack **/
    AS_Label_b7ce9565605444bda05ecf8b43dddc9d: function AS_Label_b7ce9565605444bda05ecf8b43dddc9d(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuReceiving");
        ntf.navigate();
    },
    /** onDone defined for TextShipNum **/
    AS_TextField_d36ac3665259461f9b2976f86dc8c384: function AS_TextField_d36ac3665259461f9b2976f86dc8c384(eventobject, changedtext) {
        var self = this;
        this.onDone();
    },
    /** onTouchStart defined for ImageShipNumBarcode **/
    AS_Image_hf3e607674df4559a854a4fe71d80127: function AS_Image_hf3e607674df4559a854a4fe71d80127(eventobject, x, y) {
        var self = this;
        this.launchBarcode();
    },
    /** preShow defined for frmReceiveSTOInit **/
    AS_Form_c79ec1eeea2744208cd385f8922ef137: function AS_Form_c79ec1eeea2744208cd385f8922ef137(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});