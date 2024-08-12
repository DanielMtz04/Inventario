package com.example.CRUD.controller;

import com.example.CRUD.Entity.Article;
import com.example.CRUD.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping(path="api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping
    public void saveUpdate(@RequestBody Article article) {
        articleService.saveOrUpdate(article);
    }

    @DeleteMapping("/{sku}")
    public void deleteSku(@PathVariable("sku") int sku) {
        articleService.delete(sku);
    }

    @GetMapping("/validate-sku/{sku}")
    public boolean checkSkuExists(@PathVariable("sku") int sku) {
        return articleService.doesSkuExist(sku);
    }

    @GetMapping("/query/{sku}")
    public Optional<Article> getArticleBySku(@PathVariable int sku) {
        return Optional.ofNullable(articleService.findBySku(sku));
    }
}
