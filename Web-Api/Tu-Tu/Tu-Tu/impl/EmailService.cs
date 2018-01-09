using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Linq;
using System.Web;

namespace Tu_Tu.impl
{
    public class EmailService
    {
        public async static Task SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                var _email ="asbar.create@gmail.com";
                var _epass = ConfigurationManager.AppSettings["EmailPassword"];
                var _dispName = "Asbar Ali";
                MailMessage myMessage = new MailMessage();
                myMessage.To.Add(_email);
                myMessage.From = new MailAddress(_email,_dispName);
                myMessage.Subject = subject;
                myMessage.Body = message;
                myMessage.IsBodyHtml = true;
                
                using(SmtpClient smpt = new SmtpClient()){
                    smpt.EnableSsl = true;
                    smpt.Host = "smtp.live.com";
                    smpt.Port = 25;
                    smpt.UseDefaultCredentials = false;
                    smpt.Credentials = new NetworkCredential(_email,_epass);
                    smpt.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smpt.SendCompleted +=(s,e) =>{smpt.Dispose();};
                    await smpt.SendMailAsync(myMessage);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}