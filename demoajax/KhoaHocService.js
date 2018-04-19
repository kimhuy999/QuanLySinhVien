function KhoaHocService() {
	this.LayDanhSachKhoaHoc = function () {
		var urlAPI = 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc';
		return $.ajax({
			type:"GET",
			url:urlAPI
		});
	}
	this.ThemKhoaHoc = function(KH) {
		var urlAPI_ = 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc';
		return $.ajax({
			type: "POST",
			url:urlAPI_,
			dataType: "json",
			data:KH

		});
	}
}