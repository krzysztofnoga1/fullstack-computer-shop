package com.shop.zai.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="cartitem")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @OneToOne
    @JsonBackReference
    public Cart cart;

    @OneToOne
    public Product product;

    public int quantity;

    public Double totalPrice;

    public void addProduct(){
        quantity++;
        totalPrice+=product.getPrice();
    }

    public Double getTotalPrice(){
        return totalPrice;
    }
}
