package br.universidade.loja.service;

import br.universidade.loja.model.*;
import br.universidade.loja.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired private CartRepository cartRepository;
    @Autowired private ProdutoRepository produtoRepository;
    @Autowired private AppUserRepository appUserRepository;

    public Cart getCartForUser(String username) {
        AppUser user = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Cart cart = cartRepository.findByAppUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setAppUser(user);
                    return cartRepository.save(newCart);
                });

        cart.getItems().forEach(item -> {
            if (item.getProduto() != null) {
                item.getProduto().setQuantidadeDisponivel(item.getProduto().getQuantidadeDisponivel());
            }
        });

        return cart;
    }

    public Cart addProductToCart(String username, Long productId, int quantity) {
        Cart cart = getCartForUser(username);
        Produto produto = produtoRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduto().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduto(produto);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }

    public Cart updateItemQuantity(String username, Long productId, int quantity) {
        Cart cart = getCartForUser(username);
        CartItem itemToUpdate = cart.getItems().stream()
                .filter(item -> item.getProduto().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));

        if (quantity <= 0) {
            cart.getItems().remove(itemToUpdate);
        } else {
            itemToUpdate.setQuantity(quantity);
        }

        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(String username, Long productId) {
        Cart cart = getCartForUser(username);
        cart.getItems().removeIf(item -> item.getProduto().getId().equals(productId));
        return cartRepository.save(cart);
    }
}