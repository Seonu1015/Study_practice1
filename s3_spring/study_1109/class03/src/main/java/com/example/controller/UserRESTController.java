package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.UserDAO;
import com.example.domain.UserVO;

@RestController
@RequestMapping("/users/")
public class UserRESTController {
	@Autowired
	UserDAO dao;

	@PostMapping("/login")
	public int login(@RequestBody UserVO vo) {
		int result = 0;
		UserVO user = dao.login(vo.getUid());
		if(user != null) {
			if(vo.getUpass().equals(user.getUpass())) {
				result = 1;
			} else {
				result = 2;
			}
		}
		return result;
	}
}
