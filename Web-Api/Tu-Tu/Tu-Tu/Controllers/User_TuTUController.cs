using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Tu_Tu.Model.Entities;
using Tu_Tu.Model.Persistence;
using Tu_Tu.Models;
using Tu_Tu.ViewModels;

namespace Tu_Tu.Controllers
{
    [Authorize]
    [RoutePrefix("Api/User")]
    public class User_TuTUController : ApiController
    {
        private Tu_Tu_Request_Context db = new Tu_Tu_Request_Context();

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllUsers")]
        // GET: api/User_TuTU
        public IQueryable<User_TuTU> GetUser_TuTu()
        {
            return db.UserTu_Tu;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetDetails")]
        // GET: api/User_TuTU/5
        [ResponseType(typeof(User_TuTU))]
        public IHttpActionResult GetUser_TuTU(int id)
        {
            User_TuTU user_TuTU = db.UserTu_Tu.Find(id);
            if (user_TuTU == null)
            {
                return NotFound();
            }

            return Ok(user_TuTU);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetInfo")]
        // GET: api/User/
        [ResponseType(typeof(User_TuTU))]
        public IHttpActionResult GetUserDetails() 
        {
            try
            {
             
                int uid = (from u in db.UserTu_Tu
                          where u.name==AccountController.uName
                          select u.uid).FirstOrDefault(); // fix this..session.....!!!!!  
                                    
                string n = User.Identity.Name;
                //test();
                var userDetails = from u in db.UserTu_Tu.AsEnumerable()
                                  where u.uid == uid
                                  select new
                                  {
                                      u.uid,
                                      u.name,
                                      u.password,
                                      u.companyName,
                                      u.email,
                                      adminName = "Ayesh"
                                  };


                var userTaskDetails = from a in db.Activities.AsEnumerable()
                                      where a.assignee == uid && a.status=="Done"
                                      select new
                                      {
                                          a.title,
                                          a.starCount,
                                          date = DateTime.Parse(a.date.ToString()).ToString("yyyy-MM-dd"),
                                          assigner = (from e in db.UserTu_Tu
                                                      where e.uid == a.assigner
                                                      select e.name).FirstOrDefault()
                                      };
               
                string base64String = "";
           
                // string filename = "User_" + uid.ToString();

                string name = (from u in db.UserTu_Tu
                                   where u.uid == uid
                                   select u.name).FirstOrDefault();

                string fileName = name.Replace(" ","").ToString();

                var imagePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Images/ProfilePics"), fileName + ".jpg");

                if (!System.IO.File.Exists(imagePath))
                {
                    base64String = "";
                }
                else
                {
                    using (Image image = Image.FromFile(imagePath))
                    {
                        using (MemoryStream m = new MemoryStream())
                        {
                            image.Save(m, image.RawFormat);
                            byte[] imageBytes = m.ToArray();
                            base64String = Convert.ToBase64String(imageBytes);
                        }
                    }
                }



                if (userDetails == null)
                {
                    return NotFound();
                }

                return Json(new { userDetails, userTaskDetails, avatar = base64String });
                //    return Json(userDetails);

            }
            catch (Exception e)
            {
                return NotFound();
            }
            // id = 1;
        }

        // PUT: api/User_TuTU/5
        [AllowAnonymous]
        [Route("UpdateInfo")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser_TuTU(int id, User_TutuBasicDetails user_TuTU)
        {
            // if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            if (id != user_TuTU.uid)
            {
                return BadRequest();
            }

            //  db.Entry(user_TuTU).State = EntityState.Modified;

            try
            {

                var User_TutuBasicDetails = db.UserTu_Tu.Where(a => a.uid.Equals(id)).FirstOrDefault();
                User_TutuBasicDetails.name = user_TuTU.name;
                User_TutuBasicDetails.email = user_TuTU.email;
                User_TutuBasicDetails.companyName = user_TuTU.companyName;
                User_TutuBasicDetails.adminId = user_TuTU.adminId;

                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_TuTUExists(id))
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

        // PUT: api/User_TuTU/5
        [AllowAnonymous]
        [Route("EditPrivacyInfo")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser_TuTUPrivacy(int id, User_TutuPrivacyVModel user_TuTU)
        {
            // if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            if (id != user_TuTU.uid)
            {
                return BadRequest();
            }

            //  db.Entry(user_TuTU).State = EntityState.Modified;

            try
            {
                var User_TutuDetails = db.UserTu_Tu.Where(a => a.uid.Equals(id)).FirstOrDefault();
                User_TutuDetails.password = user_TuTU.password;

                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_TuTUExists(id))
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

        [AllowAnonymous]
        [Route("UploadPic")]
        [HttpPost]
        public IHttpActionResult UploadPic(User_TutuAvatarVModel userView)
        {

            try
            {
                // string fileName = "User_" + userView.uid.ToString();
                string name = (from u in db.UserTu_Tu
                                   where u.uid == userView.uid
                                   select u.name).FirstOrDefault();

                string filetype = (userView.avatar.Split('/')[1].ToString()).Split(';')[0].ToString();
                //  string fileName = name.Split(' ')[0].ToString() + name.Split(' ')[1].ToString();
                string fileName = name.Replace(" ", "");
                int fileSubString;
                

                if (filetype == "png")
                {
                    fileSubString = 22;

                } else {
                    fileSubString = 23;
                }

                string imageBaseString = ((userView.avatar).ToString()).Substring(fileSubString);
                byte[] imageBytes = Convert.FromBase64String(imageBaseString);

                string mainDirPath = @System.Web.HttpContext.Current.Server.MapPath("~/");
                string clientDirPath = Path.GetFullPath(Path.Combine(mainDirPath, @"..\..\..\"));
                string clientProfilePath = clientDirPath + "Web-Client\\src\\assets\\img\\app\\profile\\";

                using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
                {
                    Image image = Image.FromStream(ms, true);
                    image.Save(System.Web.HttpContext.Current.Server.MapPath("~/Images/ProfilePics/" + fileName + ".jpg"), System.Drawing.Imaging.ImageFormat.Jpeg);
                    image.Save(clientProfilePath + fileName + ".jpg", System.Drawing.Imaging.ImageFormat.Jpeg);                                                                                   
                }

                var targetPath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Images/ProfilePics"), fileName + "."+filetype);
                var userDetails = db.UserTu_Tu.Where(a => a.uid.Equals(userView.uid)).FirstOrDefault();

                //Saves the image path in the database according to the user.
                userDetails.avatar = targetPath;
                db.SaveChanges();

                return Json("Success!");
            }
            catch (Exception e)
            {
                return Json("Error in Uploading the Image!");
            }

        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetUsersForBadges")]
        // GET: api/User/
        [ResponseType(typeof(User_TuTU))]
        public IHttpActionResult GetUsersForBadgeReward()
        {
            var usersList = from u in db.UserTu_Tu
                            where u.uid != 2 // get from the session
                            select new
                            {
                                u.uid,
                                u.name
                            };


            return Json(usersList);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetBadgesInfo")]
        // GET: api/User/
        [ResponseType(typeof(User_TuTU))]
        public IHttpActionResult GetUserBadgeDetails(int userId)
        {
            try
            {
                int uId = userId;

                var bestQuality = from b in db.userBadgeCount.AsEnumerable()
                                  join u in db.Badges.AsEnumerable()
                                  on b.Badge equals u.bId
                                  where b.User == uId && u.name == "Best Quality"
                                  group b by b.Badge into ub
                                  select new
                                  {
                                      badgeID = ub.FirstOrDefault().Badge,
                                      //  title = ub.FirstOrDefault().name,
                                      count = ub.Sum(c => c.count)
                                  };

                var goodQuality = from b in db.userBadgeCount.AsEnumerable()
                                  join u in db.Badges.AsEnumerable()
                                  on b.Badge equals u.bId
                                  where b.User == uId && u.name == "Good Quality"
                                  group b by b.Badge into ub
                                  select new
                                  {
                                      badgeID = ub.FirstOrDefault().Badge,
                                      //  title = u.name,
                                      count = (ub.Sum(c => c.count) == 0) ? 0 : ub.Sum(c => c.count)
                                  };

                var excellent = from b in db.userBadgeCount.AsEnumerable()
                                join u in db.Badges.AsEnumerable()
                                on b.Badge equals u.bId
                                where b.User == uId && u.name == "Excellent"
                                group b by b.Badge into ub
                                select new
                                {
                                    badgeID = ub.FirstOrDefault().Badge,
                                    //title = u.name,
                                    count = ub.Sum(c => c.count)
                                };

                var creativity = from b in db.userBadgeCount.AsEnumerable()
                                 join u in db.Badges.AsEnumerable()
                                 on b.Badge equals u.bId
                                 where b.User == uId && u.name == "Creativity"
                                 group b by b.Badge into ub
                                 select new
                                 {
                                     badgeID = ub.FirstOrDefault().Badge,
                                     //  title = u.name,
                                     count = ub.Sum(c => c.count)
                                 };

                var goodJob = from b in db.userBadgeCount.AsEnumerable()
                              join u in db.Badges.AsEnumerable()
                              on b.Badge equals u.bId
                              where b.User == uId && u.name == "Good Job"
                              group b by b.Badge into ub
                              select new
                              {
                                  badgeID = ub.FirstOrDefault().Badge,
                                  //title = u.name,
                                  count = ub.Sum(c => c.count)
                              };

                //   return bestQuality;

                return Json(new { uId, bestQuality, goodQuality, excellent, creativity, goodJob });
                //    return Json(userDetails);

            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("SaveBadgesCount")]
        // GET: api/User/
        [ResponseType(typeof(User_TuTU))]
        public IHttpActionResult SaveUserBadgeCount(User_TutuSaveBadges badgeDetails)
        {
            try
            {
                var badgeId = (from b in db.Badges
                               where b.name == badgeDetails.BadgeType
                               select b.bId).FirstOrDefault();

                UserBadges userBadges = new UserBadges();
                userBadges.User = badgeDetails.uId;
                userBadges.Badge = badgeId;
                userBadges.count = badgeDetails.count;

                db.userBadgeCount.Add(userBadges);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error " + e);
            }

            return Json("");
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("UndoBadgesCount")]
        // GET: api/User/
        [ResponseType(typeof(User_TuTU))]
        public IHttpActionResult UndoUserBadgeCount(User_TutuSaveBadges badgeDetails)
        {
            try
            {
                var badgeId = (from b in db.Badges
                               where b.name == badgeDetails.BadgeType
                               select b.bId).FirstOrDefault();

                //var UserBadgeDetails = db.userBadgeCount.Where(a => a.User.Equals(badgeDetails.uId) && a.Badge.Equals(badgeId)).FirstOrDefault();

                UserBadges userBadges = new UserBadges();
                userBadges.User = badgeDetails.uId;
                userBadges.Badge = badgeId;
                userBadges.count = badgeDetails.count;

                db.userBadgeCount.Add(userBadges);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error " + e);
            }



            return Json("");
        }


        // POST: api/User_TuTU
        [ResponseType(typeof(User_TuTU))]
        public IHttpActionResult PostUser_TuTU(User_TuTU user_TuTU)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserTu_Tu.Add(user_TuTU);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user_TuTU.uid }, user_TuTU);
        }

        // DELETE: api/User_TuTU/5
        [ResponseType(typeof(User_TuTU))]
        public IHttpActionResult DeleteUser_TuTU(int id)
        {
            User_TuTU user_TuTU = db.UserTu_Tu.Find(id);
            if (user_TuTU == null)
            {
                return NotFound();
            }

            db.UserTu_Tu.Remove(user_TuTU);
            db.SaveChanges();

            return Ok(user_TuTU);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool User_TuTUExists(int id)
        {
            return db.UserTu_Tu.Count(e => e.uid == id) > 0;
        }
    }
}