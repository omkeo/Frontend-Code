package com.backinformal.BackInFormal_Backend.DTO;

import java.util.ArrayList;
import java.util.List;

import com.backinformal.BackInFormal_Backend.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDetailsDTO {

	private Customer customer;
	private List<ItemDTO> itemsList = new ArrayList<>();
	private double subTotal;
	private int gstRate;
	private double gstAmount;
	private double netTotal;
	private double amtReceived;
	private double amtUnpaid;
	
}
