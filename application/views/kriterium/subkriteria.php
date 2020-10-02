<div class="row" ng-app="app" ng-controller="SubKriteriaController">
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li class="active"><a href="" data-toggle="tab" data-target="#tab_1">Data Sub Kriteria</a></li>
      <li><a href="#tab_2" data-toggle="tab" data-target="#tab_2">Bobot Sub Kriteria</a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" id="tab_1">
        <div class="box-group" id="accordion">
          <!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->
          <div class="panel box box-primary" ng-repeat="item in datas">
            <div class="box-header with-border">
              <div class="box-header">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse{{item.idkriteria}}">
                  {{item.kriteria}}
                </a>
                <div class="box-tools">
                  <a href="" class="btn btn-success btn-sm" ng-click="addsub(item)"><i class="fa fa-plus"></i> Add</a>
                </div>
              </div>
            </div>
            <div id="collapse{{item.idkriteria}}"
              ng-class="{'panel-collapse collapse in': $index == 0, 'panel-collapse collapse': $index !== 0}">
              <div class="box-body">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr ng-repeat="subkriteria in item.subkriteria">
                      <td>{{$index+1}}</td>
                      <td>{{subkriteria.subkriteria}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.tab-pane -->
      <div class="tab-pane" id="tab_2">
        <div ng-show="bobot">
          <div class="col-md-6" ng-repeat="itemkriteria in datas" style="margin-top:12px">
            <div class="box-header">
              <h4 class="box-title">{{itemkriteria.kriteria}}</h4>
            </div>
            <div class="box table-responsive">
              <table class="table table-hover">
                <tr ng-repeat="item in itemkriteria.item">
                  <td class="align-middle" style="width:20%">{{item.subkriteria.subkriteria}}</td>
                  <td>
                    <table class="table">
                      <tr>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)"
                            value="0.11111111111111">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="0.125">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)"
                            value="0.14285714285714">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)"
                            value="0.16666666666667">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="0.2">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="0.25">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)"
                            value="0.33333333333333">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="0.5">
                        </td>
                        <td>
                          =
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="2">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="3">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="4">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="5">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="6">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="7">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="8">
                        </td>
                        <td>
                          <input type="radio" name="optionsRadios{{itemkriteria.idkriteria}}{{$index+1}}"
                            id="optionsRadios1" ng-model="item.bobot" ng-change="setNilai(item)" value="9">
                        </td>
                      </tr>
                      <tr>
                        <td>
                          9
                        </td>
                        <td>
                          8
                        </td>
                        <td>
                          7
                        </td>
                        <td>
                          6
                        </td>
                        <td>
                          5
                        </td>
                        <td>
                          4
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          2
                        </td>
                        <td>
                          1
                        </td>
                        <td>
                          2
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          4
                        </td>
                        <td>
                          5
                        </td>
                        <td>
                          6
                        </td>
                        <td>
                          7
                        </td>
                        <td>
                          8
                        </td>
                        <td>
                          9
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="align-middle text-right" style="width:20%">
                    {{item.subkriteria1.subkriteria}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="col-md-12">
            <button class="btn btn-warning" ng-click="checkcr()">Check CR</button>
            <button class="btn btn-primary" ng-click="simpanbobot()">Simpan</button>
          </div>
        </div>
        <div ng-show="!bobot">
          <div class="col-md-6" ng-repeat="itemkriteria in nilai.datahitung" style="margin-top:12px">
            <div class="box-header">
              <h4 class="box-title">{{itemkriteria.name}}</h4>
            </div>
            <div class="box table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <td>{{itemkriteria.name}}</td>
                    <td ng-repeat="item in itemkriteria.sub">
                      {{item.subkriteria}}
                    </td>
                    <td>Priority</td>
                  </tr>
                </thead>
                <tbody ng-repeat="bobot1 in itemkriteria.matrix">
                  <tr>
                    <td>
                      {{itemkriteria.sub[$index].subkriteria}}
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
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                  <h4><i class="icon fa fa-check"></i>Nilai CR: {{itemkriteria.cr}} (Konsisten)
                  </h4>
                </div>
                <div class="alert alert-danger alert-dismissible" ng-show="itemkriteria.cr>0.1">
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                  <h4><i class="icon fa fa-ban"></i>Nilai CR: {{itemkriteria.cr}} (Tidak
                    Konsisten)
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.tab-pane -->
      <!-- /.tab-pane -->
    </div>
    <!-- /.tab-content -->
  </div>

  <div class="modal fade" id="add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">{{titledialog}}</h4>
        </div>
        <div class="modal-body">
          <form ng-submit="simpan()">
            <div class="form-group">
              <label for="">Sub Kriteria</label>
              <input type="text" class="form-control" ng-model="model.subkriteria" placeholder="Sub Kriteria">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</div>
