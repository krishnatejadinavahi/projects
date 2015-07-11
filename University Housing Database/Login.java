import javax.swing.JTextField;

import java.awt.BorderLayout;
import java.awt.Dimension;

import javax.swing.JPasswordField;

import java.awt.Component;
import java.awt.FlowLayout;

import javax.swing.JButton;
import javax.swing.JLabel;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.sql.*;
public class Login extends javax.swing.JFrame{
	
	static final String jdbcURL 
	= "jdbc:oracle:thin:@ora.csc.ncsu.edu:1521:orcl";

	String user = "ssdeshm2";	// For example, "jsmith"
    String passwd = "200019389";	// Your 9 digit student ID number

	
	Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
	public Connection dataBaseConnection()
	{
		try 
		{
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = DriverManager.getConnection(jdbcURL, user, passwd);
			stmt = conn.createStatement();
	
	    } 
		catch(Exception e)
        {
            System.out.println("connection failed");
        }
		return conn;
	}
	
	private JTextField txt;
	public Login() {
		getContentPane().setLayout(null);
		getContentPane().setPreferredSize(new Dimension(1000, 1000));
		pack();
		txt = new JTextField("");
		txt.setBounds(176, 33, 116, 22);
		getContentPane().add(txt);
		txt.setColumns(10);
		
		JPasswordField pwd = new JPasswordField("");
		pwd.setBounds(176, 84, 116, 22);
		getContentPane().add(pwd);
		
		JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setBounds(100, 253, 262, 14);
		getContentPane().add(lblNewLabel);
		
		JButton btnNewButton = new JButton("Login");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			//if(user id and password match)
			dataBaseConnection();
			String str=txt.getText();
			String str1= new String(pwd.getPassword());
			System.out.println("user id"+ str +"password"+str1);
			String str3= "SELECT * FROM STAFFSTUDENTAUTHENTICATION WHERE LOGINNAME='"+str+"' AND PASSWORD='"+str1+"' AND ROLETYPE = 'student'";
			
			try {
			rs = stmt.executeQuery(str3);
			if(rs.next())
			{
				options op=new options();
				op.setVisible(true);
			}
			else
			{
				lblNewLabel.setText("wrong details");
			}
			//rs=	stmt.executeQuery("SELECT * FROM AGREEMENTS");
			} catch (SQLException e) {
						// TODO Auto-generated catch block
				e.printStackTrace();
					}
			 
			}
		});
		btnNewButton.setBounds(176, 143, 87, 25);
		getContentPane().add(btnNewButton);
		
		JLabel lblUserId = new JLabel("User id");
		lblUserId.setBounds(43, 36, 56, 16);
		getContentPane().add(lblUserId);
		
		JLabel lblPassword = new JLabel("Password");
		lblPassword.setBounds(43, 87, 80, 16);
		getContentPane().add(lblPassword);
		
	/*	JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setBounds(100, 253, 262, 14);
		getContentPane().add(lblNewLabel); */
	}
}
