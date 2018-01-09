using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tu_Tu.ViewModels
{
    public class ActivityViewModels
    {
        public string title { get; set; }
        public string description { get; set; }
        public string categoryName { get; set; }
        public string expiryDate { get; set; }
        public string attachemts { get; set; }
        public string assignee { set; get; }
        public string status { get; set; }
        public int starCount { get; set; }
    }
}