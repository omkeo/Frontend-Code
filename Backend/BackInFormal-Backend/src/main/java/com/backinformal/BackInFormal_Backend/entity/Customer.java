package com.backinformal.BackInFormal_Backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customermaster")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "customer_Id")
	private long customerId;
	
	@Column(name = "customer_name", nullable = false)
	private String custName;
	
	@Column(name = "cust_mobile", nullable = false)
	private String custMobile;
	
	@Column(name = "cust_email", nullable = false,unique = true)
	private String custEmail;
	
	@Column(name = "cust_GSTIN")
	private String custGSTIN;
	
	@Column(name = "cust_PAN")
	private String custPAN;
}
