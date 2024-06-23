package com.shops.supermarket.entity;

import java.io.Serializable;
import java.util.Objects;

public class TranslationId implements Serializable {
    private String language;
    private String tableName;
    private String columnName;
    private int rowId;

    // Getters and Setters
    // hashCode and equals methods
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TranslationId that = (TranslationId) o;
        return rowId == that.rowId && 
               Objects.equals(language, that.language) && 
               Objects.equals(tableName, that.tableName) && 
               Objects.equals(columnName, that.columnName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(language, tableName, columnName, rowId);
    }
}
