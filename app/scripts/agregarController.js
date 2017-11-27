var miApp = {
    app: null,
    initAngular: function (api, freshState) {
        miApp.app = angular.module('appControl', []);

        miApp.app.controller('cambioGrupoController', ['$scope', function ($scope) {

            $scope.state = freshState;
            $scope.lstDevices = [];
            $scope.lstGrupos = [];
            $scope.dispositivoSeleccionado = null;
            $scope.grupoSeleccionado = null;


            var calls = [
                ["Get", {
                    typeName: "Device"
                }],
                ["Get", {
                    typeName: "Group",
                    search: {
                        id: "b282F"
                    }
                }]
            ];

            api.multiCall(calls, function (result) {
                $scope.$apply(function () {
                    $scope.lstDevices = result[0];
                    // $scope.lstGrupos = result[1];
                    result.forEach(function (hijos) {
                        $scope.lstGrupos = hijos[0].children;
                    }, this);
                });
            }, function (error) {
                console.log(error.message);
            });

            $scope.getDevice = function (device) {
                try {
                    $scope.dispositivoSeleccionado = device;
                    //$scope.$apply();
                } catch (error) {
                    console.log(error.message);
                }
            }
            $scope.getGroup = function (group) {
                try {
                    $scope.grupoSeleccionado = group;
                    // $scope.$apply();
                } catch (error) {
                    console.log(error.message);
                }
            }

            $scope.anadir = function () {
                try {
                    console.log($scope.dispositivoSeleccionado.groups);
                    $scope.dispositivoSeleccionado.groups.push({
                        id: $scope.grupoSeleccionado.id
                    });
                    console.log($scope.dispositivoSeleccionado.groups);

                    api.call("Set", {
                        typeName: "Device",
                        entity: $scope.dispositivoSeleccionado

                    }, function (result) {
                        swal(
                            'Buen trabajo!',
                            'sus cambios se han guardado.',
                            'success'
                        )
                        console.log(result);

                    }, function (e) {
                        console.log(e.message);
                    });
                } catch (error) {
                    swal(
                        'Algo salió mal...',
                        'Los campos no pueden ir vacíos',
                        'error'
                    )
                    console.log(error.message);
                }


            }






        }]);
    }
}