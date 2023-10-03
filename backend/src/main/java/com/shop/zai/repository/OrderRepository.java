package com.shop.zai.repository;

import com.shop.zai.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order getOrderById(int id);

    @Query("select o from Order o")
    List<Order> getAll();
}
