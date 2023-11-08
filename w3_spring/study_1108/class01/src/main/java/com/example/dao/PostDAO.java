package com.example.dao;

import java.util.List;

import com.example.domain.PostVO;

public interface PostDAO {
	public List<PostVO> list();
	public void insert(PostVO vo);
	public void update(PostVO vo);
	public PostVO read(int pid);
	public void delete(int pid);
}
