package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/posts/")
public class PostController {
	@GetMapping("/")
	public String list(Model model) {
		model.addAttribute("pageName","posts/list");
		return "home";
	}
	
}
