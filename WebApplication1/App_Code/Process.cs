using System;
using System.IO;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Text;
using System.Drawing;
using System.Data.SqlClient;
using System.Collections;
using System.Configuration;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Micron.DateTime;
using Micron.DirectoryServices;
using System.Net.Mail;

/// <summary>
/// Summary description for Process
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]

public class Process : System.Web.Services.WebService {

   

    [WebMethod]
    public void GetAllNotes(int IssueID)
    {

        DataTable NotesTB = Data.GetNotes(IssueID);
        List<NotesClass> notelist = new List<NotesClass>();


        if (NotesTB.Rows.Count > 0)
        {
            foreach (DataRow row in NotesTB.Rows)
            {
                NotesClass note = new NotesClass();
                int NoteID = Convert.ToInt32(row["noteid"]);
                string IssueNote = row["note"].ToString();
                string NoteUser = row["editedby"].ToString();
                string NoteDatetime = row["edited_datetime"].ToString();

                //Add data to Data class

                note.NoteID = NoteID;
                note.IssueNote = IssueNote;
                note.NoteUser = NoteUser;
                note.NoteDatetime = NoteDatetime;

                notelist.Add(note);
            }           
        }

        JavaScriptSerializer js = new JavaScriptSerializer();

        Context.Response.Write(js.Serialize(notelist));
    }

  
}

