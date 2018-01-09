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
    [RoutePrefix("api/Todo")]
    public class TodoController : ApiController
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
        [Route("SaveTodo")]
        public SendSuccViewModel SaveTodo(TodoVIewModel todo)
        {
            SendSuccViewModel Message = new SendSuccViewModel();
            if (ModelState.IsValid)
            {
                try
                {
                    activityImpl.SaveAllTodoLists(todo);
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
        /// Remove the task after completed
        /// </summary>
        /// <param name="deleteTaskViewModel"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        [Route("DeleteCompletedTask")]
        public SendSuccViewModel DeleteCompletedTask(string deleteTaskViewModel)
        {
            SendSuccViewModel Message = new SendSuccViewModel();
            try
            {
                activityImpl.DeleteCompletedTask(deleteTaskViewModel);
                Message.ErrorMsg = "Successuflly Deleted";
            }
            catch (Exception e)
            {
                Message.ErrorMsg = "Error occured whitle Deleting";
            }
            return Message;
        }


        /// <summary>
        /// Send all the todo list items to angular front end
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("GetItems")]
        public IEnumerable<ActivityRetrieveViewModel> GetAllTodiItems()
        {
            IEnumerable<ActivityRetrieveViewModel> activity = activityImpl.getActivityList();
            return activity.ToList();
        }

        /// <summary>
        /// send notification Details to view History
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("getNotificationHistory")]
        public IEnumerable<NotificationViewModel> sendNotificationDetails()
        {
            IEnumerable<NotificationViewModel> notifiDetails = activityImpl.getNotificationDetailList();
            return notifiDetails;
        }
    }
}
