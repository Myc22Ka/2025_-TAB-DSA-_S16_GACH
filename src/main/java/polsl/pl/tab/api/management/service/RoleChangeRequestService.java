package polsl.pl.tab.api.management.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import polsl.pl.tab.api.management.model.RoleChangeRequestDto;
import polsl.pl.tab.api.management.repository.RoleChangeRequestRepository;
import polsl.pl.tab.api.management.model.Status;
import polsl.pl.tab.api.management.model.RoleChangeRequest;
import polsl.pl.tab.api.user.model.Role;
import polsl.pl.tab.api.user.model.User;
import polsl.pl.tab.api.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import polsl.pl.tab.exception.AppException;
import polsl.pl.tab.exception.AuthException;

import java.util.List;

/**
 * Service class for managing role change requests.
 * Provides methods for creating, retrieving, and updating role change requests.
 */
@Service
@AllArgsConstructor
public class RoleChangeRequestService {

    private final RoleChangeRequestRepository repository;
    private UserRepository userRepository;

    /**
     * Creates a new role change request for the authenticated user.
     * Checks if the user already has a pending request or if the requested role is the same as the user's current role.
     *
     * @param requestedRole the role that the user wants to be changed to
     * @param authentication the authentication object containing the user's details
     * @return the created role change request as a DTO
     * @throws AppException if the user already has a pending request or is trying to change to the same role
     */
    public RoleChangeRequestDto createRequest(Role requestedRole, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (repository.existsByUserAndStatus(user, Status.PENDING)) {
            throw new AppException("You already have a pending role change request");
        }

        if(user.getRole() == requestedRole){
            throw new AppException("Cannot change to the same Rule that you already have");
        }

        RoleChangeRequest request = new RoleChangeRequest();
        request.setUser(user);
        request.setRequestedRole(requestedRole);
        request.setStatus(Status.PENDING);

        RoleChangeRequest savedRequest = repository.save(request);
        return new RoleChangeRequestDto(
                savedRequest.getId(),
                savedRequest.getUser().getLogin(),
                savedRequest.getRequestedRole(),
                savedRequest.getStatus());
    }

    /**
     * Retrieves all role change requests for the authenticated user.
     * Accessible only to users with an ADMIN role.
     *
     * @param authentication the authentication object containing the user's details
     * @return a list of role change request DTOs
     * @throws AuthException if the user does not have an ADMIN role
     */
    public List<RoleChangeRequestDto> getAllRequests(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (user.getRole() != Role.ADMIN) {
            throw new AuthException("Access Denied");
        }

        return repository.findAll()
                .stream()
                .map(request -> new RoleChangeRequestDto(
                        request.getId(),
                        request.getUser().getLogin(),
                        request.getRequestedRole(),
                        request.getStatus()
                ))
                .toList();
    }

    /**
     * Updates the status of a role change request.
     * If the status is APPROVED, the user's role is updated to the requested role.
     * Only accessible by users with an ADMIN role.
     *
     * @param requestId the ID of the role change request
     * @param newStatus the new status to set for the request (either APPROVED or REJECTED)
     * @param authentication the authentication object containing the user's details
     * @throws AuthException if the user does not have an ADMIN role
     * @throws AppException if trying to set the status to PENDING or if the request is not found
     */
    @Transactional
    public void updateRequestStatus(Long requestId, Status newStatus, Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (user.getRole() != Role.ADMIN) {
            throw new AuthException("Access Denied");
        }

        RoleChangeRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if(newStatus == Status.PENDING) {
            throw new AppException("You can't change status to Pending type");
        }

        request.setStatus(newStatus);

        if (newStatus == Status.APPROVED) {
            User requestUser = request.getUser();
            requestUser.setRole(request.getRequestedRole());
            userRepository.save(requestUser);
        }

        repository.save(request);
    }
}
