function DanhSachNguoiDung()
{
    this.DSND = [];
    this.ThongKeDiem = [];

    this.ThemNguoiDung = function(nguoidung)
    {
        this.DSND.push(nguoidung);
        this.ThongKeDiem.push(nguoidung.Diem);
    }

    this.XoaSinhVien = function (lstTaiKhoanXoa)
    {
        for(var i=0;i< lstTaiKhoanXoa.length ;i++)
        {
            for(var j=0; j < this.DSND.length ; j++ )
            {
                var nguoidung = this.DSND[j];
                if(lstTaiKhoanXoa[i] == nguoidung.TaiKhoan)
                {
                    this.DSND.splice(j,1);
                }
            }
        }
    }
    this.SuaNguoiDung = function (nguoiDungCapNhat)
    {
        for(var i=0;i<this.DSND.length;i++)
        {
            var nguoiDungUpdate = this.DSND[i];
            if(nguoiDungUpdate.TaiKhoan == nguoiDungCapNhat.TaiKhoan)
            {
                svUpdate.MatKhau = nguoiDungCapNhat.MatKhau;
                svUpdate.HoTen = nguoiDungCapNhat.HoTen;
                svUpdate.Email = nguoiDungCapNhat.Email;
                svUpdate.SoDienThoai = nguoiDungCapNhat.SoDienThoai;
            }
        }
    }
    this.TimKiemNguoiDung = function (tukhoa)
    {
        //List kết quả tìm kiếm : DanhSachSinhVien
        var lstKetQuaTimKiem = new DanhSachNguoiDung();
        for(var i=0 ; i< this.DSND.length ; i++)
        {
            var nguoiDung = this.DSND[i];
            //Kiểm tra từ khóa có nằm trong họ tên hay ko
            if(nguoiDung.HoTen.toLowerCase().trim().search(tukhoa.toLowerCase().trim()) != -1)
            {
                lstKetQuaTimKiem.ThemNguoiDung(nguoiDung);
            }
        }
        return lstKetQuaTimKiem;
    }
    this.TimNguoiDungTheoTaiKhoan = function(TaiKhoan)
    {
        for(var i=0;i<this.DSND.length;i++)
        {
            var nguoiDung = this.DSND[i];
           
            if(nguoiDung.TaiKhoan === TaiKhoan)
            {
                return nguoiDung;
            }
        }
        return null;
    }
}