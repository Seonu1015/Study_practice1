package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pro")
public class ProController {
	
	@GetMapping("/list")
	public String list() {
		return "pro/list.html";
	}
	
	@GetMapping("/insert") // 페이지를 가져오는거니까 get을 사용
	public String insert() {
		return "pro/insert.html";
	}
	
	@GetMapping("/read/{pcode}")
	public String read(@PathVariable("pcode") String pcode, Model model) { // pcode를 가져오기 위해서 model을 사용
		model.addAttribute(pcode);
		return "pro/read.html";
	}
}
