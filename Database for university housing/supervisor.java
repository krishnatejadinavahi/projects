import javax.swing.JMenuBar;
import javax.swing.JMenu;

import java.awt.Dimension;
import java.awt.TextArea;
import java.awt.Button;
import java.awt.TextField;

import javax.swing.JMenuItem;
import javax.swing.JTextField;
import javax.swing.JButton;

import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class supervisor extends javax.swing.JFrame{
	private JTextField txtEnterChoice;
	private JTextField txtEnterChoice_1;
	private JTextField txtEnterInspectionDate;
	private JTextField txtEnterDamageFees;
	private JTextField txtEnterChoice_2;
	private JTextField txtEnterChoice_3;
	
	static final String jdbcURL 
	= "jdbc:oracle:thin:@ora.csc.ncsu.edu:1521:orcl";

	String user = "ssdeshm2";	// For example, "jsmith"
    String passwd = "200019389";	// Your 9 digit student ID number

	
	Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    ResultSetMetaData rsmd;
    private JTextField textField;
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
	
	
	public supervisor() {
		dataBaseConnection();
		getContentPane().setLayout(null);
		getContentPane().setPreferredSize(new Dimension(1000, 1000));
		pack();
		JMenuBar menuBar = new JMenuBar();
		menuBar.setBounds(10, 11, 97, 21);
		getContentPane().add(menuBar);
		
		JMenu mnOptions = new JMenu("options");
		menuBar.add(mnOptions);
		
		JMenu mnNewMenu = new JMenu("1. View new lease requests");
		mnOptions.add(mnNewMenu);
		
		txtEnterChoice = new JTextField();
		txtEnterChoice.setText("enter choice");
		mnNewMenu.add(txtEnterChoice);
		txtEnterChoice.setColumns(10);
		
		JButton btnSubmit = new JButton("submit");
		mnNewMenu.add(btnSubmit);
		
		JMenuItem mntmBack_1 = new JMenuItem("Back");
		mnNewMenu.add(mntmBack_1);
		
		JMenu mnNewMenu_1 = new JMenu("2. View terminate lease requests");
		mnNewMenu_1.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				String str="Select * from TERMINATIONREQUEST TR,AGREEMENTS A where TR.LEASEID_FORTERMINATION=A.LEASEID";
				try {
					rs=stmt.executeQuery(str);
					while(rs.next())
					{
						String s1=rs.getString("REQUESTID");
						String s2=rs.getString("REASON");
						String s3=rs.getString("REQUESTDATE");
						String s4=rs.getString("INSPECTIONDATE");
						String s5=rs.getString("FEES");
						String s6=rs.getString("LEASEID_FORTERMINATION");
						String s7=rs.getString("STATUS");
						System.out.println(s1+" "+s2+" "+s3+" "+s4+" "+s5+" "+s6+" "+s7);
					}
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}
		});
		mnOptions.add(mnNewMenu_1);
		
		txtEnterChoice_1 = new JTextField();
		txtEnterChoice_1.setText("enter choice");
		mnNewMenu_1.add(txtEnterChoice_1);
		txtEnterChoice_1.setColumns(10);
		
		txtEnterInspectionDate = new JTextField();
		txtEnterInspectionDate.setText("enter inspection date");
		mnNewMenu_1.add(txtEnterInspectionDate);
		txtEnterInspectionDate.setColumns(10);
		
		txtEnterDamageFees = new JTextField();
		txtEnterDamageFees.setText("enter damage fees");
		mnNewMenu_1.add(txtEnterDamageFees);
		txtEnterDamageFees.setColumns(10);
		
		JButton btnSubmit_1 = new JButton("submit");
		btnSubmit_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				String str1= txtEnterChoice_1.getText();
				String str2= txtEnterInspectionDate.getText();
				String str3= txtEnterDamageFees.getText();
				
				//String str="INSERT INTO TERMINATIONREQUEST(REASON,STATUS,INSPECTIONDATE,FEES,LEASEID_FORTERMINATION,REQUESTDATE,REQUESTID) VALUES('"+str1+"','"+str2+"','"+str3+"')"; //UPDATE TERMINATIONREQUEST SET STATUS='COMPLETE' WHERE LEASID_FORTERMINATION='"+str1+"'";
			String str="Update TERMINATIONREQUEST SET INSPECTIONDATE= '"+str2+"' AND DAMAGE FEES= '"+str3+"' WHERE REQUESTID= '"+str1+"'";
				try {
				rs=stmt.executeQuery(str);
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}
		});
		mnNewMenu_1.add(btnSubmit_1);
		
		JMenuItem mntmBack = new JMenuItem("Back");
		mnNewMenu_1.add(mntmBack);
		
		JMenu mnNewMenu_2 = new JMenu("3. View maintenance tickets");
		mnOptions.add(mnNewMenu_2);
		
		txtEnterChoice_2 = new JTextField();
		txtEnterChoice_2.setText("enter choice");
		mnNewMenu_2.add(txtEnterChoice_2);
		txtEnterChoice_2.setColumns(10);
		
		JButton btnSubmit_2 = new JButton("submit");
		mnNewMenu_2.add(btnSubmit_2);
		
		JMenuItem mntmBack_2 = new JMenuItem("Back");
		mnNewMenu_2.add(mntmBack_2);
		
		JMenu mnNewMenu_3 = new JMenu("4. View parking requests");
		mnOptions.add(mnNewMenu_3);
		
		txtEnterChoice_3 = new JTextField();
		txtEnterChoice_3.setText("enter choice");
		mnNewMenu_3.add(txtEnterChoice_3);
		txtEnterChoice_3.setColumns(10);
		
		JButton btnSubmit_3 = new JButton("submit");
		mnNewMenu_3.add(btnSubmit_3);
		
		JMenuItem mntmBack_3 = new JMenuItem("Back");
		mnNewMenu_3.add(mntmBack_3);
		
		JMenu mnNewMenu_4 = new JMenu("5. Profile ");
		mnOptions.add(mnNewMenu_4);
		
		JMenu mnNewMenu_5 = new JMenu("6. Back");
		mnOptions.add(mnNewMenu_5);
	}
}
