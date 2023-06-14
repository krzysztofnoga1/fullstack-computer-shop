package com.shop.zai.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToOne
    Client client;

    @OneToMany
    @JsonManagedReference
    List<CartItem> items;

    public void clearCart(){
        items.clear();
    }

    public void addNewItem(CartItem item){
        items.add(item);
    }
}
