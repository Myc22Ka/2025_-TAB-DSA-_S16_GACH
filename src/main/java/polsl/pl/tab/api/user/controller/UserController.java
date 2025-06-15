package polsl.pl.tab.api.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.user.dto.*;
import polsl.pl.tab.api.user.service.UserService;
import polsl.pl.tab.exception.SuccessResponse;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

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

    @PatchMapping("/update")
    public ResponseEntity<?> updateUser(
            @RequestBody UpdateUserRequest request,
            Authentication authentication
    ) {
        service.updateUserData(request, authentication);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/instructors")
    public ResponseEntity<List<InstructorDetails>> getInstructorDetails() {
        return ResponseEntity.ok(service.getAllInstructors());
    }

    @DeleteMapping("/me")
    public ResponseEntity<SuccessResponse> deleteUser(Authentication authentication){
        service.deleteUser(authentication);

        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now().toString(),
                "Removed user successfully",
                200
        );

        return ResponseEntity.ok(response);
    }
}
