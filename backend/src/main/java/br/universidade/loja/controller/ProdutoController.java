package br.universidade.loja.controller;

import br.universidade.loja.model.Category;
import br.universidade.loja.model.Estoque;
import br.universidade.loja.model.Produto;
import br.universidade.loja.repository.CategoryRepository;
import br.universidade.loja.repository.EstoqueRepository;
import br.universidade.loja.repository.ProdutoRepository;
import br.universidade.loja.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository pr;

    @Autowired
    private EstoqueRepository er;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    @Transactional(readOnly = true)
    public List<Produto> getProdutos() {
        List<Produto> produtos = pr.findAll();
        produtos.forEach(produto -> {
            er.findByProduto(produto).ifPresent(estoque -> {
                produto.setQuantidadeDisponivel(estoque.getQuantidade());
            });
        });
        return produtos;
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
        return pr.findById(id).map(produto -> {
            er.findByProduto(produto).ifPresent(estoque -> {
                produto.setQuantidadeDisponivel(estoque.getQuantidade());
            });
            return ResponseEntity.ok(produto);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public Produto createProduto(@RequestParam("nome") String nome,
                                 @RequestParam("descricao") String descricao,
                                 @RequestParam("preco") BigDecimal preco,
                                 @RequestParam("quantidadeDisponivel") Integer quantidadeDisponivel,
                                 @RequestParam("imagem") MultipartFile imagem,
                                 @RequestParam("categoryId") Long categoryId) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Erro: Categoria não encontrada para o id " + categoryId));

        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setDescricao(descricao);
        produto.setPreco(preco);
        produto.setCategory(category);

        if (imagem != null && !imagem.isEmpty()) {
            String nomeArquivo = fileStorageService.storeFile(imagem);
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/").path(nomeArquivo).toUriString();
            produto.setImageUrl(imageUrl);
        }

        Produto produtoSalvo = pr.save(produto);

        Estoque estoque = new Estoque();
        estoque.setProduto(produtoSalvo);
        estoque.setQuantidade(quantidadeDisponivel);
        er.save(estoque);

        produtoSalvo.setQuantidadeDisponivel(quantidadeDisponivel);
        return produtoSalvo;
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id,
                                                 @RequestParam("nome") String nome,
                                                 @RequestParam("descricao") String descricao,
                                                 @RequestParam("preco") BigDecimal preco,
                                                 @RequestParam("quantidadeDisponivel") Integer quantidadeDisponivel,
                                                 @RequestParam("categoryId") Long categoryId,
                                                 @RequestParam(value = "imagem", required = false) MultipartFile imagem) {

        return pr.findById(id).map(produto -> {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Erro: Categoria não encontrada para o id " + categoryId));

            produto.setNome(nome);
            produto.setDescricao(descricao);
            produto.setPreco(preco);
            produto.setCategory(category);

            if (imagem != null && !imagem.isEmpty()) {
                String nomeArquivo = fileStorageService.storeFile(imagem);
                String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/").path(nomeArquivo).toUriString();
                produto.setImageUrl(imageUrl);
            }

            Estoque estoque = er.findByProduto(produto)
                    .orElse(new Estoque());

            estoque.setProduto(produto);
            estoque.setQuantidade(quantidadeDisponivel);
            er.save(estoque);

            Produto produtoSalvo = pr.save(produto);
            produtoSalvo.setQuantidadeDisponivel(quantidadeDisponivel);
            return ResponseEntity.ok(produtoSalvo);

        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteProduto(@PathVariable Long id) {
        pr.findById(id).ifPresent(produto -> {
            er.findByProduto(produto).ifPresent(estoque -> {
                er.delete(estoque);
            });
            pr.delete(produto);
        });
    }
}