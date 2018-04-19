function NguoiDungService()
{
    this.LayDanhSachNguoiDung = function(){
        var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung";
        return $.ajax({
            type:"GET",
            url:urlAPI
        })
    };
}