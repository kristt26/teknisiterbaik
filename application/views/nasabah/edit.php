<div class="row">
    <div class="col-md-12">
      	<div class="box box-info">
            <div class="box-header with-border">
              	<h3 class="box-title">Nasabah Edit</h3>
            </div>
			<?php echo form_open('nasabah/edit/' . $nasabah['idnasabah']); ?>
			<div class="box-body">
				<div class="row clearfix">
				<div class="col-md-6">
						<label for="nik" class="control-label">NIK</label>
						<div class="form-group">
							<input type="text" name="nik" value="<?php echo ($this->input->post('nik') ? $this->input->post('nik') : $nasabah['nik']); ?>" class="form-control" id="nik" />
						</div>
					</div>
					<div class="col-md-6">
						<label for="nama" class="control-label">Nama</label>
						<div class="form-group">
							<input type="text" name="nama" value="<?php echo ($this->input->post('nama') ? $this->input->post('nama') : $nasabah['nama']); ?>" class="form-control" id="nama" />
						</div>
					</div>
					<div class="col-md-6">
						<label for="jk" class="control-label">Jenis Kelamin</label>
						<div class="form-group">
							<select name="jeniskelamin" id="jk" class="form-control" required="required">
								<option value="<?php echo ($this->input->post('jeniskelamin') ? $this->input->post('jeniskelamin') : $nasabah['jeniskelamin']); ?>"><?php echo ($this->input->post('jeniskelamin') ? $this->input->post('jeniskelamin') : $nasabah['jeniskelamin']); ?></option>
								<option value="L">L</option>
								<option value="P">P</option>
							</select>
						</div>
					</div>
					<div class="col-md-6">
						<label for="kontak" class="control-label">Kontak</label>
						<div class="form-group">
							<input type="text" name="kontak" value="<?php echo ($this->input->post('kontak') ? $this->input->post('kontak') : $nasabah['kontak']); ?>" class="form-control" id="kontak" />
						</div>
					</div>
					<div class="col-md-6">
						<label for="pekerjaan" class="control-label">Pekerjaan</label>
						<div class="form-group">
							<input type="text" name="pekerjaan" value="<?php echo ($this->input->post('pekerjaan') ? $this->input->post('pekerjaan') : $nasabah['pekerjaan']); ?>" class="form-control" id="pekerjaan" />
						</div>
					</div>
					<div class="col-md-6">
						<label for="alamat" class="control-label">Alamat</label>
						<div class="form-group">
							<textarea name="alamat" id="alamat" class="form-control" rows="4"><?php echo ($this->input->post('alamat') ? $this->input->post('alamat') : $nasabah['alamat']); ?></textarea>
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