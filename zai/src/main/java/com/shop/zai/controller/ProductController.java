package com.shop.zai.controller;

import com.shop.zai.entity.Category;
import com.shop.zai.entity.Product;
import com.shop.zai.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/other")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/products-by-category/{id}")
    public List<Product>findProductsByCategory(@PathVariable int id){
        return productService.findAllByCategory(id);
    }

    @PostMapping("/add-new-product/{category}/{name}/{price}/{quantity}/{spec1}/{spec2}/{spec3}/{spec4}/{spec5}")
    public Product addNewProduct(@PathVariable Category category, @PathVariable String name, @PathVariable Double price,
                       @PathVariable int quantity, @PathVariable String spec1, @PathVariable String spec2,
                       @PathVariable String spec3, @PathVariable String spec4, @PathVariable String spec5){
        Product newProduct=new Product();
        newProduct.setCategory(category);
        newProduct.setName(name);
        newProduct.setPrice(price);
        newProduct.setQuantity(quantity);
        newProduct.setSpec1(spec1);
        newProduct.setSpec2(spec2);
        newProduct.setSpec3(spec3);
        newProduct.setSpec4(spec4);
        newProduct.setSpec5(spec5);
        return productService.saveProduct(newProduct);
    }

    @PostMapping("/update-product-by-id/{id}/{name}/{price}/{quantity}/{spec1}/{spec2}/{spec3}/{spec4}/{spec5}")
    public Product updateProduct(@PathVariable int id, @PathVariable String name, @PathVariable Double price,
                                 @PathVariable int quantity, @PathVariable String spec1, @PathVariable String spec2,
                                 @PathVariable String spec3, @PathVariable String spec4, @PathVariable String spec5){
        Product product=productService.findProductById(id);
        product.setName(name);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setSpec1(spec1);
        product.setSpec2(spec2);
        product.setSpec3(spec3);
        product.setSpec4(spec4);
        product.setSpec5(spec5);
        return productService.saveProduct(product);
    }

    @PostMapping("/delete-product-by-id/{id}")
    public Long deleteById(@PathVariable int id){
        return productService.deleteProductById(id);
    }

    @GetMapping("/product-by-id/{id}")
    public Product findProductById(@PathVariable int id){
        return productService.findProductById(id);
    }

    @GetMapping("/count-products-by-category/{category}")
    public int countProductsByCategory(@PathVariable Category category){
        return productService.countProductsByCategory(category);
    }

    @GetMapping("/product-by-name/{name}")
    public Product findProductByName(String name){
        return productService.findProductByName(name);
    }

    @GetMapping("/search-products/{search}")
    public List<Product> searchProducts(@PathVariable String search){
        return productService.searchProducts(search);
    }

    @GetMapping("/get-newest")
    public List<Object>getNewestProducts(){
        return productService.getNewestProducts();
    }
}
