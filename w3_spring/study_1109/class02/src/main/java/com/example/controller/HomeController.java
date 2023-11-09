package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	@GetMapping("/hello")
	@ResponseBody
	public String hello() {
		return "Hello!";
	}
	
	@GetMapping("/")
	public String home(Model model) {
		model.addAttribute("pageName", "about");
		return "home";
	}
}
