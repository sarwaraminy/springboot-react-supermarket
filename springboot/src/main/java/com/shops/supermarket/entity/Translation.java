package com.shops.supermarket.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "translations")
@IdClass(TranslationId.class)
public class Translation {

    @Id
    @ManyToOne
    @JoinColumn(name = "lang_code", referencedColumnName = "lang_code")
    private Language language;

    @Id
    @Column(name = "table_name", nullable = false)
    private String tableName;

    @Id
    @Column(name = "column_name", nullable = false)
    private String columnName;

    @Id
    @Column(name = "row_id", nullable = false)
    private int rowId;

    @Column(name = "translation", nullable = false)
    private String translation;

    // Getters and Setters
    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public int getRowId() {
        return rowId;
    }

    public void setRowId(int rowId) {
        this.rowId = rowId;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }
}
