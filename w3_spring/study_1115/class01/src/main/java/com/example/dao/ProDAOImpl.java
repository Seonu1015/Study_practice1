package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.ProVO;

@Repository
public class ProDAOImpl implements ProDAO {
	@Autowired
	SqlSession session;
	
	String namespace="com.example.mapper.ProfessorMapper";

	@Override
	public List<HashMap<String, Object>> list() {
		return session.selectList(namespace + ".list");
	}

	@Override
	public int code() {
		return session.selectOne(namespace + ".code");
	}

	@Override
	public void insert(ProVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public HashMap<String, Object> read(String pcode) {
		return session.selectOne(namespace + ".read", pcode);
	}

}
