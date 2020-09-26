(function (angular) {
    'use strict'
    angular.module('ctrl', [])
        .controller('PembobotanController', PembobotanController)
        .controller('AnalisaController', AnalisaController);

    function PembobotanController($scope, $http, helperServices, KriteriaService) {
        $scope.datas = [];
        $scope.model = {};
        $scope.element = [];
        KriteriaService.get().then(x => {
            for (let index = 0; index < x.kriteria.length - 1; index++) {
                var item = {};
                item.kriteria = x.kriteria[index];
                for (let index1 = index + 1; index1 < x.kriteria.length; index1++) {
                    item.kriteria1 = x.kriteria[index1];
                    $scope.element.push(angular.copy(item));
                }
            }
            if(x.pembobotan){
                x.pembobotan.forEach(bobot => {
                    var a = $scope.element.find(x=>x.kriteria.idkriteria==bobot.idkriteria && x.kriteria1.idkriteria==bobot.idkriteria1);
                    a.bobot = bobot.bobot;
                    a.nilai = parseFloat(a.bobot);
                    a.nama = a.kriteria.kriteria;
                });
                $scope.checkcr();
            }
            
            
            //   $.LoadingOverlay("hide");
        })
        $scope.setNilai = (item) => {
            item.nilai = parseFloat(item.bobot);
            item.nama = item.kriteria.kriteria;
            console.log(item.bobot);
        }
        $scope.checkcr = () => {
            KriteriaService.checkcr($scope.element).then(x => {
                $scope.datas = x;
                $scope.datas.relativecriteria = angular.copy($scope.datas.criterias);
                var item = { name: 'Priority' };
                $scope.datas.matrixnormal = angular.copy($scope.datas.relativeMatrix)
                $scope.datas.relativecriteria.push(angular.copy(item));
                for (let index = 0; index < $scope.datas.relativeMatrix.length; index++) {
                    $scope.datas.matrixnormal[index].push(angular.copy($scope.datas.eigenVector[index]));
                }
            })
        }
        $scope.simpan = () => {
            KriteriaService.post($scope.element).then(x => {

            })
        }
    }

    function AnalisaController($scope, $http, helperServices, AnalisaService) {
        $scope.datas = [];
        $scope.karyawans = [];
        $scope.kriteria = [];
        $scope.model = {};
        $scope.element = [];
        $scope.alternatif = [];
        $scope.view = 'karyawan';
        AnalisaService.get().then(x => {
            $scope.karyawans = x.karyawan;
            $scope.kriteria = x.kriteria.kriteria;
            // for (let index = 0; index < x.length-1; index++) {
            //     var item = {};
            //     item.kriteria = x[index];
            //     for (let index1 = index+1; index1 < x.length; index1++) {
            //         item.kriteria1 = x[index1];
            //         $scope.element.push(angular.copy(item));
            //     }
            // }
            //   $.LoadingOverlay("hide");
        })
        $scope.additem = (item) => {
            if (item.check) {
                $scope.alternatif.push(angular.copy(item))
            } else {
                var data = $scope.alternatif.find(x => x.idkaryawan == item.idkaryawan);
                if (data) {
                    var index = $scope.alternatif.indexOf(data);
                    $scope.alternatif.splice(index, 1);
                }

            }
        }
        $scope.next = () => {
            if ($scope.alternatif.length >= 2) {
                $scope.view = 'bobot';
                $scope.kriteria.forEach(itemkriteria => {
                    itemkriteria.item = [];
                    for (let index = 0; index < $scope.alternatif.length - 1; index++) {
                        var item = {};
                        item.alternatif = $scope.alternatif[index];
                        for (let index1 = index + 1; index1 < $scope.alternatif.length; index1++) {
                            item.alternatif1 = $scope.alternatif[index1];
                            itemkriteria.item.push(angular.copy(item));
                        }
                    }
                });
                console.log($scope.kriteria);
            }
            else
                swal('!Information', 'Data Alternatif minimal 2 item', 'error')
        }
        $scope.back = () =>{
            if($scope.view=='hasil')
                $scope.view='bobot';
        }
        $scope.setNilai = (item) => {
            item.nilai = parseFloat(item.bobot);
            item.nama = item.alternatif.nama;
        }
        $scope.checkcr = () => {
            $scope.model.alternatif = $scope.alternatif;
            $scope.model.kriteria = $scope.kriteria;
            AnalisaService.checkcr($scope.model).then(x => {
                $scope.datas = x;
                $scope.datas.datahitung = [];
                for (var prop in $scope.datas.criteriaPairWise) {
                    var item ={};
                    item.name = prop;
                    item.matrix = $scope.datas.rawCriteria[prop];
                    item.eigen = $scope.datas.criteriaPairWise[prop].eigen;
                    item.cr = $scope.datas.criteriaPairWise[prop].cr;
                    $scope.datas.datahitung.push(angular.copy(item));
                    // console.log($scope.datas.criteriaPairWise[prop]);
                }
                console.log($scope.datas);
                // $scope.datas.relativecriteria = angular.copy($scope.datas.criterias);
                // var item = { name: 'Priority' };
                // $scope.datas.matrixnormal = angular.copy($scope.datas.relativeMatrix)
                // $scope.datas.relativecriteria.push(angular.copy(item));
                // for (let index = 0; index < $scope.datas.relativeMatrix.length; index++) {
                //     $scope.datas.matrixnormal[index].push(angular.copy($scope.datas.eigenVector[index]));
                // }
            })
            $scope.view = 'hasil';
        }
        $scope.simpan = () => {
            KriteriaService.post($scope.element).then(x => {

            })
        }
    }
})(window.angular);