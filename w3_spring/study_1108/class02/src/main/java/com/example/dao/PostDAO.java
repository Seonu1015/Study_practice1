package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.PostVO;

public interface PostDAO {
	public List<HashMap<String, Object>> list();
	public void insert(PostVO vo);
	public void update(PostVO vo);
	public HashMap<String, Object> read(int pid);
	public void delete(int pid);
}
