import javax.swing.DefaultListModel;
import javax.swing.JMenuBar;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.awt.TextField;

import javax.swing.JRadioButtonMenuItem;

import java.awt.Button;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.TextArea;
import java.awt.Dimension;

import javax.swing.JTextArea;
import javax.swing.JList;
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
import javax.swing.DefaultListModel;
public class guestoptions extends javax.swing.JFrame{
	private JTextField txtEnterTheInvoice;
	private JTextField txtEnterTheLease;
	private JTextField txtPreference;
	private JTextField txtPreference_1;
	private JTextField txtPreference_2;
	private JTextField txtDateYouWant;
	private JTextField txtPaymentOptions;
	private JTextField txtPeriodForLeasing;
	private JTextField txtDateYouWant_1;
	private JTextField txtReasonForTermination;
	private JTextField txtEnterRequestNumber;
	private JTextField txtEnterVehicleType;
	private JTextField txtHandicappedenterYesOr;
	private JTextField txtEnterTheParking;
	private JTextField txtEnterChoice;
	
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
	
	
	public guestoptions() {
		dataBaseConnection();
		getContentPane().setLayout(null);
		getContentPane().setPreferredSize(new Dimension(1000, 1000));
		pack();
		JMenuBar menuBar = new JMenuBar();
		menuBar.setBounds(10, 11, 97, 21);
		getContentPane().add(menuBar);
		
		JMenu mnOptions = new JMenu("Options");
		menuBar.add(mnOptions);
		
		JMenu mnhousing = new JMenu("1.Housing");
		mnOptions.add(mnhousing);
		
		JMenuItem mnViewInvoices = new JMenu("1. View invoices");
		mnhousing.add(mnViewInvoices);
		
		JMenuItem mnViewCurrent = new JMenu("1. View Current Invoice");
		mnViewCurrent.addMouseListener(new MouseAdapter() {
			
			public void mouseClicked(MouseEvent arg0)
			{
			
				dataBaseConnection();
				String str="SELECT INVOICES.INVOICEID, INVOICES.COST AS INVCOST, INVOICES.STUDENTID, INVOICES.STATUS, INVOICES.INVOICEDATE FROM INVOICES, GUEST, SESSIONVARIABLES WHERE GUEST.GUESTID = SESSIONVARIABLES.ID_NUM AND INVOICES.STATUS = 'BILLED' AND INVOICES.INVOICEDATE IN (SELECT max(INVOICEDATE) from INVOICES)";
				try {
					rs=stmt.executeQuery(str);
					System.out.println("INVOICEID\t COST\t STUDENTID\t STATUS\t INVOICEDATE\n");
					while(rs.next())
					{
						String s1=rs.getString(1);
						String s2=rs.getString(2);
						String s3=rs.getString(3);
						String s4=rs.getString(4);
						String s5=rs.getString(5);
						System.out.println(s1+" "+s2+" "+" "+s3+" "+s4+" "+s5);
					}
				} catch (SQLException e) {
					// TODO Auto-generated catch block.
					e.printStackTrace();
				}
			
			}
		});
		
		mnViewInvoices.add(mnViewCurrent);
		DefaultListModel listModel = new DefaultListModel();
		JList list = new JList();
		mnViewCurrent.add(list);
		
		JMenu mnViewFormer = new JMenu("2. View Former invoice");
		mnViewFormer.addMouseListener(new MouseAdapter() {
			//String str2=
			public void mouseClicked(MouseEvent e) 
			{
				String str="SELECT INVOICES.INVOICEID FROM INVOICES, GUEST, SESSIONVARIABLES WHERE GUEST.GUESTID  = SESSIONVARIABLES.ID_NUM AND INVOICES.STATUS = 'BILLED'";
				System.out.println("Invoiceid\n");
				try {
					rs=stmt.executeQuery(str);
					while(rs.next())
					{
						String s1=rs.getString(1);
						System.out.println(s1);
					}
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
			}
		});
		mnViewInvoices.add(mnViewFormer);
		
		txtEnterTheInvoice = new JTextField();
		txtEnterTheInvoice.setText("enter the invoice number");
		mnViewFormer.add(txtEnterTheInvoice);
		txtEnterTheInvoice.setColumns(10);
		
		JButton btnNewButton = new JButton("submit");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			String str2=txtEnterTheInvoice.getText().toString();
			//dataBaseConnection();
			String str3="SELECT INVOICES.INVOICEID, INVOICES.COST AS INVCOST, INVOICES.STUDENTID,INVOICES.STATUS, INVOICES.INVOICEDATE FROM INVOICES WHERE INVOICES.INVOICEID = '"+str2+"'";
			try {
				System.out.println("INVOICEID\t INVCOST\t STUDENTID\t STATUS\t INVOICEDATE");
				rs=stmt.executeQuery(str3);
				while(rs.next())
				{
					String s1=rs.getString(1);
					String s2=rs.getString(2);
					String s3=rs.getString(3);
					String s4=rs.getString(4);
					String s5=rs.getString(5);
					System.out.println(s1+" "+s2+" "+s3+" "+s4+" "+s5);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}
		});
		mnViewFormer.add(btnNewButton);
		
		JMenuItem mntmBack_1 = new JMenuItem("3. Back");
		mnViewInvoices.add(mntmBack_1);
		
		JMenu mnViewLeases = new JMenu("2. View leases");
		mnhousing.add(mnViewLeases);
		
		JMenu mnviewCurrentLease = new JMenu("1.View Current Lease");
		mnviewCurrentLease.addMouseListener(new MouseAdapter() {
			
			public void mouseClicked(MouseEvent e) 
			{
				//dataBaseConnection();
				String str4="SELECT AGREEMENTS.APARTMENTID, AGREEMENTS.DURATION,AGREEMENTS.ENDDATE, AGREEMENTS.LEASEID, AGREEMENTS.PARKINGPREFERENCE, AGREEMENTS.PARKINGSPOT, AGREEMENTS.PLACENUMBER, AGREEMENTS.PREFERENCES, AGREEMENTS.STARTDATE, AGREEMENTS.STATUS, AGREEMENTS.STDLEASEID FROM AGREEMENTS, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = AGREEMENTS.STDLEASEID AND AGREEMENTS.STATUS = 'INPROGRESS'";
				try 
				{
					rs=stmt.executeQuery(str4);
					rsmd=rs.getMetaData();
					System.out.println(rsmd.getColumnCount()+"columncount");
					System.out.println("APARTMENTID\t DURATION\t ENDDATE\t LEASEID\t PARKINGPREFERENCE\t PARKINGSPOT\t PLACENUMBER\t PREFERENCES\t STARTDATE\t STATUS\t STDLEASEID\t");
					while(rs.next())
					{
						
						//System.out.println(rs.next());
						String s1=rs.getString(1);
						String s=rs.getString(2);
						String s2=rs.getString(3);
						String s3=rs.getString(4);
						//String s4=rs.getString("TYPE");
						
						String s5=rs.getString(5);
						String s6=rs.getString(6);
						String s7=rs.getString(7);
						String s8=rs.getString(8);
						String s11=rs.getString(9);
						String s12=rs.getString(10);
						String s13=rs.getString(11);
						System.out.println(s1+" "+s+ " "+s2+" "+s3+" "+s5+ " "+s5+" "+s6+" "+s7+ " "+s8+" "+s8+" "+s11+ " "+s11+" "+s12);
						
						
						
					}
				} catch (SQLException e1) 
				{
					// TODO Auto-generated catch block.
					e1.printStackTrace();
				}
			
			}
			
		});
		mnViewLeases.add(mnviewCurrentLease);
		
		JMenuItem mntmBack_4 = new JMenuItem("Back");
		mnviewCurrentLease.add(mntmBack_4);
		
		JMenu mnViewFormer_1 = new JMenu("2. View Former Lease");
		mnViewFormer_1.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) 
			{
				String str="SELECT AGREEMENTS.LEASEID FROM AGREEMENTS, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = AGREEMENTS.STDLEASEID AND AGREEMENTS.STATUS = 'COMPLETED'";
			try 
			{
				System.out.println("leaseid\n");
				rs=stmt.executeQuery(str);
				while(rs.next())
				{
					System.out.println(rs.getString(1));
				}
			} 
			catch (SQLException e1) 
			{
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			}
		});
		mnViewLeases.add(mnViewFormer_1);
		
		txtEnterTheLease = new JTextField();
		txtEnterTheLease.setText("enter the lease number");
		mnViewFormer_1.add(txtEnterTheLease);
		txtEnterTheLease.setColumns(10);
		
		JButton btnSubmit = new JButton("submit");
		btnSubmit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) 
			{
				String str1=txtEnterTheLease.getText().toString();
				String str="SELECT AGREEMENTS.APARTMENTID, AGREEMENTS.DURATION, AGREEMENTS.ENDDATE, AGREEMENTS.LEASEID, AGREEMENTS.PARKINGPREFERENCE, AGREEMENTS.PARKINGSPOT, AGREEMENTS.PLACENUMBER, AGREEMENTS.PREFERENCES, AGREEMENTS.STARTDATE, AGREEMENTS.STATUS, AGREEMENTS.STDLEASEID FROM AGREEMENTS WHERE '"+str1+"' = AGREEMENTS.LEASEID";
			try {
				rs=stmt.executeQuery(str);
				System.out.println("apt id\t duration\t enddate\t leaseid\t parkingreference\t parkingspot\t PLACENUMBER\t PREFERENCES\t STARTDATE\t, STATUS\t, STDLEASEID\t");
				while(rs.next())
				{
					String s1=rs.getString(1);
					String s=rs.getString(2);
					String s2=rs.getString(3);
					String s3=rs.getString(4);
					//String s4=rs.getString("TYPE");
					
					String s5=rs.getString(5);
					String s6=rs.getString(6);
					String s7=rs.getString(7);
					String s8=rs.getString(8);
					String s11=rs.getString(9);
					String s12=rs.getString(10);
					String s13=rs.getString(11);
					System.out.println(s1+" "+s+ " "+s2+" "+s3+" "+s5+ " "+s5+" "+s6+" "+s7+ " "+s8+" "+s8+" "+s11+ " "+s11+" "+s12);
					
					
					//System.out.println(s1+" "+s+ " "+s2+" "+s3+" "+s5+ " "+s5+" "+s6+" "+s7+ " "+s8+" "+s8+" "+s11+ " "+s11+" "+s12);
					
				
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}
		});
		mnViewFormer_1.add(btnSubmit);
		
		JMenuItem mntmBack_3 = new JMenuItem("3. Back");
		mnViewLeases.add(mntmBack_3);
		
		JMenu mnNewRequest = new JMenu("3. New request");
		mnhousing.add(mnNewRequest);
		
		JMenuItem mnNewLease = new JMenu("1. New Lease Request");
		mnNewRequest.add(mnNewLease);
		
		txtPeriodForLeasing = new JTextField();
		txtPeriodForLeasing.setText("period for leasing");
		mnNewLease.add(txtPeriodForLeasing);
		txtPeriodForLeasing.setColumns(10);
		
		txtPreference = new JTextField();
		txtPreference.setText("preference 1");
		mnNewLease.add(txtPreference);
		txtPreference.setColumns(10);
		
		txtPreference_1 = new JTextField();
		txtPreference_1.setText("preference 2");
		mnNewLease.add(txtPreference_1);
		txtPreference_1.setColumns(10);
		
		txtPreference_2 = new JTextField();
		txtPreference_2.setText("preference 3");
		mnNewLease.add(txtPreference_2);
		txtPreference_2.setColumns(10);
		
		txtDateYouWant = new JTextField();
		txtDateYouWant.setText("date you want to enter");
		mnNewLease.add(txtDateYouWant);
		txtDateYouWant.setColumns(10);
		
		txtPaymentOptions = new JTextField();
		txtPaymentOptions.setText("payment options");
		mnNewLease.add(txtPaymentOptions);
		txtPaymentOptions.setColumns(10);
		
		JButton btnSubmit_1 = new JButton("submit");
		btnSubmit_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) 
			{
				
			}
		});
		mnNewLease.add(btnSubmit_1);
		
		JMenu mnTerminateLease = new JMenu("2. Terminate Lease request");
		mnNewRequest.add(mnTerminateLease);
		
		txtDateYouWant_1 = new JTextField();
		txtDateYouWant_1.setText("date you want to leave");
		mnTerminateLease.add(txtDateYouWant_1);
		txtDateYouWant_1.setColumns(10);
		
		txtReasonForTermination = new JTextField();
		txtReasonForTermination.setText("reason for termination");
		mnTerminateLease.add(txtReasonForTermination);
		txtReasonForTermination.setColumns(10);
		
		textField = new JTextField();
		mnTerminateLease.add(textField);
		textField.setColumns(10);
		String str5="SELECT COUNTERS.INDEXVALUE FROM COUNTERS WHERE INDEXNAME = 'TERMINATIONREQUEST'";
		try {
			rs=stmt.executeQuery(str5);
			while(rs.next())
			{
			textField.setText(rs.getString(1));
			}
			} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		JButton btnSubmit_2 = new JButton("submit");
		btnSubmit_2.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent arg0)
			{
						String str1= txtDateYouWant_1.getText().toString();
						String str2= txtReasonForTermination.getText().toString();
						String str3= textField.getText().toString();
						
				String str="INSERT INTO TERMINATIONREQUEST ( TERMINATIONREQUEST.REQUESTDATE, TERMINATIONREQUEST.REASON, TERMINATIONREQUEST.REQUESTID, TERMINATIONREQUEST.LEASEID_FORTERMINATION, TERMINATIONREQUEST.INSPECTIONDATE, TERMINATIONREQUEST.FEES ) VALUES (TO_DATE('"+str1+"','yyyy/mm/dd'), '"+str2+"', '"+str3+"', (SELECT AGREEMENTS.LEASEID FROM AGREEMENTS, SESSIONVARIABLES, STUDENT WHERE SESSIONVARIABLES.ID_NUM = GUEST.GUESTID AND GUEST.GUESTID = AGREEMENTS.STDLEASEID), NULL, NULL)";

				try
				{
					rs=stmt.executeQuery(str);
				} catch (SQLException e) 
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				String str4="UPDATE COUNTERS SET VALUE = VALUE +1, WHERE COUNTERS.INDEXNAME = 'TERMINATIONREQUEST'";
				try {
					rs=stmt.executeQuery(str4);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});
		mnTerminateLease.add(btnSubmit_2);
		
		JMenuItem mntmBack_5 = new JMenuItem("3. Back");
		mnNewRequest.add(mntmBack_5);
		
		JMenu mnViewcanceRequest = new JMenu("4. View/cancel request");
		mnViewcanceRequest.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				
			
			}
		});
		mnhousing.add(mnViewcanceRequest);
		
		JMenu mnViewRequest = new JMenu("1. View request");
		mnViewRequest.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
			
				String str="SELECT LEASEREQUEST.LEASEREQUESTID as LEASEID, TERMINATIONREQUEST.REQUESTID AS TERMINATIONID FROM LEASEREQUEST, SESSIONVARIABLES, TERMINATIONREQUEST, AGREEMENTS  WHERE SESSIONVARIABLES.ID_NUM = LEASEREQUEST.STUDENTID AND SESSIONVARIABLES.ID_NUM = AGREEMENTS.STDLEASEID AND AGREEMENTS.LEASEID = TERMINATIONREQUEST.LEASEID_FORTERMINATION";
			try {
				rs=stmt.executeQuery(str);
				while(rs.next())
				{
					String s1=rs.getString(1);
					String s2=rs.getString(2);
					
					System.out.println(s1+" "+s2);// "+s3+" "+s4+" "+s5+" "+s6+" "+s7);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}
		});
		mnViewcanceRequest.add(mnViewRequest);
		
		JMenuItem mntmBack_7 = new JMenuItem("Back");
		mnViewRequest.add(mntmBack_7);
		
		JMenu mnCancelRequest = new JMenu("2. Cancel request");
		mnCancelRequest.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				String str="SELECT LEASEREQUEST.LEASEREQUESTID as LEASEID, TERMINATIONREQUEST.REQUESTID AS TERMINATIONID FROM LEASEREQUEST, SESSIONVARIABLES, TERMINATIONREQUEST, AGREEMENTS  WHERE SESSIONVARIABLES.ID_NUM = LEASEREQUEST.STUDENTID AND SESSIONVARIABLES.ID_NUM = AGREEMENTS.STDLEASEID AND AGREEMENTS.LEASEID = TERMINATIONREQUEST.LEASEID_FORTERMINATION";
				try 
				{
					rs=stmt.executeQuery(str);
					System.out.println("Leaseid"+" "+"Requestid");
					//String s2=rs.getString("TERMINATIONID");
					while(rs.next())
					{
						String s1=rs.getString(1);
						String s2=rs.getString(2);
						System.out.println(s1+" "+s2);
					}
				} catch (SQLException e1) 
				{
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});
		mnViewcanceRequest.add(mnCancelRequest);
		
		txtEnterRequestNumber = new JTextField();
		txtEnterRequestNumber.setText("enter request number");
		mnCancelRequest.add(txtEnterRequestNumber);
		txtEnterRequestNumber.setColumns(10);
		
		JButton btnSubmit_3 = new JButton("submit");
		btnSubmit_3.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) 
			{
				String str1=txtEnterRequestNumber.getText();
				String str="DELETE from LEASEREQUEST where LEASEREQUEST.LEASEREQUESTID = '"+str1+"'";
				try {
					rs=stmt.executeQuery(str);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				String str2="DELETE FROM TERMINATIONREQUEST WHERE TERMINATIONREQUEST.REQUESTID = '"+str1+"'";
				try {
					rs=stmt.executeQuery(str2);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});
		mnCancelRequest.add(btnSubmit_3);
		
		JMenuItem mntmBack_6 = new JMenuItem("3. Back");
		mnViewcanceRequest.add(mntmBack_6);
		
		JMenu mnViewVacancy = new JMenu("5. View vacancy");
		mnViewVacancy.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				String str="SELECT RESIDENCE_HALL_ROOM.PLACENUM AS RESIDECEHALL_VACANCY, GENERAL_APTBEDROOM.PLACENUM AS GENERALAPT_VACANCY, FAMILYAPTS.APARTMENTID AS FAMILYAPT_VACANCY FROM RESIDENCE_HALL_ROOM, FAMILYAPTS, GENERAL_APTBEDROOM WHERE RESIDENCE_HALL_ROOM.PLACENUM IN (SELECT RESIDENCE_HALL_ROOM.PLACENUM AS RESIDANT_HALL_VACANY FROM RESIDENCE_HALL_ROOM WHERE RESIDENCE_HALL_ROOM.PLACENUM NOT IN ( SELECT AGREEMENTS.PLACENUMBER FROM AGREEMENTS)) OR GENERAL_APTBEDROOM.PLACENUM IN (SELECT GENERAL_APTBEDROOM.PLACENUM AS GENERAL_APT_VACANCY FROM GENERAL_APTBEDROOM WHERE GENERAL_APTBEDROOM.PLACENUM NOT IN (SELECT AGREEMENTS.PLACENUMBER FROM AGREEMENTS)) OR FAMILYAPTS.APARTMENTID IN (SELECT FAMILYAPTS.APARTMENTID AS FAMILY_APT_VACANCY FROM FAMILYAPTS WHERE FAMILYAPTS.APARTMENTID NOT IN ( SELECT AGREEMENTS.APARTMENTID FROM AGREEMENTS))";
			
			try {
				rs=stmt.executeQuery(str);
				while(rs.next())
				{
					String s1=rs.getString(1);
					String s2=rs.getString(2);
					String s3=rs.getString(3);
					System.out.println("general"+"apartment"+"family");
					System.out.println(s1+" "+s2+" "+s3);
					
				}
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			}
		});
		mnhousing.add(mnViewVacancy);
		
		JMenuItem mntmBack_8 = new JMenuItem("Back");
		mnViewVacancy.add(mntmBack_8);
		
		JMenuItem mntmBack = new JMenuItem("6. Back");
		mnhousing.add(mntmBack);
		
		JMenu mnParking = new JMenu("2.Parking");
		mnOptions.add(mnParking);
		
		JMenu mnRequestNew = new JMenu("1. Request new parking spot");
		mnRequestNew.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println("vehicle choices 1.Bike\n 2.Compact car\n 3.Standard car\n 4.Large car");
			}
		});
		mnParking.add(mnRequestNew);
		
		txtEnterVehicleType = new JTextField();
		txtEnterVehicleType.setText("enter vehicle type");
		mnRequestNew.add(txtEnterVehicleType);
		txtEnterVehicleType.setColumns(10);
		
		txtHandicappedenterYesOr = new JTextField();
		txtHandicappedenterYesOr.setText("handicapped(enter yes or no)");
		mnRequestNew.add(txtHandicappedenterYesOr);
		txtHandicappedenterYesOr.setColumns(10);
		
		JButton btnSubmit_4 = new JButton("submit");
		btnSubmit_4.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				Date obDate = new Date();
		        SimpleDateFormat obDateFormat = new SimpleDateFormat("yyyy-MM-dd");
				String s1= txtEnterVehicleType.getText();
				String s2= txtHandicappedenterYesOr.getText();
				//String s3= txtNearbySpotenterYes.getText();
				int s4=obDate.getDate();
//String str1="DECLARE CNT NUMBER; BEGIN SELECT COUNT(*) INTO CNT FROM AGREEMENTS, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = AGREEMENTS.STDLEASEID AND AGREEMENTS.STATUS = 'INPROGRESS'; IF( CNT > 0 ) THEN INSERT INTO PARKINGREQUEST (PARKINGREQID, PERSONID, REQUESTTIME, CLASSIFICATION, HANDICAPPED, NEARBYSPOT, STATUS) VALUES ((select COUNTERS.INDEXVALUE from COUNTERS where INDEXNAME = 'PARKINGREQID'), (select SESSIONVARIABLES.ID_NUM from SESSIONVARIABLES),sysdate, '"+s1+"', '"+s2+"', 'PENDING'); END IF; END;";
	String str1="DECLARE CNT NUMBER; BEGIN SELECT COUNT(*) INTO CNT FROM GUEST, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = GUEST.GUESTID; IF( CNT > 0 ) THEN INSERT INTO PARKINGREQUEST (PARKINGREQID, PERSONID, REQUESTTIME, CLASSIFICATION, HANDICAPPED, STATUS) VALUES ((select COUNTERS.INDEXVALUE from COUNTERS where INDEXNAME = 'PARKINGREQID'), (select SESSIONVARIABLES.ID_NUM from SESSIONVARIABLES), SYSDATE, '"+s1+"', '"+s2+"', 'PENDING'); END IF; END;";
				try {
				rs=stmt.executeQuery(str1);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}
		});
		mnRequestNew.add(btnSubmit_4);
		
		JMenuItem mntmBack_12 = new JMenuItem("Back");
		mnRequestNew.add(mntmBack_12);
		
		JMenu mnViewParking = new JMenu("2. View parking lot information");
		mnViewParking.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) 
			{
			String str="SELECT LOTS.LOTID, LOTS.RESTRICTIONS, LOTS.TYPE, LOTS.STATUS, NEARBYLOT.NEARBYHALL FROM LOTS, NEARBYLOT WHERE LOTS.LOTID = NEARBYLOT.LOTIDNUM";
			try {
				rs=stmt.executeQuery(str);
				System.out.println("lotid\t restrictions\t type\t status\t nearbyhall");
				while(rs.next())
				{
					String s1=rs.getString(1);
					String s2=rs.getString(2);
					String s3=rs.getString(3);
					String s4=rs.getString(4);
					String s5=rs.getString(5);
					System.out.println(s1+" "+s2+" "+s3+" "+s4+" "+s5);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}
		});
		mnParking.add(mnViewParking);
		
		JMenuItem mntmBack_10 = new JMenuItem("Back");
		mnViewParking.add(mntmBack_10);
		
		JMenu mnViewCurrent_1 = new JMenu("3. View current parking spot");
		mnViewCurrent_1.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) 
			{
				String str="SELECT AGREEMENTS.PARKINGSPOT FROM AGREEMENTS, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = AGREEMENTS.STDLEASEID AND AGREEMENTS.STATUS = 'INPROGRESS'";
				try {
					rs=stmt.executeQuery(str);
					System.out.println("parking spot");
					while(rs.next())
					{
						String s1=rs.getString(1);
						
						System.out.println(s1);
					}
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
			}
		});
		mnParking.add(mnViewCurrent_1);
		
		JMenuItem mntmBack_11 = new JMenuItem("Back");
		mnViewCurrent_1.add(mntmBack_11);
		
		JMenu mnRenewParking = new JMenu("4. Renew parking spot");
		mnParking.add(mnRenewParking);
		
		txtEnterTheParking = new JTextField();
		txtEnterTheParking.setText("enter the parking spot id");
		mnRenewParking.add(txtEnterTheParking);
		txtEnterTheParking.setColumns(10);
		
		JButton btnSubmit_5 = new JButton("submit");
		btnSubmit_5.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				
			}
		});
		mnRenewParking.add(btnSubmit_5);
		
		JMenuItem mntmBack_13 = new JMenuItem("Back");
		mnRenewParking.add(mntmBack_13);
		
		JMenu mnReturnParking = new JMenu("5. Return parking spot");
		mnReturnParking.addMouseListener(new MouseAdapter() {
			
			public void mouseClicked(MouseEvent e) {
				String str="update SPOTS set STATUS='OPEN' where SPOTS.SPOTIDNUM = (SELECT SPOTS.SPOTIDNUM FROM SPOTS, AGREEMENTS, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = AGREEMENTS.STDLEASEID AND AGREEMENTS.STATUS = 'INPROGRESS' AND AGREEMENTS.PARKINGSPOT = SPOTS.SPOTIDNUM)";
			try {
				rs=stmt.executeQuery(str);
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			String str2="update AGREEMENTS set PARKINGSPOT= null where AGREEMENTS.PARKINGSPOT = (SELECT AGREEMENTS.PARKINGSPOT FROM AGREEMENTS, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = AGREEMENTS.STDLEASEID AND AGREEMENTS.STATUS = 'INPROGRESS')";
			try {
				rs=stmt.executeQuery(str2);
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			}
		});
		mnParking.add(mnReturnParking);
		
		JMenuItem mntmBack_14 = new JMenuItem("Back");
		mnReturnParking.add(mntmBack_14);
		
		JMenu mnViewRequest_1 = new JMenu("6. View request status");
		mnViewRequest_1.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				String str="SELECT PARKINGREQUEST.STATUS FROM PARKINGREQUEST WHERE PARKINGREQUEST.REQUESTTIME IN ( SELECT max(PARKINGREQUEST.REQUESTTIME) FROM PARKINGREQUEST, SESSIONVARIABLES WHERE PARKINGREQUEST.PERSONID = SESSIONVARIABLES.ID_NUM)";
				try {
					rs=stmt.executeQuery(str);
					System.out.println("status");
					while(rs.next())
					{
						String s1=rs.getString(1);
						System.out.println(s1);
					}
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
			}
		});
		mnParking.add(mnViewRequest_1);
		
		JMenuItem mntmBack_15 = new JMenuItem("Back");
		mnViewRequest_1.add(mntmBack_15);
		
		JMenuItem mntmBack_9 = new JMenuItem("7. Back");
		mnParking.add(mntmBack_9);
		
		JMenu mnMaintenance = new JMenu("3. Maintenance");
		mnOptions.add(mnMaintenance);
		
		JMenu mnNewTicket = new JMenu("1. New ticket");
		mnMaintenance.add(mnNewTicket);
		
		DefaultListModel listModel1 = new DefaultListModel();
		JList list_1 = new JList(listModel1);
		mnNewTicket.add(list_1);
		
		listModel1.addElement("bike");
		listModel1.addElement("small car");
		listModel1.addElement("compact car");
		listModel1.addElement("large car");
		
		TextArea textArea_7 = new TextArea();
		textArea_7.setText("Enter the description");
		mnNewTicket.add(textArea_7);
		
		JMenu mnViewTicket = new JMenu("2. View ticket status");
		mnViewTicket.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e)
			{
				System.out.println("ticket id\n");
				//String str="SELECT MAINTENANCETICKETS.TICKETID FROM MAINTENANCETICKETS, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = MAINTENANCETICKETS.STUDENTID";
				String str="SELECT MAINTENANCETICKETS.TICKETID FROM MAINTENANCETICKETS, SESSIONVARIABLES WHERE SESSIONVARIABLES.ID_NUM = MAINTENANCETICKETS.STUDENTID";
				try {
					rs=stmt.executeQuery(str);
					while(rs.next())
					{
						String s12=rs.getString(1);
						System.out.println(s12);
					}
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
			}
		});
		mnMaintenance.add(mnViewTicket);
		
		txtEnterChoice = new JTextField();
		txtEnterChoice.setText("enter choice");
		mnViewTicket.add(txtEnterChoice);
		txtEnterChoice.setColumns(10);
		
		JButton btnSubmit_6 = new JButton("submit");
		btnSubmit_6.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				String str1=txtEnterChoice.getText().toString();
				System.out.println("Ticketid\t ticket type\t student id\t location\t ticket date\t description\n");
				String str2="SELECT * FROM MAINTENANCETICKETS WHERE  '"+str1+"' = MAINTENANCETICKETS.TICKETID";
				try {
					rs=stmt.executeQuery(str2);
					while(rs.next())
					{
						
						String s1=rs.getString(1);
						String s2=rs.getString(2);
						String s3=rs.getString(3);
						String s4=rs.getString(4);
						String s5=rs.getString(5);
						String s6=rs.getString(6);
						System.out.println(s1+" "+s2+" "+s3+" "+s4+" "+s5+" "+s6);
					}
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}
		});
		mnViewTicket.add(btnSubmit_6);
		
		JMenuItem mntmBack_17 = new JMenuItem("Back");
		mnViewTicket.add(mntmBack_17);
		
		JMenuItem mntmBack_16 = new JMenuItem("3. Back");
		mnMaintenance.add(mntmBack_16);
		
		JMenu mnProfile = new JMenu("4. Profile");
		mnOptions.add(mnProfile);
		
		JMenu mnViewProfile = new JMenu("1. View profile");
		mnViewProfile.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				String str1="SELECT * FROM STUDENT LEFT outer join STUDENT_FAMILY ON STUDENT.STUDENTID = STUDENT_FAMILY.FAMILYSTUDENTID";
				try {
					rs=stmt.executeQuery(str1);
					rsmd=rs.getMetaData();
					
						System.out.println(rsmd.getColumnLabel(1)+" "+rsmd.getColumnLabel(2)+" "+rsmd.getColumnLabel(3)+" "+rsmd.getColumnLabel(4)+" "+rsmd.getColumnLabel(5)+" "+rsmd.getColumnLabel(6)+" "+rsmd.getColumnLabel(7)+" "+rsmd.getColumnLabel(8)+" "+rsmd.getColumnLabel(9)+" "+rsmd.getColumnLabel(10)+" "+rsmd.getColumnLabel(11)+" "+rsmd.getColumnLabel(12));
					
					while(rs.next())
					{
						String s1= rs.getString(1);
						String s2= rs.getString(2);
						String s3= rs.getString(3);
						String s4= rs.getString(4);
						String s5= rs.getString(5);
						String s6= rs.getString(6);
						String s7= rs.getString(7);
						String s8= rs.getString(8);
						String s9= rs.getString(9);
						String s10= rs.getString(10);
						String s11= rs.getString(11);
						String s12= rs.getString(12);
						//System.out.println(rs.toString());
					System.out.println(s1+" "+s2+" "+s3+" "+s4+" "+s5+" "+s6+" "+s7+" "+s8+" "+s9+" "+s10+" "+s11+" "+s12);
					}
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
			}
		});
		mnProfile.add(mnViewProfile);
		
		JMenuItem mntmBack_19 = new JMenuItem("Back");
		mnViewProfile.add(mntmBack_19);
		
		JMenu mnUpdateProfile = new JMenu("2. Update profile");
		mnProfile.add(mnUpdateProfile);
		
		JMenu mnCategory = new JMenu("Category");
		mnUpdateProfile.add(mnCategory);
		
		TextField textField_3 = new TextField();
		mnCategory.add(textField_3);
		
		JButton btnSubmit_7 = new JButton("submit");
		btnSubmit_7.addActionListener(new ActionListener() {
			String str2=textField_3.getText();
			public void actionPerformed(ActionEvent arg0) {
			
			String str1="UPDATE STUDENT SET STUDENT.CATEGORY= '"+str2+"' WHERE STUDENT.STUDENTID = (select SESSIONVARIABLES.ID_NUM from SESSIONVARIABLES)";
			
			try {
				rs=stmt.executeQuery(str1);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}
		});
		mnCategory.add(btnSubmit_7);
		
		JMenu mnStatus = new JMenu("Status");
		mnUpdateProfile.add(mnStatus);
		
		TextField textField_4 = new TextField();
		mnStatus.add(textField_4);
		
		JButton btnSubmit_8 = new JButton("submit");
		btnSubmit_8.addActionListener(new ActionListener() {
			String str2= textField_4.getText();
			public void actionPerformed(ActionEvent e) {
				String str1="UPDATE STUDENT SET STUDENT.CURRENTSTATUS= '"+str2+"' WHERE STUDENT.STUDENTID = (select SESSIONVARIABLES.ID_NUM from SESSIONVARIABLES)";
			try {
				rs=stmt.executeQuery(str1);
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			}
		});
		mnStatus.add(btnSubmit_8);
		
		JMenu mnNewMenu_1 = new JMenu("Course");
		mnUpdateProfile.add(mnNewMenu_1);
		
		TextField textField_5 = new TextField();
		mnNewMenu_1.add(textField_5);
		
		JButton btnSubmit_9 = new JButton("submit");
		btnSubmit_9.addActionListener(new ActionListener() {
			String str2= textField_5.getText();
			public void actionPerformed(ActionEvent e) 
			{
				String str1="UPDATE STUDENT SET STUDENT.COURSE= '"+str2+"' WHERE STUDENT.STUDENTID = (select SESSIONVARIABLES.ID_NUM from SESSIONVARIABLES)";
				try {
					rs=stmt.executeQuery(str1);
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});
		mnNewMenu_1.add(btnSubmit_9);
		
		JMenu mnNewMenu_2 = new JMenu("type of student");
		mnUpdateProfile.add(mnNewMenu_2);
		
		TextField textField_6 = new TextField();
		mnNewMenu_2.add(textField_6);
		
		JButton btnSubmit_10 = new JButton("submit");
		mnNewMenu_2.add(btnSubmit_10);
		
		JMenu mnNewMenu_3 = new JMenu("Kin first name");
		mnUpdateProfile.add(mnNewMenu_3);
		
		TextField textField_7 = new TextField();
		mnNewMenu_3.add(textField_7);
		
		JButton btnSubmit_11 = new JButton("submit");
		mnNewMenu_3.add(btnSubmit_11);
		
		JMenu mnNewMenu_4 = new JMenu("kin last name");
		mnUpdateProfile.add(mnNewMenu_4);
		
		TextField textField_8 = new TextField();
		mnNewMenu_4.add(textField_8);
		
		JButton btnSubmit_12 = new JButton("submit");
		mnNewMenu_4.add(btnSubmit_12);
		
		JMenu mnNewMenu_5 = new JMenu("kin phone");
		mnUpdateProfile.add(mnNewMenu_5);
		
		TextField textField_9 = new TextField();
		mnNewMenu_5.add(textField_9);
		
		JButton btnSubmit_13 = new JButton("submit");
		mnNewMenu_5.add(btnSubmit_13);
		
		JMenu mnNewMenu_6 = new JMenu("kin state");
		mnUpdateProfile.add(mnNewMenu_6);
		
		TextField textField_10 = new TextField();
		mnNewMenu_6.add(textField_10);
		
		JButton btnSubmit_14 = new JButton("submit");
		mnNewMenu_6.add(btnSubmit_14);
		
		JMenu mnNewMenu_7 = new JMenu("kin street");
		mnUpdateProfile.add(mnNewMenu_7);
		
		TextField textField_11 = new TextField();
		mnNewMenu_7.add(textField_11);
		
		JButton btnSubmit_15 = new JButton("submit");
		mnNewMenu_7.add(btnSubmit_15);
		
		JMenu mnNewMenu_8 = new JMenu("kin zip");
		mnUpdateProfile.add(mnNewMenu_8);
		
		TextField textField_12 = new TextField();
		mnNewMenu_8.add(textField_12);
		
		JButton btnSubmit_16 = new JButton("submit");
		mnNewMenu_8.add(btnSubmit_16);
		
		JMenu mnNewMenu_9 = new JMenu("student type");
		mnUpdateProfile.add(mnNewMenu_9);
		
		TextField textField_13 = new TextField();
		mnNewMenu_9.add(textField_13);
		
		JButton btnSubmit_17 = new JButton("submit");
		mnNewMenu_9.add(btnSubmit_17);
		
		JMenuItem mntmBack_18 = new JMenuItem("3. Back");
		mnProfile.add(mntmBack_18);
		
		JMenu mnBack = new JMenu("5. Back");
		mnBack.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				String str="IF EXISTS(SELECT * FROM AGREEMENTS WHERE AGREEMENTS.STDLEASEID = 1) THEN INSERT INTO PERSON (PERSONID) VALUES (601); END IF;";
				try
				{
				rs=stmt.executeQuery(str);
				}catch(SQLException e)
				{
					e.printStackTrace();
				}
			}
		});
		mnOptions.add(mnBack);
	}
}
