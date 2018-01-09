using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tu_Tu.VIew_Models
{
    public class ListTeamViewModel
    {
        public List<ActivityDetailVIewModel> listbox { get; set; }

        public List<ActivityDetailVIewModel> listTeamOne { get; set; }

        public List<ActivityDetailVIewModel> listTeamTwo { get; set; }
    }
}