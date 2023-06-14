package com.shop.zai.service;

import com.shop.zai.entity.Category;
import com.shop.zai.entity.Product;
import com.shop.zai.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> findAllByCategory(int id){
        return productRepository.findAllByCategoryId(id);
    }

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    public Product findProductById(int id){
        return productRepository.findProductById(id);
    }

    public Long deleteProductById(int id){
        return productRepository.deleteProductById(id);
    }

    public int countProductsByCategory(Category category){
        return productRepository.countProductByCategory(category);
    }

    public Product findProductByName(String name){
        return productRepository.findProductByName(name);
    }

    public List<Product>searchProducts(String search){
        return productRepository.searchProducts(search);
    }

    public List<Object>getNewestProducts(){
        return productRepository.getNewestProducts();
    }
}
