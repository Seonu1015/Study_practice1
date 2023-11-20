package com.example.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.EnrollDAO;
import com.example.service.EnrollService;

@RestController
@RequestMapping("/enroll")
public class EnrollRestController {
	@Autowired
	EnrollService service;
	
	@Autowired
	EnrollDAO dao;
	
	@GetMapping("/delete")
	public void delete(String lcode, String scode) {
		service.delete(scode, lcode);
	}
	
	@GetMapping("/insert")
	public void insert(String lcode, String scode) {
		service.insert(scode, lcode);
	}
	
	@GetMapping("/read")
	public HashMap<String, Object> read(String scode, String lcode){
		return dao.read(scode, lcode);
	}
}
