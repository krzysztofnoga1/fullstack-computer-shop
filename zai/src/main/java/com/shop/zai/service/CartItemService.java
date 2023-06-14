package com.shop.zai.service;

import com.shop.zai.entity.CartItem;
import com.shop.zai.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Service
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;

    public void saveCartItem(CartItem item){
        cartItemRepository.save(item);
    }

    public Long deleteItemById(int id){
        return cartItemRepository.deleteItemById(id);
    }

}

