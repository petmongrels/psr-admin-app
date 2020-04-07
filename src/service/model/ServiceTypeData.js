"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceTypeData = /** @class */ (function () {
    function ServiceTypeData() {
    }
    ServiceTypeData.newInstance = function () {
        var serviceTypeData = new ServiceTypeData();
        serviceTypeData.subTypes = [];
        return serviceTypeData;
    };
    return ServiceTypeData;
}());
exports.ServiceTypeData = ServiceTypeData;
var ServiceSubTypeData = /** @class */ (function () {
    function ServiceSubTypeData() {
    }
    return ServiceSubTypeData;
}());
exports.ServiceSubTypeData = ServiceSubTypeData;
