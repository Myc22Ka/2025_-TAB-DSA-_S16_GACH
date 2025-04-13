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
        return ResponseEntity.ok(userService.registerUser(registerDto));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(userService.login(loginDto));
    }

//    @PutMapping("/users/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
//        User user = userService.updateUser(id, updatedUser);
//        return ResponseEntity.ok(user);
//    }

    @PostMapping("/validate")
    public ResponseEntity<UserDto> validateToken(@RequestParam("token") String token) {
        UserDto userDto = userService.validateUser(token);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
