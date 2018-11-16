angular.module('ado.bandwidth-limiter.tpls', []).run(['$templateCache', function($templateCache) {$templateCache.put('./bandwidth-limiter.html','<form name="bandwidthForm">\n  <div class="row">\n\n    <div class="col-md-12">\n      <div>\n        <h4>Default Bandwidth Per User</h4>\n        <div>\n          <div class="form-group" ng-class="{\'has-error\' : bandwidthForm.bdown.$invalid, \'has-success\': bandwidthForm.bdown.$valid && bandwidthForm.bdown.$touched}">\n            <label>Download Speed (kilobits/second)</label>\n            <input ng-disabled="$ctrl.settings.disable_limiter" step="any" min="1" max="{{$ctrl.settings.max_bandwidth_down}}" type="number" name="bdown" class="form-control" ng-model="$ctrl.settings.bandwidth_down" required>\n            <span class="help-block" ng-if="bandwidthForm.bdown.$error.required">Required.</span>\n            <span class="help-block" ng-if="bandwidthForm.bdown.$error.min">Minimum of 1kbps.</span>\n            <span class="help-block" ng-if="bandwidthForm.bdown.$error.max">Must not exceed global limit</span>\n          </div>\n\n          <div class="form-group" ng-class="{\'has-error\' : bandwidthForm.bup.$invalid, \'has-success\': bandwidthForm.bup.$valid && bandwidthForm.bup.$touched}">\n            <label>Upload Speed (kilobits/second)</label>\n            <input ng-disabled="$ctrl.settings.disable_limiter" step="any" min="1" max="{{$ctrl.settings.max_bandwidth_up}}" type="number" class="form-control" name="bup" ng-model="$ctrl.settings.bandwidth_up" required>\n            <span class="help-block" ng-if="bandwidthForm.bup.$error.required">Required.</span>\n            <span class="help-block" ng-if="bandwidthForm.bup.$error.min">Minimum of 1kbps</span>\n            <span class="help-block" ng-if="bandwidthForm.bup.$error.max">Must not exceed global limit</span>\n          </div>\n\n          <!--<ba-switcher switcher-style="primary" switcher-value="$ctrl.settings.disable_limiter"></ba-switcher>-->\n\n          <div class="input-demo checkbox-demo padd-bottom">\n            <label class="checkbox-inline custom-checkbox nowrap">\n              <input type="checkbox" name="active" ng-model="$ctrl.settings.disable_limiter">\n              <span>\n                <strong>\n                Use global limit as bandwidth limiter for all users?\n                </strong>\n              </span>\n            </label>\n            <p class="help-block">\n            When enabled, there is no bandwidth limiter per user. Instead, the users will share the global bandwdith limit of the machine.\n            <a href="http://adopisowifi.com/articles/bandwidth-management-traffic-shaping/" target="_blank">Click here to learn more.</a>\n            </p>\n          </div>\n\n        </div>\n      </div>\n\n      <hr>\n\n      <div>\n        <h4>Global Bandwidth Limit</h4>\n        <div>\n\n          <div class="form-group" ng-class="{\'has-error\' : bandwidthForm.maxbdown.$invalid, \'has-success\': bandwidthForm.maxbdown.$valid && bandwidthForm.maxbdown.$touched}">\n            <label>Global Download Speed Limit (kilobits/second)</label>\n            <input step="any" min="{{$ctrl.settings.bandwidth_down}}" type="number" name="maxbdown" class="form-control" ng-model="$ctrl.settings.max_bandwidth_down" required>\n            <span class="help-block" ng-if="bandwidthForm.maxbdown.$error.required">Required.</span>\n            <span class="help-block" ng-if="bandwidthForm.maxbdown.$error.min">Must be greater than or equal to bandwidth per user</span>\n          </div>\n\n          <div class="form-group" ng-class="{\'has-error\' : bandwidthForm.maxbup.$invalid, \'has-success\': bandwidthForm.maxbup.$valid && bandwidthForm.maxbup.$touched}">\n            <label>Global Upload Speed (kilobits/second)</label>\n            <input step="any" min="{{$ctrl.settings.bandwidth_up}}" type="number" class="form-control" name="maxbup" ng-model="$ctrl.settings.max_bandwidth_up" required>\n            <span class="help-block" ng-if="bandwidthForm.maxbup.$error.required">Required.</span>\n            <span class="help-block" ng-if="bandwidthForm.maxbup.$error.min">Must be greater than or equal to bandwidth per user</span>\n          </div>\n\n          <p>\n          As the number of users increases, so as the bandwidth consumed by the machine. You can limit the maximum bandwidth\n          consumption of the machine using the global limit option. When the bandwidth consumption reaches the global limit, the bandwidth per user will be adjusted automatically to share the global bandwidth allocation.\n          <a href="http://adopisowifi.com/articles/bandwidth-management-traffic-shaping/" target="_blank">Learn more.</a>\n          </p>\n\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n  <save-config-btn config="{\n    bandwidth_up: $ctrl.settings.bandwidth_up,\n    bandwidth_down: $ctrl.settings.bandwidth_down,\n    disable_limiter: $ctrl.settings.disable_limiter,\n    max_bandwidth_down: $ctrl.settings.max_bandwidth_down,\n    max_bandwidth_up: $ctrl.settings.max_bandwidth_up\n    }" ng-disabled="bandwidthForm.$invalid || bandwidthForm.$pristine">Save Changes</save-config-btn>\n\n  <hr>\n  <p>\n  Bandwidth limiter not working?\n  <a href="http://adopisowifi.com/articles/bandwidth-management-traffic-shaping/" target="_blank">Click here.</a>\n  </p>\n\n</form>\n\n\n');}]);
angular
  .module('ado.bandwidth-limiter', [
    'ado.save-config-btn',
    'ado.bandwidth-limiter.tpls'
  ])
  .component('adoBandwidthLimiter', {
    bindings: {
      device: '<'
    },
    controller: 'AdoBandwidthLimiterCtrl',
    templateUrl: './bandwidth-limiter.html'
  })
  .controller('AdoBandwidthLimiterCtrl', [
    'adoConfigService',
    function AdoBandwidthLimiterCtrl(adoConfigService) {

      $ctrl = this;

      $ctrl.$onInit = function () {

        adoConfigService.get()
          .then(function (res) {
            $ctrl.settings = res.data;
          });

      };

    }
  ]);
