using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tu_Tu.VIew_Models
{
    public class ActivityDetailVIewModel
    {
        public string Description { get; set; }

        public string TItle { get; set; }

        public string assigner { get; set; }

        public int completeness { get; set; }

        public DateTime expiryDate { get; set; }

        public int starCount { get; set; }

        public string filePath { get; set; }
    }
}