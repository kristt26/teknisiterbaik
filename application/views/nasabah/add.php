<div class="row">
    <div class="col-md-12">
      	<div class="box box-info">
            <div class="box-header with-border">
              	<h3 class="box-title">Tambah Nasabah</h3>
            </div>
            <?php echo form_open('nasabah/add'); ?>
          	<div class="box-body">
          		<div class="row clearfix">
					<div class="col-md-6">
						<label for="nik" class="control-label">NIK</label>
						<div class="form-group">
							<input type="text" name="nik" value="<?php echo $this->input->post('nik'); ?>" class="form-control" id="nik" />
						</div>
					</div>
					<div class="col-md-6">
						<label for="nama" class="control-label">Nama</label>
						<div class="form-group">
							<input type="text" name="nama" value="<?php echo $this->input->post('nama'); ?>" class="form-control" id="nama" />
						</div>
					</div>
					<div class="col-md-6">
						<label for="jk" class="control-label">Jenis Kelamin</label>
						<div class="form-group">
							<select name="jeniskelamin" id="jk" class="form-control" required="required">
								<option value="<?php echo $this->input->post('jeniskelamin'); ?>"><?php echo $this->input->post('jeniskelamin'); ?></option>
								<option value="L">L</option>
								<option value="P">P</option>
							</select>
						</div>
					</div>
					<div class="col-md-6">
						<label for="kontak" class="control-label">Kontak</label>
						<div class="form-group">
							<input type="text" name="kontak" value="<?php echo $this->input->post('kontak'); ?>" class="form-control" id="kontak" />
						</div>
					</div>
					<div class="col-md-6">
						<label for="pekerjaan" class="control-label">Pekerjaan</label>
						<div class="form-group">
							<input type="text" name="pekerjaan" value="<?php echo $this->input->post('pekerjaan'); ?>" class="form-control" id="pekerjaan" />
						</div>
					</div>
					<div class="col-md-6">
						<label for="alamat" class="control-label">Alamat</label>
						<div class="form-group">
							<textarea name="alamat" id="alamat" class="form-control" rows="4"><?php echo $this->input->post('alamat'); ?></textarea>
						</div>
					</div>
				</div>
			</div>
          	<div class="box-footer">
            	<button type="submit" class="btn btn-success">
            		<i class="fa fa-check"></i> Save
            	</button>
          	</div>
            <?php echo form_close(); ?>
      	</div>
    </div>
</div>