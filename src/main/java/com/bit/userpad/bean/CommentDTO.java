// src/main/java/com/bit/userpad/bean/CommentDTO.java
package com.bit.userpad.bean;

import java.sql.Date;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    @NonNull
    private int id;
    @NonNull
    private String content;
    @NonNull
    private int postNo;
    @NonNull
    private String userId;
    @NonNull
    private Date logDate;
    
    public CommentDTO(String content, String userId, Date logDate) {
        this(0, content, 0, userId, logDate); // id와 postNo에 기본값 설정
    }
}