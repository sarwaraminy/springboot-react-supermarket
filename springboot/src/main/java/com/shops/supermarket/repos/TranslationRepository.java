package com.shops.supermarket.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.Translation;
import com.shops.supermarket.entity.TranslationId;

public interface TranslationRepository extends JpaRepository<Translation, TranslationId> {
    List<Translation> findByTableNameAndRowIdAndLanguage_LangCode(String tableName, int rowId, String langCode);
}
