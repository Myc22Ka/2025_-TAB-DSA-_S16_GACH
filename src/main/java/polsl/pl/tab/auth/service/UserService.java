package polsl.pl.tab.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import polsl.pl.tab.auth.dto.UserDto;
import polsl.pl.tab.auth.repository.UserRepository;
import polsl.pl.tab.auth.dto.LoginDto;
import polsl.pl.tab.auth.dto.RegisterDto;
import polsl.pl.tab.auth.model.User;
import polsl.pl.tab.configuration.UserAuthenticationProvider;
import polsl.pl.tab.exception.AuthException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserAuthenticationProvider userAuthenticationProvider;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(RegisterDto registerDto) {
        if (userRepository.findByLogin(registerDto.getLogin()).isPresent()) {
            throw new AuthException("Login is already taken", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setLogin(registerDto.getLogin());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setEmail(registerDto.getEmail());
        user.setCash(0.0);
        user.setCreatedAt(LocalDateTime.now());

        String token = userAuthenticationProvider.createToken(user.getLogin());
        user.setToken(token);

        return userRepository.save(user);
    }

    public UserDto login(LoginDto loginDto) {
        User user = userRepository.findByLogin(loginDto.getLogin())
                .filter(u -> passwordEncoder.matches(loginDto.getPassword(), u.getPassword()))
                .orElseThrow(() -> new AuthException("Invalid login or password", HttpStatus.BAD_REQUEST));

        String token = userAuthenticationProvider.createToken(user.getLogin());

        return UserDto.builder()
                .id(user.getId())
                .login(user.getLogin())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .photoUrl(user.getPhotoUrl())
                .email(user.getEmail())
                .cash(user.getCash())
                .createdAt(user.getCreatedAt())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .token(token)
                .build();
    }

    public UserDto validateUser(String token) {
        Authentication authentication = userAuthenticationProvider.validateToken(token);

        return (UserDto) authentication.getPrincipal();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
