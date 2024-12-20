sap.ui.define([
	"test/studio/controller/BaseController",
	"sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {

	"use strict";

	return BaseController.extend("test.studio.controller.App", {

		onInit: function () {
			BaseController.prototype.onInit.apply(this, arguments);

			var oViewModel = new JSONModel({
				// takeAuthors: null,
				// booksCount: null
			});
			this.setModel(oViewModel, "localHomeView");
			var oDataModel = this.getModel("catOdata");
			var oViewModel = this.getModel("localHomeView");
			// var oDataModel = this.getModel("catV4");

			//-------------------------------------------------
			//    takeAuthors
			//-------------------------------------------------
			oDataModel.callFunction("/takeAuthors", {
				method: "POST",
				refreshAfterChange: false,
				success: function (oData) {

					oData = JSON.parse(oData);
					oViewModel.setProperty("/takeAuthors", oData);

				}.bind(this),
				error: function (oError) {
					//Do nothing
				}.bind(this)
			});

			//-------------------------------------------------
			//    booksCount
			//-------------------------------------------------
			oDataModel.callFunction("/booksCount", {
				method: "POST",
				refreshAfterChange: false,
				success: function (oData) {
					oData = JSON.parse(oData);
					oData = oData.map((e)=>{return e.name})
					oViewModel.setProperty("/booksCount", oData);
				},
				error: function () {
					//Do nothing
				}.bind(this)
			});
		}
	});
});

