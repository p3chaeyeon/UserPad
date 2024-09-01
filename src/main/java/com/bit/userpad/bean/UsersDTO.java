// src/main/java/com/bit/userpad/bean/UsersDTO.java
package com.bit.userpad.bean;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UsersDTO {
	@NonNull 
	private String name; // 이름
	@NonNull
	private String id; // id
	@NonNull
	private String pwd; // password
	@NonNull
	private String email; // email
	@NonNull
	private String phone; // 전화번호
	
	@Override
	public String toString() {
		return name + "\t" + id + "\t" + pwd + "\t" + "\t" + email + phone;
	}
}