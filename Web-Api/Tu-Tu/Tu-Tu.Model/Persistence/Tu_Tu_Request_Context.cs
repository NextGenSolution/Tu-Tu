using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tu_Tu.Model.Entities;

namespace Tu_Tu.Model.Persistence
{
    public class Tu_Tu_Request_Context : IdentityDbContext<IdentityUser>
    {
        public Tu_Tu_Request_Context()
            :base("AuthCon")
        {

        }
        public DbSet<Notification> Notification { get; set; }

        public DbSet<User_TuTU> UserTu_Tu { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Badge> Badges { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<UserBadges> userBadgeCount { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<RatedTasks> RatedTasks { get; set; }

    }
}
