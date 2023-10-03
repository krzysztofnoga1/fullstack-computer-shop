package com.shop.zai.repository;

import com.shop.zai.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Transactional
    Long deleteItemById(int id);

    @Transactional
    Long deleteCartItemsByCartId(int id);


}
