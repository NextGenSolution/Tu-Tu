using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tu_Tu.VIew_Models
{
    public class TodoVIewModel
    {
        public ListTeamViewModel TodoItems { get; set; }

        public ListTeamViewModel  ProgressItems { get; set; }

        public ListTeamViewModel DoneItems { get; set; }
    }
}