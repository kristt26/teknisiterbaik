(function (angular) {
    'use strict'
    angular.module('ctrl', [])
        .controller('KriteriaController', KriteriaController)
        .controller('PembobotanController', PembobotanController)
        .controller('AnalisaController', AnalisaController)
        .controller('LaporanController', LaporanController);

    function KriteriaController($scope, $http, helperServices, KriteriaService) {
        $scope.datas = [];
        $scope.model = {};
        $scope.element = [];
        KriteriaService.get().then(x => {
            $scope.datas = x;
            for (let index = 0; index < x.kriteria.length - 1; index++) {
                var item = {};
                item.kriteria = x.kriteria[index];
                for (let index1 = index + 1; index1 < x.kriteria.length; index1++) {
                    item.kriteria1 = x.kriteria[index1];
                    $scope.element.push(angular.copy(item));
                }
            }
            if (x.pembobotan) {
                x.pembobotan.forEach(bobot => {
                    var a = $scope.element.find(x => x.kriteria.idkriteria == bobot.idkriteria && x.kriteria1.idkriteria == bobot.idkriteria1);
                    a.bobot = bobot.bobot;
                    a.nilai = parseFloat(a.bobot);
                    a.nama = a.kriteria.kriteria;
                });
                $scope.checkcr();
            }


            //   $.LoadingOverlay("hide");
        })

        $scope.simpan = () => {
            if ($scope.model.idkriteria) {
                KriteriaService.editKriteria($scope.model).then(x => {
                    swal("Information", "Berhasil Mengubah Data", "success");
                    $scope.model = {};
                })
            } else {
                KriteriaService.addKriteria($scope.model).then(x => {
                    swal("Information", "Berhasil Menambahkan Data", "success");
                    $scope.model = {};
                })
            }
            $("#add").modal('hide');

        }

        $scope.edit = (item) => {
            $scope.model = angular.copy(item);
            $("#add").modal('show');
        }

        $scope.delete = (item) => {
            swal({
                title: "Anda Yakin?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        KriteriaService.removeKriteria(item.idkriteria).then(x => {
                            swal("Information", "Berhasil Menghapus Data", "success");
                        })
                    }
                });

        }
    }

    function PembobotanController($scope, $http, helperServices, KriteriaService, PeriodeService) {
        $scope.datas = [];
        $scope.model = {};
        $scope.element = [];
        $scope.btnSimpan = false;
        PeriodeService.getPeriodeAktif().then((periode) => {
            if (periode != 'null') {
                KriteriaService.get().then(x => {
                    for (let index = 0; index < x.kriteria.length - 1; index++) {
                        var item = {};
                        item.kriteria = x.kriteria[index];
                        for (let index1 = index + 1; index1 < x.kriteria.length; index1++) {
                            item.kriteria1 = x.kriteria[index1];
                            $scope.element.push(angular.copy(item));
                        }
                    }
                    if (x.pembobotan) {
                        x.pembobotan.forEach(bobot => {
                            var a = $scope.element.find(x => x.kriteria.idkriteria == bobot.idkriteria && x.kriteria1.idkriteria == bobot.idkriteria1);
                            a.bobot = bobot.bobot;
                            a.nilai = parseFloat(a.bobot);
                            a.nama = a.kriteria.kriteria;
                        });
                        $scope.checkcr();
                    }


                    //   $.LoadingOverlay("hide");
                })
            } else {
                swal({
                    title: "Tambahkan Periode Aktif terlebih dahulu?",
                    text: "",
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                })
                    .then((value) => {
                        if (value) {
                            KriteriaService.post($scope.element).then(x => {
                                document.location.href = helperServices.url + '/periode';
                            })
                        }
                    });
            }
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
                $scope.btnSimpan = true;
            })
        }
        $scope.simpan = () => {
            swal({
                title: "Anda yakin menyimpan data?",
                text: "",
                icon: "info",
                buttons: true,
                dangerMode: false,
            })
                .then((value) => {
                    if (value) {
                        KriteriaService.post($scope.element).then(x => {
                            swal("Information", "Berhasil Menyimpan Data", "success");
                        })
                    }
                });

        }
    }

    function AnalisaController($scope, $http, helperServices, AnalisaService, PeriodeService) {
        $scope.datas = [];
        $scope.karyawans = [];
        $scope.kriteria = [];
        $scope.model = {};
        $scope.element = [];
        $scope.alternatif = [];
        $scope.view = 'karyawan';
        $scope.bobot = true;
        $scope.btnSimpan = false;
        PeriodeService.getPeriodeAktif().then((periode) => {
            if (periode !== 'null') {
                AnalisaService.get().then(x => {
                    $scope.karyawans = x.karyawan;
                    $scope.kriteria = x.kriteria.kriteria;
                    if (x.bobot.length > 0) {
                        $scope.bobot = false;
                        $scope.alternatif = x.alternatif;
                        $scope.karyawans.forEach(element => {
                            var data = $scope.alternatif.find((x) => x.idkaryawan == element.idkaryawan);
                            if (data) {
                                element.check = true;
                            }
                        });
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
                        $scope.kriteria.forEach(element => {
                            element.item.forEach(value => {
                                var data = x.bobot.find((x) => x.idkaryawan == value.alternatif.idkaryawan && x.idkaryawan1 == value.alternatif1.idkaryawan && x.idkriteria == element.idkriteria);
                                if (data) {
                                    value.bobot = data.bobot;
                                    value.nilai = parseFloat(data.bobot);
                                    value.nama = value.alternatif.nama;
                                    console.log(value);
                                } else {
                                    var index = element.item.indexOf(value);
                                    element.item.splice(index, 1);
                                }
                            });
                        });
                        $scope.checkcr();
                    }
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
            } else {
                swal({
                    title: "Tambahkan Periode Aktif terlebih dahulu?",
                    text: "",
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                })
                    .then((value) => {
                        if (value) {
                            KriteriaService.post($scope.element).then(x => {
                                document.location.href = helperServices.url + '/periode';
                            })
                        }
                    });
            }
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
                $scope.view = 'hasil';
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
        $scope.back = () => {
            if ($scope.view == 'hasil')
                $scope.view = 'bobot';
            else if ($scope.view = 'bobot')
                $scope.view = 'karyawan';
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
                    var item = {};
                    item.name = prop;
                    item.matrix = $scope.datas.rawCriteria[prop];
                    item.eigen = $scope.datas.criteriaPairWise[prop].eigen;
                    item.cr = $scope.datas.criteriaPairWise[prop].cr;
                    $scope.datas.datahitung.push(angular.copy(item));
                    // console.log($scope.datas.criteriaPairWise[prop]);
                }
                console.log($scope.datas);
                $scope.btnSimpan = true;
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
        // $scope.simpan = () => {
        //     KriteriaService.post($scope.element).then(x => {

        //     })
        // }

        $scope.simpan = () => {
            var data = {};
            data.kriteria = $scope.kriteria;
            data.alternatif = $scope.alternatif;
            AnalisaService.post(data).then(x => {
                swal("Information", "Berhasil Menyimpan Data", "success");
            })
        }
    }

    function LaporanController($scope, $http, helperServices, AnalisaService, PeriodeService) {
        $scope.datas = [];
        $scope.karyawans = [];
        $scope.kriteria = [];
        $scope.periode = [];
        $scope.model = {};
        $scope.element = [];
        $scope.alternatif = [];
        $scope.itemperiodee = {};
        $scope.bobot = true;
        $scope.btnSimpan = false;
        PeriodeService.get().then((x) => {
            $scope.periode = x;
        })
        $scope.setLaporan = (param) => {
            $scope.datas = [];
            $scope.karyawans = [];
            $scope.kriteria = [];
            $scope.model = {};
            $scope.element = [];
            $scope.alternatif = [];
            $scope.itemperiodee = {};
            AnalisaService.getLaporan(param.idperiode).then(x => {
                $scope.karyawans = x.karyawan;
                $scope.kriteria = x.kriteria.kriteria;
                if (x.bobot.length > 0) {
                    $scope.bobot = false;
                    $scope.alternatif = x.alternatif;
                    $scope.karyawans.forEach(element => {
                        var data = $scope.alternatif.find((x) => x.idkaryawan == element.idkaryawan);
                        if (data) {
                            element.check = true;
                        }
                    });
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
                    $scope.kriteria.forEach(element => {
                        element.item.forEach(value => {
                            var data = x.bobot.find((x) => x.idkaryawan == value.alternatif.idkaryawan && x.idkaryawan1 == value.alternatif1.idkaryawan && x.idkriteria == element.idkriteria);
                            if (data) {
                                value.bobot = data.bobot;
                                value.nilai = parseFloat(data.bobot);
                                value.nama = value.alternatif.nama;
                                // console.log(value);
                            } else {
                                var index = element.item.indexOf(value);
                                element.item.splice(index, 1);
                            }
                        });
                    });
                    $scope.checkcr();
                }
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

        }

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
                $scope.view = 'hasil';
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
                // console.log($scope.kriteria);
            }
            else
                swal('!Information', 'Data Alternatif minimal 2 item', 'error')
        }
        $scope.back = () => {
            if ($scope.view == 'hasil')
                $scope.view = 'bobot';
            else if ($scope.view = 'bobot')
                $scope.view = 'karyawan';
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
                    var item = {};
                    item.name = prop;
                    item.matrix = $scope.datas.rawCriteria[prop];
                    item.eigen = $scope.datas.criteriaPairWise[prop].eigen;
                    item.cr = $scope.datas.criteriaPairWise[prop].cr;
                    $scope.datas.datahitung.push(angular.copy(item));
                    // console.log($scope.datas.criteriaPairWise[prop]);
                }
                console.log($scope.datas);
                $scope.btnSimpan = true;
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
        // $scope.simpan = () => {
        //     KriteriaService.post($scope.element).then(x => {

        //     })
        // }

        $scope.simpan = () => {
            var data = {};
            data.kriteria = $scope.kriteria;
            data.alternatif = $scope.alternatif;
            AnalisaService.post(data).then(x => {
                swal("Information", "Berhasil Menyimpan Data", "success");
            })
        }
        $scope.print = ()=>{
            $("#print").printArea();
        }
    }
})(window.angular);