package com.backinformal.BackInFormal_Backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "invoicemaster")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MainInvoice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "invoice_id")
	private long id;
	
	@ManyToOne
	@JoinColumn(name = "invoice_list_id")
	private InvoiceItemsList invoiceListId;
	
	@ManyToOne
	@JoinColumn(name = "cust_id")
	private Customer customer;
	
	@Column(name = "sub_total")
	private double subTotal;
	
	@Column(name = "gst_rate")
	private int gstRate;
	
	@Column(name = "gst_amount")
	private double gstAmount;
	
	@Column(name = "net_total")
	private double netTotal;
	
	@Column(name = "amt_received")
	private double amtReceived;
	
	@Column(name = "amt_unpaid")
	private double amtUnpaid;
	
	@Column(name = "invoice_number")
	private String uniqueInvoiceNumber;
	
	
}
