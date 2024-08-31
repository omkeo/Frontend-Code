package com.backinformal.BackInFormal_Backend.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "invoice_items_list")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceItemsList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "invoice_items_id")
	private long invoiceItemId;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "cust_id")
	private Customer custId;
	
	@CreationTimestamp
	private LocalDate createdOn;
	
	@OneToMany(mappedBy = "invoiceId",cascade = CascadeType.ALL)
	private List<ItemData> itemDataList = new ArrayList<ItemData>();
}
