package polsl.pl.tab.api.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import polsl.pl.tab.api.user.dto.ChangeEmailRequest;
import polsl.pl.tab.api.user.dto.ChangePasswordRequest;
import polsl.pl.tab.api.user.dto.UserDto;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;
import polsl.pl.tab.api.user.dto.UpdateUserRequest;
import polsl.pl.tab.exception.AppException;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }

        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

    public UserDto getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new UserDto(
                user.getLogin(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getRole(),
                user.getPhotoUrl(),
                user.getCash(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getDateOfBirth(),
                user.getGender()
        );
    }

    public void addCashToUser(Authentication authentication, double amount) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(amount < 0) {
            throw new AppException("You can't just make money from air!");
        }

        user.setCash(user.getCash() + amount);

        userRepository.save(user);
    }

    public void updateUserData(UpdateUserRequest request, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (request.firstname() != null) user.setFirstname(request.firstname());
        if (request.lastname() != null) user.setLastname(request.lastname());
        if (request.phoneNumber() != null) user.setPhoneNumber(request.phoneNumber());
        if (request.address() != null) user.setAddress(request.address());
        if (request.photoUrl() != null) user.setPhotoUrl(request.photoUrl());
        if (request.dateOfBirth() != null) user.setDateOfBirth(request.dateOfBirth());

        if (request.gender() != null && (request.gender().equalsIgnoreCase("M") || request.gender().equalsIgnoreCase("F"))) {
            user.setGender(request.gender().toUpperCase());
        } else if (request.gender() != null) {
            throw new IllegalArgumentException("Gender must be 'M' or 'F'");
        }

        userRepository.save(user);
    }


    public void changeEmail(ChangeEmailRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        user.setEmail(request.email());

        userRepository.save(user);
    }
}
