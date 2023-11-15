package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pro")
public class ProController {

	@GetMapping("/list")
	public String list(Model model) {
		model.addAttribute("pageName", "pro/list.html");
		return "home";
	}
	
	@GetMapping("/insert")
	public String insert(Model model) {
		model.addAttribute("pageName", "pro/insert.html");
		return "home";
	}
	
	@GetMapping("/read")
	public String read(Model model) {
		model.addAttribute("pageName", "pro/read.html");
		return "home";
	}
}
