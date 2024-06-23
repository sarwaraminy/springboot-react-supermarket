package com.shops.supermarket.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shops.supermarket.entity.Translation;
import com.shops.supermarket.repos.TranslationRepository;

@Service
public class TranslationService {

    @Autowired
    private TranslationRepository translationRepository;

    public Map<String, String> getTranslations(String tableName, Long rowId, String langCode) {
        List<Translation> translations = translationRepository.findByTableNameAndRowIdAndLanguage_LangCode(tableName, rowId.intValue(), langCode);
        Map<String, String> translationMap = new HashMap<>();
        for (Translation translation : translations) {
            translationMap.put(translation.getColumnName(), translation.getTranslation());
        }
        return translationMap;
    }
}

