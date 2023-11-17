package com.example.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.ProDAO;
import com.example.domain.ProVO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/pro")
public class ProRestController {
	@Autowired
	ProDAO dao;

	@GetMapping("/list.json")
	public List<HashMap<String, Object>> list() {
		return dao.list();
	}
	
	@GetMapping("/code")
	public int code() {
		return dao.code();
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody ProVO vo) {
		dao.insert(vo);
	}
	
	@GetMapping("/read.json")
	public HashMap<String, Object> read(String pcode) {
		return dao.read(pcode);
	}
	
	@GetMapping("/stu/list.json")
	public List<HashMap<String, Object>> stuList(String pcode) {
		return dao.stuList(pcode);
	}
	
	@GetMapping("/cou/list.json")
	public List<HashMap<String, Object>> couList(String pcode) {
		return dao.couList(pcode);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody ProVO vo) {
		dao.update(vo);
	}
	
	@GetMapping("/slist.json")
	public HashMap<String, Object> slist(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", dao.slist(vo));
		map.put("total", dao.total(vo));
		return map;
	}
	
	@GetMapping("/total")
	public int total(QueryVO vo) {
		return dao.total(vo);
	}
}
