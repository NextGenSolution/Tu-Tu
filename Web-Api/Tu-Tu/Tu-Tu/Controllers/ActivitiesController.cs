using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Description;
using Tu_Tu.Model.Entities;
using Tu_Tu.Model.Persistence;
using Tu_Tu.ViewModels;

namespace Tu_Tu.Controllers
{
    [Authorize]
    [RoutePrefix("api/Activities")]
    public class ActivitiesController : ApiController
    {
        private Tu_Tu_Request_Context db = new Tu_Tu_Request_Context();

        /// <summary>
        /// GET: return all the users registered for tha application under the active domain
        /// </summary>
        /// <returns>List of registered users</returns>
        [AllowAnonymous]
        [Route("getAllUsers")]
        public IQueryable<User_TuTU> getAllUsers()
        {
            return db.UserTu_Tu;
        }

       
        /// <summary>
        /// GET: search users
        /// </summary>
        /// <param name="term">search term</param>
        /// <returns>UserTu_Tu object that matches given search term</returns>
        [Route("searchUser")]
        [AllowAnonymous]
        public IQueryable<User_TuTU> getSearchUsers(String term)
        {
            return db.UserTu_Tu.Where(x=> x.name.Contains(term));
        }

        /// <summary>
        /// Get all the tasks from  the table
        /// </summary>
        /// <returns>List of all the tasks</returns>
        [Route("allTasks")]
        [AllowAnonymous]
        public IQueryable<Activity> GetAllTasks()
        {
            return db.Activities;
        }

        /// <summary>
        /// Get the tasks matching the search term
        /// </summary>
        /// <param name="term">search term</param>
        /// <returns>list of tasks matching the search term</returns>
        [Route("searchTasks")]
        [AllowAnonymous]
        [HttpGet]
        public IQueryable<Activity> GetSearchedTasks(String term)
        {
            return db.Activities.Where(x=> x.title.Contains(term));
        }

        /// <summary>
        ///GET: all tasks creted my logged in user
        /// </summary>
        /// <returns>List of tasks created by logged in user</returns>
        [Route("myTasks")]
        [AllowAnonymous]
        public IQueryable<Activity> GetMyActivities()
        {
            int assignerId =getUserId(AccountController.uName);
            return db.Activities.Where(x => x.assigner == assignerId);
        }

        /// <summary>
        /// GET:search from the tasks of logged in user
        /// </summary>
        /// <param name="term"> search term</param>
        /// <returns>task list correspond to the search term else null</returns>
        [Route("searchMyTasks")]
        [AllowAnonymous]
        [HttpGet]
        public IQueryable<Activity> searchMyTasks(String term)
        {
            int assignerId = getUserId(AccountController.uName);
            return db.Activities.Where(x=> x.assigner== assignerId && x.title.Contains(term));
        }


        /// <summary>
        /// PUT:updating rate of a task
        /// </summary>
        /// <param name="c">json object sent by the client side</param>
        /// <returns></returns>
        [AllowAnonymous]
        [Route("rating")]
        public IHttpActionResult updateRating(Object c)
        {

            string json = JsonConvert.SerializeObject(c);
            JObject json1 = JObject.Parse(json);
            string activityId = json1.GetValue("id").ToString();
            int count = Int32.Parse(json1.GetValue("starCount").ToString());
            Debug.WriteLine(json1.GetValue("id").ToString());

            Activity act = db.Activities.Find(activityId);
            act.starCount = count;
            db.Entry(act).State = EntityState.Modified;
            db.SaveChanges();
            
            // return CreatedAtRoute("DefaultApi", new { id = act.actId },count);
            return null;
        }

        // POST: api/Activities
        [ResponseType(typeof(Activity))]
        [AllowAnonymous]
        [Route("addTask")]
        public IEnumerable<ActivityViewModels> PostActivity(ActivityViewModels activity)
        {
            string categoryId = null;
            int userID = 0;
            Random rnd = new Random();
            int taskid = rnd.Next(1, 999);

            if (activity.categoryName != null)
            {
                List<Category> cat = db.Categories.Where(p => p.name == activity.categoryName).ToList();
                if (cat[0] != null)
                {
                    categoryId = cat[0].catId;
                }
            }

            if (activity.assignee != null)
            {
                List<User_TuTU> user = db.UserTu_Tu.Where(p => p.name == activity.assignee).ToList();
                if (user[0] != null)
                {
                    userID = user[0].uid;
                }
            }

            DateTime today = DateTime.Today;
            Activity act = new Activity();
            act.actId = "task" + taskid;
            act.title = activity.title;
            act.description = activity.description;
            act.categoryId = categoryId;
            act.date = today;
            if (activity.expiryDate != null) {
                DateTime dt = DateTime.ParseExact(activity.expiryDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                act.expiryDate = dt;
            }
            //act.expiryDate= DateTime.Parse(activity.expiryDate);
            act.attachemts = activity.attachemts;
            act.starCount = activity.starCount;
            act.status = activity.status;
            act.assigner = getUserId(AccountController.uName);
            act.completeness = 0;
            if (activity.assignee != null) {
                act.assignee = getUserId(activity.assignee);
            }
            act.assignee = 0;
            if(userID > 0)
            {
                act.assignee = userID;
            }
            db.Activities.Add(act);
            db.SaveChanges();

            return null;
        }

        // GET: api/Activities/5
        [ResponseType(typeof(Activity))]
        public IHttpActionResult GetActivity(string id)
        {
            Activity activity = db.Activities.Find(id);
            if (activity == null)
            {
                return NotFound();
            }

            return Ok(activity);
        }

        // PUT: api/Activities/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutActivity(string id, Activity activity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != activity.actId)
            {
                return BadRequest();
            }

            db.Entry(activity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        
        

        

        private int getUserId(string username) {
            int userID = 0;
            if (username != null)
            {
                List<User_TuTU> user = db.UserTu_Tu.Where(p => p.name.Contains(username)).ToList();
                if (user[0] != null)
                {
                    userID = user[0].uid;
                }
            }
            return userID;
        }


        // GET: api/Activities
        [Route("ab")]
        [AllowAnonymous]
        public IQueryable<Activity> GetActivities()
        {
            return db.Activities;
        }

        // DELETE: api/Activities/5
        [ResponseType(typeof(Activity))]
        public IHttpActionResult DeleteActivity(string id)
        {
            Activity activity = db.Activities.Find(id);
            if (activity == null)
            {
                return NotFound();
            }

            db.Activities.Remove(activity);
            db.SaveChanges();

            return Ok(activity);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ActivityExists(string id)
        {
            return db.Activities.Count(e => e.actId == id) > 0;
        }
    }
}