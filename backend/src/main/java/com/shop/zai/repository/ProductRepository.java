package com.shop.zai.repository;

import com.shop.zai.entity.Category;
import com.shop.zai.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product>findAllByCategoryId(int id);
    Product findProductById(int id);
    @Transactional
    Long deleteProductById(int id);
    int countProductByCategory(Category category);

    @Query("select p from Product p where p.name=:name")
    Product findProductByName(String name);

    @Query("select p from Product p where p.name like %:search%")
    List<Product>searchProducts(String search);

    @Query(value="select product.id, product.name, product.price, product.img, category.id from product join category on product.category_id=category.id order by product.id desc limit 3", nativeQuery = true)
    List<Object>getNewestProducts();

}
