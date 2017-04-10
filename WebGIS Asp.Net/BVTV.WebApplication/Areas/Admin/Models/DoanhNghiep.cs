﻿using BVTV.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace BVTV.WebApplication.Areas.Admin.Models
{
    public class DoanhNghiep:DOANHNGHIEP
    {
        [DisplayName("Mã")]
        public string MaDoanhNghiep { get; set; }
        [DisplayName("Tên")]
        public string NguoiDaiDienDoanhNghiep { get; set; }
        [DisplayName("Địa chỉ")]
        public string SoNha { get; set; }
        public string TenDuong { get; set; }
        public string MaPhuongXa { get; set; }
        public string MaHuyenTP { get; set; }
        public string Website { get; set; }
        [DisplayName("Địa chỉ kho")]
        public string DiaChiKho { get; set; }
        [DisplayName("Tên cán bộ phụ trách")]
        public string TenCBPhuTrach { get; set; }
        public string Email { get; set; }
        [DisplayName("Loại đơn vị SXKD")]
        public Nullable<short> LoaiDonViSXKD { get; set; }
        [DisplayName("Danh mục sản phẩm")]
        public Nullable<short> DanhMucSanPham { get; set; }
        [DisplayName("Giấy phép SXKD")]
        public byte[] GiayPhepSXKD { get; set; }
        [DisplayName("Sản lượng trong năm")]
        public Nullable<short> SanLuongTrongNam { get; set; }
        [DisplayName("Giấy chứng nhận")]
        public byte[] GiayCNDuDieuKienSXKD { get; set; }
        [DisplayName("Đánh giá xếp loại")]
        public Nullable<short> DanhGiaXepLoai { get; set; }
        [DisplayName("Thời gian thanh tra")]
        public Nullable<System.DateTime> ThoiGianThanhTra { get; set; }
        [DisplayName("Nguyên nhân thanh tra")]
        public Nullable<short> NguyenNhanThanhTra { get; set; }
        [DisplayName("Hình thức phạt")]
        public Nullable<short> HinhThucPhat { get; set; }
        [DisplayName("Mức phạt")]
        public Nullable<short> MucPhat { get; set; }
        public string MaHoSoLuuTru { get; set; }
        public Nullable<short> SoLanViPham { get; set; }
        [DisplayName("Số điện thoại")]
        public string DienThoai { get; set; }
        public string Fax { get; set; }
        public Nullable<System.DateTime> NgayCapNhat { get; set; }
        [DisplayName("Người cập nhật")]
        public string NguoiCapNhat { get; set; }
        public System.Data.Entity.Spatial.DbGeometry SHAPE { get; set; }
        [DisplayName("Tên đơn vị")]
        public string TenDonViDoanhNghiep { get; set; }
    }
}

