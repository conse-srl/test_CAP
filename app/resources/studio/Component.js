sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";

    return UIComponent.extend("test.studio.Component", {

        metadata: {
            manifest: "json",
            properties: {
                "currentRouteName": {}
            }
        },

        _oLogger: null,

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {



            sap.ui.getCore().attachThemeChanged(function (oEvent) {


            }.bind(this));

            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
        },


        getCurrentRoute: function () {
            this._oLogger.info("getCurrentRoute");
            this._oLogger.info(this.getRouter().getRoute(this.getCurrentRouteName()));
            return this.getRouter().getRoute(this.getCurrentRouteName());
        },

        getContentDensityClass: function () {
            if (!this._sContentDensityClass) {
                if (!sap.ui.Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        },

    });
});