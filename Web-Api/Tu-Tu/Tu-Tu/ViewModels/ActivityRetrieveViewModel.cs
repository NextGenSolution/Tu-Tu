using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tu_Tu.VIew_Models
{
    public class ActivityRetrieveViewModel
    {
        public string actId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string categoryId { get; set; }
        public DateTime date { get; set; }
        public string expiryDate { get; set; }
        public string attachemts { get; set; }
        public string assigner { set; get; }
        public string assignee { set; get; }
        public string status { get; set; }
        public int completeness { get; set; }
        public int starCount { get; set; }
        public string filePath { get; set; }
        public int remainingDays { get; set; }
    }
}