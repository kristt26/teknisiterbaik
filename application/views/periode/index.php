<div class="row">
    <div class="col-md-12">
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Data Periode</h3>
            	<div class="box-tools">
                    <a href="<?php echo site_url('periode/add'); ?>" class="btn btn-success btn-sm">Add</a> 
                </div>
            </div>
            <div class="box-body">
                <table class="table table-striped">
                    <tr>
						<th width="5%">No</th>
						<th>Periode</th>
						<th width="10%">Status</th>
						<th width="10%">Actions</th>
                    </tr>
                    <?php foreach($periode as $key => $p){ ?>
                    <tr>
						<td><?php echo $key + 1 ; ?></td>
						<td><?php echo $p['periode']; ?></td>
						<td><?php echo $p['status']=='true' ? 'AKTIF':'TIDAK AKTIF'; ?></td>
						<td>
                            <a href="<?php echo site_url('periode/edit/'.$p['idperiode']); ?>" class="btn btn-info btn-xs"><span class="fa fa-pencil"></span> Edit</a> 
                            <a href="<?php echo site_url('periode/remove/'.$p['idperiode']); ?>" class="btn btn-danger btn-xs"><span class="fa fa-trash"></span> Delete</a>
                        </td>
                    </tr>
                    <?php } ?>
                </table>
                                
            </div>
        </div>
    </div>
</div>
