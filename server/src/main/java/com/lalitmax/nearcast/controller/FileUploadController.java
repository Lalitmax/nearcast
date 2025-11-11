package com.lalitmax.nearcast.controller;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
public class FileUploadController {
    // File upload controller for imagekit

    @Autowired
    private ImageKit imageKit;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            String originalFilename = file.getOriginalFilename();

            FileCreateRequest request = new FileCreateRequest(bytes, originalFilename);
            request.setUseUniqueFileName(true);
            request.setPrivateFile(false); // if you want public

            Result result = imageKit.upload(request);

            // Get public URL of the file
            String publicUrl = result.getUrl();

            return ResponseEntity.ok(publicUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Upload failed",
                "message", e.getMessage()
            ));
        }
    }
}
