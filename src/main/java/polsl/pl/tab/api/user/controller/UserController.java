package polsl.pl.tab.api.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.user.dto.ChangeEmailRequest;
import polsl.pl.tab.api.user.dto.ChangePasswordRequest;
import polsl.pl.tab.api.user.dto.UserDto;
import polsl.pl.tab.api.user.service.UserService;

import java.security.Principal;
import polsl.pl.tab.api.user.dto.UpdateUserRequest;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword( @RequestBody ChangePasswordRequest request, Principal connectedUser) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/change-email")
    public ResponseEntity<?> changeEmail(@RequestBody ChangeEmailRequest request, Principal connectedUser) {
        service.changeEmail(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(service.getCurrentUser(authentication));
    }

    @PostMapping("/add-cash")
    public ResponseEntity<Double> addCash(
            Authentication authentication,
            @RequestParam("amount") double amount
    ) {
        service.addCashToUser(authentication, amount);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/change-entity")
    public ResponseEntity<?> updateUser(
            @RequestBody UpdateUserRequest request,
            Authentication authentication
    ) {
        service.updateUserData(request, authentication);
        return ResponseEntity.ok().build();
    }

}
