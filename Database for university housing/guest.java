import javax.swing.*;

import java.awt.Dimension;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class guest extends javax.swing.JFrame{
	
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
	public guest() {
		getContentPane().setLayout(null);
		getContentPane().setPreferredSize(new Dimension(1000, 1000));
		pack();
		JLabel lblEnterTheApproval = new JLabel("Enter the approval id");
		lblEnterTheApproval.setBounds(118, 99, 133, 14);
		getContentPane().add(lblEnterTheApproval);
		
		JLabel label = new JLabel("");
		label.setBounds(147, 217, 200, 14);
		getContentPane().add(label);
		
		textField = new JTextField();
		textField.setBounds(261, 96, 86, 20);
		getContentPane().add(textField);
		textField.setColumns(10);
		
		JButton btnSubmit = new JButton("Submit");
		btnSubmit.setBounds(164, 150, 124, 23);
		btnSubmit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				
				dataBaseConnection();
				String str=textField.getText();
				String str3= "SELECT * FROM GUEST WHERE '"+str+"'= GUESTID";
				try {
				rs = stmt.executeQuery(str3);
				if(rs.next())
				{
					guestoptions go=new guestoptions();
					go.setVisible(true);
				}
				else
				{
					label.setText("wrong details");
				}
				//rs=	stmt.executeQuery("SELECT * FROM AGREEMENTS");
				} catch (SQLException e1) {
							// TODO Auto-generated catch block
					e1.printStackTrace();
						}
				 
				}
				
	
				
			
			
		});
		getContentPane().add(btnSubmit);
		
		
	}
}
