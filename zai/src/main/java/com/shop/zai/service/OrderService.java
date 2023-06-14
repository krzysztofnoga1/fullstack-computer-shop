package com.shop.zai.service;

import com.shop.zai.entity.Order;
import com.shop.zai.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    @Transactional
    public void saveOrder(Order order){
        orderRepository.save(order);
    }

    public Order getOrderById(int id){
        return orderRepository.getOrderById(id);
    }

    public List<Order> getOrders(){
        return orderRepository.getAll();
    }
}
