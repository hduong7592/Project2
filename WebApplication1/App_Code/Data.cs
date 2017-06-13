using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Configuration;
using System.Data.OleDb;
using Micron.DateTime;
using System.IO;
using System.Net.Mail;

/// <summary>
/// Main Process Data Class for YEIDB
/// This class will handle all the process including query data, add/edit comment, lots...
/// </summary>
public class Data :
{
    //public static Micron.WebCommon obj = new Micron.WebCommon();
    public static string Sender;
   
    public Data()
	{
		//
		// TODO: Add constructor logic here
		//

        //Sender = (string)HttpContext.Current.Session["UserID"];
	}
        
    public static DataTable ExtraLinks()
    {
        Micron.WebCommon obj = new Micron.WebCommon();
        string NewDsnConnection = ConfigurationManager.ConnectionStrings["dsn"].ToString();
        SqlConnection conn = new SqlConnection(NewDsnConnection);
        SqlCommand command = new SqlCommand();

        DataTable dt = new DataTable();

        string sql = "";

        sql = @"    Select	*
                    From	itrack_Issues_Extra_Links                   
                    order by ID asc                                            
              ";

        using (SqlConnection con = new SqlConnection(NewDsnConnection))
        {
            using (SqlDataAdapter sda = new SqlDataAdapter())
            {
                command.Connection = con;
                command.CommandText = sql;
                sda.SelectCommand = command;

                try
                {
                    sda.Fill(dt);
                }

                catch (Exception e)
                {
                    string msg_subject = "Error Getting ExtraLinks";
                    string msg_content = "Error: " + e.ToString() + "<br>" + sql;
                    SendMail.SendErrorMessage(msg_subject, msg_content);
                }
            }
        }

        return dt;

    }

    public static string AddNewExtraLink(string LinkName, string LinkUrl, string username)
    {
        Micron.WebCommon obj = new Micron.WebCommon();
        string NewDsnConnection = ConfigurationManager.ConnectionStrings["dsn"].ToString();
        SqlConnection conn = new SqlConnection(NewDsnConnection);
        SqlCommand command = new SqlCommand();
        command.Connection = conn;

        string insertresult;

        command.CommandType = CommandType.Text;

        command.CommandText = @"INSERT INTO [itrack_Issues_Extra_Links] 
                                            (
                                              [LinkName]
                                              ,[LinkUrl]
                                              ,[Added_by]
                                              ,[Added_datetime]
                                              ,[Updated_by]
                                              ,[Updated_datetime]
                                                                                                                             
                                            )
                                VALUES      (
                                               @LinkName
                                              ,@LinkUrl                                                                                    
                                              ,@username                                            
                                              ,@datetime
                                              ,@username                                            
                                              ,@datetime

                                            )";


        command.Parameters.AddWithValue("@LinkName", LinkName);
        command.Parameters.AddWithValue("@LinkUrl", LinkUrl);        
        command.Parameters.AddWithValue("@username", username);
        command.Parameters.AddWithValue("@datetime", DateTime.Now);
        try
        {
            conn.Open();
            command.ExecuteNonQuery();
            insertresult = "Success";
        }

        catch (Exception e)
        {
            insertresult = "Error";

            string msg_subject = "Error: AddNewExtraLink";
            string msg_content = "Error: " + e.ToString();

            SendMail.SendErrorMessage(username, msg_subject, msg_content);
        }
        finally
        {
            conn.Close();
        }

        return insertresult;
    }

    public static string UpdateExtraLink(int LinkID, string LinkName, string LinkUrl, string username)
    {
        Micron.WebCommon obj = new Micron.WebCommon();
        string NewDsnConnection = ConfigurationManager.ConnectionStrings["dsn"].ToString();
        SqlConnection conn = new SqlConnection(NewDsnConnection);
        SqlCommand command = new SqlCommand();
        command.Connection = conn;

        string updateresult;

        command.Parameters.AddWithValue("@LinkID", LinkID);
        command.Parameters.AddWithValue("@LinkName", LinkName);
        command.Parameters.AddWithValue("@LinkUrl", LinkUrl);
        command.Parameters.AddWithValue("@username", username);
        command.Parameters.AddWithValue("@datetime", DateTime.Now);


        command.CommandType = CommandType.Text;
        command.CommandText = @"UPDATE      [itrack_Issues_Extra_Links] 
                                             
                                            SET       
                                                      [LinkName] = @LinkName
                                                      ,[LinkUrl] = @LinkUrl                                                 
                                                      ,[Updated_by] = @username
                                                      ,[Updated_datetime] = @datetime

                                            WHERE     [ID] = @LinkID
                                           
                                         

                                ";

        try
        {
            conn.Open();
            command.ExecuteNonQuery();
            updateresult = "Success";
        }
        catch (Exception e)
        {
            updateresult = "Error";
            string msg_subject = "Error:  UpdateExtraLink";
            string msg_content = "Error: " + e.ToString();

            SendMail.SendErrorMessage(username, msg_subject, msg_content);
        }
        finally
        {
            conn.Close();
        }

        return updateresult;

    }
}