package polsl.pl.tab.api.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import polsl.pl.tab.api.instructor.model.InstructorAppointment;
import polsl.pl.tab.api.instructor.repository.InstructorAppointmentRepository;
import polsl.pl.tab.api.user.dto.*;
import polsl.pl.tab.api.user.model.Role;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;
import polsl.pl.tab.exception.AppException;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final InstructorAppointmentRepository appointmentRepository;

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
        return UserDto.fromEntity(user);
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

    public List<InstructorDetails> getAllInstructors() {
        return userRepository.findByRole(Role.INSTRUCTOR).stream()
                .map(InstructorDetails::fromEntity)
                .toList();
    }

    @Transactional
    public void deleteUser(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Requester not found"));

        userRepository.delete(user);
    }

    public List<UserAppointmentDto> getUserAppointments(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return appointmentRepository.findAllByUserId(user.getId()).stream()
                .map(UserAppointmentDto::fromEntity)
                .toList();
    }
}
