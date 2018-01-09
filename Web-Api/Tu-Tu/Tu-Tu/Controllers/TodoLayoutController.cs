using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Tu_Tu.VIew_Models;
using Tu_Tu.impl;

namespace Tu_Tu.Controllers
{
    /// <summary>
    /// Todo Controller
    /// </summary>

    [Authorize]
    [RoutePrefix("api/TodoLayout")]
    public class TodoLayoutController : ApiController
    {
        /// <summary>
        /// object of class which implemented all methdos 
        /// </summary>
        TodoImpl activityImpl = new TodoImpl();

        /// <summary>
        /// Update all the user's todo lists status
        /// </summary>
        /// <param name="todo"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Route("SaveAssignedTask")]
        public SendSuccViewModel SaveAssignedTask(ListTeamViewModel todo)
        {
            SendSuccViewModel Message = new SendSuccViewModel();
            if (ModelState.IsValid)
            {
                try
                {
                    activityImpl.SaveUnAssignedTasks(todo);
                    Message.SuccessMsg = "Succesfully Saved!";
                }
                catch (Exception e)
                {
                    Message.ErrorMsg = "Error Occurured while Saving!";
                }
            }
            return Message;
        }

        /// <summary>
        /// Send all the todo list items to angular front end
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllTasks")]
        public IEnumerable<ActivityRetrieveViewModel> GetAllTasks()
        {
            IEnumerable<ActivityRetrieveViewModel> activity = activityImpl.getActivityList();
            return activity.ToList();
        }

        /// <summary>
        /// Return all Unasssigned Tasks
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllUnassignedTodoLists")]
        public IEnumerable<ActivityRetrieveViewModel> GetAllUnassignedTodoLists()
        {
            IEnumerable<ActivityRetrieveViewModel> activity = activityImpl.getAllUnassinedTasks();
            return activity.ToList();
        }

        /// <summary>
        /// return all task count to the front end
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("getAllTaskCountLists")]
        public IEnumerable<TaskCountViewModel> getAllTaskCountLists()
        {
            IEnumerable<TaskCountViewModel> task = activityImpl.GetAllTaskCounts();
            return task;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getRatedTasks")]
        public IEnumerable<RatedTaskViewModel> getRatedTasks()
        {
            IEnumerable<RatedTaskViewModel> ratedTask = activityImpl.getAllRatedTasks();
            return ratedTask;
        }


    }
}
