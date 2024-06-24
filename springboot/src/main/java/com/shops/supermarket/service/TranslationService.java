package com.shops.supermarket.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shops.supermarket.entity.Product;
import com.shops.supermarket.entity.Translation;
import com.shops.supermarket.repos.TranslationRepository;

@Service
public class TranslationService {

    private final TranslationRepository translationRepository;

    public TranslationService(TranslationRepository translationRepository) {
        this.translationRepository = translationRepository;
    }

    public List<Product> translateProducts(List<Product> products, String langCode) {
        if (products.isEmpty()) {
            return products;
        }

        // Fetch translations for the products
        List<Long> productIds = products.stream().map(Product::getId).collect(Collectors.toList());
        List<Translation> translations = translationRepository.findByLangCodeAndTableNameAndRowIdIn(
                langCode, "products", productIds
        );

        // Map translations to a structure for easy lookup
        Map<Long, Map<String, String>> translationMap = translations.stream()
                .collect(Collectors.groupingBy(
                        Translation::getRowId,
                        Collectors.toMap(Translation::getColumnName, Translation::getTranslation)
                ));

        // Apply translations to products
        products.forEach(product -> {
            Map<String, String> productTranslations = translationMap.get(product.getId());
            if (productTranslations != null) {
                if (productTranslations.containsKey("name")) {
                    product.setName(productTranslations.get("name"));
                }
                if (productTranslations.containsKey("description")) {
                    product.setDescription(productTranslations.get("description"));
                }
                // Add other fields as necessary
            }
        });

        return products;
    }

    // save translation from product
    public Translation saveTranslation(String langCode, String tableName, String columnName, Long rowId, String translation){
        try {
            Translation newTranslation = new Translation();
            newTranslation.setLangCode(langCode);
            newTranslation.setTableName(tableName);
            newTranslation.setColumnName(columnName);
            newTranslation.setRowId(rowId);
            newTranslation.setTranslation(translation);
            
            // Save the translation to the repository
            return translationRepository.save(newTranslation);
        } catch (Exception e) {
            // Log the exception (you can use a logging framework like SLF4J)
            System.err.println("Error saving translation: " + e.getMessage());
            // Handle the exception as needed, possibly rethrow or return a custom response
            throw new RuntimeException("Failed to save translation", e);
        }
    }
}

