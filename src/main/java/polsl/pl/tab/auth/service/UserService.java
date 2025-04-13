package polsl.pl.tab.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import polsl.pl.tab.auth.dto.UserDto;
import polsl.pl.tab.auth.repository.UserRepository;
import polsl.pl.tab.auth.dto.LoginDto;
import polsl.pl.tab.auth.dto.RegisterDto;
import polsl.pl.tab.auth.model.User;
import polsl.pl.tab.exception.AuthException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(RegisterDto registerDto) {
        if (userRepository.findByLogin(registerDto.getLogin()).isPresent()) {
            throw new AuthException("Login is already taken");
        }

        User user = new User();
        user.setLogin(registerDto.getLogin());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setEmail(registerDto.getEmail());
        user.setCash(0.0);
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public UserDto login(LoginDto loginDto) {
        User user = userRepository.findByLogin(loginDto.getLogin())
                .filter(u -> passwordEncoder.matches(loginDto.getPassword(), u.getPassword()))
                .orElseThrow(() -> new AuthException("Invalid login or password"));

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
                .build();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
