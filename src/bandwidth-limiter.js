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

        $ctrl.device = $ctrl.device || {};

        adoConfigService.get({id: $ctrl.device.id})
          .then(function (res) {
            $ctrl.settings = res.data;
          });

      };

    }
  ]);
