//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BVTV.Entity
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;

    public partial class SAUBENH
    {
        public int OBJECTID { get; set; }
        [DisplayName("Nhóm cây trồng")]
        public Nullable<short> NhomCayTrong { get; set; }
        [DisplayName("Loại cây trồng")]
        public string LoaiCayTrong { get; set; }
        [DisplayName("Tên sâu bệnh gây hại")]
        public string TenSauBenhGayHai { get; set; }
        [DisplayName("Mật độ sâu bệnh gây hại")]
        public Nullable<short> MatDoSauBenhGayHai { get; set; }
        [DisplayName("Phạm vi ảnh ưởng")]
        public Nullable<short> PhamViAnhHuong { get; set; }
        [DisplayName("Mức độ ảnh hưởng")]
        public Nullable<short> MucDoAnhHuong { get; set; }
        [DisplayName("Thời gian gây hại")]
        public Nullable<short> ThoiGianGayHai { get; set; }
        [DisplayName("Cấp độ gây hại")]
        public Nullable<short> CapDoGayHai { get; set; }
        [DisplayName("Tình hình kiểm soát dịch bệnh")]
        public Nullable<short> TinhHinhKiemSoatDichBenh { get; set; }
        [DisplayName("Mức độ kiểm soát")]
        public Nullable<short> MucDoKiemSoat { get; set; }
        [DisplayName("Biện pháp xử lý")]
        public string BienPhapXuLy { get; set; }
        [DisplayName("Diện tích")]
        public Nullable<decimal> DienTich { get; set; }
        [DisplayName("Huyện/TP")]
        public string MaHuyenTP { get; set; }
        [DisplayName("Giai đoạn sinh trưởng")]
        public Nullable<int> GiaiDoanSinhTruong { get; set; }
        [DisplayName("Ngày cập nhật")]
        public Nullable<System.DateTime> NgayCapNhat { get; set; }
        [DisplayName("Người cập nhật")]
        public string NguoiCapNhat { get; set; }
        [DisplayName("Mã sâu bệnh")]
        public string MaSauBenh { get; set; }
        public Nullable<System.DateTime> NgayXayRa { get; set; }
        public string SauBenhGayHai { get; set; }
        public System.Data.Entity.Spatial.DbGeometry SHAPE { get; set; }
    }
}
