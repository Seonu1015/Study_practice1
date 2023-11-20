package com.example.dao;

import java.util.HashMap;

public interface EnrollDAO {
	public void delete(String scode, String lcode);
	public void persons(String lcode, int count);
	public void insert(String scode, String lcode);
	public HashMap<String, Object> read(String scode, String lcode);
}
