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
    
    public partial class SDE_xml_indexes
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SDE_xml_indexes()
        {
            this.SDE_xml_columns = new HashSet<SDE_xml_columns>();
            this.SDE_xml_index_tags = new HashSet<SDE_xml_index_tags>();
        }
    
        public int index_id { get; set; }
        public string index_name { get; set; }
        public string owner { get; set; }
        public int index_type { get; set; }
        public string description { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SDE_xml_columns> SDE_xml_columns { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SDE_xml_index_tags> SDE_xml_index_tags { get; set; }
    }
}