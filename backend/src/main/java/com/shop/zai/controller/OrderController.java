package com.shop.zai.controller;

import com.shop.zai.entity.Cart;
import com.shop.zai.entity.CartItem;
import com.shop.zai.entity.Client;
import com.shop.zai.entity.Order;
import com.shop.zai.service.CartService;
import com.shop.zai.service.ClientsService;
import com.shop.zai.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/other")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final CartService cartService;
    private final ClientsService clientsService;

    @PostMapping("/add-order/{client}/{name}/{surname}/{city}/{address}/{code}")
    public Long addOrder(@PathVariable int client, @PathVariable String name, @PathVariable String surname,
                         @PathVariable String city, @PathVariable String address, @PathVariable String code){
        Order order=new Order();
        Client clientEntity=clientsService.findClientById(client);
        order.setClient(clientEntity);
        order.setName(name);
        order.setSurname(surname);
        order.setCity(city);
        order.setAddress(address);
        order.setPostalCode(code);
        List<CartItem> items=cartService.getCartItemsByUserId(client);
        Double sum=0.0;
        StringBuilder orderDetails= new StringBuilder();
        for(CartItem item:items){
            sum+=item.getTotalPrice();
            orderDetails.append(item.getQuantity());
            orderDetails.append(" x ");
            orderDetails.append(item.getProduct().getName());
            orderDetails.append("\n");
        }
        order.setTotalPrice(sum);
        order.setItems(orderDetails.toString());
        Cart cart=cartService.getCartByClientId(client);
        cart.clearCart();
        cartService.saveCart(cart);
        orderService.saveOrder(order);
        return order.getId();
    }

    @GetMapping("/get-order-by-id/{id}")
    public Order getOrderById(@PathVariable int id){
        return orderService.getOrderById(id);
    }

    @GetMapping("/get-all-orders")
    public List<Order> getOrders(){
        return orderService.getOrders();
    }
}
