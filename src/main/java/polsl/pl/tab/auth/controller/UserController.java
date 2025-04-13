package polsl.pl.tab.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.auth.dto.LoginDto;
import polsl.pl.tab.auth.dto.RegisterDto;
import polsl.pl.tab.auth.dto.UserDto;
import polsl.pl.tab.auth.model.User;
import polsl.pl.tab.auth.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterDto registerDto) {
        User user = userService.registerUser(registerDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginDto loginDto) {
        UserDto user = userService.login(loginDto);
        return ResponseEntity.ok(user);
    }

//    @PutMapping("/users/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
//        User user = userService.updateUser(id, updatedUser);
//        return ResponseEntity.ok(user);
//    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
