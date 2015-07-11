import javax.swing.JComboBox;

import java.awt.Dimension;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JPasswordField;
import javax.swing.JButton;

public class Studentlogin extends javax.swing.JFrame {
	private JTextField textField;
	private JPasswordField passwordField;
	public Studentlogin() {
		getContentPane().setPreferredSize(new Dimension(1000, 1000));
		getContentPane().setLayout(null);
		
		JLabel lblUserId = new JLabel("User id");
		lblUserId.setBounds(78, 63, 46, 14);
		getContentPane().add(lblUserId);
		
		JLabel lblPassword = new JLabel("Password");
		lblPassword.setBounds(78, 99, 46, 14);
		getContentPane().add(lblPassword);
		
		textField = new JTextField();
		textField.setBounds(157, 60, 86, 20);
		getContentPane().add(textField);
		textField.setColumns(10);
		
		passwordField = new JPasswordField();
		passwordField.setBounds(157, 96, 86, 20);
		getContentPane().add(passwordField);
		
		JButton btnNewButton = new JButton("Submit");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});
		btnNewButton.setBounds(99, 129, 89, 23);
		getContentPane().add(btnNewButton);
		pack();
		
	}
}
