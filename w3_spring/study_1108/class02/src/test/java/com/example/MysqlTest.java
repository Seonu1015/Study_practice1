package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.MysqlDAO;
import com.example.dao.PostDAO;
import com.example.domain.PostVO;

@SpringBootTest
public class MysqlTest {
	@Autowired
	MysqlDAO dao;

	@Autowired
	PostDAO pdao;
	
//	@Test
//	public void now() {
//		dao.now();
//	}
	
//	@Test
//	public void insert() {
//		PostVO vo = new PostVO();
//		vo.setTitle("스프링부트란?");
//		vo.setWriter("blue");
//		pdao.insert(vo);
//	}
	
//	@Test
//	public void update() {
//		PostVO vo = new PostVO();
//		vo.setTitle("안녕하세요! 홍길동입니다.");
//		vo.setBody("수정합니다.");
//		vo.setPid(4);
//		pdao.update(vo);
//	}
	
//	@Test
//	public void read() {
//		pdao.read(4);
//	}
	
//	@Test
//	public void delete() {
//		pdao.delete(3);
//	}
	
	@Test
	public void list() {
		pdao.list();
	}
}
