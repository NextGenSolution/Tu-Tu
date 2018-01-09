using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Tu_Tu.Model.Entities
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }

        public string NotificationMsg { get; set; }

        public DateTime DateTime { get; set; }
    }
}