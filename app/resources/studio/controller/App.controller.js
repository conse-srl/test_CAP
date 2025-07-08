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

			// //-------------------------------------------------
			// //    takeAuthors
			// //-------------------------------------------------
			// oDataModel.callFunction("/takeAuthors", {
			// 	method: "POST",
			// 	refreshAfterChange: false,
			// 	success: function (oData) {

			// 		oData = JSON.parse(oData);
			// 		oViewModel.setProperty("/takeAuthors", oData);

			// 	}.bind(this),
			// 	error: function (oError) {
			// 		//Do nothing
			// 	}.bind(this)
			// });

			// //-------------------------------------------------
			// //    booksCount
			// //-------------------------------------------------
			// oDataModel.callFunction("/booksCount", {
			// 	method: "POST",
			// 	refreshAfterChange: false,
			// 	success: function (oData) {
			// 		oData = JSON.parse(oData);
			// 		oData = oData.map((e)=>{return e.name})
			// 		oViewModel.setProperty("/booksCount", oData);
			// 	},
			// 	error: function () {
			// 		//Do nothing
			// 	}.bind(this)
			// });
		},
		onRead: function () {
			var oDataModel = this.getModel("catOdata");
			var oViewModel = this.getModel("localHomeView");

			oDataModel.read("/Binding('1')", {
				refreshAfterChange: true,
				success: function (oData) {
					delete oData.__metadata;
					oData = JSON.stringify(oData.filters);
					oViewModel.setProperty("/binding", oData);
				}.bind(this),
				error: function (oError) {
					oViewModel.setProperty("/binding", '');
				}.bind(this)
			});
		},
		onInsert: function () {
			var oDataModel = this.getModel("catOdata");
			var bind = {
				"ID": "1",
				"filters": [
					{
						"value1": "{\"displayValue\":\"\\\"test\\\"\",\"binding\":[]}",
						"value2": null
					}
				]
			}
			oDataModel.create("/Binding", bind, {
				refreshAfterChange: true,
				success: function (oData) {
					console.log();
				}.bind(this),
				error: function (oError) {
					console.log();
				}.bind(this)
			});
		},
		onUpdate: function () {
			var sObjectPath;
			var oDataModel = this.getModel("catOdata");
			var bind = {
				"filters": [
					{
						"value1": "{\"displayValue\":\"\\\"test1\\\"\",\"binding\":[]}",
						"value2": null
					}
				]
			}
			sObjectPath = this.getModel("catOdata").createKey("Binding", {
				ID: "1"
			});
			oDataModel.update("/Binding('1')", bind, {
				refreshAfterChange: true,
				success: function (oData) {
					console.log();
				}.bind(this),
				error: function (oError) {
					console.log();
				}.bind(this)
			});
		},
		onDelete: function () {
			var oDataModel = this.getModel("catOdata");
			var oViewModel = this.getModel("localHomeView");

			oDataModel.remove("/Binding('1')", {
				refreshAfterChange: true,
				success: function (oData) {
					console.log();
				}.bind(this),
				error: function (oError) {
					console.log();
				}.bind(this)
			});
		}
	});
});

