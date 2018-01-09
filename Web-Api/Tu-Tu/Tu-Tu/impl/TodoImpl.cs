using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using Tu_Tu.Models;
using Tu_Tu.VIew_Models;
using System.Net;
using System.Net.Mail;
using Tu_Tu.impl;
using System.Web.Mvc;
using Tu_Tu.Model.Persistence;
using Tu_Tu.Model.Entities;
using Tu_Tu.Controllers;

namespace Tu_Tu.impl
{
    public class TodoImpl : Controller
    {
        /// <summary>
        /// 
        /// </summary>
        private Tu_Tu_Request_Context db = new Tu_Tu_Request_Context();
        private string const_Todo = "Todo";
        private string const_Progress = "Progress";
        private string const_Done = "Done";
        private string const_Rated = "Rated";

        /// <summary>
        /// return todo,progress and done Activities
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ActivityRetrieveViewModel> getActivityList()
        {

            
            List<ActivityRetrieveViewModel> activityViewModelList = new List<ActivityRetrieveViewModel>();
            int loggedUserId = 0;

            if (AccountController.uName != null)
            {
                User_TuTU user = db.UserTu_Tu.Where(ac => ac.name.Equals(AccountController.uName)).FirstOrDefault();
                loggedUserId = user.uid;
            }
            
                var allItems = db.Activities.ToList().Where(ac => ac.assignee != 0 && ac.assignee== loggedUserId);
                if (allItems != null)
                {
                    foreach (var allItem in allItems)
                    {
                        ActivityRetrieveViewModel activityViewModel = new ActivityRetrieveViewModel();
                        var assignerDetailsByName = db.UserTu_Tu.Find(allItem.assigner);
                        var assigneeDetailsByName = db.UserTu_Tu.Find(allItem.assignee);
                        if (assignerDetailsByName != null)
                        {
                            activityViewModel.assigner = assignerDetailsByName.name;
                        }
                        if (assigneeDetailsByName != null)
                        {
                            activityViewModel.assignee = assigneeDetailsByName.name;
                        }
                        int days = (allItem.expiryDate - DateTime.Today).Days;
                        activityViewModel.title = allItem.title;
                        activityViewModel.description = allItem.description;
                        activityViewModel.expiryDate = allItem.expiryDate.ToString("MM/dd/yyyy");
                        activityViewModel.completeness = allItem.completeness;
                        activityViewModel.status = allItem.status;
                        activityViewModel.starCount = allItem.starCount;
                        activityViewModel.filePath = allItem.filePath;
                        activityViewModel.remainingDays = days;
                        activityViewModelList.Add(activityViewModel);
                    }
                
            
            }
            return activityViewModelList;
        }


        public IEnumerable<ActivityRetrieveViewModel> getAllUnassinedTasks()
        {
            List<ActivityRetrieveViewModel> activityViewModelList = new List<ActivityRetrieveViewModel>();

            var allItems = db.Activities.ToList().Where(ac => ac.assignee == 0||ac.status=="Rated");
            if (allItems != null)
            {
                foreach (var allItem in allItems)
                {
                    ActivityRetrieveViewModel activityViewModel = new ActivityRetrieveViewModel();
                    var assignerDetailsByName = db.UserTu_Tu.Find(allItem.assigner);
                    var assigneeDetailsByName = db.UserTu_Tu.Find(allItem.assignee);
                    if (assignerDetailsByName != null)
                    {
                        activityViewModel.assigner = assignerDetailsByName.name;
                    }
                    if (assigneeDetailsByName != null)
                    {
                        activityViewModel.assignee = assigneeDetailsByName.name;
                    }
                    int days = (allItem.expiryDate - DateTime.Today).Days;
                    activityViewModel.title = allItem.title;
                    activityViewModel.description = allItem.description;
                    activityViewModel.expiryDate = allItem.expiryDate.ToString("MM/dd/yyyy");
                    activityViewModel.completeness = allItem.completeness;
                    activityViewModel.status = allItem.status;
                    activityViewModel.starCount = allItem.starCount;
                    activityViewModel.filePath = allItem.filePath;
                    activityViewModel.remainingDays = days;
                    activityViewModelList.Add(activityViewModel);
                }
            }
            return activityViewModelList;
        }

        /// <summary>
        /// Get project counts for different way
        /// </summary>
        /// <returns></returns>
        public IEnumerable<TaskCountViewModel> GetAllTaskCounts()
        {
            List<TaskCountViewModel> taskCount = new List<TaskCountViewModel>();
            int loggedUserId = 0;
            if (AccountController.uName != null)
            {
                User_TuTU user = db.UserTu_Tu.Where(ac => ac.name.Equals(AccountController.uName)).FirstOrDefault();
                loggedUserId = user.uid;
            }
            int Completed = db.Activities.Where(ac => ac.status.Equals(const_Done) && ac.assignee == loggedUserId).Count();
            int CompletedAndRated = db.Activities.Where(ac => ac.status.Equals(const_Done) && ac.assignee == loggedUserId).Count() +
                db.Activities.Where(ac => ac.status.Equals(const_Rated) && ac.assignee== loggedUserId).Count();
            int NotAssignedOrIsolated = db.Activities.Where(ac => ac.assignee == 0).Count();
            int progressProject = db.Activities.Where(ac => ac.status.Equals(const_Todo) && ac.assignee == loggedUserId).Count() + db.Activities.Where(ac => ac.status.Equals(const_Progress) && ac.assignee == loggedUserId).Count();

            TaskCountViewModel CompletedTask = new TaskCountViewModel();
            CompletedTask.progressTasksCount = Completed;
            taskCount.Add(CompletedTask);

            TaskCountViewModel CompletedAndRatedTask = new TaskCountViewModel();
            CompletedAndRatedTask.progressTasksCount = CompletedAndRated;
            taskCount.Add(CompletedAndRatedTask);

            TaskCountViewModel NotAssignedOrIsolatedTask = new TaskCountViewModel();
            NotAssignedOrIsolatedTask.progressTasksCount = NotAssignedOrIsolated;
            taskCount.Add(NotAssignedOrIsolatedTask);

            TaskCountViewModel progressProjectTask = new TaskCountViewModel();
            progressProjectTask.progressTasksCount = progressProject;
            taskCount.Add(progressProjectTask);

            return taskCount;
        }

        /// <summary>
        /// Save all todo List 
        /// </summary>
        /// <param name="todo"></param>
        /// <returns></returns>
        public void SaveAllTodoLists(TodoVIewModel todo)
        {
            UpdateDoneItems(todo);
            UpdateProgressItems(todo);
            UpdateTodoItems(todo);
        }

        /// <summary>
        /// Save the unaassigned tasks
        /// </summary>
        /// <param name="todo"></param>
        public void SaveUnAssignedTasks(ListTeamViewModel todo)
        {
            int loggedUserId = 0;
            if (AccountController.uName != null)
            {
                User_TuTU user = db.UserTu_Tu.Where(ac => ac.name.Equals(AccountController.uName)).FirstOrDefault();
                loggedUserId = user.uid;
            }
            ActivityDetailVIewModel act = new ActivityDetailVIewModel();
            if (todo != null)
            {
               foreach(var todoItem in todo.listbox)
                {
                    var temp = todoItem.TItle;
                    var ActivitID = db.Activities.Where(p => p.title.Equals(temp)).Select(p => p.actId).FirstOrDefault();
                    var actvityList = db.Activities.Find(ActivitID);
                    if (actvityList != null)
                    {
                        actvityList.assignee = loggedUserId;
                        db.SaveChanges();
                    }

                }
            }
        }

        /// <summary>
        /// Update the TODO Container
        /// </summary>
        /// <param name="Done"></param>
        private void UpdateTodoItems(TodoVIewModel Todo)
        {
            
            List<ActivityDetailVIewModel> SelectedTodoLists = Todo.TodoItems.listbox.ToList();
            foreach (var selectedTodo in SelectedTodoLists)
            {
                var temp = selectedTodo.TItle;
                var ActivitID = db.Activities.Where(p => p.title.Equals(temp)).Select(p => p.actId).FirstOrDefault();

                var EarlyStatus = db.Activities.Find(ActivitID);
                if (EarlyStatus != null)
                {
                    if (EarlyStatus.status.Equals(const_Todo))
                    {
                        Debug.WriteLine("Already have this in Todo Field");
                    }
                    else if (!EarlyStatus.status.Equals(const_Todo))
                    {
                        string Notification = "Todo item \"" + EarlyStatus.title + "\" changed from " + EarlyStatus.status + " to "+const_Todo+" Container";
                        SaveNotification(Notification);
                        SaveTaskItems(EarlyStatus.actId, 0, const_Todo);
                       
                    }
                }
            }
        }

        /// <summary>
        /// Update the PROGRESS Container
        /// </summary>
        /// <param name="Progress"></param>
        private void UpdateProgressItems(TodoVIewModel Progress)
        {
            List<ActivityDetailVIewModel> SelectedProgressLists = Progress.ProgressItems.listTeamOne.ToList();
            foreach (var selectedProgress in SelectedProgressLists)
            {
                var tempProgressTitle = selectedProgress.TItle;
                var ProgressListByActivitID = db.Activities.Where(p => p.title.Equals(tempProgressTitle)).Select(p => p.actId).FirstOrDefault();

                var EarlyProgressStatus = db.Activities.Find(ProgressListByActivitID);
                if (EarlyProgressStatus != null)
                {
                    if (EarlyProgressStatus.status.Equals(const_Progress))
                    {
                        Debug.WriteLine("Already have this in Progress Field");
                    }
                    else if (!EarlyProgressStatus.status.Equals(const_Progress))
                    {
                        if (EarlyProgressStatus.status.Equals(const_Done))
                        {
                            string Notification = "Todo item \"" + EarlyProgressStatus.title + "\" changed from " + EarlyProgressStatus.status + " to "+const_Progress+" Container";
                            SaveNotification(Notification);
                        }
                        SaveTaskItems(EarlyProgressStatus.actId, selectedProgress.completeness, const_Progress);
                    }
                }
            }
        }

        /// <summary>
        /// Update the DONE Container
        /// </summary>
        /// <param name="Todo"></param>
        private void UpdateDoneItems(TodoVIewModel Done)
        {
            List<ActivityDetailVIewModel> SelectedDoneLists = Done.DoneItems.listTeamTwo.ToList();
            foreach (var SelectedDoneitem in SelectedDoneLists)
            {
                var tempDoneTitle = SelectedDoneitem.TItle;
                var DoneListByActivitID = db.Activities.Where(p => p.title.Equals(tempDoneTitle)).Select(p => p.actId).FirstOrDefault();

                var EarlyDoneStatus = db.Activities.Find(DoneListByActivitID);
                if (EarlyDoneStatus != null)
                {
                    if (EarlyDoneStatus.status.Equals(const_Done))
                    {
                        Debug.WriteLine("Already have this in Done Field");
                    }
                    else if (!EarlyDoneStatus.status.Equals(const_Done))
                    {
                        string Notification = "Todo item \"" + EarlyDoneStatus.title + "\" changed from " + EarlyDoneStatus.status + " to "+const_Done+" Container";
                        SaveTaskItems(EarlyDoneStatus.actId, 100, const_Done);
                        var s = sendEmail(Notification, "", "");
                    }
                }
            }
        }

       
        /// <summary>
        /// Update the changes of all tasks
        /// </summary>
        /// <param name="ActID"></param>
        /// <param name="Completenetss"></param>
        /// <param name="Status"></param>
        private void SaveTaskItems(string ActID,int Completenetss,string Status)
        {
            var itemListByActID = db.Activities.Where(x=>x.actId==ActID);
            foreach (var item in itemListByActID)
            {
                item.status = Status;
                item.completeness = Completenetss;
            }
            db.SaveChanges();
        }

        /// <summary>
        /// Save the changed status of todo values
        /// </summary>
        /// <param name="Notification"></param>
        public void SaveNotification(string Notification){
            
            DateTime date = DateTime.Now;
            Notification notification = new Notification();
            notification.DateTime = date;
            notification.NotificationMsg = Notification;
            db.Notification.Add(notification);
            db.SaveChanges();
        }

        /// <summary>
        /// Send the email to assigner after completed the work
        /// </summary>
        /// <param name="notificationMessage"></param>
        /// <param name="assignerEmail"></param>
        /// <param name="assignerSubject"></param>
        /// <returns></returns>
        public async System.Threading.Tasks.Task<ActivityDetailVIewModel> sendEmail(string notificationMessage, string assignerEmail, string assignerSubject)
        {
            await EmailService.SendEmailAsync(assignerEmail, assignerSubject, notificationMessage);
            return null;
        }


        /// <summary>
        /// send notification Details
        /// </summary>
        public List<NotificationViewModel> getNotificationDetailList()
        {
            var notificationList = db.Notification.OrderByDescending(a => a.DateTime).Take(15).ToList();
            List<NotificationViewModel> notifyList = new List<NotificationViewModel>();
           
            if (notificationList != null)
            {
                foreach (var item in notificationList)
                {
                    NotificationViewModel notify = new NotificationViewModel()
                    {
                        NotificationMsg = item.NotificationMsg,
                        ModifiedDate = item.DateTime
                    };
                    notifyList.Add(notify);
                }
            }
            return notifyList;
        }

        /// <summary>
        /// Remove for task after rated by assignee
        /// </summary>
        /// <param name="Title"></param>
        public void DeleteCompletedTask(string Title)
        {
            
            if (Title != null)
            {
                List<Activity> activityByTitle =  db.Activities.Where(a => a.title == Title).ToList();
                activityByTitle[0].status = const_Rated;
                db.SaveChanges();
                saveRatedTasks(Title, activityByTitle[0].starCount);
            }
        }

        /// <summary>
        /// Save rated task after removed
        /// </summary>
        /// <param name="title"></param>
        /// <param name="starCount"></param>
        private void saveRatedTasks(string title, int starCount)
        {
            RatedTasks ratedTask = new RatedTasks();
            ratedTask.Title = title;
            ratedTask.rateCount = starCount;
            ratedTask.date = DateTime.Today;

            db.SaveChanges();
        }
        public IEnumerable<RatedTaskViewModel> getAllRatedTasks()
        {
            return null;
        }
    }
}