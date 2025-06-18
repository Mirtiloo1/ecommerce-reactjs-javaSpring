package br.universidade.loja.controller;

import br.universidade.loja.model.Cart;
import br.universidade.loja.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getUserCart(@AuthenticationPrincipal UserDetails userDetails) {
        Cart cart = cartService.getCartForUser(userDetails.getUsername());
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/items")
    public ResponseEntity<Cart> addCartItem(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, Object> payload) {
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        Cart cart = cartService.addProductToCart(userDetails.getUsername(), productId, quantity);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<Cart> updateCartItem(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long productId, @RequestBody Map<String, Integer> payload) {
        Cart cart = cartService.updateItemQuantity(userDetails.getUsername(), productId, payload.get("quantity"));
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<Cart> removeCartItem(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long productId) {
        Cart cart = cartService.removeItemFromCart(userDetails.getUsername(), productId);
        return ResponseEntity.ok(cart);
    }
}