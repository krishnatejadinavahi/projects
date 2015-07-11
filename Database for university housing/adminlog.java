import java.awt.Dimension;

import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JPasswordField;
import javax.swing.JButton;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class adminlog extends javax.swing.JFrame{
	
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
	
	
	
	
	private JTextField textField;
	private JPasswordField passwordField;
	public adminlog() {
		dataBaseConnection();
		getContentPane().setLayout(null);
		getContentPane().setPreferredSize(new Dimension(1000, 1000));
		pack();
		JLabel lblUserId = new JLabel("User id");
		lblUserId.setBounds(148, 48, 46, 14);
		getContentPane().add(lblUserId);
		
		JLabel lblPassword = new JLabel("Password");
		lblPassword.setBounds(148, 97, 59, 14);
		getContentPane().add(lblPassword);
		
		JLabel label = new JLabel("");
		label.setBounds(128, 213, 176, 14);
		getContentPane().add(label);
		
		textField = new JTextField();
		textField.setBounds(263, 45, 86, 20);
		getContentPane().add(textField);
		textField.setColumns(10);
		
		passwordField = new JPasswordField();
		passwordField.setBounds(263, 94, 86, 20);
		getContentPane().add(passwordField);
		
		JButton btnNewButton = new JButton("submit");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			
				String str=textField.getText();
				String str1= new String(passwordField.getPassword());
				System.out.println("user id"+ str +"password"+str1);
				String str3= "SELECT * FROM STAFFSTUDENTAUTHENTICATION WHERE LOGINNAME='"+str+"' AND PASSWORD='"+str1+"' AND ROLETYPE = 'supervisor'";
				try {
				rs = stmt.executeQuery(str3);
				if(rs.next())
				{
					supervisor sp=new supervisor();
					sp.setVisible(true);
				}
				else
				{
					label.setText("wrong details");
				}
				//rs=	stmt.executeQuery("SELECT * FROM AGREEMENTS");
				} catch (SQLException e1) 
					{
							// TODO Auto-generated catch block
					e1.printStackTrace();
						}
				 
				}
			
			
		});
		btnNewButton.setBounds(190, 157, 89, 23);
		getContentPane().add(btnNewButton);
		
	
	}
}
