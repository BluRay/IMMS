package com.byd.bms.util;

import com.byd.bms.util.DataSources;

public class DataSourceTypeManager {
    private static final ThreadLocal<DataSources> dataSourceTypes = new ThreadLocal<DataSources>(){
        @Override
        protected DataSources initialValue(){
            return DataSources.MASTER;
        }
    };
    
    public static DataSources get(){
        return dataSourceTypes.get();
    }
    
    public static void set(DataSources dataSourceType){
        dataSourceTypes.set(dataSourceType);
    }
    
    public static void reset(){
        dataSourceTypes.set(DataSources.MASTER);
    }
}