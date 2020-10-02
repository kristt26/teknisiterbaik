<div class="row">
    <div class="col-md-12">
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Data Teknisi</h3>
            	<div class="box-tools">
                    <a href="<?php echo site_url('nasabah/add'); ?>" class="btn btn-success btn-sm">Add</a>
                </div>
            </div>
            <div class="box-body">
                <table class="table table-striped">
                    <tr>
						<th width="5%">No</th>
						<th>NIK`</th>
						<th>Nama</th>
						<th>Jenis Kelamin</th>
						<th>Kontak</th>
						<th>Pekerjaan</th>
						<th>Alamat</th>
						<th width="10%">Actions</th>
                    </tr>
                    <?php foreach ($nasabah as $key => $k) {?>
                    <tr>
						<td><?php echo $key + 1; ?></td>
						<td><?php echo $k['nik']; ?></td>
						<td><?php echo $k['nama']; ?></td>
						<td><?php echo $k['jeniskelamin']; ?></td>
						<td><?php echo $k['kontak']; ?></td>
						<td><?php echo $k['pekerjaan']; ?></td>
						<td><?php echo $k['alamat']; ?></td>
						<td>
                            <a href="<?php echo site_url('nasabah/edit/' . $k['idnasabah']); ?>" class="btn btn-info btn-xs"><span class="fa fa-pencil"></span> Edit</a>
                            <a href="<?php echo site_url('nasabah/remove/' . $k['idnasabah']); ?>" class="btn btn-danger btn-xs"><span class="fa fa-trash"></span> Delete</a>
                        </td>
                    </tr>
                    <?php }?>
                </table>

            </div>
        </div>
    </div>
</div>
