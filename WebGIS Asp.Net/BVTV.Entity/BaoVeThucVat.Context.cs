﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BaoVeThucVatEntities : DbContext
    {
        public BaoVeThucVatEntities()
            : base("name=BaoVeThucVatEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<DanhMucCayTrongRauMau> DanhMucCayTrongRauMaus { get; set; }
        public virtual DbSet<DOANHNGHIEP> DOANHNGHIEPs { get; set; }
        public virtual DbSet<HANHCHINHHUYEN> HANHCHINHHUYENs { get; set; }
        public virtual DbSet<MATDUONGBO> MATDUONGBOes { get; set; }
        public virtual DbSet<NhomCayTrong> NhomCayTrongs { get; set; }
        public virtual DbSet<PHUBEMAT> PHUBEMATs { get; set; }
        public virtual DbSet<QUYHOACHSUDUNGDAT> QUYHOACHSUDUNGDATs { get; set; }
        public virtual DbSet<SAUBENH> SAUBENHs { get; set; }
        public virtual DbSet<SONGHO> SONGHOes { get; set; }
        public virtual DbSet<TIMDUONG> TIMDUONGs { get; set; }
        public virtual DbSet<TRONGTROT> TRONGTROTs { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<CONGNGHECAO> CONGNGHECAOs { get; set; }
        public virtual DbSet<GIAPHANBON_THUOCBVTT_NONGSAN_GIONG> GIAPHANBON_THUOCBVTT_NONGSAN_GIONG { get; set; }
        public virtual DbSet<GIONGCAYTRONG> GIONGCAYTRONGs { get; set; }
        public virtual DbSet<NGUOIDUNG> NGUOIDUNGs { get; set; }
        public virtual DbSet<NGUOIDUNG_NHOMQUYEN> NGUOIDUNG_NHOMQUYEN { get; set; }
        public virtual DbSet<SAUBENHGAYHAI> SAUBENHGAYHAIs { get; set; }
    }
}
