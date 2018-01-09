using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tu_Tu.Model.Entities
{
    public class UserBadges
    {
        [Key]
        public int UBId { get; set; }
        public int User { get; set; }
        public int Badge { get; set; }
        public int count { get; set; }
    }
}
