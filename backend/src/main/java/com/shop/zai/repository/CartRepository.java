package com.shop.zai.repository;

import com.shop.zai.entity.Cart;
import com.shop.zai.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("select c.id from Cart c join Client cl where cl.id=:id")
    Long findCartIdByClientId(int id);

    Cart findCartById(int id);

    @Query("select c.items from Cart c")
    List<CartItem> getCartItems(int id);

    Cart getCartByClientId(int id);

    @Query("select c.items from Cart c where c.client.id=:id")
    List<CartItem> getCartItemsByClientId(int id);

    @Transactional
    Long deleteCartByClientId(int id);
}
