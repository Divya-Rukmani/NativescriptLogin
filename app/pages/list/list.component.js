"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("~/shared/user/user");
var observable_array_1 = require("data/observable-array");
var page_1 = require("ui/page");
var ListComponent = /** @class */ (function () {
    function ListComponent(page) {
        this.serverUrl = "https://reqres.in/api/users?page=2";
        page.actionBarHidden = true;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        fetch(this.serverUrl)
            .then(function (response) { return response.json(); })
            .then(function (r) {
            var array = new observable_array_1.ObservableArray();
            for (var i = 0; i < r.data.length; i++) {
                array.push(new user_1.User(r.data[i].id, r.data[i].first_name, r.data[i].last_name, r.data[i].avatar));
            }
            _this.dataItems = array;
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: "list",
            moduleId: module.id,
            templateUrl: "./list.html",
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwyQ0FBMEM7QUFDMUMsMERBQXFEO0FBQ3JELGdDQUE2QjtBQVE3QjtJQUlDLHVCQUFZLElBQVU7UUFEZixjQUFTLEdBQUcsb0NBQW9DLENBQUM7UUFFdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3BCLElBQUksQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7YUFDbkMsSUFBSSxDQUFDLFVBQUMsQ0FBQztZQUNSLElBQUksS0FBSyxHQUFHLElBQUksa0NBQWUsRUFBUSxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDbEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEcsQ0FBQztZQUNMLEtBQUksQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQWxCVSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGFBQWE7U0FFM0IsQ0FBQzt5Q0FLaUIsV0FBSTtPQUpWLGFBQWEsQ0FvQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXBCRCxJQW9CQztBQXBCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJ+L3NoYXJlZC91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIlxyXG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJsaXN0XCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2xpc3QuaHRtbFwiLFxyXG4gIFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCAgaW1wbGVtZW50cyBPbkluaXQgIHtcclxuICBcclxuIGRhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PFVzZXI+O1xyXG4gcHVibGljIHNlcnZlclVybCA9IFwiaHR0cHM6Ly9yZXFyZXMuaW4vYXBpL3VzZXJzP3BhZ2U9MlwiO1xyXG4gY29uc3RydWN0b3IocGFnZTogUGFnZSkge1xyXG4gIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyBcclxuICAgIGZldGNoKHRoaXMuc2VydmVyVXJsKVxyXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAudGhlbigocikgPT4ge1xyXG4gICAgdmFyIGFycmF5ID0gbmV3IE9ic2VydmFibGVBcnJheTxVc2VyPigpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICBhcnJheS5wdXNoKG5ldyBVc2VyKHIuZGF0YVtpXS5pZCwgci5kYXRhW2ldLmZpcnN0X25hbWUsIHIuZGF0YVtpXS5sYXN0X25hbWUsci5kYXRhW2ldLmF2YXRhcikpO1xyXG4gICAgICAgIH1cclxuICAgIHRoaXMuZGF0YUl0ZW1zPWFycmF5O1xyXG4gIH0pO1xyXG4gIH1cclxuXHJcbn0iXX0=