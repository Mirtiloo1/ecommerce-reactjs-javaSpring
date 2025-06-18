package br.universidade.loja.configuration;

import br.universidade.loja.model.AppUser;
import br.universidade.loja.model.Category;
import br.universidade.loja.model.Role;
import br.universidade.loja.repository.AppUserRepository;
import br.universidade.loja.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (appUserRepository.findByUsername("admin").isEmpty()) {
            AppUser adminUser = new AppUser();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@admin");
            adminUser.setPassword(passwordEncoder.encode("admin"));
            adminUser.setRoles(Set.of(Role.ROLE_ADMIN, Role.ROLE_USER));

            appUserRepository.save(adminUser);
            System.out.println("Usuário 'admin' padrão criado com sucesso.");
        }
        if (categoryRepository.count() == 0) {
            Category cat1 = new Category();
            cat1.setNome("Smartphones");

            Category cat2 = new Category();
            cat2.setNome("Notebooks");

            Category cat3 = new Category();
            cat3.setNome("Fones de Ouvido");

            Category cat4 = new Category();
            cat4.setNome("Periféricos");

            categoryRepository.saveAll(List.of(cat1, cat2, cat3, cat4));
            System.out.println("Categorias de produtos padrão criadas.");
        }
    }
}