package com.example.dao;

import java.util.*;

import com.example.domain.ProVO;

public interface ProDAO {
	public List<HashMap<String, Object>> list();
	public int code();
	public void insert(ProVO vo);
	public HashMap<String, Object> read(String pcode);
}
