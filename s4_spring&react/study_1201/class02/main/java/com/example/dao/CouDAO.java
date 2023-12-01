package com.example.dao;

import java.util.*;

public interface CouDAO {
	public List<HashMap<String, Object>> list();
	public void updatePersons(int amount, String lcode);
}
