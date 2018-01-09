using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tu_Tu.Model.Entities
{
    public class User_TuTU
    {
        [Key]
        public int uid { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string companyName { get; set; }
        public IList<Activity> Activities { get; set; }
        public string avatar { get; set; }
        public int adminId { get; set; }

    }
}