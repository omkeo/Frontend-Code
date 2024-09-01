package com.backinformal.BackInFormal_Backend.DTO;

import java.util.ArrayList;
import java.util.List;

import com.backinformal.BackInFormal_Backend.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class InvoiceDetailsDTO {

	private Customer customer;
	private List<ItemDTO> itemsList = new ArrayList<>();
	private double subTotal;
	private int gstRate;
	private double gstAmount;
	private double netTotal;
	private double amtReceived;
	private double amtUnpaid;
	public InvoiceDetailsDTO(Customer customer, List<ItemDTO> itemsList, double subTotal, int gstRate, double gstAmount,
			double netTotal, double amtReceived, double amtUnpaid) {
		super();
		this.customer = customer;
		this.itemsList = itemsList;
		this.subTotal = subTotal;
		this.gstRate = gstRate;
		this.gstAmount = gstAmount;
		this.netTotal = netTotal;
		this.amtReceived = amtReceived;
		this.amtUnpaid = amtUnpaid;
	}
	public InvoiceDetailsDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public List<ItemDTO> getItemsList() {
		return itemsList;
	}
	public void setItemsList(List<ItemDTO> itemsList) {
		this.itemsList = itemsList;
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
	
	
	
}
