package br.universidade.loja.service;

import br.universidade.loja.model.AppUser;
import br.universidade.loja.model.Cart;
import br.universidade.loja.model.CartItem;
import br.universidade.loja.model.Estoque;
import br.universidade.loja.repository.AppUserRepository;
import br.universidade.loja.repository.CartRepository;
import br.universidade.loja.repository.EstoqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CheckoutService {

    @Autowired private AppUserRepository appUserRepository;
    @Autowired private CartRepository cartRepository;
    @Autowired private EstoqueRepository estoqueRepository;

    @Transactional
    public void performCheckout(String username) {
        AppUser user = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        Cart cart = cartRepository.findByAppUser(user)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado."));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Seu carrinho está vazio.");
        }

        for (CartItem item : cart.getItems()) {
            Estoque estoque = estoqueRepository.findByProduto(item.getProduto())
                    .orElseThrow(() -> new RuntimeException("Estoque não encontrado para o produto: " + item.getProduto().getNome()));

            if (estoque.getQuantidade() < item.getQuantity()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + item.getProduto().getNome());
            }

            estoque.setQuantidade(estoque.getQuantidade() - item.getQuantity());
            estoqueRepository.save(estoque);
        }

        cart.getItems().clear();
        cartRepository.save(cart);
    }
}