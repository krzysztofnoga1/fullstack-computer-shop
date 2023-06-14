package com.shop.zai.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String name;

    private Double price;

    private int quantity;

    @ManyToOne
    private Category category;

    private String spec1;

    private String spec2;

    private String spec3;

    private String spec4;

    private String spec5;

    private String img;
}
