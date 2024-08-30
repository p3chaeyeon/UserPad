// src/main/java/com/bit/userpad/bean/BoardDTO.java
package com.bit.userpad.bean;

import java.sql.Date;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {
    @NonNull
    private int no;
    
    @NonNull
    private String subject;
    
    @NonNull
    private String content;
    
    @NonNull
    private String userId;
    
    @NonNull
    private Date logDate;
}
