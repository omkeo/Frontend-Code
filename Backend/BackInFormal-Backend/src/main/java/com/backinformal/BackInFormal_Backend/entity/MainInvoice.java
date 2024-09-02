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

	public MainInvoice(long id, InvoiceItemsList invoiceListId, Customer customer, double subTotal, int gstRate,
			double gstAmount, double netTotal, double amtReceived, double amtUnpaid, String uniqueInvoiceNumber) {
		super();
		this.id = id;
		this.invoiceListId = invoiceListId;
		this.customer = customer;
		this.subTotal = subTotal;
		this.gstRate = gstRate;
		this.gstAmount = gstAmount;
		this.netTotal = netTotal;
		this.amtReceived = amtReceived;
		this.amtUnpaid = amtUnpaid;
		this.uniqueInvoiceNumber = uniqueInvoiceNumber;
	}

	public MainInvoice() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public InvoiceItemsList getInvoiceListId() {
		return invoiceListId;
	}

	public void setInvoiceListId(InvoiceItemsList invoiceListId) {
		this.invoiceListId = invoiceListId;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public double getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(double subTotal) {
		this.subTotal = subTotal;
	}

	public int getGstRate() {
		return gstRate;
	}

	public void setGstRate(int gstRate) {
		this.gstRate = gstRate;
	}

	public double getGstAmount() {
		return gstAmount;
	}

	public void setGstAmount(double gstAmount) {
		this.gstAmount = gstAmount;
	}

	public double getNetTotal() {
		return netTotal;
	}

	public void setNetTotal(double netTotal) {
		this.netTotal = netTotal;
	}

	public double getAmtReceived() {
		return amtReceived;
	}

	public void setAmtReceived(double amtReceived) {
		this.amtReceived = amtReceived;
	}

	public double getAmtUnpaid() {
		return amtUnpaid;
	}

	public void setAmtUnpaid(double amtUnpaid) {
		this.amtUnpaid = amtUnpaid;
	}

	public String getUniqueInvoiceNumber() {
		return uniqueInvoiceNumber;
	}

	public void setUniqueInvoiceNumber(String uniqueInvoiceNumber) {
		this.uniqueInvoiceNumber = uniqueInvoiceNumber;
	}
	
	
	
	
}
