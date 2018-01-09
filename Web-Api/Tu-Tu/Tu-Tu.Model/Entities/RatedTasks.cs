using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Tu_Tu.Model.Entities
{
    public class RatedTasks
    {
        [Key]
        public int id { get; set; }

        public DateTime date { get; set; }
        public string Title { get; set; }
        public int rateCount { get; set; }
    }
}