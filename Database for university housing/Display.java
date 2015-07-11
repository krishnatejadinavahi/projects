import javax.swing.JButton;

import java.awt.BorderLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Dimension;
import java.awt.Component;
import java.awt.FlowLayout;
import java.sql.*;
public class Display extends javax.swing.JFrame 
{
	
	
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
	
	
	public Display() {
				
		getContentPane().setPreferredSize(new Dimension(1000, 1000));
		pack();
	
		JButton btnNewButton = new JButton("Student Login");
		btnNewButton.setBounds(10, 106, 121, 25);
		btnNewButton.setMaximumSize(new Dimension(10, 10));
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			
			Login lo=new Login();
			lo.setVisible(true);
			}
		});
		getContentPane().setLayout(null);
		getContentPane().add(btnNewButton);
		
		JButton btnNewButton_1 = new JButton("Guestlogin");
		btnNewButton_1.setBounds(270, 106, 119, 25);
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			guest gu=new guest();
			gu.setVisible(true);
			}
		});
		getContentPane().add(btnNewButton_1);
		
		JButton btnNewButton_2 = new JButton("Exit");
		btnNewButton_2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			
				
			//	try {
					//stmt.executeUpdate("INSERT INTO COFFEES " +
							//   "VALUES ('pawan kalyan', 888, 8.88, 8, 8)");
			//	}// catch (SQLException e) {
					// TODO Auto-generated catch block
					//e.printStackTrace();
				//}

		//		try {
		//			rs = stmt.executeQuery("SELECT COF_NAME, PRICE FROM COFFEES");
		//		} catch (SQLException e) {
		//			// TODO Auto-generated catch block
		//			e.printStackTrace();
		//		}

				// Now rs contains the rows of coffees and prices from
				// the COFFEES table. To access the data, use the method
				// NEXT to access all rows in rs, one row at a time

		//		try {
		//			while (rs.next()) {
		//			    String s = rs.getString("COF_NAME");
		//			    float n = rs.getFloat("PRICE");
		//			    System.out.println(s + "   " + n);
		//			}
		//		} catch (SQLException e) {
					// TODO Auto-generated catch block
		//			e.printStackTrace();
		//		}
			}
		});
		btnNewButton_2.setBounds(399, 106, 75, 25);
		getContentPane().add(btnNewButton_2);
		
		JButton btnAdminLogin = new JButton("Admin login");
		btnAdminLogin.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			adminlog ad=new adminlog();
			ad.setVisible(true);
			}
		});
		btnAdminLogin.setBounds(141, 107, 119, 23);
		getContentPane().add(btnAdminLogin);
	
		
	
	}

}
