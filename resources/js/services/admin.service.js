angular
	.module('admin.service', ['helper.service'])
	.factory('PeriodeService', PeriodeService)
	.factory('KriteriaService', KriteriaService)
	.factory('AnalisaService', AnalisaService);

function PeriodeService($http, $q, helperServices) {
	var url = helperServices.url + '/periode/';
	var service = {
		Items: []
	};
	service.getPeriodeAktif = function () {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'GET',
				url: url + 'getperiodeaktif',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(
				(response) => {
					def.resolve(response.data);
				},
				(err) => {
					swal("Information!", err.data, "error");
					def.reject(err);
				}
			);
		}
		return def.promise;
	};
	service.get = function () {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'GET',
				url: url + 'getdata',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(
				(response) => {
					def.resolve(response.data);
				},
				(err) => {
					swal("Information!", err.data, "error");
					def.reject(err);
				}
			);
		}
		return def.promise;
	};
	return service;
}
function KriteriaService($http, $q, helperServices) {
	var url = helperServices.url + '/kriterium/';
	var service = {
		Items: []
	};
	service.get = function () {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'GET',
				url: url + 'getkriteria',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(
				(response) => {
					service.instance = true;
					service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					swal("Information!", err.data, "error");
					def.reject(err);
				}
			);
		}
		return def.promise;
	};
	service.checkcr = function (item) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: url + 'checkcr',
			headers: {
				'Content-Type': 'application/json'
			},
			data: item
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};
	service.post = function (item) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: url + 'add',
			headers: {
				'Content-Type': 'application/json'
			},
			data: item
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};
	service.addKriteria = function (item) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: url + 'addkriteria',
			headers: {
				'Content-Type': 'application/json'
			},
			data: item
		}).then(
			(response) => {
				service.Items.kriteria.push(response.data)
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};
	service.editKriteria = function (item) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: url + 'editkriteria',
			headers: {
				'Content-Type': 'application/json'
			},
			data: item
		}).then(
			(response) => {
				var data = service.Items.kriteria.find((x) => x.idkriteria == item.idkriteria);
				if (data) {
					data.kriteria = item.kriteria;
				}
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};
	service.removeKriteria = function (id) {
		var def = $q.defer();
		$http({
			method: 'delete',
			url: url + 'remove/' + id,
		}).then(
			(response) => {
				var data = service.Items.kriteria.find((x) => x.idkriteria == id);
				var index = service.Items.kriteria.indexOf(data);
				service.Items.kriteria.splice(index, 1);
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};
	return service;
}
function AnalisaService($http, $q, helperServices) {
	var url = helperServices.url + '/analisa/';
	var service = {
		Items: []
	};
	service.get = function () {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'GET',
				url: url + 'getkaryawan',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(
				(response) => {
					service.instance = true;
					service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					swal("Information!", err.data, "error");
					def.reject(err);
				}
			);
		}
		return def.promise;
	};
	service.getLaporan = function (id) {
		var def = $q.defer();
		$http({
			method: 'GET',
			url: url + 'getLaporan/' + id,
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(
			(response) => {
				service.instance = true;
				service.Items = response.data;
				def.resolve(service.Items);
			},
			(err) => {
				swal("Information!", err.data, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};
	service.checkcr = function (item) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: url + 'checkcr',
			headers: {
				'Content-Type': 'application/json'
			},
			data: item
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data.message, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};
	service.post = function (item) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: url + 'addnilai',
			headers: {
				'Content-Type': 'application/json'
			},
			data: item
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				swal("Information!", err.data, "error");
				def.reject(err);
			}
		);
		return def.promise;
	};
	return service;
}