sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/base/Log"
], function (Controller, History, Log) {
	"use strict";

	return Controller.extend("test.studio.controller.BaseController", {
		_oLogger: null,

		onInit: function () {

		},
		/*onExit: function () {
			//this.getRouter().detachRouteMatched(this._attachRouteMatched, this);
		},*/
		getLogger: function (sController) {
			this._oLogger = Log.getLogger(sController);
			//this._oLogger.setLevel(Log.Level.INFO);
			return this._oLogger;
		},
		getControllerName: function () {
			return this.getView().getControllerName();
		},
		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		}

	});

});