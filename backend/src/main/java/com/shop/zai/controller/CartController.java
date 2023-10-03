package com.shop.zai.controller;

import com.shop.zai.entity.Cart;
import com.shop.zai.entity.CartItem;
import com.shop.zai.entity.Product;
import com.shop.zai.service.CartItemService;
import com.shop.zai.service.CartService;
import com.shop.zai.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/other")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final ProductService productService;
    private final CartItemService cartItemService;

    @GetMapping("/cart-by-client-id/{id}")
    public Long findCartIdByClientId(@PathVariable int id){
        return cartService.findCardIdByClientId(id);
    }

    @GetMapping("/add-to-cart/{cart}/{product}")
    public Long addToCart(@PathVariable int cart, @PathVariable int product){
        Cart currentCart=cartService.getCartByClientId(cart);
        Product currentProduct=productService.findProductById(product);
        int index=-1;
        for(CartItem cartItem : currentCart.getItems()){
            if(cartItem.getProduct().getId()==product){
                index=currentCart.getItems().indexOf(cartItem);
            }
        }
        if(index==-1){
            CartItem cartItem=new CartItem();
            cartItem.cart=currentCart;
            cartItem.product=currentProduct;
            cartItem.quantity=1;
            cartItem.totalPrice= currentProduct.getPrice();
            cartItemService.saveCartItem(cartItem);
            currentCart.addNewItem(cartItem);
        }
        else{
            currentCart.getItems().get(index).addProduct();
        }
        cartService.saveCart(currentCart);
        return currentCart.getId();
    }

    @GetMapping("/cart-by-id/{id}")
    public Cart getCartById(@PathVariable int id){
        return cartService.findCartById(id);
    }

    @GetMapping("/cart-items/{id}")
    public List<CartItem> getCartItems(@PathVariable int id){
        return cartService.getCartItems(id);
    }

    @GetMapping("/cart-items-by-client-id/{id}")
    public List<CartItem> getCartItemsByUserId(@PathVariable int id){
        return cartService.getCartItemsByUserId(id);
    }

    @GetMapping("/delete-from-cart/{client}/{item}")
    public Long deleteFromCart(@PathVariable int client, @PathVariable int item){
        Cart cart=cartService.getCartByClientId(client);
        for(int i=0; i<cart.getItems().size(); i++){
            if(cart.getItems().get(i).getId()==item){
                cart.getItems().remove(i);
                cartItemService.deleteItemById(item);
            }
        }
        cartService.saveCart(cart);
        return cart.getId();
    }
}
