<div class="row" ng-app="app" ng-controller="KriteriaController">
    <div class="col-md-12">
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Data Kriteria</h3>
                <div class="box-tools">
                    <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#add">
                        <i class="fa fa-plus"></i> Tambah
                    </button>

                </div>
            </div>
            <div class="box-body">
                <table class="table table-striped">
                    <tr>
                        <th width="5%">No</th>
                        <th>Kriteria</th>
                        <th width="15%">Actions</th>
                    </tr>
                    <tr ng-repeat="item in datas.kriteria">
                        <td>{{$index+1}}</td>
                        <td>{{item.kriteria}}</td>
                        <td>
                            <a class="btn btn-info btn-sm" ng-click="edit(item)"><span class="fa fa-pencil"></span> Edit</a>
                            <a class="btn btn-danger btn-sm" ng-click="delete(item)"><span class="fa fa-trash"></span> Delete</a>
                        </td>
                    </tr>
                </table>

            </div>
        </div>
    </div>
    <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form ng-submit="simpan()">
                    <div class="modal-header">
                        <h5 class="modal-title">Tambah Kriteria</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Kriteria</label>
                            <input type="text" class="form-control" placeholder="Kriteria" ng-model="model.kriteria" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>