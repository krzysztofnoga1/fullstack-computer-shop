package com.shop.zai.service;

import com.shop.zai.entity.Cart;
import com.shop.zai.entity.CartItem;
import com.shop.zai.repository.CartItemRepository;
import com.shop.zai.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public Long findCardIdByClientId(int id){
        return cartRepository.findCartIdByClientId(id);
    }

    public Cart findCartById(int id){
        return cartRepository.findCartById(id);
    }

    public void saveCart(Cart cart){
        cartRepository.save(cart);
    }

    public List<CartItem> getCartItems(int id){
        return cartRepository.getCartItems(id);
    }

    public List<CartItem> getCartItemsByUserId(int id){
        return cartRepository.getCartItemsByClientId(id);
    }

    public Cart getCartByClientId(int id){
        return cartRepository.getCartByClientId(id);
    }

    public void deleteCartByClientId(int id){
        cartItemRepository.deleteCartItemsByCartId(id);
        cartRepository.deleteCartByClientId(id);
    }
}
