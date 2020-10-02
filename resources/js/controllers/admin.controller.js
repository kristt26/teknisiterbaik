(function (angular) {
    'use strict'
    angular.module('ctrl', [])
        .controller('KriteriaController', KriteriaController)
        .controller('PembobotanController', PembobotanController)
        .controller('SubKriteriaController', SubKriteriaController)
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

    function SubKriteriaController($scope, $http, helperServices, SubKriteriaService, PeriodeService) {
        $scope.datas = [];
        $scope.model = {};
        $scope.titledialog = "Tambah Sub Kriteria";
        $scope.element = [];
        $scope.nilai = [];
        $scope.bobot = true;
        $scope.datassub = [];
        PeriodeService.getPeriodeAktif().then((periode) => {
            if (periode !== 'null') {
                SubKriteriaService.get().then(x => {
                    $scope.datas = x.subkriteria
                    $scope.next();
                    if (x.bobot.length > 0) {
                        $scope.bobot = false;
                        $scope.datas.forEach(element => {
                            element.item.forEach(value => {
                                var data = x.bobot.find((x) => x.idkriteria == value.subkriteria.idkriteria && x.idsubkriteria == value.subkriteria.idsubkriteria && x.idsubkriteria1 == value.subkriteria1.idsubkriteria);
                                if (data) {
                                    value.bobot = data.bobot;
                                    value.nilai = parseFloat(data.bobot);
                                    value.subkriteria = value.subkriteria.subkriteria;
                                    console.log(value);
                                } else {
                                    var index = element.item.indexOf(value);
                                    element.item.splice(index, 1);
                                }
                            });
                        });
                        $scope.checkcr();
                    }
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

        $scope.addsub = (item) => {
            $scope.model.idkriteria = item.idkriteria;
            $scope.titledialog = "Tambah Sub Kriteria " + item.kriteria;

            $("#add").modal("show");
        }
        $scope.simpan = () => {
            swal({
                title: "Anda yakin melanjutkan proses???",
                text: "",
                icon: "info",
                buttons: true,
                dangerMode: false,
            })
                .then((value) => {
                    if (value) {
                        if ($scope.model.idsubkriteria) {
                            SubKriteriaService.ubah($scope.model).then((x) => {
                                swal("Proses Berhasil", {
                                    icon: "success",
                                });
                                $scope.model = {};
                                $("#add").modal("hide")
                            })
                        } else {
                            SubKriteriaService.simpan($scope.model).then((x) => {
                                swal("Proses Berhasil", {
                                    icon: "success",
                                });
                                $scope.model = {};
                                $("#add").modal("hide")
                            })
                        }
                    }
                });
        }
        $scope.edit = (item) => {
            $scope.model = item;
            $scope.titledialog = "Ubah Kriteria";
            $("#add").modal("show");
        }
        $scope.hapus = (item) => {
            swal({
                title: "Anda yakin menghapus data???",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((value) => {
                    if (value) {
                        SubKriteriaService.hapus(item.idkriteria).then((x) => {
                            swal("Proses Berhasil", {
                                icon: "success",
                            });
                        })
                    }
                });
        }
        $scope.next = () => {
            // $scope.view = 'bobot';
            $scope.datas.forEach(itemkriteria => {
                itemkriteria.item = [];
                for (let index = 0; index < itemkriteria.subkriteria.length - 1; index++) {
                    var item = {};
                    item.subkriteria = itemkriteria.subkriteria[index];
                    for (let index1 = index + 1; index1 < itemkriteria.subkriteria.length; index1++) {
                        item.subkriteria1 = itemkriteria.subkriteria[index1];
                        itemkriteria.item.push(angular.copy(item));
                    }
                }
            });
            console.log($scope.datas);
        }
        $scope.setNilai = (item) => {
            item.nilai = parseFloat(item.bobot);
            item.nama = item.subkriteria.subkriteria;
        }

        $scope.checkcr = () => {
            $scope.model.alternatif = [];
            $scope.model.kriteria = $scope.datas;
            SubKriteriaService.checkcr($scope.model).then(x => {
                $scope.nilai = x;
                $scope.nilai.datahitung = [];
                for (var prop in $scope.nilai.subCriteriaPairWise) {
                    var item = {};
                    item.name = prop;
                    item.matrix = $scope.nilai.rawSubCriteria[prop];
                    item.eigen = $scope.nilai.subCriteriaPairWise[prop].eigen;
                    item.cr = $scope.nilai.subCriteriaPairWise[prop].cr;
                    item.sub = $scope.nilai.subCriteriaPairWise[prop].sub;
                    $scope.nilai.datahitung.push(angular.copy(item));
                }
                console.log($scope.nilai);
            })
            $scope.bobot = false;
            $scope.view = 'hasil';
        }

        $scope.simpanbobot = () => {
            SubKriteriaService.simpanbobot($scope.datas).then(x => {

            })
        }
        
    }

    function AnalisaController($scope, $http, helperServices, AnalisaService, PeriodeService, SubKriteriaService) {
        $scope.datas = [];
        $scope.master = [];
        $scope.nilai = [];
        $scope.datatampung = [];
        $scope.nasabahs = [];
        $scope.kriteria = [];
        $scope.model = {};
        $scope.element = [];
        $scope.alternatif = [];
        $scope.view = 'nasabah';
        $scope.bobot = true;
        $scope.btnSimpan = false;
        PeriodeService.getPeriodeAktif().then((periode) => {
            SubKriteriaService.get().then(x => {
                $scope.datatampung = x.subkriteria
                $scope.nextnilai();
                if (x.bobot.length > 0) {
                    $scope.bobot = false;
                    $scope.datatampung.forEach(element => {
                        element.item.forEach(value => {
                            var data = x.bobot.find((x) => x.idkriteria == value.subkriteria.idkriteria && x.idsubkriteria == value.subkriteria.idsubkriteria && x.idsubkriteria1 == value.subkriteria1.idsubkriteria);
                            if (data) {
                                value.bobot = data.bobot;
                                value.nilai = parseFloat(data.bobot);
                                value.subkriteria = value.subkriteria.subkriteria;
                                console.log(value);
                            } else {
                                var index = element.item.indexOf(value);
                                element.item.splice(index, 1);
                            }
                        });
                    });
                    $scope.getcr();


                }
                if (periode !== 'null') {
                    AnalisaService.get().then(x => {
                        $scope.nasabahs = x.nasabah;
                        $scope.kriteria = x.kriteria.kriteria;
                        if (x.bobot.length > 0) {
                            $scope.bobot = false;
                            $scope.alternatif = x.alternatif;
                            $scope.nasabahs.forEach(element => {
                                var data = $scope.alternatif.find((x) => x.idnasabah == element.idnasabah);
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
                                    var data = x.bobot.find((x) => x.idnasabah == value.alternatif.idnasabah && x.idnasabah1 == value.alternatif1.idnasabah && x.idkriteria == element.idkriteria);
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

        })
        $scope.nextnilai = () => {
            // $scope.view = 'bobot';
            $scope.datatampung.forEach(itemkriteria => {
                itemkriteria.item = [];
                for (let index = 0; index < itemkriteria.subkriteria.length - 1; index++) {
                    var item = {};
                    item.subkriteria = itemkriteria.subkriteria[index];
                    for (let index1 = index + 1; index1 < itemkriteria.subkriteria.length; index1++) {
                        item.subkriteria1 = itemkriteria.subkriteria[index1];
                        itemkriteria.item.push(angular.copy(item));
                    }
                }
            });
            console.log($scope.datatampung);
        }
        $scope.getcr = () => {
            $scope.model.alternatif = [];
            $scope.model.kriteria = $scope.datatampung;
            SubKriteriaService.checkcr($scope.model).then(x => {
                $scope.nilai = x;
                $scope.nilai.datahitung = [];
                for (var prop in $scope.nilai.subCriteriaPairWise) {
                    var item = {};
                    item.name = prop;
                    item.matrix = $scope.nilai.rawSubCriteria[prop];
                    item.eigen = $scope.nilai.subCriteriaPairWise[prop].eigen;
                    item.cr = $scope.nilai.subCriteriaPairWise[prop].cr;
                    item.sub = $scope.nilai.subCriteriaPairWise[prop].sub;
                    $scope.nilai.datahitung.push(angular.copy(item));
                }
                console.log($scope.nilai);
                $scope.nilai.datahitung.forEach(element => {
                    var item = {};
                    item.kriteria = element.name;
                    item.nilai = [];
                    for (let index = 0; index < element.sub.length; index++) {
                        element.sub[index].nilai = element.eigen[index] / Math.max.apply(Math, element.eigen.map(function (o) { return o; }));
                        element.sub[index].value = element.eigen[index];
                        item.nilai.push(element.sub[index]);
                    }
                    $scope.master.push(angular.copy(item));
                });
                console.log($scope.master);
            })
        }

        $scope.additem = (item) => {
            if (item.check) {
                $scope.alternatif.push(angular.copy(item))
            } else {
                var data = $scope.alternatif.find(x => x.idnasabah == item.idnasabah);
                if (data) {
                    var index = $scope.alternatif.indexOf(data);
                    $scope.alternatif.splice(index, 1);
                }

            }
        }
        $scope.next = () => {
            if ($scope.view == 'nasabah') {
                if ($scope.alternatif.length >= 2) {
                    $scope.view = 'setnilai';
                    $scope.alternatif.forEach(element => {
                        element.sub = $scope.master;
                    });
                    // $scope.kriteria.forEach(itemkriteria => {
                    //     itemkriteria.item = [];
                    //     for (let index = 0; index < $scope.alternatif.length - 1; index++) {
                    //         var item = {};
                    //         item.alternatif = $scope.alternatif[index];
                    //         for (let index1 = index + 1; index1 < $scope.alternatif.length; index1++) {
                    //             item.alternatif1 = $scope.alternatif[index1];
                    //             itemkriteria.item.push(angular.copy(item));
                    //         }
                    //     }
                    // });
                    console.log($scope.alternatif);

                }
                else
                    swal('!Information', 'Data Alternatif minimal 2 item', 'error')
            } else if ($scope.view == 'setnilai') {
                for (let index1 = 0; index1 < $scope.alternatif.length; index1++) {
                    for (let index = 0; index < $scope.nilai.eigenVector.length; index++) {
                        var a = $scope.alternatif[index1].value[index].value;
                        var b = $scope.nilai.eigenVector[index];
                        $scope.alternatif[index1].value[index].hasil = $scope.alternatif[index1].value[index].nilai * $scope.nilai.eigenVector[index];
                    }

                }
                $scope.view = 'matriks';
                console.log($scope.alternatif);
            }

        }
        $scope.back = () => {
            if ($scope.view == 'hasil')
                $scope.view = 'bobot';
            else if ($scope.view = 'bobot')
                $scope.view = 'nasabah';
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

        $scope.sumTotal = (item) => {
            var total = 0;
            Object.values(item).forEach(element => {
                total +=element.hasil
            });
            return total;
        }
    }

    function LaporanController($scope, $http, helperServices, AnalisaService, PeriodeService) {
        $scope.datas = [];
        $scope.nasabahs = [];
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
            $scope.nasabahs = [];
            $scope.kriteria = [];
            $scope.model = {};
            $scope.element = [];
            $scope.alternatif = [];
            $scope.itemperiodee = {};
            AnalisaService.getLaporan(param.idperiode).then(x => {
                $scope.nasabahs = x.nasabah;
                $scope.kriteria = x.kriteria.kriteria;
                if (x.bobot.length > 0) {
                    $scope.bobot = false;
                    $scope.alternatif = x.alternatif;
                    $scope.nasabahs.forEach(element => {
                        var data = $scope.alternatif.find((x) => x.idnasabah == element.idnasabah);
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
                            var data = x.bobot.find((x) => x.idnasabah == value.alternatif.idnasabah && x.idnasabah1 == value.alternatif1.idnasabah && x.idkriteria == element.idkriteria);
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
                var data = $scope.alternatif.find(x => x.idnasabah == item.idnasabah);
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
                $scope.view = 'nasabah';
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
        $scope.print = () => {
            $("#print").printArea();
        }
    }
})(window.angular);