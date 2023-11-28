package com.example.dao;

import java.util.*;

import com.example.domain.UserVO;

public interface CartDAO {
	public List<HashMap<String, Object>> list(UserVO vo);
	public int total(String uid);
}
