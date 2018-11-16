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
