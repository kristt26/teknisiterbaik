<div class="row" ng-app="app" ng-controller="LaporanController">
    <div class="col-md-12">
        
        <div class="panel panel-default">
            <div class="panel-body">
                <form class="form-inline" style="margin-bottom:12px">
                    <div class="form-group">
                        <label for="">Peride</label>
                        <select class="form-control"  ng-options="item as item.periode for item in periode" ng-model="itemperiodee" ng-change="setLaporan(itemperiodee)"></select>
                    </div>
                </form>
                <div class="table-responsive">
                    <div id="print">
                        <div class="screen">
                            <div class="col-md-12 d-flex justify-content-between">
                                <div class="col-md-4"><img src="<?= base_url('resources/img/logo.png');?>" width="100px"></div>
                                <div class="col-md-4 text-center"><h3>LAPORAN <br>HASIL ANALISA AHP</h3></div>
                                <div class="col-md-4">&nbsp;</div>
                            </div>
                            <hr class="style2" style="margin-bottom:12px"><br>
                        </div>
                        <div style="margin-top:12px">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <td width="5%">Rank</td>
                                        <td>Nama Teknisi</td>
                                        <td width="10%">Nilai</td>
                                        <td width="20%">Keterangan</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in datas.finalRanks | orderBy: '-value'">
                                        <td>{{$index+1}}</td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.value | limitTo: 8}}</td>
                                        <td>{{$index==0 ? 'Teknisi Terbaik':''}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm" ng-click="print()"><i class="fa fa-print"></i> Cetak</button>
                </div>
            </div>
        </div>
        
        
        <!-- <div class="col-md-12" ng-repeat="itemkriteria in datas.datahitung">
            <div class="box">
                <div class="box-header">
                    <h4 class="box-title">{{itemkriteria.name}}</h4>
                </div>
                <div class="box-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <td>{{itemkriteria.name}}</td>
                                    <td ng-repeat="item in datas.candidates">
                                        {{item}}
                                    </td>
                                    <td>Priority</td>
                                </tr>
                            </thead>
                            <tbody ng-repeat="bobot1 in itemkriteria.matrix">
                                <tr>
                                    <td>
                                        {{datas.candidates[$index]}}
                                    </td>
                                    <td ng-repeat="item in bobot1">
                                        {{item}}
                                    </td>
                                    <td>
                                        {{itemkriteria.eigen[$index]}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="col-md-12">
                            <div class="alert alert-success alert-dismissible" ng-show="itemkriteria.cr<0.1">
                                <button type="button" class="close" data-dismiss="alert"
                                    aria-hidden="true">&times;</button>
                                <h4><i class="icon fa fa-check"></i>Nilai CR: {{itemkriteria.cr}} (Konsisten)</h4>
                            </div>
                            <div class="alert alert-danger alert-dismissible" ng-show="itemkriteria.cr>0.1">
                                <button type="button" class="close" data-dismiss="alert"
                                    aria-hidden="true">&times;</button>
                                <h4><i class="icon fa fa-ban"></i>Nilai CR: {{itemkriteria.cr}} (Tidak Konsisten)</h4>
                            </div>
                        </div>
                    </div>
                </div>
                </box>

            </div>
        </div> -->
    </div>
</div>