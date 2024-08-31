package com.backinformal.BackInFormal_Backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "itemmaster")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_Id")
	private long itemId;
	
	@Column(name = "item_code")
	private String itemCode;
	
	@Column(name = "item_name", nullable = false)
	private String itemName;
	
	@Column(name = "item_quantity", nullable = false)
	private int quantity;
	
	@Column(name = "item_price", nullable = false)
	private double itemPrice;
	
	@Column(name = "total_price", nullable = false)
	private double totalPrice;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "invoice_id")
	private InvoiceItemsList invoiceId;
}
