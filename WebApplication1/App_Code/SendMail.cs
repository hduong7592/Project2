using System;
using System.Collections.Generic;
using System.Web;
using System.Net.Mail;
/// <summary>
/// Summary description for SendMail
/// </summary>
public class SendMail
{	
    public static void SendErrorMessage(string FromUser, string MessageSubject, string MessageContent)
    {        
        MailMessage message = new MailMessage();
        message.From = new MailAddress(FromUser + "@micron.com");
        message.To.Add("hduong@micron.com");
        message.Subject = MessageSubject;
        AlternateView htmlView = AlternateView.CreateAlternateViewFromString(MessageContent, null, "text/html");
        message.AlternateViews.Add(htmlView);

        SmtpClient client = new SmtpClient("relay");
        try
        {
            client.Send(message);
        }
        catch
        {

        }       
    }

    public static void SendErrorMessage(string MessageSubject, string MessageContent)
    {
        HttpContext context = HttpContext.Current;
        string FromUser = "";
        try
        {
            FromUser = context.Session["UserID"].ToString().Trim();            
        }
        catch
        {
            FromUser = "hduong";
        }

        MailMessage message = new MailMessage();
        message.From = new MailAddress(FromUser + "@micron.com");
        message.To.Add("hduong@micron.com");
        message.Subject = MessageSubject;
        AlternateView htmlView = AlternateView.CreateAlternateViewFromString(MessageContent, null, "text/html");
        message.AlternateViews.Add(htmlView);

        SmtpClient client = new SmtpClient("relay");
        try
        {
            client.Send(message);
        }
        catch
        {

        }
    }
}