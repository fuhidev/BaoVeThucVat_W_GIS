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
    
    public partial class News
    {
        public int id { get; set; }
        public string title { get; set; }
        public string full_content { get; set; }
        public string description { get; set; }
        public string author { get; set; }
        public Nullable<System.DateTime> create_date { get; set; }
        public Nullable<System.DateTime> last_modify_date { get; set; }
        public Nullable<int> category { get; set; }
        public Nullable<int> status { get; set; }
        public string last_user_modify { get; set; }
    }
}
