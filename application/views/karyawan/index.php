<div class="row">
    <div class="col-md-12">
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Data Teknisi</h3>
            	<div class="box-tools">
                    <a href="<?php echo site_url('karyawan/add'); ?>" class="btn btn-success btn-sm">Add</a> 
                </div>
            </div>
            <div class="box-body">
                <table class="table table-striped">
                    <tr>
						<th width="5%">No</th>
						<th>Nama</th>
						<th width="10%">Actions</th>
                    </tr>
                    <?php foreach($karyawan as $key=>$k){ ?>
                    <tr>
						<td><?php echo $key+1; ?></td>
						<td><?php echo $k['nama']; ?></td>
						<td>
                            <a href="<?php echo site_url('karyawan/edit/'.$k['idkaryawan']); ?>" class="btn btn-info btn-xs"><span class="fa fa-pencil"></span> Edit</a> 
                            <a href="<?php echo site_url('karyawan/remove/'.$k['idkaryawan']); ?>" class="btn btn-danger btn-xs"><span class="fa fa-trash"></span> Delete</a>
                        </td>
                    </tr>
                    <?php } ?>
                </table>
                                
            </div>
        </div>
    </div>
</div>
