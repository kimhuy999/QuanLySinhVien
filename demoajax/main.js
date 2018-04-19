/*    
 <script src="../models/NguoiDung.js"></script>
 <script src="../models/DanhSachNguoiDung.js"></script>
 */

$(document).ready(function () {

    //Khởi tạo đối tượng danhSachNguoiDung
    var danhSachNguoiDung = new DanhSachNguoiDung();

    //Cài đặt sự kiện cho nút 
    $("#btnThemNguoiDung").click(function () {
        //Khi nút btnThemNguoiDung được click thì gọi nút btnModal click theo
        $("#btnModal").trigger("click");
        var modalTitle = "Thêm người dùng";
        var modalFooter = `
            <button type="button" id="btnThemND" class="btn btn-success" >Thêm người dùng</button>
            <button type="button" id="btnDong" class="btn btn-danger"  data-dismiss="modal">Đóng</button>
        `;
        $(".modal-title").html(modalTitle);
        $(".modal-footer").html(modalFooter);
    });




    $("body").delegate("#btnThemND", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sodt = $("#SoDienThoai").val();
        //Khởi tạo đối tượng người dùng từ giá trị các thẻ input người dùng nhập vào
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, sodt);
        var diem = Math.floor(Math.random() * 1000);
        nguoiDung.Diem = diem;
        danhSachNguoiDung.ThemNguoiDung(nguoiDung);
        //Hiển thị họp thoại thêm thành công
        swal("Thêm thành công!", "Người dùng đã được thêm!", "success");
        $("#btnDong").trigger("click");
        //Load datatable
        LoadDataTable(danhSachNguoiDung.DSND);
        // console.log(danhSachNguoiDung);

        VeBieuDo();
      

    });

    //Khởi tạo đối tượng service
    var serviceNguoiDung = new NguoiDungService();
    //Gọi service LayDanhSachNguoiDung
    serviceNguoiDung.LayDanhSachNguoiDung().done(
        function(ketqua)
        {
            danhSachNguoiDung.DSND = ketqua;
            LoadDataTable(danhSachNguoiDung.DSND);
            // console.log(danhSachNguoiDung.DSND);
        }
    ).fail(
        function(error){
            console.log(error);
        }
    );

    function LoadDataTable(DSND) {
        var noiDungTable = "";
        for (var i = 0; i < DSND.length; i++) {
            var nguoiDung = DSND[i];
            noiDungTable += `
                <tr class="trNguoiDung">
                    <td> <input type="checkbox" class="ckbTaiKhoan" value = "${nguoiDung.TaiKhoan}"> </td>
                    <td>  ${nguoiDung.TaiKhoan} </td>
                    <td>  ${nguoiDung.MatKhau} </td>
                    <td>  ${nguoiDung.HoTen} </td>
                    <td>  ${nguoiDung.Email} </td>
                    <td>  ${nguoiDung.SoDT}</td>
                </tr>
              `
        }
        $("#tblDanhSachNguoiDung").html(noiDungTable);

    }


    $("#input-search").keydown(function () {
        var tukhoa = $(this).val();
        var danhSachKetQua = danhSachNguoiDung.TimKiemNguoiDung(tukhoa);
        //sau khi tìm được
        LoadDataTable(danhSachKetQua.DSND);
    })
    var danhSachKH = new DanhSachKhoaHoc();
    $("#navKhoaHoc").click(function(){
         var serv = new KhoaHocService();
        serv.LayDanhSachKhoaHoc().done(
            function(dskh)
            {
                danhSachKH.DSKH = dskh ;
                LoadDataTableKH(danhSachKH.DSKH)   ;  
                console.log(danhSachKH.DSKH);
            }
            ).fail(
            function(error){
            console.log(error);
        });
   

    })
        
       

    function LoadDataTableKH(DSKH) {
        var noiDungTable = "";
        for (var i = 0; i < DSKH.length; i++) {
            var khoaHoc = DSKH[i];
            noiDungTable += `
                <tr class="trNguoiDung">
                    <td> ${khoaHoc.MaKhoaHoc} </td>
                    <td>  ${khoaHoc.TenHoaHoc} </td>
                    <td>  ${khoaHoc.MoTa} </td>
                    <td>  ${khoaHoc.HinhAnh} </td>
                    <td>  ${khoaHoc.LuotXem} </td>
                    <td>  ${khoaHoc.NguoiTao}</td>
                </tr>
              `
        }
        $("#tblDanhSachKhoaHoc").html(noiDungTable);

    }

$("#btnLoadKhoaHoc").click(function() {
    $("#btnModal").trigger("click");
    var modalHeader = "Thêm Khóa Học";
    var modalBody = `
             <div class="form-group">
              <label>Mã Khóa Học</label>
              <input id="MaKhoaHoc" class="form-control" placeholder="Nhập vào mã khóa học">
            </div>
            <div class="form-group">
              <label>Tên Khóa Học</label>
              <input id="TenHoaHoc" class="form-control" placeholder="Nhập vào tên khóa học">
            </div>
            <div class="form-group">
              <label>Mô Tả</label>
              <input id="MoTa" class="form-control" placeholder="Nhập vào mô tả">
            </div>
            <div class="form-group">
              <label>Hình Ảnh</label>
              <input id="HinhAnh" class="form-control" placeholder="Nhập vào hình ảnh">
            </div>
            <div class="form-group">
              <label>Lượt Xem</label>
              <input id="LuotXem"  class="form-control" placeholder="Nhập vào lượt xem">
            </div>
            <div class="form-group">
              <label>Người Tạo</label>
              <input id="NguoiTao"  class="form-control" placeholder="Nhập vào người tạo">
            </div>
    `;
    var modalFooter = `
            <button type="button" id="btnThemKhoaHoc" class="btn btn-success" >Thêm Khóa Học</button>
            <button type="button" id="btnDong" class="btn btn-danger"  data-dismiss="modal">Đóng</button>
    `;
    $(".modal-title").html(modalHeader);
    $(".modal-body").html(modalBody);
    $(".modal-footer").html(modalFooter);
})
    
    $("body").delegate("#btnThemKhoaHoc","click",function(){
        var maKhoaHoc = $("#MaKhoaHoc").val();
        var tenKhoaHoc = $("#TenHoaHoc").val();
        var moTa = $("#MoTa").val();
        var hinhAnh = $("#HinhAnh").val();
        var luotXem = $("#LuotXem").val();
        var nguoiTao = $("#NguoiTao").val();
        var khoaHoc = new KhoaHoc (maKhoaHoc,tenKhoaHoc,moTa,hinhAnh,luotXem,nguoiTao);
        var svKhoaHoc = new KhoaHocService();
        svKhoaHoc.ThemKhoaHoc(khoaHoc);
        $("#btnDong").trigger("click");
        console.log(khoaHoc);
        
    })

    




    // $("#btnTimKiemNguoiDung").click(function(){
    //     $("#tblNguoiDung").fadeOut();

    // });
    //Xử lý sự kiện cho nút  thêm người dùng để hiển thị popup
    // $("#btnThemNguoiDung").click(function () {
    //     var modalHeader = `Thêm người dùng`;
    //     var modalFooter = `
    //     <button type="button" id="btnThemND" class="btn btn-success" >Thêm người dùng</button>
    //     <button type="button" id="btnDong" class="btn btn-danger"  data-dismiss="modal">Đóng</button>
    //      `;
    //     $(".modal-title").html(modalHeader);
    //     $(".modal-footer").html(modalFooter);
    //     $("#btnModal").trigger("click");
    // });

    // //Xử lý sự kiện cho nút thêm người dùng 
    // $("body").delegate("#btnThemND", "click", ThemNguoiDung);

    // var danhSachNguoiDung = new DanhSachNguoiDung();
    // function ThemNguoiDung() {
    //     //Dom bằng jquery
    //     var taiKhoan = $("#TaiKhoan").val();
    //     var hoTen = $("#HoTen").val();
    //     var matKhau = $("#MatKhau").val();
    //     var email = $("#Email").val();
    //     var sodt = $("#SoDienThoai").val();
    //     //Fill vào đối tượng
    //     var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, sodt);
    //     // random điểm
    //     var diem = Math.floor(Math.random() * 10);
    //     nguoiDung.Diem = diem;

    //     //Gọi phương thức thêm người dùng
    //     danhSachNguoiDung.ThemNguoiDung(nguoiDung);
    //     //Load table người dùng
    //     loadNguoiDungTable(danhSachNguoiDung.DSND);
    //     //Hiển thị hộp thoại sweetalert
    //     swal("Thêm thành công", "Hoàn tất!", "info");
    //     //Gọi nút button đóng click
    //     $("#btnDong").trigger("click");
    //     VeBieuDo();
    // }

    // function loadNguoiDungTable(DSND) {
    //     //Không dùng document thử dùng với jquery
    //     // $("#tblDanhSachNguoiDung").html("");
    //     var noiDungTable = "";
    //     for (var i = 0; i < DSND.length; i++) {
    //         var nguoiDung = DSND[i];
    //         noiDungTable += `
    //             <tr class="trNguoiDung">
    //                 <td> <input type="checkbox" class="ckbTaiKhoan" value = "${nguoiDung.TaiKhoan}"> </td>
    //                 <td>  ${nguoiDung.TaiKhoan} </td>
    //                 <td>  ${nguoiDung.MatKhau} </td>
    //                 <td>  ${nguoiDung.HoTen} </td>
    //                 <td>  ${nguoiDung.Email} </td>
    //                 <td>  ${nguoiDung.SoDienThoai}</td>
    //             </tr>
    //           `
    //     }
    //     $("#tblDanhSachNguoiDung").html(noiDungTable);
    // }

    VeBieuDo();
    //Thống kê
    function VeBieuDo() {

        Highcharts.chart('container', {

            title: {
                text: 'Thống kê điểm người dùng !'
            },

            subtitle: {
                text: 'Thống kê điểm'
            },

            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Installation',
                data: danhSachNguoiDung.ThongKeDiem
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }


});